---
id: potatomesh-ingester
title: PotatoMesh Ingester Setup Guide
sidebar_label: PotatoMesh Ingester
description: Guide on setting up a PotatoMesh daemon to ingest live Meshtastic RF packets into api.msh.am
---

# PotatoMesh Ingester Setup Guide 🥔📡

Meshtastic Armenia operates a hybrid dual-ingestion backend at **`api.msh.am`**. While casual home gateways can report packets via native MQTT, backbone stations, mountain repeaters, and stationary nodes can run a **PotatoMesh Ingester** daemon.

This guide walks you through setting up and running a PotatoMesh ingester on a Linux single-board computer (Raspberry Pi, Orange Pi), home server, or mini PC.

---

## 🏛️ Ingestion Architecture

```mermaid
flowchart TD
    subgraph StationSite["Stationary Gateway / Backbone Site"]
        Radio["LoRa Radio Node<br/>(Heltec V4 / RAK4631 / T-Beam)<br/>868 MHz MediumFast"]
        Host["Host Companion (SBC / Linux Server)<br/>(Raspberry Pi, Le Potato, Mini PC)"]
        Radio -->|USB Serial /dev/ttyACM0<br/>or TCP :4403| Host
        Host --> Ingestor["potato-mesh Ingestor Daemon<br/>(Python / Docker)"]
    end

    subgraph CloudBackend["api.msh.am Backend"]
        Ingestor -->|HTTPS POST /api/...<br/>Authorization: Bearer API_TOKEN| Endpoints["Ingestion Endpoints<br/>(/nodes, /telemetry, /positions, /messages)"]
        Endpoints --> StateMgr["State & Deduplication Engine"]
        StateMgr --> DB[(SQLite Database)]
    end

    subgraph Downstream["Community Services"]
        DB --> Dashboard["Live Mesh Dashboard (msh.am/dashboard)"]
        DB --> Telegram["Telegram Channel Bot (@mesh_am)"]
        DB --> Prom["Prometheus /metrics"]
    end
```

### Why Use PotatoMesh Ingestion Instead of MQTT?

| Feature | PotatoMesh Ingester | Native MQTT (`mqtt.msh.am`) |
| :--- | :--- | :--- |
| **Connection Method** | Physical USB Serial or local TCP socket | Wi-Fi connection from the radio |
| **Node Resource Load** | Zero Wi-Fi/MQTT overhead on the MCU | Radio must maintain active Wi-Fi & MQTT |
| **Data Completeness** | Captures **all** heard RF packets, SNR, RSSI, neighbors, and traces | Limited to packets flagged with `OkToMQTT` |
| **Ideal For** | High-site repeaters (Aragats, Sevan), fixed base stations, clubs | Home desk nodes with good home Wi-Fi |
| **Software Required** | Lightweight Python daemon on a host computer | None (built into Meshtastic firmware) |

---

## 📋 Prerequisites

1. **Meshtastic Radio Hardware**:
   - Any supported device (e.g., Heltec V3/V4, RAK Wireless WisBlock, LilyGO T-Echo, Station G2) flashed with Meshtastic firmware **v2.5.0** or newer.
   - Configured with the Armenia regional preset: **EU_868**, **MediumFast** (`slot 20`, 869.525 MHz).
2. **Host Companion Computer**:
   - Raspberry Pi (3B+, 4B, 5, Zero 2W), Orange Pi, Linux mini PC, or server running 24/7.
   - Debian / Ubuntu / Raspberry Pi OS / Alpine.
   - Python 3.9+ or Docker installed.
3. **Connection to Radio**:
   - **USB Cable** (data-capable, plugged into `/dev/ttyACM0` or `/dev/ttyUSB0`), **OR**
   - **Network TCP** (if the node is on your LAN with Wi-Fi/Ethernet enabled on port `4403`).
4. **Community API Token**:
   - An authorized Bearer token is required to submit packets to `api.msh.am`.
   - To obtain an ingestor token for your site, contact the community admins in the [Telegram Main Group](https://t.me/mesh_am).
   - *(For local development against your own backend, use the dev token `msh_armenia_super_secret_token`)*.

---

## 🚀 Installation & Setup

We recommend running the standard open-source [`potato-mesh`](https://github.com/l5yth/potato-mesh) ingestor client.

### Method 1: Native Python & Systemd (Recommended)

This method provides the lowest resource footprint and starts automatically on boot.

#### 1. Clone the Repository

```bash
git clone https://github.com/l5yth/potato-mesh.git /opt/potato-mesh
cd /opt/potato-mesh/data
```

#### 2. Create Virtual Environment & Install Dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

:::tip Missing Dependencies?
If `requirements.txt` is missing or minimal, install the core packages directly:
```bash
pip install meshtastic requests paho-mqtt
```
:::

#### 3. Determine Your Serial Port

Plug your Meshtastic device into the host via USB and run:

```bash
ls -l /dev/ttyACM* /dev/ttyUSB*
```

Usually, the device appears as `/dev/ttyACM0` or `/dev/ttyUSB0`. Grant your user permission to access serial ports:

```bash
sudo usermod -a -G dialout $USER
```
*(Log out and log back in for group permissions to take effect).*

#### 4. Test Ingestor Interactively

Run a manual test in debug mode to verify that packets are read from the radio and accepted by `api.msh.am`:

```bash
INSTANCE_DOMAIN="https://api.msh.am" \
API_TOKEN="YOUR_COMMUNITY_API_TOKEN" \
CONNECTION="/dev/ttyACM0" \
DEBUG=1 \
./mesh.sh
```

If connecting via TCP over local network instead of USB:

```bash
INSTANCE_DOMAIN="https://api.msh.am" \
API_TOKEN="YOUR_COMMUNITY_API_TOKEN" \
CONNECTION="192.168.1.150:4403" \
DEBUG=1 \
./mesh.sh
```

You should see log output showing the radio handshake, discovered nodes, and HTTP `200 OK` responses from `https://api.msh.am/api/...`.

#### 5. Configure Systemd Service for 24/7 Auto-Start

Create a persistent systemd service file:

```bash
sudo nano /etc/systemd/system/potatomesh-ingestor.service
```

Paste the following configuration:

```ini
[Unit]
Description=PotatoMesh Ingester for api.msh.am
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/potato-mesh/data
Environment=INSTANCE_DOMAIN=https://api.msh.am
Environment=API_TOKEN=YOUR_COMMUNITY_API_TOKEN
Environment=CONNECTION=/dev/ttyACM0
Environment=DEBUG=0
ExecStart=/opt/potato-mesh/data/.venv/bin/python /opt/potato-mesh/data/mesh.py
Restart=always
RestartSec=10

# Security hardening
NoNewPrivileges=true
ProtectSystem=full

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now potatomesh-ingestor
```

Check the live service logs:

```bash
journalctl -u potatomesh-ingestor -f
```

---

### Method 2: Docker Compose

If you prefer containerized deployments, you can run the ingestor with Docker:

#### 1. Create `docker-compose.yml`

```yaml
version: '3.8'

services:
  potatomesh-ingestor:
    image: python:3.11-slim
    container_name: potatomesh-ingestor
    restart: unless-stopped
    working_dir: /app
    volumes:
      - /opt/potato-mesh/data:/app
    devices:
      - /dev/ttyACM0:/dev/ttyACM0
    environment:
      - INSTANCE_DOMAIN=https://api.msh.am
      - API_TOKEN=YOUR_COMMUNITY_API_TOKEN
      - CONNECTION=/dev/ttyACM0
      - DEBUG=0
    command: >
      sh -c "pip install --no-cache-dir meshtastic requests paho-mqtt &&
             python mesh.py"
```

#### 2. Start the Container

```bash
docker compose up -d
docker compose logs -f
```

---

## 📻 Node Radio Settings Recommendations

To ensure optimal packet reception on your ingester node:

1. **Role Configuration**:
   - Set to **`CLIENT`** or **`CLIENT_MUTE`** for a dedicated receiver station.
   - If positioned on an elevated mountaintop acting as a repeater for others, use **`ROUTER`** or **`REPEATER`**.
2. **Serial Module**:
   - Ensure the Serial module is enabled on the device (enabled by default in standard firmware).
   - Default baud rate is `115200`.
3. **Region & Channel**:
   - **Region**: `EU_868`
   - **Primary Channel**: `MediumFast` (`AQ==`, Slot 0 / 869.525 MHz).
   - **Hop Limit**: `3`
4. **MQTT on the Node**:
   - **Leave MQTT Disabled (`OFF`)** on the node itself. The PotatoMesh daemon handles all internet transmission through its authenticated HTTP API.

---

## 🔍 Ingestion Endpoints Reference

The daemon automatically posts received LoRa telemetry to the following endpoints on `api.msh.am`:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/nodes` | `POST` | Node discovery, MAC address, short/long name, role, hardware model |
| `/api/telemetry` | `POST` | Battery percentage, battery voltage, channel utilization, airtime TX, SNR, RSSI |
| `/api/positions` | `POST` | Latitude, longitude, altitude, GPS lock precision |
| `/api/messages` | `POST` | Decrypted text messages received on public channels (e.g. `MediumFast`) |
| `/api/neighbors` | `POST` | Discovered RF link neighbors and link SNR |
| `/api/traces` | `POST` | Node traceroute hops and SNR progression |
| `/api/ingestors` | `POST` | Heartbeat and telemetry about the ingestor station itself |

All POST endpoints require the header:
```http
Authorization: Bearer <API_TOKEN>
```

---

## 🧪 Verification & Diagnostics

### 1. Test Endpoint Connectivity with cURL

Verify that your token is valid and accepted by `api.msh.am`:

```bash
curl -i -X POST https://api.msh.am/api/nodes \
  -H "Authorization: Bearer YOUR_COMMUNITY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "node_id": "!testnode01",
    "short_name": "TEST",
    "long_name": "Ingestor Test Node",
    "role": "CLIENT",
    "hw_model": "RAK4631"
  }'
```

Expected response:
```json
HTTP/2 200
{"status":"ok","node":{ ... }}
```

*(If you receive `401 Unauthorized` or `403 Forbidden`, check that your `API_TOKEN` matches your issued token).*

### 2. Check the Live Dashboard

Visit the **[msh.am Live Mesh Dashboard](/dashboard)**. Once your ingestor receives radio packets, nodes heard through your station will appear with their updated signal levels (SNR/RSSI), battery state, and last-seen timestamps tagged with `via PotatoMesh`.

---

## 🛠️ Troubleshooting

### Device or Resource Busy (`Errno 16`)
- **Cause**: Another process (e.g. `meshtastic` CLI, screen, minicom, or another ingestor instance) has locked `/dev/ttyACM0`.
- **Fix**: Check open processes using `lsof /dev/ttyACM0` and stop any conflicting monitors.

### Permission Denied on `/dev/ttyACM0`
- **Cause**: The executing user is not in the `dialout` or `tty` group.
- **Fix**: Run `sudo usermod -a -G dialout $USER` and log back in, or run the systemd unit as a user with appropriate permissions.

### Node Not Discovered
- **Cause**: Radio antenna is disconnected or node is set to a different frequency/channel.
- **Fix**: Verify antenna connection, ensure region is set to `EU_868`, and verify that nearby nodes are transmitting on the `MediumFast` channel preset.

---

## 🤝 Questions & Community Support

Need help setting up your ingester, or want to coordinate a high-site backbone repeater deployment in Armenia?

- **Telegram Community**: [t.me/mesh_am](https://t.me/mesh_am)
- **Live Mesh Portal**: [msh.am/dashboard](/dashboard)
- **GitHub Repositories**: [github.com/msh-am](https://github.com/msh-am)
- **MQTT Alternative**: [MQTT Gateway Setup Guide](/docs/frequencies-and-channels/mqtt-settings)
