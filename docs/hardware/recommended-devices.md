---
id: recommended-devices
title: Recommended Hardware
sidebar_label: Hardware Selection
---

# Recommended Meshtastic Hardware

Meshtastic runs on a variety of microcontrollers and LoRa radio chips. Below are the most reliable, community-tested hardware options for Armenian conditions.

---

## 1. Heltec WiFi LoRa 32 (V3) — Best for Beginners & Home Nodes

- **Processor**: ESP32-S3 (Dual-core 240 MHz)
- **LoRa Transceiver**: Semtech SX1262
- **Display**: Built-in 0.96″ monochrome OLED
- **Connectivity**: Wi-Fi 802.11 b/g/n, Bluetooth 5 LE, USB-C
- **Approximate Price**: ~$20 – $25 (AliExpress)
- **Pros**: Inexpensive, bright screen, easy to flash, can connect to home Wi-Fi/MQTT.
- **Cons**: ESP32 draws relatively high power (~80–120 mA active), making it less suitable for long off-grid battery deployments without large solar panels.

---

## 2. LilyGO T-Echo — Best for Hikers & Everyday Carry (EDC)

- **Processor**: Nordic nRF52840 (Ultra-low power Cortex-M4F)
- **LoRa Transceiver**: Semtech SX1262
- **Display**: 1.54″ E-Ink display (excellent visibility in direct sunlight)
- **GNSS / GPS**: Integrated Quectel L76K GPS module
- **Battery**: Included 850 mAh rechargeable Li-Po battery + molded case
- **Approximate Price**: ~$50 – $60
- **Pros**: Complete turnkey handheld device, runs 3–5 days on a single charge with GPS enabled, rugged enclosure.
- **Cons**: No Wi-Fi (Bluetooth-only management).

---

## 3. RAK Wireless WisBlock (Base RAK19007 + Core RAK4631) — Best for Solar Repeaters

- **Core Module**: RAK4631 (Nordic nRF52840 + SX1262)
- **Power Consumption**: ~10–15 mA in continuous receive mode
- **Connectors**: Integrated solar panel connector with onboard battery management charging circuit (supports Li-Ion / LiPo).
- **Approximate Price**: ~$35 – $45
- **Why It's the Repeater King**: Operates indefinitely on a compact 5V/5W solar panel and an 18650 cell. Does not suffer thermal shutdown in summer or excessive battery drain in freezing winters.

---

## 4. LilyGO T-Beam (Supreme) — Best for Vehicle & High-Mobility Tracking

- **Processor**: ESP32 or ESP32-S3
- **Battery Holder**: Onboard 18650 lithium battery slot
- **GNSS**: High-sensitivity GPS/GLONASS receiver
- **Approximate Price**: ~$35 – $45
- **Best Use Case**: Vehicle installations (dashboards, overland vehicles) and high-accuracy GPS tracking.

---

## 📊 Hardware Comparison Matrix

| Model | Architecture | Display | Built-in GPS | Battery Life | Ideal Deployment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Heltec V3** | ESP32-S3 | OLED | No (Add-on) | ~8–12 hours | Desk / Home Gateway |
| **LilyGO T-Echo** | nRF52840 | E-Ink | Yes | 3–5 days | Hiking / Mountaineering / EDC |
| **RAK WisBlock** | nRF52840 | Modular | Optional | Weeks / Solar | Mountaintop & Rooftop Repeaters |
| **LilyGO T-Beam** | ESP32-S3 | Optional | Yes | 1–2 days (18650) | Vehicle / Mobile Tracker |
