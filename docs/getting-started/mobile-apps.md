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

### 4. MQTT & Live Map (Optional for Home Nodes)
If your node is connected to home Wi-Fi and you want to contribute reception to the Armenian community live map:
Under **Settings -> Module Config -> MQTT**:
- **MQTT Enabled**: `ON`
- **Server Address**: `mqtt.msh.am`
- **Username**: `meshdev` (default)
- **Password**: `large4cats` (default)
- **Uplink Enabled**: `YES`
- **Downlink Enabled**: ❌ **`NO`** (Keep OFF to protect RF channels from internet spam)
- **Topic**: `msh/AM`

