---
id: channel-settings
title: Channel Configuration & Encryption
sidebar_label: Channel Settings
---

# Armenian Mesh Channels & Encryption

Meshtastic nodes support up to 8 simultaneous channels (1 Primary channel and up to 7 Secondary channels).

---

## 1. Primary Public Channel (`MediumFast`)

This is the main community channel for public announcements, node discovery, and general chat:

- **Channel Name**: `MediumFast`
- **Pre-Shared Key (PSK)**: `AQ==` (default public key)
- **Role**: `PRIMARY`
- **Modem Preset**: `MediumFast`
- **Uplink Enabled**: `YES`
- **Downlink Enabled**: `NO` (Keep disabled on client nodes to prevent internet traffic from flooding the RF mesh)

:::note
The `AQ==` key indicates an unencrypted/open channel. Any node configured for `EU_868` with `MediumFast` will automatically participate in this channel upon booting.
:::

---

## 2. Emergency & Alpine Search-and-Rescue Channel

Dedicated secondary channel for emergency alerts, mountain rescue coordination, and distress beacons:

- **Channel Name**: `Emergency-AM`
- **PSK**: `AQ==` (public)
- **Role**: `SECONDARY`
- **Intended Use**: Backcountry distress calls, severe weather alerts, and volunteer coordination.

---

## 3. Private Encrypted Channels

For families, private groups, or organization comms:

1. In the Meshtastic app, add a new **Secondary Channel**.
2. Give it a unique name (e.g. `RescueTeam` or `Family`).
3. Tap **Generate Key** to produce a secure, cryptographically random **AES-256** key.
4. Share the channel configuration with trusted members via **QR code** or channel URL.

### How Private Channels Function on the Mesh
When you broadcast on your private channel, all nodes in the mesh (including public repeaters on Mount Aragats or in Yerevan) will **relay the packets across the network**, but **cannot decrypt the content**. Only devices possessing your unique AES-256 key can read your messages.

---

## 4. MQTT & Live Dashboard Gateways (The Pragmatic Approach)

To power the community live map and mesh health metrics without burdening users with running dedicated servers at home (like PotatoMesh or custom Docker containers), Armenia adopts a **pragmatic hybrid model**:

### A. General Users: Native App / Node MQTT
If you have a home node (`CLIENT_BASE` or stationary `CLIENT`) connected to home Wi-Fi:
- **Module**: In the Meshtastic app, go to **Settings** → **Module Config** → **MQTT**.
- **MQTT Enabled**: `ON`
- **Server Address**: `mqtt.msh.am`
- **Username**: `meshdev` (default)
- **Password**: `large4cats` (default)
- **Uplink Enabled**: `YES` (Sends received RF packets to the community dashboard)
- **Downlink Enabled**: ❌ **`NO`** (CRITICAL: Do not enable downlink. Enabling downlink injects internet traffic back into the 868 MHz RF airwaves, creating packet collisions for everyone!)
- **Topic Root**: `msh/AM`

:::tip Privacy & `ignore_mqtt`
If you do not want your personal node or coordinates to appear on the public live dashboard, simply enable **Ignore MQTT** (`lora.ignore_mqtt = true`) in your node's LoRa settings. Other nodes running native MQTT will respect this flag and will **not** uplink your packets to the server.
:::

### B. Core Admins: Backbone Serial Ingestors
For core community organizers and backbone mountain repeater sites:
- 1–2 dedicated nodes run connected via USB Serial to a server running an ingestor (such as PotatoMesh or a custom daemon).
- This provides ground-truth RF diagnostic metrics (exact RSSI, SNR, noise floor, and secondary channel archives) without requiring casual users to manage any extra software.

