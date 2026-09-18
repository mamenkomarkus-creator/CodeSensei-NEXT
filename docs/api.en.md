# CodeSensei Backend API

The backend is a protected proxy between the VRChat client and Google Gemini.
The contract matches `client/CodeSensei.unitypackage` (GET-only `VRCStringDownloader`).

Layers: `Domain` → `Application` → `Infrastructure` → `WebApi`.
Swap the LLM in `src/Infrastructure/LlmClient.cs`.

Ukrainian version: `docs/api.md`. Submission repo: https://github.com/mamenkomarkus-creator/CodeSensei-NEXT

## Environment

| Variable | Purpose |
| --- | --- |
| `Gemini__ApiKey` | Google AI Studio key. Required in production. |
| `Gemini__Model` | Default `gemini-flash-latest`. |
| `App__AccessToken` | Client token (`?k=` or `X-Access-Token`). Prefab: `secret123`. |
| `App__DailyBudgetUsd` | Daily spend cap, default `2`. |
| `App__TicketTtlMinutes` | Ticket TTL, default `15`. |
| `App__InboxVisibilityMinutes` | How long a finished review stays in the inbox, default `3`. |

## VRChat endpoints

Base URL in the prefab: `https://codesensei-d5zi.onrender.com`

### `GET /api/preset/{id}?k=secret123`

`id` = 1…24. Always HTTP 200:

```json
{"ok":true,"status":"explained","lines":["[1. Encapsulation]:","..."]}
```

Unknown id: `ok: true` and a “topic not set yet” line.

### `GET /api/inbox?room=metalab&k=secret123`

Does not dequeue. Returns finished reviews only:

```json
{"ok":true,"hasNew":true,"items":[{"code":"7K3MP","status":"completed","lines":["..."]}]}
```

Empty: `{"ok":true,"hasNew":false,"items":[]}`. Pending tickets are omitted (otherwise client B stops polling). A finished result stays in the inbox for 3 minutes after `completed`/`error`.

### Code-review flow

1. The VR terminal shows a 5-character code.
2. The student opens `/paste`, enters the code and a snippet.
3. `POST /api/code/submit` with `{ "code", "language", "ticketCode" }` → `{ "ok": true, "ticketId": "7K3MP" }`.
4. The terminal polls inbox every ~6 s until `items[].code` matches.

`POST /api/code/submit` does not require `k` (same as the live host). Other `/api/*` routes do.

## Other endpoints

- `POST /api/ask?k=` — same ticket creation, 202 `{ ticketId, status }`.
- `GET /api/inbox/{ticketId}?k=` or `?ticketId=` — `{ ticketId, status, result }`.
- `GET /paste` — HTML form with the terminal code field.
- `GET /` and `GET /health` — `{ "status": "running", "project": "CodeSensei", "commit": "..." }`.

Rate limit: 60 requests / min / IP. Daily LLM budget. Timeouts / 429 / 5xx do not crash the process. Submit requires a valid 5-character `ticketCode`.

## Deploy

1. `docker build -t codesensei-api .`
2. On Render set `Gemini__ApiKey` and `App__AccessToken=secret123`.
3. Local: `dotnet run --project src/WebApi`
4. Tests: `dotnet test`

Keep-alive YAML: `ops/keep-render-awake.yml` (paste into GitHub Actions UI if the PAT cannot push `.github/workflows`).
