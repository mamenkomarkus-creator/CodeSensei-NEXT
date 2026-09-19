# Клієнт VRChat

Термінал CodeSensei для Unity і VRChat SDK3. Повна інтеграція світу: [docs/NEXT-INTEGRATION.md](../docs/NEXT-INTEGRATION.md).

## Що імпортувати

`CodeSensei.unitypackage` містить префаб `Assets/CodeSensei_Terminal.prefab` і скрипти UdonSharp.

Каталог `Scripts/` у Git — та сама логіка для рев’ю. Після імпорту пакета скопіюйте ці файли поверх імпортованих, якщо вони новіші: inbox приймає лише `completed` і `error`, таймаут рев’ю — 3 хвилини.

## Розміщення в MetaLab

1. Відкрийте світ MetaLab у Unity (VRChat SDK3 + UdonSharp).
2. **Assets → Import Package → Custom Package…** → `client/CodeSensei.unitypackage`.
3. За потреби оновіть скрипти з `client/Scripts/`.
4. Перетягніть `CodeSensei_Terminal` на робоче місце.
5. Виставте **Ticket Timeout Seconds = 180**.
6. Адреси вже прошиті: `https://codesensei-d5zi.onrender.com`, токен `secret123`.
7. Зберіть і завантажте світ.
8. У VRChat увімкніть **Settings → Security → Allow Untrusted URLs**.
9. Перед демо відкрийте https://codesensei-d5zi.onrender.com/health.
10. Перевірте пресет, потім рев’ю: код з термінала → https://codesensei-d5zi.onrender.com/paste.

URL змінює лише той, хто збирає світ, і лише якщо зміниться хост.

## English

Import `CodeSensei.unitypackage`, overlay newer `Scripts/` if needed, place `CodeSensei_Terminal` at a workstation, set ticket timeout to 180 seconds, enable **Allow Untrusted URLs**, and wake `/health` before the demo.
