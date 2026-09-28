---
id: channel-settings
title: Channel Configuration & Encryption
sidebar_label: Channel Settings
---

# Armenian Mesh Channels & Encryption

Meshtastic nodes support up to 8 simultaneous channels (1 Primary channel and up to 7 Secondary channels). In the Armenian mesh, channel configurations are standardized to balance accessibility, privacy, and spectrum efficiency.

---

## 1. Primary Public Channel (`MediumFast`)

This is the main community channel for public announcements, node discovery, position sharing, and general community chat across Armenia:

- **Channel Name**: `MediumFast`
- **Pre-Shared Key (PSK)**: `AQ==` (default public key)
- **Role**: `PRIMARY`
- **Modem Preset**: `MediumFast`
- **Frequency Slot**: Slot 0 (`869.525 MHz` in `EU_868`)
- **Bandwidth / SF / CR**: 250 kHz / SF9 / CR 4/5
- **Hop Limit**: `3` (recommended default)
- **Uplink Enabled**: `YES` (if contributing to the community dashboard via MQTT)
- **Downlink Enabled**: ❌ `NO` (Keep disabled on client nodes to avoid saturating the RF spectrum)

:::note Default Participation
The `AQ==` key indicates an unencrypted public channel. Any node configured with the `EU_868` region and `MediumFast` preset will automatically join this channel upon booting.
:::

---

## 2. Emergency Channel (`Emergency-AM`)

Dedicated secondary channel for backcountry distress alerts, mountaineering emergencies, severe weather warnings, and search-and-rescue coordination:

- **Channel Name**: `Emergency-AM`
- **Pre-Shared Key (PSK)**: `AQ==` (public)
- **Role**: `SECONDARY`
- **Intended Use**: Mount Aragats, Geghama range, alpine trekking, and critical community alerts.

:::tip No Separate Telemetry Channel
The Armenian community does **not** use a separate `Telemetry-AM` channel. All node telemetry (if enabled) travels across the primary channel. To avoid polluting the shared frequency, follow the telemetry reduction rules below.
:::

---

## 3. Private Encrypted Channels

For families, expedition groups, private companies, or search-and-rescue teams requiring confidentiality:

1. In the Meshtastic app, tap **Channels** -> **Add Channel**.
2. Set the channel name (e.g., `Family` or `HikeTeam`).
3. Tap **Generate Key** to produce a secure, cryptographically random **AES-256** key.
4. Share the channel with trusted members using a **QR code** or channel URL.

### How Private Channels Function Over LoRa
When you transmit over an encrypted private channel, all nodes in the mesh (including public mountaintop repeaters on Aragats or Sevan) **relay your packets without decrypting them**. Only devices holding your unique AES-256 key can decrypt and read the message contents.

---

## 4. Spectrum Hygiene: GPS & Telemetry Optimization

In a shared radio spectrum, every transmission consumes airtime. Unoptimized nodes broadcasting duplicate data can quickly saturate the 868 MHz band. Configure your node according to these rules:

### A. Position & GPS Broadcast Interval
- **Enable Smart Position (For Portable & Mobile Nodes)**:
  - In the Meshtastic app, go to **Settings** -> **Position**.
  - Toggle **Smart Position** to **ON**.
  - Smart Position dynamically adjusts broadcasts based on movement. When stationary (at home, work, or camp), it stops sending redundant packets. When moving, it broadcasts based on distance thresholds (e.g., minimum 100 meters traveled) rather than a fixed timer.
- **Stationary & Home Nodes (`CLIENT_BASE`, `CLIENT_MUTE`)**:
  - Do **NOT** keep GPS broadcast set to default fast intervals (e.g. 60–300s).
  - Either set a **Fixed Position** manually in the app or increase the position broadcast interval to **at least 30 to 120 minutes** (1800 to 7200 seconds).

### B. Disable Telemetry on Home-Based & Battery-Less Nodes
- **Stationary Home Nodes (USB-Powered 24/7)**:
  - Under **Settings** -> **Telemetry**:
  - **Disable Device Metrics** (battery & voltage) or set the interval to **2–6 hours** (7200 to 21600 seconds).
  - *Why?* A node plugged permanently into a 5V USB charger broadcasting "100% battery" every 2 minutes creates useless RF airtime congestion without providing any meaningful operational value.
- **Nodes without Batteries**:
  - If your node has no LiPo or 18650 battery physically attached, turn off battery telemetry to avoid spamming the mesh with 0V / 0% readings.
- **Environment Metrics**:
  - Disable environment telemetry unless a physical sensor (such as BME280, BMP280, or SHT31) is attached. If attached, set the reading interval to **30–60 minutes** (1800–3600 seconds).

---

## 5. MQTT & Live Dashboard Integration

If your stationary node has stable Wi-Fi access, you can connect it to the official Armenian community broker to power the [Live Mesh Dashboard](/dashboard):

- **Server**: `mqtt.msh.am`
- **Topic**: `/msh/EU_868/AM/`
- **Uplink**: `YES`
- **Downlink**: ❌ `NO` (strictly forbidden on client nodes)

👉 For detailed step-by-step instructions, credentials, and privacy controls, visit the **[Community MQTT Setup Guide](/docs/frequencies-and-channels/mqtt-settings)**.
