---
id: solar-repeaters
title: Building Solar Mountain Repeaters
sidebar_label: Solar Repeaters
---

# Building Solar Mountain Repeaters for Armenia

Autonomous mountaintop and rooftop repeaters form the backbone of the Armenian mesh network, bridging Yerevan with surrounding valleys, Lake Sevan, and mountain passes.

---

## 🏔️ Environmental Challenges in Armenia

Deploying an autonomous repeater in Armenia requires accounting for:
- **Sub-Zero Winters**: Winter temperatures on Mount Aragats, Geghama mountains, and northern passes drop below -20°C to -30°C.
- **Lithium Charging Limitations**: Standard Lithium-Ion (Li-Po/Li-Ion) batteries cannot safely be charged below 0°C without risk of permanent damage or internal dendrite shorting.
- **Heavy Snow & Ice Accumulation**: Snow loads and ice rime can block solar panels and bend fragile antennas.

---

## 🛠️ Recommended Component Architecture

```
[ 5W - 10W Solar Panel (Tempered Glass / IP67) ]
                  │
                  ▼
[ RAK Wireless RAK4631 (nRF52840) ]
                  │
                  ▼
[ LiFePO4 Battery or Low-Temp Li-Ion ] (18650 / 21700)
                  │
                  ▼
[ 868 MHz Tuned Fiberglass Antenna (3 - 5.8 dBi) ]
```

### 1. Electronics
- **Board**: **RAK Wireless WisBlock (RAK4631 + RAK19007)**. Idle power consumption is under 15 mA, allowing a single 3000 mAh battery to survive over 8 days of total darkness or blizzard coverage.
- **Firmware Role**: Configure as **ROUTER** (or **ROUTER_CLIENT** if local Bluetooth connection is needed). Note that the legacy `REPEATER` role is deprecated in modern Meshtastic firmware.

### 2. Battery Selection
- **LiFePO4 (Lithium Iron Phosphate)**: Far safer and handles wider operating temperature ranges (-20°C to +60°C).
- **Cold-Weather 18650 / 21700 Cells**: Look for cells rated for low-temperature discharge. If using standard Li-Ion, ensure thermal insulation inside the enclosure.

### 3. Solar Panel
- **Rating**: 5V / 6V with 5W to 10W output.
- **Angle**: Mount the panel at approximately 45° to 60° tilt facing south. This maximizes winter sun capture when the sun is low on the horizon, while allowing snow to slide off easily.

### 4. Weatherproof Enclosure
- IP67 or IP68 rated polycarbonate or fiberglass enclosure.
- Use waterproof cable glands (PG7 / PG9) with silicone grease.
- Include a Gore-Tex breathing vent (e.g. Amphenol / Schreiner vent) to equalize pressure without allowing moisture ingress, preventing internal condensation.
