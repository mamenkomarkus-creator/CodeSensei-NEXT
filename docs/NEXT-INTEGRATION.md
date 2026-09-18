# Інтеграція CodeSensei в NEXT-Study Metaverse / VRChat

English: `docs/NEXT-INTEGRATION.en.md`

**Номінація II.** ШІ-ментор як NPC у віртуальній лабораторії кафедри (MetaLab).

## Команда

| Учасник | Роль |
| --- | --- |
| Маменко Марк (Mark Mamenko) | Backend / Team Lead |
| Павленко Святослав (Sviatoslav Pavlenko) | UdonSharp Developer |
| Ільєнко Денис (Denys Ilienko) | AI / Prompt Engineer |
| Шозда Катерина (Kateryna Shozda) | QA / C# Tester |
| Пошитнюк Дмитро (Dmytro Poshytyniuk) | Integration / VR Tester |

## Середовище

Застосунок ставиться в **MacPaw AI Lab / MetaLab** (КПІ) на VRChat.

- Unity + **VRChat SDK3 Worlds** + **UdonSharp**
- Мережа лише **GET** (`VRCStringDownloader`)
- Інтервал запитів ≥ **5.5 с**
- HTTPS у префабі: `https://codesensei-d5zi.onrender.com`
- VRChat: **Settings → Security → Allow Untrusted URLs**
- Платформи: PC / PCVR

https://hello.vrchat.com/

## Як додати в світ NEXT / MetaLab

1. Відкрити світ MetaLab у Unity (VRChat SDK3 + UdonSharp).
2. `Assets → Import Package → Custom Package…` → `client/CodeSensei.unitypackage`.
3. Якщо скрипти в Git новіші — скопіювати `client/Scripts/*.cs` поверх імпортованих.
4. Перетягнути `CodeSensei_Terminal` до робочого місця лабораторії.
5. На терміналі виставити `Ticket Timeout Seconds = 180`.
6. Build & Upload світу.
7. Перед демо відкрити https://codesensei-d5zi.onrender.com/health.

Деталі: `client/README.md`. HTTP-контракт: `docs/api.md`.

## Живі посилання

| Ресурс | URL |
| --- | --- |
| Репозиторій (здача) | https://github.com/mamenkomarkus-creator/CodeSensei-NEXT |
| Презентація UK | `docs/presentation/CodeSensei-NEXT-UK.pdf` |
| Презентація EN | `docs/presentation/CodeSensei-NEXT-EN.pdf` |
| Демо /paste | https://codesensei-d5zi.onrender.com/paste |
| Health | https://codesensei-d5zi.onrender.com/health |
| NEXT | https://nextstudy.eu/ |

## Що перевірити в Metaverse

1. Пресет 1–24 → рядки на терміналі.
2. Код-ревʼю → 5-символьний код → `/paste` → відповідь ментора.
3. Другий гравець бачить синхронізовану відповідь.
