import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.CODESENSEI_ROOT || path.resolve(__dirname, "..");

const PURPLE = rgb(0.361, 0.247, 0.89);
const BLACK = rgb(0.07, 0.07, 0.09);
const MUTED = rgb(0.28, 0.28, 0.32);
const WHITE = rgb(1, 1, 1);

const copy = {
  en: {
    nomination: "Nomination I  —  Virtual university location",
    teamLine: "Team CodeSensei",
    university: "Igor Sikorsky Kyiv Polytechnic Institute",
    membersLabel: "Team members",
    members: [
      "Mark Mamenko, Kateryna Shozda, Denys Ilienko,",
      "Sviatoslav Pavlenko, Dmytro Poshytyniuk",
    ],
    faculty: "Igor Sikorsky KPI",
    role: "Role in the project",
    people1: [
      ["Mark Mamenko", "Team lead. Secure .NET proxy, Gemini mentor API, Render deployment."],
      ["Kateryna Shozda", "Learning design. 24 OOP presets and VR-sized mentor prompts."],
      ["Denys Ilienko", "Quality assurance. NUnit suite, HTTP contract, demo checklist."],
    ],
    people2: [
      ["Sviatoslav Pavlenko", "VRChat client. UdonSharp terminal, GET-only networking, prefab."],
      ["Dmytro Poshytyniuk", "World integration. MetaLab scene, VRChat SDK, placement in the lab."],
      ["Authorship", "Created artefacts remain the intellectual property of the team."],
    ],
    continued: "Continued on the next slide.",
    teamNote: "Five authors. Artefacts stay with the team.",
    locKicker: "SELECTED LOCATION",
    locName: "MacPaw AI Lab / MetaLab classroom",
    locUni: "Igor Sikorsky Kyiv Polytechnic Institute",
    locBody:
      "This is the university multimedia classroom modelled for the NEXT Metaverse: blue-and-white walls, herringbone floor, orange seminar seating, whiteboards and a lounge of bean-bags. The MacPaw AI Lab graphic on the end wall marks the space as a live digital-skills studio.",
    scopeKicker: "MODELLED SCOPE",
    scope: [
      "• Seminar rows and group tables",
      "• Informal bean-bag lounge",
      "• Whiteboard / critique zone",
      "• CodeSensei terminal at a workstation",
      "• Shared wall for OOP presets",
      "• Circulation to the adjacent bay",
    ],
    artNames: ["Classroom model", "Informal lounge", "CodeSensei station"],
    artCaps: [
      "Full 3D reconstruction of the KPI / MacPaw AI Lab for VRChat.",
      "Bean-bag zone for informal coaching and peer discussion.",
      "Digital artefact: UdonSharp terminal + Gemini mentor in this room.",
    ],
    tech: [
      ["Tools and software", "Unity, VRChat SDK3, UdonSharp, C# / .NET 10, ASP.NET, Docker, Render, Google Gemini, GitHub, NUnit."],
      ["Development process", "1) Capture the laboratory in 3D. 2) Align a GET-only VRChat contract. 3) Ship the mentor API and 24 OOP presets. 4) Package the terminal prefab for MetaLab."],
      ["VRChat integration", "VRCStringDownloader only. HTTPS host codesensei-d5zi.onrender.com. Players enable Allow Untrusted URLs. Requests respect the 5.5 s VRChat limit."],
      ["Technical challenges", "Udon cannot POST, so review uses a 5-character ticket + /paste + inbox. Pending tickets stay hidden. Render Free is woken via /health."],
    ],
    next: [
      ["Educational use", "In the NEXT-Study Metaverse students sit in this laboratory, open OOP presets or start a live code review. Teachers see the same synced answer on the shared terminal."],
      ["User experience", "Walk the seminar rows and lounge, press a preset, or generate a ticket, paste a snippet on the web form, and read a mentor reply wrapped to 55 characters for the VR screen."],
      ["Further development", "Place the prefab at a workstation in this mesh, persist tickets, add languages, and publish the VRChat world after MetaLab import."],
    ],
    demo: "Project demo",
    materials: "Project materials",
    extra: "Additional resources",
    matLines: [
      "GitHub: github.com/mamenkomarkus-creator/CodeSensei-NEXT",
      "Prefab: client/CodeSensei.unitypackage",
      "Docs: docs/SUBMISSION.md, docs/api.md, docs/NEXT-INTEGRATION.md",
    ],
    extraLines: [
      "VRChat: hello.vrchat.com     NEXT: nextstudy.eu",
      "Authorship of created artefacts remains with the team.",
    ],
  },
  uk: {
    nomination: "Номінація I  —  Віртуальна локація університету",
    teamLine: "Команда CodeSensei",
    university: "КПІ ім. Ігоря Сікорського",
    membersLabel: "Учасники команди",
    members: [
      "Маменко Марк, Шозда Катерина, Ільєнко Денис,",
      "Павленко Святослав, Пошитнюк Дмитро",
    ],
    faculty: "КПІ ім. Ігоря Сікорського",
    role: "Роль у проєкті",
    people1: [
      ["Маменко Марк", "Керівник. Безпечний .NET-проксі, Gemini API, деплой на Render."],
      ["Шозда Катерина", "Навчальний дизайн. 24 пресети ООП і промпти під VR-екран."],
      ["Ільєнко Денис", "Якість. NUnit, HTTP-контракт, чекліст демо."],
    ],
    people2: [
      ["Павленко Святослав", "Клієнт VRChat. UdonSharp-термінал, лише GET, префаб."],
      ["Пошитнюк Дмитро", "Інтеграція світу. Сцена MetaLab, VRChat SDK, розміщення."],
      ["Авторство", "Створені артефакти залишаються інтелектуальною власністю команди."],
    ],
    continued: "Продовження на наступному слайді.",
    teamNote: "П’ятеро авторів. Права на артефакти — за командою.",
    locKicker: "ОБРАНА ЛОКАЦІЯ",
    locName: "Аудиторія MacPaw AI Lab / MetaLab",
    locUni: "КПІ ім. Ігоря Сікорського",
    locBody:
      "Це мультимедійна аудиторія університету, змодельована для метавсесвіту NEXT: синьо-білі стіни, ялинкова підлога, помаранчеві семінарні місця, білі дошки і зона пуфів. Графіка MacPaw AI Lab на торцевій стіні позначає простір як студію цифрових навичок.",
    scopeKicker: "МЕЖІ МОДЕЛІ",
    scope: [
      "• Ряди семінарських столів",
      "• Неформальна зона з пуфами",
      "• Зона дошок / критики",
      "• Термінал CodeSensei на робочому місці",
      "• Спільна стіна пресетів ООП",
      "• Прохід до суміжного відсіку",
    ],
    artNames: ["Модель аудиторії", "Неформальна зона", "Станція CodeSensei"],
    artCaps: [
      "Повна 3D-реконструкція лабораторії KPI / MacPaw AI Lab для VRChat.",
      "Зона пуфів для неформального коучингу та обговорень.",
      "Цифровий артефакт: UdonSharp-термінал + ментор Gemini в цій залі.",
    ],
    tech: [
      ["Інструменти", "Unity, VRChat SDK3, UdonSharp, C# / .NET 10, ASP.NET, Docker, Render, Google Gemini, GitHub, NUnit."],
      ["Процес розробки", "1) Зняти лабораторію в 3D. 2) Вирівняти GET-only контракт VRChat. 3) Зібрати API ментора і 24 пресети ООП. 4) Запакувати префаб термінала для MetaLab."],
      ["Інтеграція VRChat", "Лише VRCStringDownloader. HTTPS-хост codesensei-d5zi.onrender.com. Гравці вмикають Allow Untrusted URLs. Запити не частіше ніж раз на 5.5 с."],
      ["Технічні виклики", "Udon не вміє POST, тому рев’ю йде через квиток з 5 символів + /paste + inbox. Pending не показуємо. Render Free будимо через /health."],
    ],
    next: [
      ["Освітнє використання", "У метавсесвіті NEXT-Study студенти сидять у цій лабораторії, відкривають пресети ООП або запускають живе код-рев’ю. Викладач бачить ту саму синхронізовану відповідь."],
      ["Досвід відвідувача", "Пройти ряди й зону пуфів, натиснути пресет або згенерувати код, вставити фрагмент на вебформі й прочитати відповідь ментора (до 55 символів у рядку VR-екрана)."],
      ["Подальший розвиток", "Поставити префаб на робоче місце в цій моделі, зберегти тікети, додати мови й опублікувати світ VRChat після імпорту в MetaLab."],
    ],
    demo: "Демо проєкту",
    materials: "Матеріали проєкту",
    extra: "Додаткові ресурси",
    matLines: [
      "GitHub: github.com/mamenkomarkus-creator/CodeSensei-NEXT",
      "Префаб: client/CodeSensei.unitypackage",
      "Документи: docs/SUBMISSION.md, docs/api.md, docs/NEXT-INTEGRATION.md",
    ],
    extraLines: [
      "VRChat: hello.vrchat.com     NEXT: nextstudy.eu",
      "Авторство створених артефактів залишається за командою.",
    ],
  },
};

function wrap(font, text, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) <= maxWidth) line = trial;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function cover(page, x, y, w, h, color = WHITE) {
  page.drawRectangle({ x, y, width: w, height: h, color });
}

function wipeBody(page) {
  cover(page, 12, 34, 936, 412, WHITE);
}

function drawLines(page, font, lines, { x, yTop, size, color, gap = 1.28, maxWidth }) {
  let y = yTop - size;
  for (const raw of lines) {
    const wrapped = wrap(font, raw, size, maxWidth ?? 800);
    for (const line of wrapped) {
      page.drawText(line, { x, y, size, font, color });
      y -= size * gap;
    }
  }
  return y;
}

function fitImage(page, img, x, y, w, h) {
  const scale = Math.min(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  page.drawImage(img, {
    x: x + (w - dw) / 2,
    y: y + (h - dh) / 2,
    width: dw,
    height: dh,
  });
}

async function build(lang, outFile) {
  const t = copy[lang];
  const templatePath = path.join(root, "docs/presentation/_next-template.pdf");
  const labDir = path.join(root, "docs/presentation/lab");
  const qrGitPath = path.join(root, "docs/presentation/qr-github.png");
  const qrPastePath = path.join(root, "docs/presentation/qr-paste.png");

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const template = await PDFDocument.load(fs.readFileSync(templatePath));
  const pages = await pdf.copyPages(template, template.getPageIndices());
  pages.forEach((p) => pdf.addPage(p));
  const [teamClone] = await pdf.copyPages(pdf, [1]);
  pdf.insertPage(2, teamClone);

  const arial = await pdf.embedFont(fs.readFileSync("/System/Library/Fonts/Supplemental/Arial.ttf"));
  const arialBd = await pdf.embedFont(fs.readFileSync("/System/Library/Fonts/Supplemental/Arial Bold.ttf"));
  const imgs = [
    await pdf.embedJpg(fs.readFileSync(path.join(labDir, "01-overview.jpg"))),
    await pdf.embedJpg(fs.readFileSync(path.join(labDir, "02-lounge.jpg"))),
    await pdf.embedJpg(fs.readFileSync(path.join(labDir, "03-adjacent-bay.jpg"))),
    await pdf.embedJpg(fs.readFileSync(path.join(labDir, "04-seminar.jpg"))),
  ];
  const qrGit = await pdf.embedPng(fs.readFileSync(qrGitPath));
  const qrPaste = await pdf.embedPng(fs.readFileSync(qrPastePath));

  const p0 = pdf.getPage(0);
  cover(p0, 22, 20, 640, 410);
  p0.drawText("CodeSensei", { x: 26, y: 390, size: 36, font: arialBd, color: PURPLE });
  p0.drawText(t.nomination, { x: 26, y: 348, size: lang === "uk" ? 14 : 16, font: arialBd, color: BLACK });
  p0.drawText(t.teamLine, { x: 26, y: 312, size: 18, font: arial, color: BLACK });
  p0.drawText(t.university, { x: 26, y: 288, size: 14, font: arial, color: MUTED });
  p0.drawText(t.membersLabel, { x: 26, y: 248, size: 16, font: arialBd, color: BLACK });
  drawLines(p0, arial, t.members, { x: 26, yTop: 238, size: 14, color: BLACK, maxWidth: 560 });

  function teamCard(page, x, name, role) {
    cover(page, x, 46, 250, 230);
    page.drawText(name, { x: x + 8, y: 240, size: 12, font: arialBd, color: BLACK });
    page.drawText(t.faculty, { x: x + 8, y: 222, size: 10, font: arial, color: MUTED });
    page.drawText(t.role, { x: x + 8, y: 196, size: 11, font: arialBd, color: BLACK });
    drawLines(page, arial, [role], { x: x + 8, yTop: 184, size: 11, color: BLACK, maxWidth: 232, gap: 1.3 });
  }
  const teamTitle = lang === "uk" ? "Наша команда" : "Our Team";
  function setTitle(page, title) {
    cover(page, 16, 448, 640, 90, WHITE);
    page.drawText(title, { x: 26, y: 505, size: 28, font: arialBd, color: PURPLE });
  }
  function setPageNo(page, n) {
    cover(page, 868, 6, 82, 26, WHITE);
    const s = String(n);
    const w = arial.widthOfTextAtSize(s, 10);
    page.drawText(s, { x: 938 - w, y: 16, size: 10, font: arial, color: MUTED });
  }

  const p1 = pdf.getPage(1);
  wipeBody(p1);
  setTitle(p1, teamTitle);
  cover(p1, 24, 14, 540, 28);
  teamCard(p1, 54, t.people1[0][0], t.people1[0][1]);
  teamCard(p1, 354, t.people1[1][0], t.people1[1][1]);
  teamCard(p1, 654, t.people1[2][0], t.people1[2][1]);
  p1.drawText(t.continued, { x: 26, y: 22, size: 10, font: arial, color: MUTED });

  const p2 = pdf.getPage(2);
  wipeBody(p2);
  setTitle(p2, teamTitle);
  teamCard(p2, 54, t.people2[0][0], t.people2[0][1]);
  teamCard(p2, 354, t.people2[1][0], t.people2[1][1]);
  teamCard(p2, 654, t.people2[2][0], t.people2[2][1]);
  cover(p2, 24, 14, 640, 28);
  p2.drawText(t.teamNote, { x: 26, y: 22, size: 10, font: arial, color: MUTED });

  const p3 = pdf.getPage(3);
  wipeBody(p3);
  p3.drawText(t.locKicker, { x: 48, y: 410, size: 11, font: arialBd, color: PURPLE });
  p3.drawText(t.locName, { x: 48, y: 386, size: lang === "uk" ? 14 : 16, font: arialBd, color: BLACK });
  p3.drawText(t.locUni, { x: 48, y: 368, size: 11, font: arial, color: MUTED });
  drawLines(p3, arial, [t.locBody], { x: 48, yTop: 350, size: 12, color: BLACK, maxWidth: 400, gap: 1.35 });
  p3.drawText(t.scopeKicker, { x: 500, y: 410, size: 11, font: arialBd, color: PURPLE });
  drawLines(p3, arial, t.scope, { x: 500, yTop: 392, size: 12, color: BLACK, maxWidth: 400, gap: 1.45 });

  const p4 = pdf.getPage(4);
  wipeBody(p4);
  fitImage(p4, imgs[0], 28, 42, 560, 370);
  fitImage(p4, imgs[1], 600, 220, 328, 192);
  fitImage(p4, imgs[3], 600, 42, 328, 168);

  const p5 = pdf.getPage(5);
  wipeBody(p5);
  fitImage(p5, imgs[2], 28, 42, 450, 370);
  fitImage(p5, imgs[3], 490, 42, 440, 370);

  const p6 = pdf.getPage(6);
  wipeBody(p6);
  p6.drawText(t.artNames[0], { x: 34, y: 404, size: 13, font: arialBd, color: BLACK });
  p6.drawText(t.artNames[1], { x: 352, y: 404, size: 13, font: arialBd, color: BLACK });
  p6.drawText(t.artNames[2], { x: 670, y: 404, size: 13, font: arialBd, color: BLACK });
  fitImage(p6, imgs[0], 18, 136, 292, 252);
  fitImage(p6, imgs[1], 332, 136, 292, 252);
  fitImage(p6, imgs[2], 648, 136, 292, 252);
  drawLines(p6, arial, [t.artCaps[0]], { x: 20, yTop: 100, size: 9, color: BLACK, maxWidth: 288, gap: 1.25 });
  drawLines(p6, arial, [t.artCaps[1]], { x: 336, yTop: 100, size: 9, color: BLACK, maxWidth: 288, gap: 1.25 });
  drawLines(p6, arial, [t.artCaps[2]], { x: 652, yTop: 100, size: 9, color: BLACK, maxWidth: 288, gap: 1.25 });

  const p7 = pdf.getPage(7);
  wipeBody(p7);
  let y = 420;
  for (const [title, body] of t.tech) {
    p7.drawText(title, { x: 36, y, size: 13, font: arialBd, color: PURPLE });
    y = drawLines(p7, arial, [body], { x: 36, yTop: y - 4, size: 11, color: BLACK, maxWidth: 880, gap: 1.28 }) - 10;
  }

  const p8 = pdf.getPage(8);
  wipeBody(p8);
  y = 420;
  for (const [title, body] of t.next) {
    p8.drawText(title, { x: 36, y, size: 13, font: arialBd, color: PURPLE });
    y = drawLines(p8, arial, [body], { x: 36, yTop: y - 4, size: 12, color: BLACK, maxWidth: 880, gap: 1.3 }) - 14;
  }

  const p9 = pdf.getPage(9);
  wipeBody(p9);
  p9.drawText(t.demo, { x: 36, y: 410, size: 13, font: arialBd, color: PURPLE });
  drawLines(p9, arial, ["https://codesensei-d5zi.onrender.com/paste", "https://codesensei-d5zi.onrender.com/health"], {
    x: 36,
    yTop: 398,
    size: 12,
    color: BLACK,
    maxWidth: 620,
  });
  p9.drawText(t.materials, { x: 36, y: 320, size: 13, font: arialBd, color: PURPLE });
  drawLines(p9, arial, t.matLines, { x: 36, yTop: 308, size: 12, color: BLACK, maxWidth: 620, gap: 1.32 });
  p9.drawText(t.extra, { x: 36, y: 210, size: 13, font: arialBd, color: PURPLE });
  drawLines(p9, arial, t.extraLines, { x: 36, yTop: 198, size: 12, color: BLACK, maxWidth: 620, gap: 1.32 });
  p9.drawImage(qrGit, { x: 700, y: 250, width: 88, height: 88 });
  p9.drawText("GitHub", { x: 722, y: 236, size: 9, font: arial, color: MUTED });
  p9.drawImage(qrPaste, { x: 810, y: 250, width: 88, height: 88 });
  p9.drawText("Demo", { x: 836, y: 236, size: 9, font: arial, color: MUTED });
  fitImage(p9, imgs[0], 700, 58, 198, 160);

  if (lang === "uk") {
    const p10 = pdf.getPage(10);
    cover(p10, 220, 220, 520, 140, WHITE);
    p10.drawText("Дякуємо!", { x: 360, y: 310, size: 36, font: arialBd, color: PURPLE });
    p10.drawText("Питання?", { x: 390, y: 262, size: 24, font: arial, color: PURPLE });
  }

  for (let i = 1; i < pdf.getPageCount(); i++) setPageNo(pdf.getPage(i), i + 1);

  fs.writeFileSync(outFile, await pdf.save());
  console.log("wrote", outFile, fs.statSync(outFile).size);
}

const lang = process.argv[2] || "both";
const outDir = path.join(root, "docs/presentation");
if (lang === "en" || lang === "both") await build("en", path.join(outDir, "CodeSensei-NEXT-EN.pdf"));
if (lang === "uk" || lang === "both") await build("uk", path.join(outDir, "CodeSensei-NEXT-UK.pdf"));
