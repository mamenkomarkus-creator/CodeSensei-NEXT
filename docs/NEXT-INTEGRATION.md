# Інтеграція в NEXT-Study Metaverse / VRChat

English: [NEXT-INTEGRATION.en.md](NEXT-INTEGRATION.en.md)

Номінація II. CodeSensei — ШІ-ментор у віртуальній лабораторії кафедри (MetaLab).  
Тімлід: Ільєнко Денис.

## Команда

| Учасник | Роль |
| --- | --- |
| Ільєнко Денис | Team Lead · AI & Prompt Engineer |
| Маменко Марк | Backend |
| Павленко Святослав | UdonSharp Developer |
| Шозда Катерина | QA / C# Tester |
| Пошитнюк Дмитро | Integration / VR Tester |

## Вимоги платформи

Застосунок розміщується в аудиторії **MacPaw AI Lab / MetaLab** (КПІ) на VRChat.

- Unity + VRChat SDK3 Worlds + UdonSharp
- Мережа лише GET (`VRCStringDownloader`) — Udon не вміє POST
- Інтервал запитів не менше 5.5 с
- HTTPS у префабі: `https://codesensei-d5zi.onrender.com`
- У клієнті VRChat: **Settings → Security → Allow Untrusted URLs**
- Повний досвід: PC / PCVR

Документація VRChat: https://hello.vrchat.com/

## Імпорт у світ MetaLab

1. Відкрийте світ MetaLab у Unity з VRChat SDK3 та UdonSharp.
2. **Assets → Import Package → Custom Package…** → `client/CodeSensei.unitypackage`.
3. Якщо скрипти в Git новіші, скопіюйте `client/Scripts/*.cs` поверх імпортованих файлів.
4. Перетягніть `CodeSensei_Terminal` на робоче місце в лабораторії.
5. На компоненті виставте **Ticket Timeout Seconds = 180**.
6. Зберіть і завантажте світ.
7. Перед демо відкрийте https://codesensei-d5zi.onrender.com/health.

Покроково з нюансами: [../client/README.md](../client/README.md). Контракт HTTP: [api.md](api.md).

## Перевірка в метавсесвіті

1. Пресет 1–24 дає рядки на терміналі.
2. Код-рев’ю: квиток з 5 символів → `/paste` → відповідь ментора.
3. Другий гравець бачить синхронізований текст.

## Посилання

| Ресурс | Адреса |
| --- | --- |
| Репозиторій | https://github.com/mamenkomarkus-creator/CodeSensei-NEXT |
| Презентація UK | `docs/presentation/CodeSensei-NEXT-UK.pdf` |
| Презентація EN | `docs/presentation/CodeSensei-NEXT-EN.pdf` |
| Демо | https://codesensei-d5zi.onrender.com/paste |
| Health | https://codesensei-d5zi.onrender.com/health |
| NEXT | https://nextstudy.eu/ |
