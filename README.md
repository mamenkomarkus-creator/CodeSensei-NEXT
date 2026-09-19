# CodeSensei

Інтерактивний AI-ментор для Metaverse-лабораторії.

**Номінація II** · Erasmus+ NEXT Student Creative Project Competition  
КПІ ім. Ігоря Сікорського · команда CodeSensei  
Тімлід: **Ільєнко Денис**

https://github.com/mamenkomarkus-creator/CodeSensei-NEXT

---

CodeSensei — це ШІ-асистент біля віртуального термінала в лабораторії кафедри (MetaLab) на VRChat. Студент отримує пояснення ООП, допомогу в коді та живе рев’ю, не виходячи з метавсесвіту NEXT-Study. Ключі LLM лишаються на сервері; клієнт VRChat працює лише через GET.

| Документ | |
| --- | --- |
| Карта документації | [docs/README.md](docs/README.md) |
| Презентація українською | [docs/presentation/CodeSensei-NEXT-UK.pdf](docs/presentation/CodeSensei-NEXT-UK.pdf) |
| Презентація англійською | [docs/presentation/CodeSensei-NEXT-EN.pdf](docs/presentation/CodeSensei-NEXT-EN.pdf) |
| Ідея та мета | [docs/CONCEPT.md](docs/CONCEPT.md) |
| Інтеграція в VRChat / MetaLab | [docs/NEXT-INTEGRATION.md](docs/NEXT-INTEGRATION.md) |
| Контракт API | [docs/api.md](docs/api.md) |
| Живе демо | https://codesensei-d5zi.onrender.com/paste |
| Стан сервісу | https://codesensei-d5zi.onrender.com/health |

## Команда

| Учасник | Роль |
| --- | --- |
| **Ільєнко Денис** / Denys Ilienko | Team Lead · AI & Prompt Engineer |
| Маменко Марк / Mark Mamenko | Backend |
| Павленко Святослав / Sviatoslav Pavlenko | UdonSharp Developer |
| Шозда Катерина / Kateryna Shozda | QA / C# Tester |
| Пошитнюк Дмитро / Dmytro Poshytyniuk | Integration / VR Tester |

## English

**Nomination II** — interactive AI application for the NEXT-Study Metaverse. An NPC-style OOP mentor in the department MetaLab on VRChat. Team lead: **Denys Ilienko**.

Presentations (official NEXT template): Ukrainian and English PDFs in `docs/presentation/`. Documentation index: `docs/README.md`.

Compatible with Unity, VRChat SDK3, UdonSharp, GET-only `VRCStringDownloader`, HTTPS, and **Allow Untrusted URLs**.

```bash
cp .env.example .env   # set Gemini__ApiKey
dotnet test
dotnet run --project src/WebApi
```
