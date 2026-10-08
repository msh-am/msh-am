---
id: mqtt-settings
title: Community MQTT Gateway & Live Map Setup
sidebar_label: MQTT Settings
---

# Community MQTT Gateway & Live Map Setup

Meshtastic Armenia operates an official MQTT broker (`mqtt.msh.am`) that connects community nodes with the **[Live Mesh Dashboard](/dashboard)** and real-time network monitors.

---

## 🧭 Overview & Connection Guidelines

### Who Should Enable MQTT?
- **Stationary Home Stations (`CLIENT_BASE`)**: Nodes plugged into mains power with persistent Wi-Fi access.
- **Rooftop & High-Site Nodes**: Gateways positioned to capture broad RF coverage across cities or valleys.
- ❌ **Handheld / Portable Nodes (`CLIENT`)**: Should **NOT** enable MQTT in everyday use. It wastes battery, consumes cellular data, and creates unnecessary duplicate packet reports when moving.

---

## ⚙️ Broker Connection Parameters

Configure your device using the Meshtastic mobile app (Android / iOS) or the Web Client:

| Setting Parameter | Required Value | Notes |
| :--- | :--- | :--- |
| **MQTT Enabled** | `ON` (Enabled) | Master switch under Options in MQTT Module Config |
| **Encryption Enabled** | `ON` (Enabled) | Under Options: Preserves channel message encryption over MQTT |
| **Server Address** | `mqtt.msh.am` | Public community broker |
| **Server Port** | `1883` | Default standard MQTT port |
| **TLS Enabled** | `OFF` (Disabled) | Under Server: Do not enable TLS on unencrypted port 1883 |
| **Username** | `meshdev` | Community access credential |
| **Password** | `large4cats` | Standard Meshtastic community password |
| **Root Topic** | `/msh/EU_868/AM/` | Regional topic root (leading slash required) |
| **Channel Uplink Enabled** | `YES` | Must be turned on under Channel Settings |
| **Downlink Enabled** | ❌ **`NO` (Disabled)** | **CRITICAL**: Never enable on community client nodes |

---

## 📱 Mobile App Setup Instructions

1. Open the **Meshtastic app** and connect to your node over Bluetooth.
2. Tap **Settings** (gear icon) -> **Module Config** -> **MQTT**.
3. Under **Options**:
   - Toggle **MQTT Enabled** to **ON**.
   - Keep **Encryption Enabled** toggled **ON** (preserves packet encryption using channel keys).
4. Under **Server**:
   - In **Address**, enter `mqtt.msh.am`.
   - Ensure **TLS Enabled** is toggled **OFF** (port 1883 does not use TLS).
   - Enter **Username**: `meshdev` and **Password**: `large4cats`.
5. Under **Root Topic**, set the topic to `/msh/EU_868/AM/`.
6. Save settings (the node will restart).
7. Next, go to **Channels** -> select your primary channel (`MediumFast`):
   - Set **Uplink Enabled** to **ON**.
   - Keep **Downlink Enabled** set to **OFF**.

---

## ⚠️ The Golden Rule: Downlink MUST Be Disabled

:::danger NEVER enable Downlink on client nodes!
- **Uplink (RF -> MQTT)**: Your node hears a radio packet from nearby users and forwards it to the internet dashboard. This is safe and helps map network coverage.
- **Downlink (MQTT -> RF)**: Your node receives internet traffic from the MQTT broker and **retransmits it over the local 868 MHz radio frequency**.

If casual users enable Downlink, global internet traffic and bot spam will flood the local RF spectrum in Armenia, causing high channel airtime utilization, lost packets, and severe interference for emergency comms. Downlink is reserved exclusively for authorized, rate-limited community gateway bridges managed by network administrators.
:::

---

## 🔒 Privacy & Public Uplink Controls

The Armenian community respects privacy and individual node operator preferences:

### 1. Relaying to the Global Map (`OkToMQTT`)
By default, packets sent to `mqtt.msh.am` power the local Armenian portal ([msh.am](/dashboard)). 
- If you also want your node to be forwarded upstream to the global Meshtastic public map (`mqtt.meshtastic.org`), ensure **`OkToMQTT`** (`lora.config_ok_to_mqtt = true`) is checked in your node's LoRa configuration.

### 2. Complete Internet Opt-Out (`ignore_mqtt`)
If you want to communicate strictly over local LoRa radio and never have your node, location, or telemetry relayed to the internet:
- In the app, navigate to **Settings** -> **Radio Config** -> **LoRa**.
- Turn **Ignore MQTT** (`lora.ignore_mqtt = true`) to **ON**.
- The `api.msh.am` gateway inspects this packet flag and **strictly drops** any packet originating from nodes configured with `ignore_mqtt = true` before it reaches public endpoints or databases.

---

## ⚡ Next Steps
- Verify that your node appears on the **[Live Mesh Dashboard](/dashboard)**.
- Operating a mountain repeater or stationary gateway? Set up a **[PotatoMesh Ingester](/docs/community/potatomesh-ingester)** daemon.
- Review [Channel Configuration & Encryption](/docs/frequencies-and-channels/channel-settings) to tune your channels.
- Check [Mesh Etiquette](/docs/community/etiquette) for guidelines on node roles and broadcast intervals.
