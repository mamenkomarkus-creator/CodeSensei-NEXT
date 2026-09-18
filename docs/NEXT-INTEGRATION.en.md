# Integrating CodeSensei into NEXT-Study Metaverse / VRChat

Created artefacts remain the intellectual property of the team. Erasmus+ NEXT may use them for education.

## Team

| Member | Role |
| --- | --- |
| Mark Mamenko (Маменко Марк) | Team lead, backend (.NET, Gemini, Render) |
| Kateryna Shozda (Шозда Катерина) | Learning design, OOP presets, mentor prompts |
| Denys Ilienko (Ільєнко Денис) | QA, tests, API contract, demo checklist |
| Sviatoslav Pavlenko (Павленко Святослав) | VRChat client, UdonSharp, terminal prefab |
| Dmytro Poshytyniuk (Пошитнюк Дмитро) | MetaLab world, VRChat SDK, placement |

## Location

3D reconstruction of the **MacPaw AI Lab / MetaLab** classroom at Igor Sikorsky KPI. Photos: `docs/presentation/lab/`.

- Unity + **VRChat SDK3 Worlds** + **UdonSharp**
- Network **GET only** (`VRCStringDownloader`) — Udon cannot POST
- Request interval ≥ **5.5 s**
- HTTPS baked into the prefab: `https://codesensei-d5zi.onrender.com`
- VRChat client: **Settings → Security → Allow Untrusted URLs**
- Platforms: PC / PCVR. Quest depends on the MetaLab world

https://hello.vrchat.com/

## Import into NEXT / MetaLab

1. Open the MetaLab world in Unity (VRChat SDK3 + UdonSharp).
2. `Assets → Import Package → Custom Package…` → `client/CodeSensei.unitypackage`.
3. If Git scripts are newer, copy `client/Scripts/*.cs` over the imported files.
4. Drag `CodeSensei_Terminal` onto a workstation in the classroom.
5. Set `Ticket Timeout Seconds = 180`.
6. Build & Upload.
7. Before a demo, open https://codesensei-d5zi.onrender.com/health to wake Render.

Details: `client/README.md`. HTTP contract: `docs/api.md`.

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
2. Code review → 5-character ticket → `/paste` → mentor reply on screen.
3. A second player sees the same synced answer.
