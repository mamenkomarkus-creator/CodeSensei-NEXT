# CodeSensei

**Посилання на здачу:** https://github.com/mamenkomarkus-creator/CodeSensei-NEXT

VR-ментор з ООП у змодельованій лабораторії MacPaw AI Lab / MetaLab (КПІ) для VRChat і метавсесвіту NEXT-Study.

Авторство створених артефактів залишається за командою.

| | |
| --- | --- |
| Презентація UK | [docs/presentation/CodeSensei-NEXT-UK.pdf](docs/presentation/CodeSensei-NEXT-UK.pdf) |
| Презентація EN | [docs/presentation/CodeSensei-NEXT-EN.pdf](docs/presentation/CodeSensei-NEXT-EN.pdf) |
| Як здавати пакет | [docs/SUBMISSION.md](docs/SUBMISSION.md) · [EN](docs/SUBMISSION.en.md) |
| Чекліст | [docs/CHECKLIST.md](docs/CHECKLIST.md) |
| Інтеграція в VRChat / MetaLab | [docs/NEXT-INTEGRATION.md](docs/NEXT-INTEGRATION.md) · [EN](docs/NEXT-INTEGRATION.en.md) |
| API | [docs/api.md](docs/api.md) · [EN](docs/api.en.md) |
| Демо | https://codesensei-d5zi.onrender.com/paste |
| Health | https://codesensei-d5zi.onrender.com/health |

## Команда

| Учасник | Role |
| --- | --- |
| Маменко Марк / Mark Mamenko | Team lead, backend |
| Шозда Катерина / Kateryna Shozda | Learning design |
| Ільєнко Денис / Denys Ilienko | QA |
| Павленко Святослав / Sviatoslav Pavlenko | VRChat / UdonSharp |
| Пошитнюк Дмитро / Dmytro Poshytyniuk | MetaLab / VRChat SDK |

## English

Submission URL: https://github.com/mamenkomarkus-creator/CodeSensei-NEXT

CodeSensei is an OOP mentor inside a reconstructed KPI multimedia classroom for VRChat and the Erasmus+ NEXT metaverse. Presentations (official NEXT template): UK and EN PDFs in `docs/presentation/`. Integration: `docs/NEXT-INTEGRATION.en.md`. Authorship of artefacts remains with the team.

Compat: Unity, VRChat SDK3, UdonSharp, GET-only `VRCStringDownloader`, HTTPS, Allow Untrusted URLs.

```bash
cp .env.example .env   # set Gemini__ApiKey
dotnet test
dotnet run --project src/WebApi
```
