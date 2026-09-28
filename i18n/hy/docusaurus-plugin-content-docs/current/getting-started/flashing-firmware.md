---
id: flashing-firmware
title: "Firmware-ի Կարգավորում (Web Flasher)"
sidebar_label: "Firmware-ի Կարգավորում"
---

# Ինչպես Կարգավորել Meshtastic Firmware

Meshtastic firmware-ը կարող է տեղադրել և թարմացնել անմիջապես ձեր բրաուզերի միջոցով։ Աջակցում է Google Chrome, Microsoft Edge կամ Brave։

---

## Նախապայմաններ

1. **Համակարգիչ**: Windows, macOS կամ Linux։
2. **Բրաուզեր**: Google Chrome, Microsoft Edge կամ Brave (Safari-ն և Firefox-ը չեն աջակցում Web Serial API)։
3. **Տվյալներով USB Մալուխ**: Համոզվեք, որ USB մալուխը աջակցում է տվյալների փոխանցում, ոչ միայն լիցքավորման։
4. **Անտեննա կցված**:

:::danger Երբեք մի միացրեք ձեր LoRa ռադիոն առանց անտեննա կցելու!
Անտեննայի առանց հեռարկումը ստեղծում է իմպեդանսի անհամապատասխանություն և արտացոլված հզորություն (VSWR), որը կարող է անմիջապես վնասել ձեր սարքի PA չիպը։
:::

---

## Քայլերով Ուղեցույց (Web Flasher)

### Քայլ 1. Բացեք Պաշտոնական Web Flasher-ը
Անցեք: **[flasher.meshtastic.org](https://flasher.meshtastic.org)**

### Քայլ 2. Միացրեք Սարքը USB-ով
Միացրեք ձեր սարքը համակարգչին։ Եթե օպերացիոն համակարգը չի ճանաչում COM port-ը, տեղադրեք **CP210x** կամ **CH340/CH9102** դրայվերը։

### Քայլ 3. Ընտրեք Սարք և Firmware
1. Ընտրեք ձեր սարքի ճարտարապետությունը (օր. `Heltec V3`, `LilyGO T-Beam`, `RAK4631`)։
2. Ընտրեք վերջին **Stable** firmware-ը։

### Քայլ 4. Կարգավորեք և Ստուգեք
1. Սեղմեք **Flash**։
2. Պոպապում ընտրեք ձեր սարքի COM port-ը և սեղմեք **Connect**։
3. Թող տվեք flasher-ին ջնջել և կարգավորել (~60–90 վայրկյան)։
4. Ավարտին սարքը կվերամեկնարկվի Meshtastic սպլաշ էկրանով։

---

## nRF52 Սարքեր (UF2 Մեթոդ)

nRF52-ի վրա սարքերի համար (**RAK Wireless WisBlock (RAK4631)** կամ **LilyGO T-Echo**):
1. Միացրեք սարքը USB-ով։
2. Արագ կրկնակի սեղմեք **Reset** կոճակը։
3. Սարքը կատարվի որպես USB կրիչ (օր. `RAK4631` կամ `NICENANO`)։
4. Ներբեռնեք `.uf2` firmware ֆայլը [Meshtastic Releases](https://github.com/meshtastic/firmware/releases) էջից։
5. Քաշեք `.uf2` ֆայլը կրիչի վրա։ Սարքը անմիջապես կվերամեկնարկվի նոր firmware-ով։
