# CryptoNites

<p align="center">
  <b>Professional crypto trading journal for macOS</b>
</p>

<p align="center">

![Platform](https://img.shields.io/badge/platform-macOS-blue)
![Architecture](https://img.shields.io/badge/architecture-Apple%20Silicon%20%7C%20Intel-lightgrey)
![Status](https://img.shields.io/badge/status-beta-orange)
![License](https://img.shields.io/badge/license-MIT-green)

</p>

---

## Overview

CryptoNites — это настольное приложение для крипто-трейдеров, которое помогает:

- вести **торговый журнал**
- анализировать сделки
- отслеживать рынок
- получать AI-подсказки

Приложение разработано специально для **macOS** и ориентировано на трейдеров, которые хотят системно улучшать свою торговлю.

---

# Features

## Trading Journal

CryptoNites предоставляет полноценный журнал торговли.

Возможности:

- запись сделок (тикер, направление **Long / Short**)
- цена входа и выхода
- stop-loss
- плечо
- объём позиции
- теги и причины входа
- drag & drop скриншотов графиков
- автоматический расчёт **PnL** и **PnL%**

---

## AI Analysis

Встроенный AI помогает анализировать сделки и рынок.

Возможности:

- анализ сделки по тексту
- анализ скриншота графика
- свободный чат с AI
- суммаризация новостей по монете

AI может определять:

- направление сделки
- точку входа
- TP1 / TP2
- стоп-лосс
- зону DCA

Поддерживаются различные модели через OpenRouter.

---

## Dashboard & Statistics

CryptoNites показывает ключевую статистику торговли:

- общий **PnL**
- **winrate**
- количество сделок
- календарь активности
- индекс **Fear & Greed**

---

## Market Data

Приложение показывает рыночные данные:

- котировки криптовалют
- свечные графики
- топ монет за 24 часа
- новостную ленту

Данные получаются через API **CoinGecko**.

---

## Deposit Tracking

Функции отслеживания депозита:

- история пополнений
- история выводов
- мониторинг текущего баланса
- импорт сделок через API

Поддерживаемая биржа:

- BingX

---

# Security

CryptoNites разработан с упором на безопасность и приватность.

Функции:

- PIN-код
- Touch ID
- автоматическая блокировка приложения

Все API ключи:

- хранятся в **macOS Keychain**
- не синхронизируются с iCloud
- не покидают устройство пользователя

---

# Installation

Скачать приложение можно в разделе **Releases**.

Установка:

1. Скачать `CryptoNites.dmg`
2. Открыть DMG
3. Перетащить приложение в папку **Applications**
4. При первом запуске открыть:

System Settings → Privacy & Security → Open Anyway

После этого приложение готово к работе.

---

# System Requirements

| Component | Requirement |
|---|---|
| OS | macOS 14+ |
| CPU | Apple Silicon / Intel |
| Internet | Required for AI and market data |

---

# Tech Stack

CryptoNites разработан с использованием современных технологий:

- SwiftUI
- SwiftData
- OpenRouter
- CoinGecko API
- BingX API

---

# Roadmap

Планируемые функции:

- облачная синхронизация (Supabase)
- авторизация пользователей
- облачное хранилище скриншотов
- web-версия приложения
- улучшенный AI анализ сделок

---

# Contributing

Pull requests приветствуются.

Если вы хотите предложить новую функцию или исправление:

1. Fork репозитория
2. Создайте новую ветку
3. Сделайте изменения
4. Откройте Pull Request

---

# License

MIT License

---

<p align="center">
Built for crypto traders on macOS
</p>
