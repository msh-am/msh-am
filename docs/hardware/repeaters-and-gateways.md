---
id: repeaters-and-gateways
title: Repeaters, Gateways & Base Stations (868 MHz)
sidebar_label: Repeaters & Gateways
---

# Repeaters, Gateways & Base Stations

While portable handhelds allow community members to chat locally, **stationary repeaters and home gateways form the permanent backbone of Meshtastic Armenia**. High-site repeaters stationed on Mount Aragats, the Geghama ridge, or tall apartment buildings in Yerevan relay packets across valleys and mountains, enabling province-to-province communication.

---

## 1. Heltec WiFi LoRa 32 V4 — The Ultimate Home Gateway & Desk Node

The **Heltec V4** represents a massive leap forward from the older V3 board, specifically engineered for high-performance base stations, MQTT bridges, and desk gateways.

- **Microcontroller**: Espressif ESP32-S3 (Dual-core 240 MHz)
- **LoRa Transceiver**: Semtech SX1262
- **Integrated Power Amplifier (PA)**: Boosts LoRa RF output up to **+28±1 dBm (~630 mW)**, compared to the ~20 dBm (~100 mW) limit of older V3 boards.
- **Low Noise Amplifier (LNA)**: Provides approximately **+3.8 dB improved receive sensitivity**, pulling in weak signals from distant handhelds across the Yerevan basin.
- **Display**: Built-in 0.96″ monochrome OLED
- **Connectivity**: Wi-Fi 802.11 b/g/n, Bluetooth 5 LE, USB-C
- **Power Management**: Onboard solar panel charging circuit with integrated Battery Management System (BMS).
- **GNSS / GPS**: Dedicated JST header for optional L76K GPS module
- **Approximate Price**: ~$22 – $28

### Ideal Deployment in Armenia
- **Home MQTT Gateway**: Plugged continuously into USB-C power, connected to your home Wi-Fi. It bridges local RF packets to the Armenian community MQTT server (`mqtt.msh.am`), allowing nodes in your neighborhood to appear on the [Live Mesh Dashboard](/dashboard).
- **Urban High-Power Base**: With +28 dBm transmission and LNA reception, a Heltec V4 connected to a rooftop 5.8 dBi antenna can cover entire districts of Yerevan, Gyumri, or Vanadzor.

:::warning Firmware Target
The Heltec V4 requires the specific `heltec_v4` firmware profile in the official [Meshtastic Web Flasher](https://flasher.meshtastic.org/). Do not flash legacy V3 firmware onto the V4 board.
:::

---

## 2. RAK Wireless WisBlock Ecosystem — The Repeater Standard

The **RAK WisBlock** modular architecture is the undisputed gold standard for autonomous mountaintop and rooftop repeaters globally and in Armenia.

- **Baseboards**:
  - **RAK19007**: Standard base with 4 sensor slots and 1 IO slot.
  - **RAK19003**: Mini compact base with 2 sensor slots (ideal for small project boxes).
- **Core Module**: **RAK4631** (Nordic nRF52840 MCU + Semtech SX1262 LoRa).
- **Power Consumption**: **Under 15 mA idle current**, allowing the node to operate for weeks of overcast blizzard conditions on a standard battery.
- **Built-in Solar Charger**: Dedicated JST solar input connector supporting 5V photovoltaic panels with auto-recharging circuitry.
- **Enclosures**: Factory **RAK Unify IP67** polycarbonate outdoor enclosures with integrated pole clamps and N-type antenna feedthroughs.
- **Approximate Price**: ~$40 (Base + Core) to ~$75 (Full solar kit with enclosure)

### Environmental Telemetry Add-Ons
Using the modular WisBlock bus, you can plug in sensor modules without soldering:
- **RAK1906 (BME680)**: Reports ambient temperature, relative humidity, barometric pressure, and air quality index (AQI) from mountain summits back to the mesh.

---

## 3. Heltec MeshTower — Turnkey All-in-One Solar Tower

For operators who want a mount-ready solar repeater without sourcing separate boxes, solar panels, and custom brackets, the **Heltec MeshTower** provides a complete turnkey package.

- **Microcontroller & Radio**: Nordic nRF52840 + Semtech SX1262
- **Integrated Solar Power**: Built-in 10W monocrystalline solar panel wrapped onto a rugged aluminum tower body.
- **Internal Battery Bank**: Integrated 3-cell lithium battery bank (~8400 to 9000 mAh capacity) with industrial BMS.
- **Weatherproofing**: Heavy-duty IP65/IP66 anodized aluminum housing with heat-dissipating cooling fins.
- **Integrated GNSS**: Onboard GPS for automatic repeater locator positioning.
- **Installation**: Universal pole and wall mounting clamps included in the box.
- **Approximate Price**: ~$120 – $150

### Why Choose the MeshTower?
- **Zero Assembly**: No drilling waterproof cable glands, no soldering battery leads, and no crimping solar cables.
- **Fast Deployment**: Simply clamp the unit onto a roof railing, mast, or water tank ladder, connect the 868 MHz antenna, pair via Bluetooth, and set the role to `ROUTER`.

---

## 4. DIY Solar Repeater with Heltec T114 — The Ultra-Budget Mountain Build

If the RAK WisBlock or MeshTower exceeds your budget, you can assemble a rock-solid autonomous solar repeater using the **Heltec Mesh Node T114** for **under $45 total**.

```
[ 5V / 5W Compact Solar Panel ]
              │
              ▼ (2-pin solar input)
[ Heltec Mesh Node T114 (nRF52840) ]
              │
              ▼ (JST-GH 1.25mm)
[ 18650 Li-Ion Cell or 3.2V LiFePO4 ]
              │
              ▼ (IPEX to SMA Pigtail)
[ 868 MHz Tuned Fiberglass Antenna (3 - 5.8 dBi) ]
```

### Complete Bill of Materials (BOM)
1. **Heltec T114 Board**: ~$25 (AliExpress / Heltec store)
2. **5V / 5W Monocrystalline Solar Panel**: ~$8 – $12
3. **18650 Cell (3000 mAh)** or **LiFePO4 Cell**: ~$4 – $7
4. **IP67 Waterproof Electrical Junction Box**: ~$5 – $7 (available at any Armenian hardware store or Ozon)
5. **PG7 / PG9 Waterproof Cable Glands**: ~$1
6. **Tuned 868 MHz Antenna**: ~$10 – $15

### Why This Setup Works
Because the T114 uses the Nordic nRF52840, its idle current is virtually identical to the RAK4631 (~12–15 mA). Even in northern Armenia during cloudy winter weeks, a modest 5W solar panel provides more than enough energy to keep the battery topped up.

:::tip Winter Repeater Rule
In freezing Armenian mountain locations (Mount Aragats, Sevan Pass, Geghama), standard Li-Ion batteries will fail to charge below 0°C. For sub-zero winter deployments, utilize a **LiFePO4 battery** or thermal insulation inside the junction box. Read the [Solar Repeater Engineering Guide](/docs/hardware/solar-repeaters) for thermal schematics.
:::

---

## ⚙️ Repeater Firmware Role Selection

When configuring a mountaintop or rooftop node in the Meshtastic app:

- **`ROUTER`**: Best for dedicated mountain repeaters with uninterrupted line-of-sight. The node aggressively prioritizes rebroadcasting mesh packets, enables router-priority frequency hopping, and puts the local Bluetooth radio to sleep after 15 minutes to maximize battery life.
- **`ROUTER_CLIENT`**: Similar packet routing priority to `ROUTER`, but leaves Bluetooth permanently discoverable so that operators can connect their phone when standing beneath the tower.
- **`CLIENT_MUTE`**: Recommended for home gateway nodes running high-gain rooftop antennas that only need to ingest packets for MQTT or personal listening, avoiding unneeded repeat hops that could congest the urban mesh.

:::caution Deprecated Roles
Do not use the legacy `REPEATER` role in modern Meshtastic firmware. It is deprecated and can cause packet drop loops in modern mesh topologies. Always use `ROUTER` or `ROUTER_CLIENT`.
:::
