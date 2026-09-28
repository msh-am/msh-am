---
id: mobile-apps
title: Настройка мобильного приложения (Android и iOS)
sidebar_label: Мобильные приложения
---

# Настройка мобильного приложения (Android и iOS)

Управление узлами Meshtastic осуществляется через официальные мобильные приложения по Bluetooth Low Energy (BLE) или Wi-Fi.

---

## 📱 Загрузка приложения

- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=com.geeksville.mesh) или [F-Droid / GitHub APK Releases](https://github.com/meshtastic/Meshtastic-Android/releases)
- **iOS (iPhone / iPad)**: [Apple App Store](https://apps.apple.com/us/app/meshtastic/id1586432531)

---

## Сопряжение по Bluetooth

1. Включите узел Meshtastic с надёжно прикрученной антенной.
2. Включите **Bluetooth** и **Геолокацию** на телефоне (доступ к местоположению необходим Android и iOS для поиска устройств BLE).
3. Откройте приложение Meshtastic:
   - Перейдите во вкладку сканирования Bluetooth.
   - Найдите имя вашего узла (например, `Meshtastic_xxxx`).
   - Нажмите для сопряжения.
4. Если на экране узла отобразился 6-значный PIN-код, введите его на телефоне.

---

## ⚙️ Первоначальная настройка устройства

### 1. Имена узла
В меню **Settings -> User**:
- **Long Name**: Только английские буквы (ASCII), без эмодзи, до 15 символов (например, `Alex T-Echo`, `kita home`).
- **Short Name**: До 4 символов (например, `ALEX`, `kitD`).

### 2. Регион LoRa и пресет
В меню **Settings -> Radio Config -> LoRa**:
- **Region**: Выберите `EU_868`.
- **Modem Preset**: Выберите `MediumFast`.
- Нажмите **Save** (узел перезагрузится).

### 3. Роль устройства
В меню **Settings -> Device**:
- **Портативный / Носимый**: **`CLIENT`** (по умолчанию).
- **В квартире**: На нижних этажах установите **`CLIENT_MUTE`**.
- **Домашняя станция**: При наличии второго узла выберите **`CLIENT_BASE`**.
- ⚠️ **`ROUTER`**: Только для крыш высоток (9+ этаж) или горных вершин.

### 4. Каналы сети Армении
- **Основной канал**: `MediumFast` (Ключ PSK: `AQ==`, Uplink: `YES`, Downlink: `NO`)
- **Аварийный канал**: `Emergency-AM` (Вторичный канал, PSK: `AQ==`)
- 👉 Подробнее см. в [Руководстве по каналам](/docs/frequencies-and-channels/channel-settings).

### 5. Настройки местоположения и GPS
В меню **Settings -> Position**:
- **Для портативных узлов**:
  - Включите **Smart Position**: передача координат подстраивается под реальное перемещение, экономя заряд и эфир.
- **Для домашних узлов (`CLIENT_BASE`, `CLIENT_MUTE`)**:
  - Задайте **Fixed Position** или увеличьте интервал отправки минимум до **30–120 минут** (1800–7200 сек).

### 6. Настройки телеметрии
В меню **Settings -> Telemetry**:
- **Для домашних узлов с постоянным питанием от USB**:
  - **Отключите Device Metrics** или увеличьте интервал до **2–6 часов**.
- **Для узлов без аккумулятора**:
  - Отключите батарейную телеметрию, чтобы не засорять сеть нулевыми показаниями.

### 7. Подключение к MQTT (для домашних станций с Wi-Fi)
В меню **Settings -> Module Config -> MQTT**:
- **MQTT Enabled**: `ON`
- **Server Address**: `mqtt.msh.am`
- **Username**: `meshdev`
- **Password**: `large4cats`
- **Uplink Enabled**: `YES`
- **Downlink Enabled**: ❌ **`NO`**
- **Topic**: `/msh/EU_868/AM/`
- 👉 См. полное [Руководство по настройке MQTT](/docs/frequencies-and-channels/mqtt-settings).
