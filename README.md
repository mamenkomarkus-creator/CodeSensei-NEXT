# CodeSensei — NEXT Student Creative Project

VR-ментор з ООП у змодельованій лабораторії **MacPaw AI Lab / MetaLab** (KPI) для VRChat і NEXT-Study Metaverse.

**Презентація (PDF, шаблон NEXT):** [docs/presentation/CodeSensei-NEXT.pdf](docs/presentation/CodeSensei-NEXT.pdf)  
**Інтеграція:** [docs/NEXT-INTEGRATION.md](docs/NEXT-INTEGRATION.md)  
**Живе демо:** https://codesensei-d5zi.onrender.com/paste  
**Health:** https://codesensei-d5zi.onrender.com/health

Авторство створених артефактів залишається за командою.

## Команда

| Учасник | Роль |
| --- | --- |
| Маменко Марк | Team lead, backend (.NET, Gemini, Render) |
| Шозда Катерина | Learning design, пресети ООП, промпти |
| Ільєнко Денис | QA, тести, контракт API |
| Павленко Свʼятослав | VRChat-клієнт, UdonSharp, префаб |
| Пошитнюк Дмитро | Збірка MetaLab, VRChat SDK |

## Що в цьому репозиторії

Один коміт — повне рішення:

- 3D-лабораторія (фото моделі) + префаб термінала VRChat
- .NET API (Gemini) на Render
- PDF-презентація за офіційним шаблоном Erasmus+ NEXT
- Документація для вставки у світ MetaLab

Сумісність: Unity, VRChat SDK3, UdonSharp, лише GET (`VRCStringDownloader`), HTTPS, Allow Untrusted URLs.

## Швидкий старт

```bash
cp .env.example .env   # Gemini__ApiKey
dotnet test
dotnet run --project src/WebApi
```

Імпорт у MetaLab: `client/README.md`.
