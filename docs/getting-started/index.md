---
id: index
title: Getting Started with Meshtastic
sidebar_label: 4-Step Quickstart
---

# Getting Started with Meshtastic 🚀

Joining the Armenian Meshtastic mesh requires only a LoRa hardware node and a smartphone.

```mermaid
graph LR
    A[1. Buy Hardware] --> B[2. Flash Firmware]
    B --> C[3. Pair Phone via BLE]
    C --> D[4. Configure EU_868]
```

---

## Step 1. Choose & Buy Hardware

The Armenian community has standardized on **868 MHz (EU_868)**.
The most popular and field-tested hardware options are:
- **Heltec WiFi LoRa 32 (V3)** (~$25): ESP32-S3 with built-in OLED screen, Wi-Fi, and Bluetooth. Great desk node and beginner choice.
- **LilyGO T-Echo** (~$50): Nordic nRF52840, sunlight-readable E-Ink display, built-in GPS, case, and multi-day battery. Best for hiking.
- **RAK Wireless WisBlock (RAK4631)** (~$40): Ultra-low power consumption. The gold standard for autonomous solar repeaters on rooftops and mountain peaks.

👉 Check out the full [Hardware & Antennas Guide](/docs/hardware/recommended-devices).

---

## Step 2. Flash Meshtastic Firmware

Modern Meshtastic firmware is flashed directly through your web browser (Chrome or Edge) using the official Web Flasher tool in under 2 minutes. No command-line tools or compilation needed.

👉 Follow the [Flashing Firmware Guide](/docs/getting-started/flashing-firmware).

---

## Step 3. Install App & Pair via Bluetooth

1. Download the official **Meshtastic** app from [Google Play Store](https://play.google.com/store/apps/details?id=com.geeksville.mesh) or [Apple App Store](https://apps.apple.com/us/app/meshtastic/id1586432531).
2. Enable **Bluetooth** on your phone.
3. Open the app, search for nearby Bluetooth devices, and pair with your node.

👉 Follow the [Mobile App Setup Guide](/docs/getting-started/mobile-apps).

---

## Step 4. Apply Armenian Frequency Standards

To connect with the wider Armenian mesh:
- **LoRa Region**: `EU_868`
- **Modem Preset**: `MediumFast`
- **Primary Channel**: Default `MediumFast` (or `Armenia`) with PSK `AQ==`

👉 Read the [Armenia Frequency Standards](/docs/frequencies-and-channels/armenia-standards).
