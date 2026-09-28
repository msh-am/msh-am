---
id: mobile-apps
title: "Բջջային Հավելվածի Տեղադրում (Android & iOS)"
sidebar_label: "Բջջային Հավելվածներ"
---

# Բջջային Հավելվածի Տեղադրում (Android & iOS)

Meshtastic հանգույցները կառավարվում են պաշտոնական հավելվածների միջոցով Bluetooth Low Energy (BLE) կամ Wi-Fi-ով։

---

## 📱 Ներբեռնեք Հավելվածը

- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=com.geeksville.mesh) կամ [F-Droid / GitHub APK](https://github.com/meshtastic/Meshtastic-Android/releases)
- **iOS (iPhone / iPad)**: [Apple App Store](https://apps.apple.com/us/app/meshtastic/id1586432531)

---

## Bluetooth-ով Զույգավորում

1. Միացրեք ձեր Meshtastic հանգույցը անտեննան կցված։
2. Միացրեք **Bluetooth**-ը և **Location Services**-ը ձեր հեռախոսին։
3. Բացեք Meshtastic հավելվածը և գտեք ձեր հանգույցը (օր. `Meshtastic_xxxx`)։
4. Եթե 6-նիշ PIN ըրվի, մուտքագրեք այն։

---

## Սարքի Սկզբնական Կարգավորում

### 1. Հանգույցի Անուններ
**Settings -> User**-ում:
- **Long Name**: Միայն անգլերեն (ASCII), առանց էմոջի, մինչև 15 սիմվոլ։
- **Short Name**: Առավելագույնը 4 սիմվոլ։

### 2. LoRa Տարածաշրջան և Պրեսետներ
**Settings -> Radio Config -> LoRa**-ում:
- **Region**: `EU_868`
- **Modem Preset**: `MediumFast`

### 3. Սարքի Դերը
- **Ռաշակիր / Կրելի**: `CLIENT` (լռածօրյա)
- **Տնային**: `CLIENT_MUTE`
- **Տնային Կայան**: `CLIENT_BASE`
- **Տանիք / Լեռնագագաթ**: `ROUTER` (միայն 9+ հարկ կամ լեռնագագաթ)

### 4. Ալիքներ և Հայկական Mesh
- **Հիմնական**: `MediumFast` (PSK: `AQ==`, Uplink: `YES`, Downlink: `NO`)
- **Արտակարգ**: `Emergency-AM` (PSK: `AQ==`)
- 👉 Տեսեք [Ալիքի Կարգավորման Ուղեցույցը](/docs/frequencies-and-channels/channel-settings)

### 5. Դիրք և GPS
- **Ռաշակիր Հանգույցներ**: Միացրեք **Smart Position**։
- **Անշարժ Հանգույցներ**: Սահմանեք **Հաստատված Դիրք** կամ մեծացրեք ընդմիջակը 30–120 րոպե։

### 6. Տելեմետրիա
- Տնային հանգույցների համար անջատեք կամ մեծացրեք ընդմիջակը 2–6 ժամ։

### 7. MQTT և Ուղիղ Քարտեզ (Wi-Fi Հանգույցների Համար)
**Settings -> Module Config -> MQTT**-ում:
- **MQTT Enabled**: `ON`
- **Server Address**: `mqtt.msh.am`
- **Username**: `meshdev`
- **Password**: `large4cats`
- **Uplink Enabled**: `YES`
- **Downlink Enabled**: `NO`
- **Topic**: `/msh/EU_868/AM/`
- 👉 Կարդացեք [MQTT Կարգավորման Ուղեցույցը](/docs/frequencies-and-channels/mqtt-settings)
