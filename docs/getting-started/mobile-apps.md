---
id: mobile-apps
title: Mobile App Setup (Android & iOS)
sidebar_label: Mobile Apps
---

# Mobile App Setup (Android & iOS)

Meshtastic nodes are primarily controlled through official companion apps over Bluetooth Low Energy (BLE) or Wi-Fi.

---

## 📱 Download the App

- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=com.geeksville.mesh) or [F-Droid / GitHub APK Releases](https://github.com/meshtastic/Meshtastic-Android/releases)
- **iOS (iPhone / iPad)**: [Apple App Store](https://apps.apple.com/us/app/meshtastic/id1586432531)

---

## Pairing via Bluetooth

1. Turn on your Meshtastic node with the antenna firmly attached.
2. Enable **Bluetooth** and **Location Services** on your phone (Location permission is required by Android/iOS to scan for BLE peripherals).
3. Open the Meshtastic app:
   - Go to the **Bluetooth** tab / scanner.
   - Look for your node's identifier (e.g., `Meshtastic_xxxx`).
   - Tap to pair.
4. If a 6-digit PIN displays on your node's OLED/E-Ink screen, enter it when prompted by your phone.

---

## ⚙️ Initial Device Configuration

### 1. Node Names
Under **Settings -> User**:
- **Long Name**: Use English (ASCII) characters only, no emojis, and keep it under 15 characters (e.g. `Alex T-Echo`, `kita home`).
- **Short Name**: 4 characters max (e.g. `ALEX`, `kitD`).

### 2. LoRa Region & Presets
Under **Settings -> Radio Config -> LoRa**:
- **Region**: Set to `EU_868`.
- **Modem Preset**: Set to `MediumFast`.
- Tap **Save** (the node will restart).

### 3. Device Role
Under **Settings -> Device**:
- **Portable / Handheld**: Set to **`CLIENT`** (default).
- **Indoor Node**: If placed in an apartment or on lower floors, set to **`CLIENT_MUTE`** to avoid congesting the mesh.
- **Home Station**: If you have both a home node and a portable node, set the home node to **`CLIENT_BASE`**.
- ⚠️ **`ROUTER`** is recommended **ONLY** for rooftops (floor 9 or higher) or mountain peaks.
- Note: The legacy `REPEATER` role is deprecated. Do not use `ROUTER_CLIENT` or `SENSOR`.

### 4. Channels & Armenia Community Network
By default, setting your region to `EU_868` and preset to `MediumFast` will connect you to the primary community channel.
- **Primary Channel**: `MediumFast` (PSK: `AQ==`, Uplink: `YES`, Downlink: `NO`)
- **Emergency Channel**: `Emergency-AM` (Secondary channel with PSK: `AQ==` for search and rescue)
- 👉 See the full [Channel Configuration Guide](/docs/frequencies-and-channels/channel-settings) for instructions and private channels.

### 5. Position & GPS Settings
Under **Settings -> Position**:
- **Portable / Handheld Nodes**:
  - Enable **Smart Position**: Toggles dynamic location broadcasting based on movement distance instead of a fixed timer. When resting or stationary, the radio stops sending repetitive coordinate packets, saving battery and airtime.
- **Home / Stationary Nodes (`CLIENT_BASE`, `CLIENT_MUTE`)**:
  - Set a **Fixed Position** or increase the broadcast interval to **at least 30 to 120 minutes** (1800 to 7200 seconds). Never leave stationary nodes broadcasting GPS fixes every 1–2 minutes.

### 6. Telemetry Settings (Home Nodes & Battery-less Devices)
Under **Settings -> Telemetry**:
- **Home Nodes (USB-Powered 24/7)**:
  - **Disable Device Metrics** (battery / voltage) or increase update intervals to **2–6 hours** (7200 to 21600 seconds). A node permanently connected to 5V mains power broadcasting "100% battery" every 2 minutes wastes shared community airtime.
- **Nodes Without Batteries**:
  - If your device operates purely on USB without an 18650 or LiPo battery, disable battery telemetry to prevent flooding the mesh with 0V / 0% readings.
- **Environment Telemetry**:
  - Leave disabled unless physical sensors (BME280/BMP280) are soldered to the device.

### 7. MQTT & Live Map (For Home Nodes on Wi-Fi)
If your node is stationary and connected to home Wi-Fi, you can contribute your reception to the community map:
Under **Settings -> Module Config -> MQTT**:
- **MQTT Enabled**: `ON`
- **Server Address**: `mqtt.msh.am`
- **Username**: `meshdev`
- **Password**: `large4cats`
- **Uplink Enabled**: `YES`
- **Downlink Enabled**: ❌ **`NO`** (Keep OFF to protect RF channels from internet spam)
- **Topic**: `/msh/EU_868/AM/`
- 👉 Read the complete [Community MQTT Setup Guide](/docs/frequencies-and-channels/mqtt-settings).

