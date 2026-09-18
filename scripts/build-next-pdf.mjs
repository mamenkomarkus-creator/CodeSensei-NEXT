import fs from "node:fs";
import path from "node:path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import sharp from "sharp";

const PURPLE = rgb(0.361, 0.247, 0.89);
const BLACK = rgb(0.07, 0.07, 0.09);
const MUTED = rgb(0.28, 0.28, 0.32);
const WHITE = rgb(1, 1, 1);
const CARD = rgb(0.98, 0.98, 0.99);

const photos = [
  "/Users/markmamenko/.cursor/projects/Users-markmamenko-Projects-CodeSensei/assets/photo_2026-09-18_23.48.57-ddcc369a-f28c-411c-a6ec-0386843a37da.jpg",
  "/Users/markmamenko/.cursor/projects/Users-markmamenko-Projects-CodeSensei/assets/photo_2026-09-18_23.49.10-514ff403-8cc6-4abb-9c30-f81d42860549.jpg",
  "/Users/markmamenko/.cursor/projects/Users-markmamenko-Projects-CodeSensei/assets/photo_2026-09-18_23.49.02-500e8e13-2543-4361-af73-176544c4db1d.jpg",
  "/Users/markmamenko/.cursor/projects/Users-markmamenko-Projects-CodeSensei/assets/photo_2026-09-18_23.49.05-1f6e2cc3-cf05-4d91-bc0d-a97d64c71e46.jpg",
];

async function cropLab(src, dest) {
  const meta = await sharp(src).metadata();
  const left = 72;
  const top = 78;
  const right = 56;
  const bottom = 82;
  const width = meta.width - left - right;
  const height = meta.height - top - bottom;
  await sharp(src)
    .extract({ left, top, width, height })
    .jpeg({ quality: 92 })
    .toFile(dest);
}

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

const outPdf = process.argv[2] || "/tmp/next-pdf/CodeSensei-NEXT.pdf";
const cropDir = "/tmp/lab-crops";
fs.mkdirSync(cropDir, { recursive: true });

const cropped = [];
for (let i = 0; i < photos.length; i++) {
  const dest = path.join(cropDir, `clean${i + 1}.jpg`);
  await cropLab(photos[i], dest);
  cropped.push(dest);
}

const template = await PDFDocument.load(fs.readFileSync("/tmp/next-template/template.pdf"));
const pdf = await PDFDocument.create();
pdf.registerFontkit(fontkit);
const pages = await pdf.copyPages(template, template.getPageIndices());
pages.forEach((p) => pdf.addPage(p));
const [teamClone] = await pdf.copyPages(pdf, [1]);
pdf.insertPage(2, teamClone);

const arial = await pdf.embedFont(fs.readFileSync("/System/Library/Fonts/Supplemental/Arial.ttf"));
const arialBd = await pdf.embedFont(fs.readFileSync("/System/Library/Fonts/Supplemental/Arial Bold.ttf"));

const imgs = [];
for (const f of cropped) imgs.push(await pdf.embedJpg(fs.readFileSync(f)));
const qrGit = await pdf.embedPng(fs.readFileSync("/tmp/next-template/qr-github.png"));
const qrPaste = await pdf.embedPng(fs.readFileSync("/tmp/next-template/qr-paste.png"));

// --- 1 Title ---
{
  const p = pdf.getPage(0);
  cover(p, 22, 20, 640, 410);
  p.drawText("CodeSensei", { x: 26, y: 390, size: 36, font: arialBd, color: PURPLE });
  p.drawText("Nomination I  —  Virtual university location", {
    x: 26,
    y: 348,
    size: 16,
    font: arialBd,
    color: BLACK,
  });
  p.drawText("Team CodeSensei", { x: 26, y: 312, size: 18, font: arial, color: BLACK });
  p.drawText("Igor Sikorsky Kyiv Polytechnic Institute", {
    x: 26,
    y: 288,
    size: 14,
    font: arial,
    color: MUTED,
  });
  p.drawText("Team members", { x: 26, y: 248, size: 16, font: arialBd, color: BLACK });
  drawLines(
    p,
    arial,
    [
      "Mark Mamenko, Kateryna Shozda, Denys Ilienko,",
      "Sviatoslav Pavlenko, Dmytro Poshytyniuk",
    ],
    { x: 26, yTop: 238, size: 14, color: BLACK, maxWidth: 560 }
  );
}

function teamCard(page, x, name, role) {
  cover(page, x, 46, 250, 230);
  page.drawText(name, { x: x + 8, y: 240, size: 13, font: arialBd, color: BLACK });
  page.drawText("Igor Sikorsky KPI", { x: x + 8, y: 222, size: 11, font: arial, color: MUTED });
  page.drawText("Role in the project", { x: x + 8, y: 196, size: 11, font: arialBd, color: BLACK });
  drawLines(page, arial, [role], { x: x + 8, yTop: 184, size: 11, color: BLACK, maxWidth: 232, gap: 1.3 });
}

{
  const p = pdf.getPage(1);
  wipeBody(p);
  cover(p, 24, 14, 540, 28);
  teamCard(p, 54, "Mark Mamenko", "Team lead. Secure .NET proxy, Gemini mentor API, Render deployment.");
  teamCard(p, 354, "Kateryna Shozda", "Learning design. 24 OOP presets and VR-sized mentor prompts.");
  teamCard(p, 654, "Denys Ilienko", "Quality assurance. NUnit suite, HTTP contract, demo checklist.");
  p.drawText("Continued on the next slide.", { x: 26, y: 22, size: 10, font: arial, color: MUTED });
}

{
  const p = pdf.getPage(2);
  cover(p, 16, 448, 540, 78, WHITE);
  p.drawText("Our Team", { x: 26, y: 505, size: 28, font: arialBd, color: PURPLE });
  wipeBody(p);
  cover(p, 24, 14, 640, 28);
  teamCard(p, 54, "Sviatoslav Pavlenko", "VRChat client. UdonSharp terminal, GET-only networking, prefab.");
  teamCard(p, 354, "Dmytro Poshytyniuk", "World integration. MetaLab scene, VRChat SDK, placement in the lab.");
  teamCard(p, 654, "Authorship", "Created artefacts remain the intellectual property of the team.");
  p.drawText("Five authors. Artefacts stay with the team.", { x: 26, y: 22, size: 10, font: arial, color: MUTED });
}

{
  const p = pdf.getPage(3);
  wipeBody(p);
  p.drawText("SELECTED LOCATION", { x: 48, y: 410, size: 11, font: arialBd, color: PURPLE });
  p.drawText("MacPaw AI Lab / MetaLab classroom", { x: 48, y: 386, size: 16, font: arialBd, color: BLACK });
  p.drawText("Igor Sikorsky Kyiv Polytechnic Institute", { x: 48, y: 368, size: 11, font: arial, color: MUTED });
  drawLines(
    p,
    arial,
    [
      "This is the university multimedia classroom modelled for the NEXT Metaverse: blue-and-white walls, herringbone floor, orange seminar seating, whiteboards and a lounge of bean-bags. The MacPaw AI Lab graphic on the end wall marks the space as a live digital-skills studio.",
    ],
    { x: 48, yTop: 350, size: 12, color: BLACK, maxWidth: 400, gap: 1.35 }
  );
  p.drawText("MODELLED SCOPE", { x: 500, y: 410, size: 11, font: arialBd, color: PURPLE });
  const scope = [
    "• Seminar rows and group tables",
    "• Informal bean-bag lounge",
    "• Whiteboard / critique zone",
    "• CodeSensei terminal at a workstation",
    "• Shared wall for OOP presets",
    "• Circulation to the adjacent bay",
  ];
  drawLines(p, arial, scope, { x: 500, yTop: 392, size: 12, color: BLACK, maxWidth: 400, gap: 1.45 });
}

{
  const p = pdf.getPage(4);
  wipeBody(p);
  fitImage(p, imgs[0], 28, 42, 560, 370);
  fitImage(p, imgs[1], 600, 220, 328, 192);
  fitImage(p, imgs[3], 600, 42, 328, 168);
  p.drawText("Overview, lounge and seminar bay of the modelled laboratory.", {
    x: 28,
    y: 44,
    size: 8,
    font: arial,
    color: WHITE,
  });
}

{
  const p = pdf.getPage(5);
  wipeBody(p);
  fitImage(p, imgs[2], 28, 42, 450, 370);
  fitImage(p, imgs[3], 490, 42, 440, 370);
}

{
  const p = pdf.getPage(6);
  wipeBody(p);
  p.drawText("Classroom model", { x: 34, y: 404, size: 13, font: arialBd, color: BLACK });
  p.drawText("Informal lounge", { x: 352, y: 404, size: 13, font: arialBd, color: BLACK });
  p.drawText("CodeSensei station", { x: 670, y: 404, size: 13, font: arialBd, color: BLACK });
  fitImage(p, imgs[0], 18, 136, 292, 252);
  fitImage(p, imgs[1], 332, 136, 292, 252);
  fitImage(p, imgs[2], 648, 136, 292, 252);
  drawLines(p, arial, ["Full 3D reconstruction of the KPI / MacPaw AI Lab for VRChat."], {
    x: 20,
    yTop: 100,
    size: 9,
    color: BLACK,
    maxWidth: 288,
    gap: 1.25,
  });
  drawLines(p, arial, ["Bean-bag zone for informal coaching and peer discussion."], {
    x: 336,
    yTop: 100,
    size: 9,
    color: BLACK,
    maxWidth: 288,
    gap: 1.25,
  });
  drawLines(p, arial, ["Digital artefact: UdonSharp terminal + Gemini mentor in this room."], {
    x: 652,
    yTop: 100,
    size: 9,
    color: BLACK,
    maxWidth: 288,
    gap: 1.25,
  });
}

{
  const p = pdf.getPage(7);
  wipeBody(p);
  const blocks = [
    ["Tools and software", "Unity, VRChat SDK3, UdonSharp, C# / .NET 10, ASP.NET, Docker, Render, Google Gemini, GitHub, NUnit."],
    ["Development process", "1) Capture the laboratory in 3D. 2) Align a GET-only VRChat contract. 3) Ship the mentor API and 24 OOP presets. 4) Package the terminal prefab for MetaLab."],
    ["VRChat integration", "VRCStringDownloader only. Baked HTTPS host codesensei-d5zi.onrender.com. Players enable Allow Untrusted URLs. Requests respect the 5.5 s VRChat limit."],
    ["Technical challenges", "Udon cannot POST, so review uses a 5-character ticket + /paste + inbox. Pending tickets stay hidden. Render Free is woken via /health."],
  ];
  let y = 420;
  for (const [title, body] of blocks) {
    p.drawText(title, { x: 36, y, size: 13, font: arialBd, color: PURPLE });
    y = drawLines(p, arial, [body], { x: 36, yTop: y - 4, size: 11, color: BLACK, maxWidth: 880, gap: 1.28 }) - 10;
  }
}

{
  const p = pdf.getPage(8);
  wipeBody(p);
  const blocks = [
    ["Educational use", "In the NEXT-Study Metaverse students sit in this laboratory, open OOP presets or start a live code review. Teachers see the same synced answer on the shared terminal."],
    ["User experience", "Walk the seminar rows and lounge, press a preset, or generate a ticket, paste a snippet on the web form, and read a mentor reply wrapped to 55 characters for the VR screen."],
    ["Further development", "Place the prefab at a workstation in this mesh, persist tickets, add languages, and publish the VRChat world after MetaLab import."],
  ];
  let y = 420;
  for (const [title, body] of blocks) {
    p.drawText(title, { x: 36, y, size: 13, font: arialBd, color: PURPLE });
    y = drawLines(p, arial, [body], { x: 36, yTop: y - 4, size: 12, color: BLACK, maxWidth: 880, gap: 1.3 }) - 14;
  }
}

{
  const p = pdf.getPage(9);
  wipeBody(p);
  p.drawText("Project demo", { x: 36, y: 410, size: 13, font: arialBd, color: PURPLE });
  drawLines(p, arial, ["https://codesensei-d5zi.onrender.com/paste", "https://codesensei-d5zi.onrender.com/health"], {
    x: 36,
    yTop: 398,
    size: 12,
    color: BLACK,
    maxWidth: 620,
  });
  p.drawText("Project materials", { x: 36, y: 320, size: 13, font: arialBd, color: PURPLE });
  drawLines(
    p,
    arial,
    [
      "GitHub repository in this pack (single commit).",
      "Prefab: client/CodeSensei.unitypackage",
      "API: docs/api.md   Integration: docs/NEXT-INTEGRATION.md",
    ],
    { x: 36, yTop: 308, size: 12, color: BLACK, maxWidth: 620, gap: 1.32 }
  );
  p.drawText("Additional resources", { x: 36, y: 210, size: 13, font: arialBd, color: PURPLE });
  drawLines(
    p,
    arial,
    ["VRChat  hello.vrchat.com     NEXT  nextstudy.eu", "Authorship of created artefacts remains with the team."],
    { x: 36, yTop: 198, size: 12, color: BLACK, maxWidth: 620, gap: 1.32 }
  );
  p.drawImage(qrGit, { x: 700, y: 250, width: 88, height: 88 });
  p.drawText("GitHub", { x: 722, y: 236, size: 9, font: arial, color: MUTED });
  p.drawImage(qrPaste, { x: 810, y: 250, width: 88, height: 88 });
  p.drawText("Demo", { x: 836, y: 236, size: 9, font: arial, color: MUTED });
  fitImage(p, imgs[0], 700, 58, 198, 160);
}

fs.writeFileSync(outPdf, await pdf.save());
console.log("PDF", outPdf, fs.statSync(outPdf).size);
