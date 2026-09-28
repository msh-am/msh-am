---
id: etiquette
title: Mesh Etiquette & Best Practices
sidebar_label: Mesh Etiquette
---

# Mesh Etiquette & Best Practices

In a shared radio frequency spectrum, cooperative behavior ensures that the mesh remains fast, reliable, and unpolluted.

---

## 1. Device Roles: Choosing the Right Role

Setting the correct role on your node is critical to keeping the Armenian mesh fast and preventing packet storms:

- **`CLIENT` (Default)**: Standard role for handheld and portable mobile nodes. Participates in the mesh, forwards packets intelligently, and sleeps when appropriate.
- **`CLIENT_MUTE` (For Indoor Nodes)**: If your node is located indoors (in an apartment, on lower floors, or behind concrete walls), set it to **`CLIENT_MUTE`**. It can send and receive messages normally, but won't re-transmit packets that can't effectively escape your building, saving valuable airtime for the community.
- **`CLIENT_BASE` (For Home Stations)**: If you own both a stationary home node and a portable/pocket node, configure your home-based station as **`CLIENT_BASE`**.
- **`ROUTER` (High Elevation Only)**: Recommended **ONLY** if the node is installed on a high rooftop (**floor 9 or higher**) or on a **mountain peak** with unobstructed 360° line of sight and continuous power.

:::warning
- **The legacy `REPEATER` role is deprecated**: Do not use `REPEATER`. In modern Meshtastic firmware, use `ROUTER` for high-elevation infrastructure.
- **Avoid `ROUTER_CLIENT` or `SENSOR`**: These roles are not recommended for general community members.
- **Never set low-elevation or indoor nodes to `ROUTER`**: It causes severe packet contention and degrades network performance for everyone across Yerevan and surrounding areas.
:::

---

## 2. Node Naming Guidelines

Keep your node identity simple, clean, and compatible:

1. **No Emojis**: Emojis consume 4 or more bytes per character in LoRa packet payloads, causing packet truncation and rendering bugs on small OLED and E-Ink displays.
2. **English (ASCII) Characters Only**: Avoid Cyrillic, Armenian letters, or special unicode symbols. Non-ASCII characters cause encoding issues across different client apps and older firmware versions.
3. **Keep Long Name Under 15 Characters**: Shorter names minimize packet sizes and conserve channel airtime (e.g. `Yundin Repeater`, `Tina DiPierro`, `kita home`).
4. **Short Name (4 Characters Max)**: A 4-character abbreviation displayed in message previews (e.g. `YRPT`, `TIV4`, `kitD`, `AKRZ`).

---

## 3. Position & GPS Broadcast Intervals

Broadcasting coordinates every 60 seconds severely saturates the shared 868 MHz channel and drains node batteries across the city!
- **Enable Smart Position (For Portable / Mobile Nodes)**:
  - Turn **Smart Position** ON under **Settings -> Position**.
  - Smart Position adapts transmissions dynamically: when resting or walking slowly, the node stops broadcasting duplicates; when traveling past your configured minimum distance threshold (e.g. 100m), it transmits an updated fix.
- **Stationary Home Nodes (`CLIENT_BASE`, `CLIENT_MUTE`)**:
  - Increase GPS broadcast intervals to **at least 30 to 120 minutes** (1800 to 7200 seconds), or configure a Fixed Position once.
- **Node Info Broadcast**: Set to **3–6 hours** (10,800 to 21,600 seconds).

---

## 4. Telemetry Etiquette: Conserving Spectrum

Device telemetry packets (battery voltage, channel utilization) can quickly consume 40%+ of mesh airtime if left unconfigured:
- **Stationary Home Nodes (Plugged into USB 24/7)**:
  - **Disable Device Telemetry** or increase the interval to **2–6 hours**. Continuously broadcasting "100% battery" every 2 minutes wastes shared airtime and offers zero practical value.
- **Nodes Operating Without a Battery**:
  - If your device has no LiPo / 18650 cell attached and runs exclusively on USB power, disable battery telemetry to avoid polluting the mesh with 0V / 0% readings.
- **Environment Telemetry**:
  - Disable environment sensors unless physical sensors (BME280, BMP280, SHT31) are actively wired to the node. When installed, set sensor broadcast intervals to **30–60 minutes**.

---

## 5. MQTT & Gateway Etiquette

1. **Keep Downlink Disabled on Client Nodes**: Unless you are a network operator managing an authorized bidirectional bridge, **never enable Downlink** on public MQTT. Downlink rebroadcasts internet packets over RF, easily saturating the local 868 MHz airtime.
2. **Respect `ignore_mqtt` and `OkToMQTT`**: The community values privacy and consent. The official gateway only forwards packets to public MQTT if `OkToMQTT` is enabled, and strictly drops packets from nodes configured with `ignore_mqtt = true`.
3. **Use the Designated Regional Topic**: Always use `/msh/EU_868/AM/` to properly route Armenian mesh telemetry.
4. **Learn More**: Read the comprehensive [Channel Configuration Guide](/docs/frequencies-and-channels/channel-settings) and [Community MQTT Setup Guide](/docs/frequencies-and-channels/mqtt-settings).

