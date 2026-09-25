---
id: flashing-firmware
title: Flashing Firmware (Web Flasher)
sidebar_label: Flashing Firmware
---

# How to Flash Meshtastic Firmware

Meshtastic firmware can be installed and updated directly through your browser using Web Serial on Google Chrome, Microsoft Edge, or Brave.

---

## Prerequisites

1. **Computer**: Windows, macOS, or Linux.
2. **Browser**: Google Chrome, Microsoft Edge, or Brave (Safari and Firefox do not support the Web Serial API).
3. **Data-Capable USB Cable**: Ensure the USB cable supports data transfer, not power-only charging.
4. **Attached Antenna**:

:::danger NEVER power on your LoRa radio without an antenna attached!
Transmitting without an antenna creates severe impedance mismatch and reflected power (high VSWR), which can instantly fry the Power Amplifier (PA) chip on your board.
:::

---

## Step-by-Step Guide (Web Flasher)

### Step 1. Open the Official Web Flasher
Navigate to: **[flasher.meshtastic.org](https://flasher.meshtastic.org)**

### Step 2. Connect Your Device via USB
Plug your device into your computer. If your operating system fails to recognize the serial COM port:
- Install the **CP210x USB to UART Bridge VCP Driver** (common on Heltec & LilyGO boards).
- Or install the **CH340 / CH9102 Serial Driver**.

### Step 3. Select Device Target & Firmware
1. Choose your device hardware architecture (e.g. `Heltec V3`, `LilyGO T-Beam`, `RAK4631`).
2. Select the latest **Stable** firmware release.

### Step 4. Flash and Verify
1. Click **Flash**.
2. In the browser popup, select your device's COM port and click **Connect**.
3. Allow the flasher to erase and flash the new firmware (takes ~60–90 seconds).
4. When finished, the device will reboot with the Meshtastic splash screen.

---

## nRF52 Devices (UF2 Drag & Drop Method)

For nRF52-based devices like the **RAK Wireless WisBlock (RAK4631)** or **LilyGO T-Echo**:
1. Connect the device via USB.
2. Rapidly double-click the physical **Reset** button.
3. The board will appear as a USB mass storage drive (e.g., `RAK4631` or `NICENANO`).
4. Download the `.uf2` firmware file from the [Meshtastic Releases page](https://github.com/meshtastic/firmware/releases).
5. Drag and drop the `.uf2` file onto the drive. The drive will unmount and the device will boot with the new firmware immediately.
