# Integrating CodeSensei into NEXT-Study Metaverse / VRChat

Ukrainian: `docs/NEXT-INTEGRATION.md`

**Nomination II.** An NPC-style AI mentor in the department MetaLab.

## Team

| Member | Role |
| --- | --- |
| Mark Mamenko (Маменко Марк) | Backend / Team Lead |
| Sviatoslav Pavlenko (Павленко Святослав) | UdonSharp Developer |
| Denys Ilienko (Ільєнко Денис) | AI / Prompt Engineer |
| Kateryna Shozda (Шозда Катерина) | QA / C# Tester |
| Dmytro Poshytyniuk (Пошитнюк Дмитро) | Integration / VR Tester |

## Environment

Place the app in **MacPaw AI Lab / MetaLab** (KPI) on VRChat.

- Unity + **VRChat SDK3 Worlds** + **UdonSharp**
- Network **GET only** (`VRCStringDownloader`)
- Request interval ≥ **5.5 s**
- HTTPS in the prefab: `https://codesensei-d5zi.onrender.com`
- VRChat: **Settings → Security → Allow Untrusted URLs**
- Platforms: PC / PCVR

https://hello.vrchat.com/

## Import into NEXT / MetaLab

1. Open the MetaLab world in Unity (VRChat SDK3 + UdonSharp).
2. `Assets → Import Package → Custom Package…` → `client/CodeSensei.unitypackage`.
3. If Git scripts are newer, copy `client/Scripts/*.cs` over the imported files.
4. Drag `CodeSensei_Terminal` onto a workstation.
5. Set `Ticket Timeout Seconds = 180`.
6. Build & Upload.
7. Before a demo, open https://codesensei-d5zi.onrender.com/health.

Details: `client/README.md`. HTTP: `docs/api.md`.

## Live links

| Resource | URL |
| --- | --- |
| Submission repository | https://github.com/mamenkomarkus-creator/CodeSensei-NEXT |
| Presentation UK | `docs/presentation/CodeSensei-NEXT-UK.pdf` |
| Presentation EN | `docs/presentation/CodeSensei-NEXT-EN.pdf` |
| Demo /paste | https://codesensei-d5zi.onrender.com/paste |
| Health | https://codesensei-d5zi.onrender.com/health |
| NEXT | https://nextstudy.eu/ |

## Metaverse checks

1. Preset 1–24 → lines on the terminal.
2. Code review → 5-character ticket → `/paste` → mentor reply.
3. A second player sees the same synced answer.
