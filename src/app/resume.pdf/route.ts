import { PDFDocument, PDFString, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

import { resume, type ResumeLink } from "@/lib/resume-data";

export const runtime = "nodejs";
export const dynamic = "force-static";

const PAGE_SIZE: [number, number] = [595.28, 841.89]; // A4
const MARGIN_X = 48;
const MARGIN_TOP = 42;
const MARGIN_BOTTOM = 38;
const WIDTH = PAGE_SIZE[0] - MARGIN_X * 2;
const INK = rgb(0.06, 0.06, 0.06);
const MUTED = rgb(0.36, 0.36, 0.36);
const RULE = rgb(0.78, 0.78, 0.78);

const BODY = 9.1;
const LEADING = 11.6;

/** Standard PDF fonts use WinAnsi encoding; keep only characters it can represent. */
function clean(text: string): string {
  return text
    .replace(/\u2192/g, "->")
    .replace(/[\u2010\u2011\u2212]/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/[^\x20-\x7E\u00A1-\u00FF\u2013\u2014\u2018\u2019\u201C\u201D\u2022\u2026]/g, "");
}

type Fonts = { regular: PDFFont; bold: PDFFont; italic: PDFFont };

class ResumeWriter {
  page: PDFPage;
  y: number;

  constructor(
    private readonly doc: PDFDocument,
    private readonly fonts: Fonts
  ) {
    this.page = doc.addPage(PAGE_SIZE);
    this.y = PAGE_SIZE[1] - MARGIN_TOP;
  }

  private ensure(height: number): void {
    if (this.y - height < MARGIN_BOTTOM) {
      this.page = this.doc.addPage(PAGE_SIZE);
      this.y = PAGE_SIZE[1] - MARGIN_TOP;
    }
  }

  private wrap(text: string, font: PDFFont, size: number, width: number, firstWidth = width): string[] {
    const words = clean(text).split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      const limit = lines.length === 0 ? firstWidth : width;
      if (!current || font.widthOfTextAtSize(candidate, size) <= limit) {
        current = candidate;
      } else {
        lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  private text(value: string, x: number, size: number, font: PDFFont, color = INK): void {
    this.page.drawText(clean(value), { x, y: this.y - size, size, font, color });
  }

  private link(url: string, x: number, width: number, size: number): void {
    const baseline = this.y - size;
    const annotation = this.doc.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [x, baseline - 2, x + width, baseline + size],
      Border: [0, 0, 0],
      A: { Type: "Action", S: "URI", URI: PDFString.of(url) },
    });
    this.page.node.addAnnot(this.doc.context.register(annotation));
  }

  header(): void {
    const { regular, bold } = this.fonts;
    this.text(resume.name, MARGIN_X, 21, bold);
    this.y -= 27;
    this.text(resume.title, MARGIN_X, 10.2, regular, MUTED);
    this.y -= 16;

    const size = 8.6;
    const separator = "   ·   ";
    const separatorWidth = regular.widthOfTextAtSize(separator, size);
    const items: { text: string; url?: string }[] = [
      { text: resume.location },
      { text: resume.phone, url: `tel:${resume.phone.replace(/[^+\d]/g, "")}` },
      { text: resume.email, url: `mailto:${resume.email}` },
      ...resume.links.map((item) => ({ text: item.label, url: item.href })),
    ];
    let x = MARGIN_X;
    items.forEach((item, index) => {
      const value = clean(item.text);
      const width = regular.widthOfTextAtSize(value, size);
      if (index > 0) {
        if (x + separatorWidth + width > MARGIN_X + WIDTH) {
          this.y -= 12;
          x = MARGIN_X;
        } else {
          this.page.drawText(separator, { x, y: this.y - size, size, font: regular, color: RULE });
          x += separatorWidth;
        }
      }
      this.page.drawText(value, { x, y: this.y - size, size, font: regular, color: item.url ? INK : MUTED });
      if (item.url) this.link(item.url, x, width, size);
      x += width;
    });
    this.y -= 16;
    this.page.drawLine({
      start: { x: MARGIN_X, y: this.y },
      end: { x: MARGIN_X + WIDTH, y: this.y },
      thickness: 1,
      color: INK,
    });
    this.y -= 6;
  }

  section(title: string): void {
    this.ensure(44);
    this.y -= 7;
    this.text(title.toUpperCase(), MARGIN_X, 9, this.fonts.bold);
    this.y -= 12.5;
    this.page.drawLine({
      start: { x: MARGIN_X, y: this.y + 1 },
      end: { x: MARGIN_X + WIDTH, y: this.y + 1 },
      thickness: 0.6,
      color: RULE,
    });
    this.y -= 5;
  }

  entry(title: string, period: string, subtitle?: string, link?: ResumeLink): void {
    const { bold, regular, italic } = this.fonts;
    const size = 9.8;
    const periodText = clean(period);
    const periodWidth = regular.widthOfTextAtSize(periodText, 8.8);
    const titleLines = this.wrap(title, bold, size, WIDTH - periodWidth - 14);
    this.ensure(titleLines.length * 12.4 + 36);

    this.page.drawText(periodText, {
      x: MARGIN_X + WIDTH - periodWidth,
      y: this.y - size,
      size: 8.8,
      font: regular,
      color: MUTED,
    });
    titleLines.forEach((line) => {
      this.text(line, MARGIN_X, size, bold);
      this.y -= 12.4;
    });

    if (subtitle || link) {
      const subSize = 8.5;
      let x = MARGIN_X;
      if (subtitle) {
        const lines = this.wrap(subtitle, italic, subSize, WIDTH);
        lines.forEach((line, index) => {
          if (index > 0) this.y -= 10.8;
          this.text(line, MARGIN_X, subSize, italic, MUTED);
          x = MARGIN_X + italic.widthOfTextAtSize(clean(line), subSize) + 1.5;
        });
      }
      if (link) {
        const label = clean(link.label);
        const width = regular.widthOfTextAtSize(label, subSize);
        const joiner = "   ·   ";
        const joinerWidth = italic.widthOfTextAtSize(joiner, subSize);
        if (subtitle && x + joinerWidth + width <= MARGIN_X + WIDTH) {
          this.page.drawText(joiner, { x, y: this.y - subSize, size: subSize, font: italic, color: RULE });
          x += joinerWidth;
        } else if (subtitle) {
          this.y -= 10.8;
          x = MARGIN_X;
        }
        this.page.drawText(label, { x, y: this.y - subSize, size: subSize, font: regular, color: INK });
        this.link(link.href, x, width, subSize);
      }
      this.y -= 11.4;
    }
    this.y -= 1.5;
  }

  bullets(items: string[]): void {
    const { regular } = this.fonts;
    const indent = 10;
    for (const item of items) {
      const lines = this.wrap(item, regular, BODY, WIDTH - indent);
      this.ensure(lines.length * LEADING + 2);
      this.page.drawText("•", { x: MARGIN_X + 1.5, y: this.y - BODY, size: BODY, font: regular, color: MUTED });
      for (const line of lines) {
        this.text(line, MARGIN_X + indent, BODY, regular);
        this.y -= LEADING;
      }
      this.y -= 1.2;
    }
    this.y -= 3;
  }

  paragraph(value: string): void {
    const { regular } = this.fonts;
    const lines = this.wrap(value, regular, BODY + 0.2, WIDTH);
    this.ensure(lines.length * LEADING);
    for (const line of lines) {
      this.text(line, MARGIN_X, BODY + 0.2, regular);
      this.y -= LEADING + 0.4;
    }
    this.y -= 2;
  }

  labeled(label: string, value: string): void {
    const { bold, regular } = this.fonts;
    const labelText = `${clean(label)}: `;
    const labelWidth = bold.widthOfTextAtSize(labelText, BODY) + 1.5;
    const lines = this.wrap(value, regular, BODY, WIDTH, WIDTH - labelWidth);
    this.ensure(lines.length * LEADING);
    this.page.drawText(labelText, { x: MARGIN_X, y: this.y - BODY, size: BODY, font: bold, color: INK });
    lines.forEach((line, index) => {
      this.text(line, MARGIN_X + (index === 0 ? labelWidth : 0), BODY, regular);
      this.y -= LEADING;
    });
    this.y -= 1.2;
  }
}

async function buildResumePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`${resume.name} — Resume`);
  doc.setAuthor(resume.name);
  doc.setSubject(resume.title);
  doc.setKeywords(["Software Engineer", "Python", "FastAPI", "LangGraph", "Backend", "AI", "SQL"]);
  doc.setCreator(`${resume.name} portfolio`);
  doc.setProducer("pdf-lib");

  const fonts: Fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    italic: await doc.embedFont(StandardFonts.HelveticaOblique),
  };

  const writer = new ResumeWriter(doc, fonts);
  writer.header();

  writer.section("Summary");
  writer.paragraph(resume.summary);

  writer.section("Experience");
  for (const job of resume.experience) {
    writer.entry(`${job.title} — ${job.org}`, job.period, job.subtitle, job.link);
    writer.bullets(job.bullets);
  }

  writer.section("Projects");
  for (const project of resume.projects) {
    writer.entry(`${project.title} — ${project.org}`, project.period, project.subtitle, project.link);
    writer.bullets(project.bullets);
  }

  writer.section("Technical skills");
  for (const group of resume.skills) writer.labeled(group.label, group.items);

  writer.section("Education");
  for (const school of resume.education) {
    writer.entry(school.degree, school.period, `${school.school} · ${school.result}`);
  }

  writer.section("Certifications & publication");
  writer.bullets(resume.credentials);

  return doc.save();
}

export async function GET(): Promise<Response> {
  const bytes = await buildResumePdf();
  const body = new Uint8Array(bytes.length);
  body.set(bytes);
  return new Response(body.buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Karthik-Bhandarkar-Resume.pdf"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
