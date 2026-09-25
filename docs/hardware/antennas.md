---
id: antennas
title: Antennas & RF Guide (868 MHz)
sidebar_label: Antennas Guide
---

# Antennas & RF Guide (868 MHz)

In LoRa mesh networking, **your antenna is the single most critical component**. An inexpensive $20 radio with a properly tuned antenna will outperform a $100 node with a poorly matched antenna every time.

---

## ⚠️ The Stock Antenna Pitfall

Many budget Chinese boards (Heltec, LilyGO) ship with generic "rubber ducky" antennas:
- **VNA Measurements**: In community testing with NanoVNAs, up to 70% of included antennas are resonant at 915 MHz or even 2.4 GHz (Wi-Fi), rather than 868 MHz.
- **VSWR Penalties**: A Voltage Standing Wave Ratio (VSWR) higher than 2.5:1 reflects over 20% of your RF power back into the transceiver chip, causing significant heat generation and drastically reducing reception sensitivity.

:::caution
Always replace or measure your stock antenna with a NanoVNA before deploying critical nodes!
:::

---

## 🏆 Recommended 868 MHz Antennas

### 1. Handheld & Portable (Everyday Carry)
- **Gizont 868 MHz 1/4-Wave Whip**: Length ~17–19 cm. Consistently demonstrates VSWR < 1.3 across 865–870 MHz.
- **Linx Technologies / TE Connectivity**: Commercial-grade whips with exceptional repeatability.
- **Ebyte 868 MHz Flexible Whip**: Durable, bendable antenna ideal for backpack loops.

### 2. Base Station & Repeater Antennas (Rooftops & Peaks)
- **Fiberglass Omni-Directional 868 MHz (3 dBi to 5.8 dBi)**:
  - Examples: **RAK Wireless Fiberglass Antenna** (858–878 MHz) or **McGill Microwave 868 MHz**.
  - Provides a true 360° toroidal radiation pattern.
  - Weatherproof (IP67), UV-resistant, and wind-rated up to 130 km/h.

:::tip Why avoid excessive gain (e.g. 8–12 dBi) in mountainous terrain?
High-gain omnidirectional antennas flatten the radiation pattern into a narrow disc like a pancake. While beneficial over flat plains or open oceans, in mountainous regions like Armenia (where repeaters sit on high peaks looking down into valleys), a narrow beam overshoots targets below. An antenna with **3 dBi to 5.8 dBi** provides the ideal balance of range and vertical beamwidth.
:::

---

## 🔌 Coaxial Cables & Connectors

When mounting an antenna away from your node:
- **Avoid RG-58 cable** for 868 MHz runs over 2 meters. Signal attenuation at 868 MHz is severe (~0.6 dB/meter on RG58).
- Use **LMR-200** or **LMR-400** ultra-low loss coaxial cable.
- Ensure correct connector polarities: Meshtastic boards almost universally use **SMA-Male** to **SMA-Female** connectors, **NOT** Wi-Fi's RP-SMA (Reverse Polarity).
