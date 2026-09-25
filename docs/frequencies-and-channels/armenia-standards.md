---
id: armenia-standards
title: Armenia Frequency & RF Standards (EU_868)
sidebar_label: Frequency Standards
---

# Armenia Frequency Standards (EU_868)

The Armenian Meshtastic community has officially standardized on the **EU_868 (868 MHz)** frequency band.

---

## 📊 Technical Parameters for Armenia

| Parameter | Value in Armenia | Notes |
| :--- | :--- | :--- |
| **LoRa Frequency Region** | `EU_868` | 868.0 MHz – 868.6 MHz (SRD/ISM Band) |
| **Default Center Frequency** | `869.525 MHz` | Slot 0 (`MediumFast` default) |
| **Modem Preset** | `MediumFast` | Standardized across Armenia for low airtime and fast throughput |
| **Bandwidth (BW)** | `250 kHz` | Wide bandwidth for fast packet transmission |
| **Spreading Factor (SF)** | `9` | Fast transfer rate (~5.4x faster than LongFast) |
| **Coding Rate (CR)** | `4/5` | Forward error correction |
| **Max Tx Power** | `27 dBm (500 mW)` | Standard transmitter power |
| **Default Hop Limit** | `3` | Prevents packet looping and network congestion |

---

## ❓ Why 868 MHz instead of 433 MHz?

Newcomers often ask whether 433 MHz (`RU_433` or `EU_433`) is viable in Armenia:

1. **Antenna Dimensions & Portability**
   - At 433 MHz (wavelength ~70 cm), a quarter-wave antenna must be roughly 17 cm long, and high-gain antennas are bulky.
   - At 868 MHz (wavelength ~34.5 cm), antennas are half the size (~8.6 cm), making pocket nodes, backpacks, and compact vehicle installations far more practical.

2. **RF Noise & Interference**
   - The 433 MHz spectrum in Armenian cities is heavily congested with legacy car key fobs, automated gate remotes, consumer weather stations, and cheap LPD433 walkie-talkies.
   - The 868 MHz band has significantly lower noise floors and cleaner spectrum in Armenia.

3. **Regional & Cross-Border Interoperability**
   - Georgia, European travelers, and neighboring regional groups also utilize `EU_868`. Using 868 MHz ensures seamless interoperability when traveling or during cross-border hiking expeditions.

---

## 🛒 Purchasing Guide: Selecting the Right Frequency

When purchasing hardware on AliExpress, Amazon, or maker shops:
- Always choose the **868 MHz** or **915 MHz** hardware variant (most SX1262 chips cover the broad 850–930 MHz range).
- ❌ **DO NOT purchase the 433 MHz variant**, as its RF filtering circuitry is physically incompatible with the Armenian 868 MHz network.
