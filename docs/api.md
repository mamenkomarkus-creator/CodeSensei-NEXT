# Контракт Backend API

English: [api.en.md](api.en.md)

Бекенд — захищений проксі між клієнтом VRChat і Google Gemini. Контракт збігається з префабом `client/CodeSensei.unitypackage` (лише GET, `VRCStringDownloader`).

Шари: Domain → Application → Infrastructure → WebApi. Заміна моделі: `src/Infrastructure/LlmClient.cs`.

Базовий URL у префабі: `https://codesensei-d5zi.onrender.com`

## Змінні середовища

| Змінна | Призначення | Типове значення |
| --- | --- | --- |
| `Gemini__ApiKey` | Ключ Google AI Studio | обов’язковий у проді |
| `Gemini__Model` | Модель | `gemini-flash-latest` |
| `App__AccessToken` | Токен клієнта (`?k=` або `X-Access-Token`) | у префабі `secret123` |
| `App__DailyBudgetUsd` | Денний ліміт витрат | `2` |
| `App__TicketTtlMinutes` | Час життя квитка | `15` |
| `App__InboxVisibilityMinutes` | Скільки хвилин готове рев’ю в inbox | `3` |

## Ендпоінти VRChat

### `GET /api/preset/{id}?k=secret123`

`id` від 1 до 24. Завжди HTTP 200:

```json
{"ok":true,"status":"explained","lines":["[1. Інкапсуляція]:","..."]}
```

Невідомий ідентифікатор: `ok: true` і рядок «тема поки не задана».

### `GET /api/inbox?room=metalab&k=secret123`

Не забирає елементи з черги. Повертає лише готові рев’ю:

```json
{"ok":true,"hasNew":true,"items":[{"code":"7K3MP","status":"completed","lines":["..."]}]}
```

Порожньо: `{"ok":true,"hasNew":false,"items":[]}`. Тікети зі статусом pending не потрапляють у `items`. Готовий результат видно три хвилини після `completed` або `error`.

### Код-рев’ю

1. Термінал показує код з п’яти символів.
2. Студент відкриває `/paste`, вводить код і фрагмент.
3. `POST /api/code/submit` з `{ "code", "language", "ticketCode" }` відповідає `{ "ok": true, "ticketId": "7K3MP" }`.
4. Термінал опитує inbox приблизно раз на 6 с, доки не знайде свій `code`.

`POST /api/code/submit` не вимагає токена `k` (як на живому хості). Інші маршрути `/api/*` вимагають.

## Інші маршрути

| Метод | Шлях | Примітка |
| --- | --- | --- |
| POST | `/api/ask?k=` | Створення квитка, 202 `{ ticketId, status }` |
| GET | `/api/inbox/{ticketId}` | Статус одного квитка |
| GET | `/paste` | HTML-форма для фрагмента |
| GET | `/` і `/health` | `{ "status": "running", "project": "CodeSensei", "commit": "…" }` |

Обмеження: 60 запитів на хвилину з однієї IP. Денний бюджет LLM. Таймаут, 429 і 5xx не зупиняють процес. Submit приймає лише валідний п’ятисимвольний `ticketCode`.

## Запуск

```bash
docker build -t codesensei-api .
dotnet run --project src/WebApi
dotnet test
```

На Render задайте `Gemini__ApiKey` і `App__AccessToken=secret123`.  
Keep-alive: скопіюйте `ops/keep-render-awake.yml` у GitHub Actions, якщо репозиторій не приймає файли з `.github/workflows`.
