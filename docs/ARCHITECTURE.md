# Архітектура / Architecture

Бекенд ізолює велику мовну модель від світу VRChat. Клієнт гри ніколи не бачить ключ Gemini.

```
VRChat (UdonSharp, лише GET)
        │  VRCStringDownloader
        ▼
   WebApi  ──►  Application  ──►  Domain
        │
        └──►  Infrastructure (Gemini, inbox, квитки)
```

Шари відповідають Clean Architecture:

| Шар | Проєкт | Відповідальність |
| --- | --- | --- |
| Domain | `src/Domain` | Правила квитка, статуси, алфавіт коду |
| Application | `src/Application` | Сценарії пресетів і рев’ю |
| Infrastructure | `src/Infrastructure` | `LlmClient`, сховище тікетів |
| WebApi | `src/WebApi` | HTTP, `/paste`, `/health` |

Заміна LLM: один файл `src/Infrastructure/LlmClient.cs`.

## Потік код-рев’ю

Udon у VRChat не вміє POST. Тому рев’ю розкладено на три кроки:

1. Термінал показує квиток з 5 символів (алфавіт без неоднозначних літер).
2. Студент відкриває `/paste`, вводить квиток і фрагмент коду.
3. Сервер викликає Gemini і кладе готову відповідь в inbox. Термінал опитує `GET /api/inbox` приблизно раз на 6 с (ліміт VRChat — 5.5 с).

Pending-тікети в inbox не потрапляють: інакше клієнт зупинить опитування завчасно. Готове рев’ю видно 3 хвилини.

## English

The .NET host is a Clean Architecture proxy. VRChat uses GET only (`VRCStringDownloader`). Reviews travel through a five-character ticket, `/paste`, and a completed-only inbox. Swap the model in `LlmClient.cs` without touching the prefab.
