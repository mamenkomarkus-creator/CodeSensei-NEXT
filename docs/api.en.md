# Backend API contract

Ukrainian: [api.md](api.md)

The backend is a protected proxy between the VRChat client and Google Gemini. The contract matches `client/CodeSensei.unitypackage` (GET-only `VRCStringDownloader`).

Layers: Domain → Application → Infrastructure → WebApi. Swap the model in `src/Infrastructure/LlmClient.cs`.

Prefab base URL: `https://codesensei-d5zi.onrender.com`

## Environment

| Variable | Purpose | Default |
| --- | --- | --- |
| `Gemini__ApiKey` | Google AI Studio key | required in production |
| `Gemini__Model` | Model name | `gemini-flash-latest` |
| `App__AccessToken` | Client token (`?k=` or `X-Access-Token`) | `secret123` in the prefab |
| `App__DailyBudgetUsd` | Daily spend cap | `2` |
| `App__TicketTtlMinutes` | Ticket lifetime | `15` |
| `App__InboxVisibilityMinutes` | How long a finished review stays visible | `3` |

## VRChat endpoints

### `GET /api/preset/{id}?k=secret123`

`id` is 1–24. Always HTTP 200:

```json
{"ok":true,"status":"explained","lines":["[1. Encapsulation]:","..."]}
```

Unknown id: `ok: true` and a “topic not set yet” line.

### `GET /api/inbox?room=metalab&k=secret123`

Does not dequeue. Returns finished reviews only:

```json
{"ok":true,"hasNew":true,"items":[{"code":"7K3MP","status":"completed","lines":["..."]}]}
```

Empty: `{"ok":true,"hasNew":false,"items":[]}`. Pending tickets are omitted. A finished result stays visible for three minutes after `completed` or `error`.

### Code-review flow

1. The terminal shows a five-character code.
2. The student opens `/paste` and submits the code plus a snippet.
3. `POST /api/code/submit` with `{ "code", "language", "ticketCode" }` returns `{ "ok": true, "ticketId": "7K3MP" }`.
4. The terminal polls the inbox about every 6 s until `items[].code` matches.

`POST /api/code/submit` does not require `k` (same as the live host). Other `/api/*` routes do.

## Other routes

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/ask?k=` | Ticket create, 202 `{ ticketId, status }` |
| GET | `/api/inbox/{ticketId}` | Single ticket |
| GET | `/paste` | HTML form |
| GET | `/` and `/health` | `{ "status": "running", "project": "CodeSensei", "commit": "…" }` |

Rate limit: 60 requests / minute / IP. Daily LLM budget. Timeouts, 429 and 5xx do not crash the process. Submit accepts only a valid five-character `ticketCode`.

## Run

```bash
docker build -t codesensei-api .
dotnet run --project src/WebApi
dotnet test
```

On Render set `Gemini__ApiKey` and `App__AccessToken=secret123`.  
Keep-alive YAML: `ops/keep-render-awake.yml`.
