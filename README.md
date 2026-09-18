# CodeSensei

**Посилання на здачу:** https://github.com/mamenkomarkus-creator/CodeSensei-NEXT

**Номінація II** — інтерактивний ШІ-застосунок: AI-ментор CodeSensei для віртуальної лабораторії кафедри (MetaLab) у VRChat / NEXT-Study.

| | |
| --- | --- |
| Презентація UK | [docs/presentation/CodeSensei-NEXT-UK.pdf](docs/presentation/CodeSensei-NEXT-UK.pdf) |
| Презентація EN | [docs/presentation/CodeSensei-NEXT-EN.pdf](docs/presentation/CodeSensei-NEXT-EN.pdf) |
| Як здавати пакет | [docs/SUBMISSION.md](docs/SUBMISSION.md) · [EN](docs/SUBMISSION.en.md) |
| Чекліст | [docs/CHECKLIST.md](docs/CHECKLIST.md) |
| Ідея та мета | [docs/CONCEPT.md](docs/CONCEPT.md) |
| Інтеграція VRChat / MetaLab | [docs/NEXT-INTEGRATION.md](docs/NEXT-INTEGRATION.md) · [EN](docs/NEXT-INTEGRATION.en.md) |
| API | [docs/api.md](docs/api.md) · [EN](docs/api.en.md) |
| Демо | https://codesensei-d5zi.onrender.com/paste |
| Health | https://codesensei-d5zi.onrender.com/health |

## Команда

| Учасник | Роль |
| --- | --- |
| Маменко Марк / Mark Mamenko | Backend / Team Lead |
| Павленко Святослав / Sviatoslav Pavlenko | UdonSharp Developer |
| Ільєнко Денис / Denys Ilienko | AI / Prompt Engineer |
| Шозда Катерина / Kateryna Shozda | QA / C# Tester |
| Пошитнюк Дмитро / Dmytro Poshytyniuk | Integration / VR Tester |

## English

Submission URL: https://github.com/mamenkomarkus-creator/CodeSensei-NEXT

**Nomination II** — interactive AI application: an NPC-style OOP mentor in the department MetaLab on VRChat. Official NEXT-template PDFs (UK + EN) in `docs/presentation/`.

Compat: Unity, VRChat SDK3, UdonSharp, GET-only `VRCStringDownloader`, HTTPS, Allow Untrusted URLs.

```bash
cp .env.example .env   # set Gemini__ApiKey
dotnet test
dotnet run --project src/WebApi
```
