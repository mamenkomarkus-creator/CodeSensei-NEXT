# Integrating CodeSensei into the NEXT-Study Metaverse / VRChat

Ukrainian: [NEXT-INTEGRATION.md](NEXT-INTEGRATION.md)

Nomination II. An NPC-style AI mentor in the department MetaLab.  
Team lead: Denys Ilienko.

## Team

| Member | Role |
| --- | --- |
| Denys Ilienko | Team Lead · AI & Prompt Engineer |
| Mark Mamenko | Backend |
| Sviatoslav Pavlenko | UdonSharp Developer |
| Kateryna Shozda | QA / C# Tester |
| Dmytro Poshytyniuk | Integration / VR Tester |

## Platform

Place the prefab in the **MacPaw AI Lab / MetaLab** classroom (Igor Sikorsky KPI) on VRChat.

- Unity + VRChat SDK3 Worlds + UdonSharp
- GET only (`VRCStringDownloader`) — Udon cannot POST
- Request interval ≥ 5.5 s
- HTTPS baked into the prefab: `https://codesensei-d5zi.onrender.com`
- VRChat client: **Settings → Security → Allow Untrusted URLs**
- Full experience: PC / PCVR

https://hello.vrchat.com/

## Import into MetaLab

1. Open the MetaLab world in Unity (VRChat SDK3 + UdonSharp).
2. **Assets → Import Package → Custom Package…** → `client/CodeSensei.unitypackage`.
3. If Git scripts are newer, copy `client/Scripts/*.cs` over the imported files.
4. Drag `CodeSensei_Terminal` onto a workstation.
5. Set **Ticket Timeout Seconds = 180**.
6. Build and upload the world.
7. Before a demo, open https://codesensei-d5zi.onrender.com/health.

Details: [../client/README.md](../client/README.md). HTTP: [api.en.md](api.en.md).

## Checks

1. Preset 1–24 prints lines on the terminal.
2. Code review: five-character ticket → `/paste` → mentor reply.
3. A second player sees the same synced text.

## Links

| Resource | URL |
| --- | --- |
| Repository | https://github.com/mamenkomarkus-creator/CodeSensei-NEXT |
| Presentation UK | `docs/presentation/CodeSensei-NEXT-UK.pdf` |
| Presentation EN | `docs/presentation/CodeSensei-NEXT-EN.pdf` |
| Demo | https://codesensei-d5zi.onrender.com/paste |
| Health | https://codesensei-d5zi.onrender.com/health |
| NEXT | https://nextstudy.eu/ |
