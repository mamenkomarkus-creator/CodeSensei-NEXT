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
const CARD = rgb(0.97, 0.97, 0.99);

const copy = {
  en: {
    title: "CodeSensei",
    subtitle: "Interactive AI Mentor for a Metaverse Laboratory",
    nomination: "Nomination II  —  Interactive AI application",
    teamLine: "Team CodeSensei",
    university: "Igor Sikorsky Kyiv Polytechnic Institute",
    membersLabel: "Team members",
    members: [
      "Mark Mamenko, Sviatoslav Pavlenko, Denys Ilienko,",
      "Kateryna Shozda, Dmytro Poshytyniuk",
    ],
    faculty: "Igor Sikorsky KPI",
    role: "Role in the project",
    people1: [
      ["Mark Mamenko", "Backend / Team Lead. Clean Architecture, memory-aware .NET proxy, Gemini LLM integration."],
      ["Sviatoslav Pavlenko", "UdonSharp Developer. Interactive terminal UI and GET-only VRChat networking."],
      ["Denys Ilienko", "AI / Prompt Engineer. System prompts and OOP context so answers stay useful in VR."],
    ],
    people2: [
      ["Kateryna Shozda", "QA / C# Tester. NUnit suite (AAA), parsing logic and backend stability."],
      ["Dmytro Poshytyniuk", "Integration / VR Tester. Prefab assembly in Unity and HTTP checks inside VRChat."],
    ],
    workflowTitle: "How we work",
    workflow:
      "Agile team of five. Unity client and .NET API in parallel, synced over Git. Cross-platform stack (Rider, macOS).",
    ideaTitle: "Idea and goal",
    ideaKicker: "THE PROBLEM",
    ideaName: "No mentor in the VR lab",
    ideaUni: "Department MetaLab on VRChat  ·  NEXT-Study Metaverse",
    ideaBody:
      "CodeSensei is an NPC-style AI assistant at a virtual terminal. Students get OOP explanations, help writing code, and instant feedback without leaving VR — a stand-in for a consulting teacher during remote practice.",
    goalsKicker: "PROJECT GOALS",
    goals: [
      "• UdonSharp (C#) client inside VRChat",
      "• Secure .NET proxy to the LLM API",
      "• Presence of a teacher in MetaLab",
      "• Clean Architecture + DDD for later scale",
      "• Unity package any NEXT world can import",
    ],
    locTitle: "Selected Location",
    locKicker: "HOST ENVIRONMENT",
    locName: "MacPaw AI Lab / MetaLab classroom",
    locUni: "Igor Sikorsky Kyiv Polytechnic Institute",
    locBody:
      "The application lives in the department’s virtual laboratory on VRChat: seminar rows, critique boards and an informal lounge. The terminal sits at a workstation so the mentor is present in the same room as the class.",
    scopeKicker: "WHAT VISITORS DO",
    scope: [
      "• Open one of 24 OOP presets",
      "• Start a live code review",
      "• Paste a snippet via /paste",
      "• Read the mentor on the VR screen",
      "• Share the same synced answer",
    ],
    modelTitle: "Application in MetaLab",
    artTitle: "Digital Artefacts",
    artNames: ["UdonSharp terminal", "Paste + ticket flow", "Clean Architecture API"],
    artCaps: [
      "Unity prefab: UI terminal, presets and GET-only VRCStringDownloader for VRChat SDK3.",
      "Five-character ticket, public /paste form, inbox the prefab already polls.",
      "Protected .NET proxy to Gemini. Keys never enter the game client. NUnit on the domain.",
    ],
    tech: [
      ["Tools and software", ".NET (C#) Clean Architecture proxy · UdonSharp / VRChat SDK3 · Unity prefab · Google Gemini (LLM analog of OpenAI API) · System.Text.Json · NUnit (AAA) · Docker / Render · Git."],
      ["Development process", "1) Split Unity client and API. 2) Lock a GET-only VRChat contract. 3) Isolate the LLM behind prompts and a proxy. 4) Cover the backend with NUnit. 5) Ship CodeSensei.unitypackage for MetaLab."],
      ["VRChat integration", "HTTPS host codesensei-d5zi.onrender.com. VRCStringDownloader only (Udon cannot POST). Allow Untrusted URLs. Polling ≥ 5.5 s. Ticket + /paste + inbox for reviews."],
      ["Technical challenges", "POST is impossible from Udon, so reviews use a 5-character ticket. Pending tickets stay out of the inbox. Render Free is woken via /health. Answers wrap to 55 characters for the VR screen."],
    ],
    next: [
      ["Educational use", "In NEXT-Study Metaverse a student stands at the MetaLab terminal, opens an OOP topic or submits a snippet, and receives mentor feedback as if a consulting teacher were in the room. The same text is synced for the group."],
      ["User experience", "Walk the laboratory, press a preset, or generate a ticket, paste code on the web form, and read a formatted reply on the shared VR terminal. Keys never leave the server."],
      ["Further development", "Drop the prefab into other NEXT worlds, persist tickets, swap the LLM provider (architecture already isolates it), add languages, and keep the NUnit safety net."],
    ],
    demo: "Project demo",
    materials: "Project materials",
    extra: "Additional resources",
    matLines: [
      "GitHub: github.com/mamenkomarkus-creator/CodeSensei-NEXT",
      "Prefab: client/CodeSensei.unitypackage",
      "Docs: docs/SUBMISSION.md · docs/api.md · docs/NEXT-INTEGRATION.md",
    ],
    extraLines: [
      "VRChat: hello.vrchat.com     NEXT: nextstudy.eu",
      "Live API: codesensei-d5zi.onrender.com/paste",
    ],
  },
  uk: {
    title: "CodeSensei",
    subtitle: "Інтерактивний AI-ментор для Metaverse-лабораторії",
    nomination: "Номінація II  —  Інтерактивний ШІ-застосунок",
    teamLine: "Команда CodeSensei",
    university: "КПІ ім. Ігоря Сікорського",
    membersLabel: "Учасники команди",
    members: [
      "Маменко Марк, Павленко Святослав, Ільєнко Денис,",
      "Шозда Катерина, Пошитнюк Дмитро",
    ],
    faculty: "КПІ ім. Ігоря Сікорського",
    role: "Роль у проєкті",
    people1: [
      ["Маменко Марк", "Backend / Team Lead. Clean Architecture, оптимізація .NET-проксі, інтеграція Gemini."],
      ["Павленко Святослав", "UdonSharp Developer. Інтерактивний UI-термінал і GET-only мережа VRChat."],
      ["Ільєнко Денис", "AI / Prompt Engineer. Системні промпти й контекст ООП для відповідей у VR."],
    ],
    people2: [
      ["Шозда Катерина", "QA / C# Tester. NUnit (AAA), логіка парсингу та стабільність бекенду."],
      ["Пошитнюк Дмитро", "Integration / VR Tester. Збірка префаба в Unity та перевірка HTTP у VRChat."],
    ],
    workflowTitle: "Як працюємо",
    workflow:
      "Agile-команда з п’яти осіб. Клієнт Unity і API .NET паралельно, синхрон через Git. Кросплатформний стек (Rider, macOS).",
    ideaTitle: "Ідея та мета",
    ideaKicker: "ПРОБЛЕМА",
    ideaName: "Немає ментора в VR-лабораторії",
    ideaUni: "Віртуальна лабораторія кафедри (MetaLab)  ·  метавсесвіт NEXT-Study",
    ideaBody:
      "CodeSensei — ШІ-асистент у вигляді NPC біля віртуального термінала. Студенти отримують пояснення ООП, допомогу в коді та миттєвий зворотний зв’язок, не виходячи з VR — ефект присутності викладача-консультанта під час дистанційної практики.",
    goalsKicker: "МЕТА ПРОЄКТУ",
    goals: [
      "• Клієнт UdonSharp (C#) всередині VRChat",
      "• Захищений .NET-проксі до LLM API",
      "• Присутність викладача в MetaLab",
      "• Clean Architecture + DDD для масштабу",
      "• Unity-пакет, який імпортує будь-який світ NEXT",
    ],
    locTitle: "Обрана локація",
    locKicker: "СЕРЕДОВИЩЕ",
    locName: "Аудиторія MacPaw AI Lab / MetaLab",
    locUni: "КПІ ім. Ігоря Сікорського",
    locBody:
      "Застосунок живе у віртуальній лабораторії кафедри на VRChat: семінарські ряди, дошки критики, неформальна зона. Термінал стоїть на робочому місці, тож ментор присутній у тій самій залі, що й група.",
    scopeKicker: "ЩО РОБИТЬ ВІДВІДУВАЧ",
    scope: [
      "• Відкрити один із 24 пресетів ООП",
      "• Запустити живе код-рев’ю",
      "• Вставити фрагмент через /paste",
      "• Прочитати ментора на VR-екрані",
      "• Бачити ту саму синхронізовану відповідь",
    ],
    modelTitle: "Застосунок у MetaLab",
    artTitle: "Цифрові артефакти",
    artNames: ["UdonSharp-термінал", "Потік /paste + квиток", "API Clean Architecture"],
    artCaps: [
      "Unity-префаб: UI-термінал, пресети і лише GET через VRCStringDownloader для VRChat SDK3.",
      "Квиток з 5 символів, публічна форма /paste, inbox, який уже опитує префаб.",
      "Захищений .NET-проксі до Gemini. Ключі не потрапляють у клієнт гри. NUnit на домені.",
    ],
    tech: [
      ["Інструменти", ".NET (C#) проксі за Clean Architecture · UdonSharp / VRChat SDK3 · Unity-префаб · Google Gemini (аналог OpenAI API) · System.Text.Json · NUnit (AAA) · Docker / Render · Git."],
      ["Процес розробки", "1) Розділити клієнт Unity і API. 2) Зафіксувати GET-only контракт VRChat. 3) Ізолювати LLM за промптами й проксі. 4) Покрити бекенд NUnit. 5) Віддати CodeSensei.unitypackage для MetaLab."],
      ["Інтеграція VRChat", "HTTPS-хост codesensei-d5zi.onrender.com. Лише VRCStringDownloader (Udon не вміє POST). Allow Untrusted URLs. Опитування ≥ 5.5 с. Рев’ю: квиток + /paste + inbox."],
      ["Технічні виклики", "POST з Udon неможливий, тому рев’ю йде через 5-символьний квиток. Pending не показуємо в inbox. Render Free будимо через /health. Відповіді — до 55 символів на рядок VR-екрана."],
    ],
    next: [
      ["Освітнє використання", "У метавсесвіті NEXT-Study студент підходить до термінала MetaLab, відкриває тему ООП або надсилає фрагмент і отримує зворотний зв’язок ментора — як від викладача-консультанта в залі. Текст синхронізується для групи."],
      ["Досвід відвідувача", "Пройти лабораторію, натиснути пресет або згенерувати квиток, вставити код на вебформі й прочитати відповідь на спільному VR-терміналі. Ключі лишаються на сервері."],
      ["Подальший розвиток", "Поставити префаб в інші світи NEXT, зберегти тікети, змінити LLM-провайдера (архітектура вже ізолює його), додати мови й тримати сітку NUnit."],
    ],
    demo: "Демо проєкту",
    materials: "Матеріали проєкту",
    extra: "Додаткові ресурси",
    matLines: [
      "GitHub: github.com/mamenkomarkus-creator/CodeSensei-NEXT",
      "Префаб: client/CodeSensei.unitypackage",
      "Документи: docs/SUBMISSION.md · docs/api.md · docs/NEXT-INTEGRATION.md",
    ],
    extraLines: [
      "VRChat: hello.vrchat.com     NEXT: nextstudy.eu",
      "Живе API: codesensei-d5zi.onrender.com/paste",
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
  const pastePath = path.join(root, "docs/presentation/paste-demo.png");

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
  const pasteImg = await pdf.embedPng(fs.readFileSync(pastePath));
  const qrGit = await pdf.embedPng(fs.readFileSync(qrGitPath));
  const qrPaste = await pdf.embedPng(fs.readFileSync(qrPastePath));

  function setTitle(page, title) {
    cover(page, 16, 448, 760, 90, WHITE);
    const size = arialBd.widthOfTextAtSize(title, 26) > 700 ? 20 : 26;
    page.drawText(title, { x: 26, y: 505, size, font: arialBd, color: PURPLE });
  }
  function setPageNo(page, n) {
    cover(page, 868, 6, 82, 26, WHITE);
    const s = String(n);
    const w = arial.widthOfTextAtSize(s, 10);
    page.drawText(s, { x: 938 - w, y: 16, size: 10, font: arial, color: MUTED });
  }
  function teamCard(page, x, name, role) {
    page.drawRectangle({ x, y: 46, width: 250, height: 230, color: CARD });
    page.drawRectangle({ x, y: 46, width: 5, height: 230, color: PURPLE });
    page.drawText(name, { x: x + 16, y: 240, size: 12, font: arialBd, color: BLACK });
    page.drawText(t.faculty, { x: x + 16, y: 222, size: 10, font: arial, color: MUTED });
    page.drawText(t.role, { x: x + 16, y: 196, size: 11, font: arialBd, color: BLACK });
    drawLines(page, arial, [role], { x: x + 16, yTop: 184, size: 11, color: BLACK, maxWidth: 220, gap: 1.3 });
  }
  function infoCard(page, x, title, body) {
    page.drawRectangle({ x, y: 46, width: 250, height: 230, color: CARD });
    page.drawRectangle({ x, y: 46, width: 5, height: 230, color: PURPLE });
    page.drawText(title, { x: x + 16, y: 240, size: 12, font: arialBd, color: BLACK });
    drawLines(page, arial, [body], { x: x + 16, yTop: 214, size: 11, color: BLACK, maxWidth: 220, gap: 1.3 });
  }

  const p0 = pdf.getPage(0);
  cover(p0, 22, 20, 640, 410);
  p0.drawText(t.title, { x: 26, y: 392, size: 36, font: arialBd, color: PURPLE });
  drawLines(p0, arial, [t.subtitle], { x: 26, yTop: 372, size: 13, color: MUTED, maxWidth: 560, gap: 1.25 });
  p0.drawText(t.nomination, { x: 26, y: 318, size: lang === "uk" ? 13 : 15, font: arialBd, color: BLACK });
  p0.drawText(t.teamLine, { x: 26, y: 286, size: 16, font: arial, color: BLACK });
  p0.drawText(t.university, { x: 26, y: 264, size: 13, font: arial, color: MUTED });
  p0.drawText(t.membersLabel, { x: 26, y: 226, size: 15, font: arialBd, color: BLACK });
  drawLines(p0, arial, t.members, { x: 26, yTop: 216, size: 13, color: BLACK, maxWidth: 560 });

  const p1 = pdf.getPage(1);
  wipeBody(p1);
  setTitle(p1, lang === "uk" ? "Наша команда" : "Our Team");
  teamCard(p1, 54, t.people1[0][0], t.people1[0][1]);
  teamCard(p1, 354, t.people1[1][0], t.people1[1][1]);
  teamCard(p1, 654, t.people1[2][0], t.people1[2][1]);
  cover(p1, 10, 6, 850, 38, WHITE);

  const p2 = pdf.getPage(2);
  wipeBody(p2);
  setTitle(p2, lang === "uk" ? "Наша команда" : "Our Team");
  teamCard(p2, 54, t.people2[0][0], t.people2[0][1]);
  teamCard(p2, 354, t.people2[1][0], t.people2[1][1]);
  infoCard(p2, 654, t.workflowTitle, t.workflow);
  cover(p2, 10, 6, 850, 38, WHITE);

  const p3 = pdf.getPage(3);
  wipeBody(p3);
  setTitle(p3, t.ideaTitle);
  p3.drawText(t.ideaKicker, { x: 48, y: 410, size: 11, font: arialBd, color: PURPLE });
  p3.drawText(t.ideaName, { x: 48, y: 386, size: lang === "uk" ? 14 : 16, font: arialBd, color: BLACK });
  p3.drawText(t.ideaUni, { x: 48, y: 368, size: 10, font: arial, color: MUTED });
  drawLines(p3, arial, [t.ideaBody], { x: 48, yTop: 348, size: 12, color: BLACK, maxWidth: 400, gap: 1.35 });
  p3.drawText(t.goalsKicker, { x: 500, y: 410, size: 11, font: arialBd, color: PURPLE });
  drawLines(p3, arial, t.goals, { x: 500, yTop: 392, size: 12, color: BLACK, maxWidth: 400, gap: 1.45 });

  const p4 = pdf.getPage(4);
  wipeBody(p4);
  setTitle(p4, t.locTitle);
  p4.drawText(t.locName, { x: 36, y: 420, size: 12, font: arialBd, color: BLACK });
  drawLines(p4, arial, [t.locBody], { x: 36, yTop: 414, size: 10, color: MUTED, maxWidth: 900, gap: 1.2 });
  fitImage(p4, imgs[0], 28, 42, 560, 318);
  fitImage(p4, imgs[1], 600, 206, 328, 154);
  fitImage(p4, imgs[3], 600, 42, 328, 154);

  const p5 = pdf.getPage(5);
  wipeBody(p5);
  setTitle(p5, t.modelTitle);
  fitImage(p5, imgs[2], 28, 42, 450, 370);
  fitImage(p5, imgs[3], 490, 42, 440, 370);

  const p6 = pdf.getPage(6);
  wipeBody(p6);
  setTitle(p6, t.artTitle);
  p6.drawText(t.artNames[0], { x: 34, y: 404, size: 12, font: arialBd, color: BLACK });
  p6.drawText(t.artNames[1], { x: 352, y: 404, size: 12, font: arialBd, color: BLACK });
  p6.drawText(t.artNames[2], { x: 670, y: 404, size: 12, font: arialBd, color: BLACK });
  fitImage(p6, imgs[0], 18, 136, 292, 252);
  fitImage(p6, pasteImg, 332, 136, 292, 252);
  fitImage(p6, imgs[2], 648, 136, 292, 252);
  drawLines(p6, arial, [t.artCaps[0]], { x: 20, yTop: 128, size: 9, color: BLACK, maxWidth: 288, gap: 1.22 });
  drawLines(p6, arial, [t.artCaps[1]], { x: 336, yTop: 128, size: 9, color: BLACK, maxWidth: 288, gap: 1.22 });
  drawLines(p6, arial, [t.artCaps[2]], { x: 652, yTop: 128, size: 9, color: BLACK, maxWidth: 288, gap: 1.22 });

  const p7 = pdf.getPage(7);
  wipeBody(p7);
  setTitle(p7, lang === "uk" ? "Технічна реалізація" : "Technical Implementation");
  let y = 420;
  for (const [title, body] of t.tech) {
    p7.drawText(title, { x: 36, y, size: 13, font: arialBd, color: PURPLE });
    y = drawLines(p7, arial, [body], { x: 36, yTop: y - 4, size: 11, color: BLACK, maxWidth: 880, gap: 1.28 }) - 10;
  }

  const p8 = pdf.getPage(8);
  wipeBody(p8);
  setTitle(p8, lang === "uk" ? "Інтеграція в метавсесвіт NEXT-Study" : "Integration into NEXT-Study Metaverse");
  y = 420;
  for (const [title, body] of t.next) {
    p8.drawText(title, { x: 36, y, size: 13, font: arialBd, color: PURPLE });
    y = drawLines(p8, arial, [body], { x: 36, yTop: y - 4, size: 12, color: BLACK, maxWidth: 880, gap: 1.3 }) - 14;
  }

  const p9 = pdf.getPage(9);
  wipeBody(p9);
  setTitle(p9, lang === "uk" ? "Демо та матеріали проєкту" : "Demo and Project Materials");
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
  fitImage(p9, pasteImg, 700, 48, 198, 170);

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
