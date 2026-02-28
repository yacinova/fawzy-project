// TCS Project Documentation Generator
// Generates both Word (.docx) and PowerPoint (.pptx)

import {
    Document, Packer, Paragraph, TextRun, HeadingLevel,
    AlignmentType, Table, TableRow, TableCell, WidthType,
    BorderStyle, ShadingType, PageBreak
} from 'docx';
import PptxGenJS from 'pptxgenjs';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..');

// ──────────────────────────────────────────────────────────────────────────────
// WORD DOCUMENT
// ──────────────────────────────────────────────────────────────────────────────

const BLUE = '2563EB';
const DARK = '0F172A';
const GRAY = '64748B';

const h1 = (text) => new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    run: { color: BLUE, bold: true },
});

const h2 = (text) => new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
});

const h3 = (text) => new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
});

const p = (text, opts = {}) => new Paragraph({
    children: [new TextRun({ text, size: 22, color: opts.color || DARK, bold: opts.bold })],
    spacing: { after: 160 },
    alignment: opts.align || AlignmentType.LEFT,
});

const bullet = (text) => new Paragraph({
    children: [new TextRun({ text: `• ${text}`, size: 22, color: DARK })],
    spacing: { after: 100 },
    indent: { left: 400 },
});

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const tableRow2 = (label, value, shade = false) => new TableRow({
    children: [
        new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20 })] })],
            shading: shade ? { type: ShadingType.CLEAR, color: 'EFF6FF' } : undefined,
            width: { size: 30, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: value, size: 20 })] })],
            shading: shade ? { type: ShadingType.CLEAR, color: 'EFF6FF' } : undefined,
            width: { size: 70, type: WidthType.PERCENTAGE },
        }),
    ],
});

const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: 'Calibri', size: 22 },
            },
        },
    },
    sections: [{
        children: [
            // ── Cover ──
            new Paragraph({
                children: [new TextRun({ text: 'TCS — TECHNICAL CAPABILITY SYSTEM', bold: true, size: 52, color: BLUE })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 800, after: 200 },
            }),
            new Paragraph({
                children: [new TextRun({ text: 'Project Summary · ROI Analysis · AI-Assisted Development', size: 28, color: GRAY })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
            }),
            new Paragraph({
                children: [new TextRun({ text: 'Samsung Service Operations · February 2026', size: 22, color: GRAY, italics: true })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 800 },
            }),
            new Paragraph({
                children: [new TextRun({ text: '"Earn Your Tier • Own Your Title"', size: 28, color: BLUE, bold: true, italics: true })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 1200 },
            }),

            pageBreak(),

            // ── 1. Executive Summary ──
            h1('1. Executive Summary'),
            p('The Technical Capability System (TCS) is a Samsung-internal web application designed to transparently measure, rank, and reward field service engineers. Built entirely with modern web technologies and AI-assisted development, TCS replaces subjective manual evaluations with a data-driven, gamified performance framework.'),
            p('In under 30 days of development — using AI as a co-developer — a full-featured production application was delivered at near-zero cost, demonstrating the transformative power of AI-augmented engineering.'),

            pageBreak(),

            // ── 2. The Problem ──
            h1('2. The Problem We Solved'),
            h2('Before TCS'),
            bullet('Engineer performance was evaluated subjectively with no standardized scoring'),
            bullet('No transparent ranking system — engineers had no visibility into how they compared'),
            bullet('No gamification or motivation structure tied to measurable KPIs'),
            bullet('Manual, spreadsheet-based data management — error-prone and time-consuming'),
            bullet('No self-service portal for engineers to track their own progress'),
            bullet('Admin work was fragmented across multiple tools with no central hub'),

            pageBreak(),

            // ── 3. The Solution ──
            h1('3. The Solution — What TCS Does'),
            h2('Core Features'),

            h3('🏆 Hall of Fame (Public Leaderboard)'),
            bullet('Monthly & quarterly engineer rankings visible to all'),
            bullet('Top 10 showcased with tier logos, TCS scores, and photos'),
            bullet('Drives healthy competition and peer recognition'),

            h3('🔍 Engineer Self-Lookup'),
            bullet('Engineers search by their unique code to view their full profile'),
            bullet('Monthly & quarterly view with score breakdown (KPIs, DRNPS, Exam)'),
            bullet('Historical performance timeline across all recorded months'),

            h3('📊 4-Tier Scoring System (0–100)'),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    tableRow2('Component', 'Weight & Description', true),
                    tableRow2('KPIs (8 metrics)', '50% — REDO ratio, IQC skip, OQC pass, training, maintenance, core parts PBA/Octa, multi-parts'),
                    tableRow2('DRNPS', '30% — Customer satisfaction: (((Promoters − Detractors) × 10) + 100) ÷ 2', true),
                    tableRow2('Exam Score', '20% — Monthly technical knowledge test (0–100 pts)'),
                ],
            }),
            new Paragraph({ spacing: { after: 200 } }),

            h3('🎖️ Tier Badge System'),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    tableRow2('Tier', 'Score Range', true),
                    tableRow2('🥉 Bronze', '0 – 49 pts'),
                    tableRow2('🥈 Silver', '50 – 59 pts', true),
                    tableRow2('🥇 Gold', '60 – 69 pts'),
                    tableRow2('💎 Platinum', '70 – 79 pts', true),
                    tableRow2('💠 Diamond', '80 – 89 pts'),
                    tableRow2('👑 Masters', '90 – 100 pts', true),
                ],
            }),
            new Paragraph({ spacing: { after: 200 } }),

            h3('🛡️ Admin Portal'),
            bullet('Secure login for administrators'),
            bullet('CSV bulk upload for monthly data ingestion'),
            bullet('Engineer profile management (add, edit, archive, restore)'),
            bullet('Photo management via Firebase Storage'),
            bullet('Live analytics dashboard — visit counts, session durations, daily hits'),

            h3('💬 Feedback System'),
            bullet('Engineers can submit rated feedback stored in Firebase'),
            bullet('Creates a continuous improvement loop for the TCS system itself'),

            pageBreak(),

            // ── 4. Technology ──
            h1('4. Technology Stack & Architecture'),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    tableRow2('Layer', 'Technology', true),
                    tableRow2('Frontend', 'Next.js 16 (React) + Tailwind CSS'),
                    tableRow2('Backend / Database', 'Firebase Firestore (NoSQL, real-time)', true),
                    tableRow2('File Storage', 'Firebase Storage (photos, tier logos)'),
                    tableRow2('Authentication', 'Custom admin auth via Firestore admins collection', true),
                    tableRow2('Analytics', 'Custom Firestore-backed session & visit tracker'),
                    tableRow2('Hosting', 'Firebase Hosting / Vercel (zero-config CI/CD)', true),
                    tableRow2('SEO', 'Next.js metadata API, robots.txt, sitemap.xml'),
                    tableRow2('Development', 'AI-assisted (Antigravity / Google DeepMind)', true),
                ],
            }),
            new Paragraph({ spacing: { after: 200 } }),

            pageBreak(),

            // ── 5. AI Role ──
            h1('5. How AI Transformed Development'),
            p('This project represents a new model of software development: one human with domain knowledge + AI as a full-stack pair programmer. Here is how AI accelerated every phase:'),

            h2('Development Speed'),
            bullet('Full application built in days, not months'),
            bullet('Real-time bug diagnosis and fixing (JSX parse errors, runtime crashes, hydration mismatches)'),
            bullet('Instant implementation of complex features (scoring algorithms, CSV parsers, ranking logic)'),

            h2('Design & UX'),
            bullet('Premium dark-mode UI designed from scratch — glassmorphism, animations, tier badges'),
            bullet('Responsive layout for desktop and mobile without manual CSS debugging'),
            bullet('Symmetric header, accessible color schemes, readable typography'),

            h2('Architecture Decisions'),
            bullet('Firebase chosen over custom backend — zero server management, free tier sufficient'),
            bullet('Analytics model designed and implemented in one session'),
            bullet('SEO meta tags, OG data, robots.txt and sitemap generated automatically'),

            h2('Knowledge Transfer'),
            bullet('AI explained every decision — the human always understood the "why"'),
            bullet('Acted as an advisor for launch readiness checklist, GDPR considerations, and marketing'),
            bullet('Suggested and implemented features the team had not yet considered (analytics, tier logo overlays, quarterly HOF)'),

            pageBreak(),

            // ── 6. ROI ──
            h1('6. Return on Investment (ROI) Analysis'),

            h2('Cost to Build'),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    tableRow2('Item', 'Cost (EGP / USD)', true),
                    tableRow2('Traditional agency development (est. 3–6 months)', '150,000–400,000 EGP'),
                    tableRow2('Freelance team equivalent', '50,000–150,000 EGP', true),
                    tableRow2('TCS actual development cost (AI-assisted)', '~0 EGP (internal time only)'),
                    tableRow2('Hosting (Firebase + Vercel free tier)', '0 EGP / month', true),
                    tableRow2('Infrastructure cost at scale (Firebase Blaze plan)', '<500 EGP / month'),
                ],
            }),
            new Paragraph({ spacing: { after: 200 } }),

            h2('Value Created'),
            bullet('Eliminated manual performance tracking — estimated 10–15 admin hours saved per month'),
            bullet('Transparent ranking motivates engineers to improve KPIs → directly impacts revenue'),
            bullet('1% improvement in REDO ratio across a team of 50 engineers = significant parts cost savings'),
            bullet('Higher DRNPS → better customer satisfaction → retention and upsell opportunities'),
            bullet('Centralized data gives management real-time visibility — eliminates reporting lag'),

            h2('Strategic Value'),
            bullet('Replicable across any Samsung service region globally'),
            bullet('Data asset grows every month — historical trends enable predictive management'),
            bullet('Gamification culture attracts ambition and retains top engineers'),
            bullet('Proof of concept for AI-assisted internal tooling at Samsung'),

            h2('ROI Estimate'),
            p('Assuming 50 engineers, conservative 3% KPI improvement, and 15 admin hours/month saved:'),
            p('Conservative 12-month ROI: 10x–30x against AI + hosting cost.', { bold: true, color: BLUE }),

            pageBreak(),

            // ── 7. Vision ──
            h1('7. What We Are Seeking — Future Roadmap'),
            bullet('Mobile app version (React Native) for engineers on the floor'),
            bullet('Manager-facing analytics dashboard with trend charts and cohort analysis'),
            bullet('Automated monthly data ingestion from Samsung internal systems (ERP/SAP)'),
            bullet('Push notifications for tier promotions and rank changes'),
            bullet('Multi-region deployment — Egypt, KSA, UAE, and beyond'),
            bullet('AI-powered performance coaching suggestions per engineer'),
            bullet('Certificate generation — auto-issued PDF certificates per tier achieved'),

            pageBreak(),

            // ── 8. Conclusion ──
            h1('8. Conclusion'),
            p('TCS is more than a leaderboard. It is a cultural shift — from ambiguity to accountability, from guesswork to gamification, from spreadsheets to a living, breathing performance ecosystem.'),
            p('What took one individual with an AI partner a matter of days to build would have taken a traditional team months and cost hundreds of thousands of Egyptian pounds. The result is a production-grade application serving real engineers, tracked in real-time, with real business impact.'),
            p('"Earn Your Tier • Own Your Title" is not just a slogan. It is a new standard for how Samsung engineers are seen, measured, and celebrated.', { bold: true, color: BLUE }),

            new Paragraph({
                children: [new TextRun({ text: '— Documented with pride, February 2026 · Samsung Service Operations', italics: true, color: GRAY, size: 20 })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 600 },
            }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    const wordPath = path.join(outputDir, 'TCS_Project_Summary.docx');
    writeFileSync(wordPath, buffer);
    console.log('✅ Word document created:', wordPath);
});

// ──────────────────────────────────────────────────────────────────────────────
// POWERPOINT
// ──────────────────────────────────────────────────────────────────────────────

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.title = 'TCS — Technical Capability System';
pptx.subject = 'Project Summary + ROI';
pptx.author = 'Samsung Service Operations';

const SLIDE_BG = '0A0F1E';
const ACCENT = '3B82F6';
const WHITE = 'FFFFFF';
const MUTED = '94A3B8';
const GREEN = '10B981';
const YELLOW = 'F59E0B';
const PURPLE = 'A855F7';

const addSlide = (title, subtitle = '') => {
    const slide = pptx.addSlide();
    slide.background = { color: SLIDE_BG };
    // Blue accent bar top
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.06, fill: { color: ACCENT } });
    if (title) {
        slide.addText(title, {
            x: 0.5, y: 0.15, w: '90%', h: 0.7,
            fontSize: 28, bold: true, color: WHITE, fontFace: 'Calibri',
        });
    }
    if (subtitle) {
        slide.addText(subtitle, {
            x: 0.5, y: 0.85, w: '90%', h: 0.4,
            fontSize: 13, color: MUTED, fontFace: 'Calibri',
        });
    }
    return slide;
};

const addBullets = (slide, items, x, y, w, h, opts = {}) => {
    slide.addText(
        items.map(t => ({ text: t, options: { bullet: { type: 'bullet' }, paraSpaceAfter: 6 } })),
        { x, y, w, h, fontSize: opts.fontSize || 13, color: opts.color || WHITE, fontFace: 'Calibri' }
    );
};

// ── Slide 1: Cover ──
{
    const slide = pptx.addSlide();
    slide.background = { color: SLIDE_BG };
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.08, fill: { color: ACCENT } });
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 6.92, w: '100%', h: 0.08, fill: { color: ACCENT } });
    slide.addText('TCS', { x: 0, y: 1.0, w: '100%', h: 1.2, fontSize: 80, bold: true, color: ACCENT, align: 'center', fontFace: 'Calibri' });
    slide.addText('Technical Capability System', { x: 0, y: 2.1, w: '100%', h: 0.6, fontSize: 28, bold: true, color: WHITE, align: 'center', fontFace: 'Calibri' });
    slide.addText('Project Summary · ROI Analysis · AI-Assisted Development', { x: 0, y: 2.7, w: '100%', h: 0.4, fontSize: 14, color: MUTED, align: 'center', fontFace: 'Calibri' });
    slide.addText('"Earn Your Tier • Own Your Title"', { x: 0, y: 3.4, w: '100%', h: 0.5, fontSize: 18, bold: true, color: YELLOW, align: 'center', fontFace: 'Calibri', italic: true });
    slide.addText('Samsung Service Operations · February 2026', { x: 0, y: 4.2, w: '100%', h: 0.35, fontSize: 12, color: MUTED, align: 'center', fontFace: 'Calibri' });
}

// ── Slide 2: The Problem ──
{
    const slide = addSlide('The Problem', 'What existed before TCS');
    const problems = [
        'Subjective performance evaluation — no standardized scoring',
        'No transparent ranking — engineers had zero visibility',
        'No gamification or motivational structure',
        'Manual spreadsheet-based data — error-prone & slow',
        'No self-service portal for engineers',
        'Fragmented admin tools, no central hub',
    ];
    addBullets(slide, problems, 0.5, 1.3, 11.5, 4.5, { fontSize: 14, color: 'FCA5A5' });
}

// ── Slide 3: The Solution ──
{
    const slide = addSlide('The Solution', 'What TCS delivers');
    const cols = [
        { t: '🏆 Leaderboard', items: ['Monthly & Quarterly HOF', 'Top 10 with tier logos', 'Public & motivating'], x: 0.3, color: YELLOW },
        { t: '🔍 Self-Lookup', items: ['Search by engineer code', 'Score breakdown', 'Historical timeline'], x: 4.0, color: ACCENT },
        { t: '🛡️ Admin Portal', items: ['CSV bulk upload', 'Profile management', 'Live analytics'], x: 7.7, color: GREEN },
    ];
    cols.forEach(col => {
        slide.addShape(pptx.ShapeType.roundRect, { x: col.x, y: 1.3, w: 3.5, h: 4.5, fill: { color: '1E293B' }, line: { color: col.color, width: 1.5 }, rectRadius: 0.2 });
        slide.addText(col.t, { x: col.x + 0.1, y: 1.5, w: 3.3, h: 0.5, fontSize: 14, bold: true, color: col.color, fontFace: 'Calibri' });
        slide.addText(col.items.map(i => ({ text: i, options: { bullet: true, paraSpaceAfter: 8 } })), { x: col.x + 0.2, y: 2.1, w: 3.2, h: 3.4, fontSize: 12, color: WHITE, fontFace: 'Calibri' });
    });
}

// ── Slide 4: Scoring System ──
{
    const slide = addSlide('Scoring System', 'How TCS Score (0–100) is calculated');
    const components = [
        { label: 'KPIs', pct: '50%', pts: 'Max 50 pts', color: GREEN, x: 0.5, desc: '8 operational KPIs\nREDO · IQC · OQC · Training\nMaint · PBA · Octa · Multi' },
        { label: 'DRNPS', pct: '30%', pts: 'Max 30 pts', color: PURPLE, x: 4.3, desc: 'Customer satisfaction\n((Promoters-Detractors)×10+100)÷2' },
        { label: 'Exam', pct: '20%', pts: 'Max 20 pts', color: ACCENT, x: 8.1, desc: 'Monthly technical exam\n0–100 score normalised' },
    ];
    components.forEach(c => {
        slide.addShape(pptx.ShapeType.roundRect, { x: c.x, y: 1.3, w: 3.5, h: 4.6, fill: { color: '1E293B' }, line: { color: c.color, width: 2 }, rectRadius: 0.25 });
        slide.addText(c.pct, { x: c.x, y: 1.5, w: 3.5, h: 1.0, fontSize: 44, bold: true, color: c.color, align: 'center', fontFace: 'Calibri' });
        slide.addText(c.label, { x: c.x, y: 2.5, w: 3.5, h: 0.45, fontSize: 18, bold: true, color: WHITE, align: 'center', fontFace: 'Calibri' });
        slide.addText(c.pts, { x: c.x, y: 2.95, w: 3.5, h: 0.35, fontSize: 11, color: c.color, align: 'center', fontFace: 'Calibri' });
        slide.addText(c.desc, { x: c.x + 0.2, y: 3.4, w: 3.1, h: 2.2, fontSize: 11, color: MUTED, fontFace: 'Calibri', align: 'center' });
    });
}

// ── Slide 5: Tier System ──
{
    const slide = addSlide('Tier System', 'Bronze → Silver → Gold → Platinum → Diamond → Masters');
    const tiers = [
        { name: 'Bronze', range: '0–49', color: 'CD7F32' },
        { name: 'Silver', range: '50–59', color: 'C0C0C0' },
        { name: 'Gold', range: '60–69', color: 'FFD700' },
        { name: 'Platinum', range: '70–79', color: '38BDF8' },
        { name: 'Diamond', range: '80–89', color: 'A855F7' },
        { name: 'Masters', range: '90–100', color: 'F97316' },
    ];
    tiers.forEach((t, i) => {
        const x = 0.3 + (i % 3) * 3.9;
        const y = 1.5 + Math.floor(i / 3) * 2.5;
        slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 3.5, h: 2.1, fill: { color: '1E293B' }, line: { color: t.color, width: 2 }, rectRadius: 0.2 });
        slide.addText(t.name, { x, y: y + 0.2, w: 3.5, h: 0.55, fontSize: 20, bold: true, color: t.color, align: 'center', fontFace: 'Calibri' });
        slide.addText(t.range + ' pts', { x, y: y + 0.8, w: 3.5, h: 0.4, fontSize: 14, color: WHITE, align: 'center', fontFace: 'Calibri' });
    });
}

// ── Slide 6: Tech Stack ──
{
    const slide = addSlide('Technology Stack', 'Modern, scalable, cost-effective');
    const items = [
        ['Frontend', 'Next.js 16 · React · Tailwind CSS', ACCENT],
        ['Database', 'Firebase Firestore (NoSQL, real-time)', GREEN],
        ['Storage', 'Firebase Storage (photos, logos)', YELLOW],
        ['Hosting', 'Firebase Hosting / Vercel — auto CI/CD', PURPLE],
        ['Analytics', 'Custom Firestore session tracker', 'EC4899'],
        ['SEO', 'Meta tags · OG · robots.txt · sitemap.xml', '14B8A6'],
        ['Dev Method', 'AI-assisted (Antigravity · Google DeepMind)', 'F97316'],
        ['Cost', '~0 EGP build · <500 EGP/month at scale', GREEN],
    ];
    items.forEach((item, i) => {
        const x = 0.3 + (i % 2) * 5.9;
        const y = 1.4 + Math.floor(i / 2) * 1.35;
        slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.5, h: 1.1, fill: { color: '1E293B' }, line: { color: item[2], width: 1.5 }, rectRadius: 0.15 });
        slide.addText(item[0], { x: x + 0.15, y: y + 0.1, w: 1.5, h: 0.5, fontSize: 11, bold: true, color: item[2], fontFace: 'Calibri' });
        slide.addText(item[1], { x: x + 1.7, y: y + 0.1, w: 3.6, h: 0.9, fontSize: 12, color: WHITE, fontFace: 'Calibri', valign: 'middle' });
    });
}

// ── Slide 7: AI Impact ──
{
    const slide = addSlide('How AI Built This', 'AI as a full-stack pair programmer');
    const rows = [
        { icon: '⚡', label: 'Speed', text: 'Full app in days, not months' },
        { icon: '🐛', label: 'Debugging', text: 'Real-time bug diagnosis & fixes' },
        { icon: '🎨', label: 'Design', text: 'Premium dark UI, animations, tier badges' },
        { icon: '🧠', label: 'Architecture', text: 'Firebase structure, scoring logic, CSV parser' },
        { icon: '📈', label: 'Strategy', text: 'SEO, analytics, launch readiness, GDPR advice' },
        { icon: '💡', label: 'Innovation', text: 'Suggested features the team had not yet considered' },
    ];
    rows.forEach((row, i) => {
        const y = 1.4 + i * 0.9;
        slide.addShape(pptx.ShapeType.roundRect, { x: 0.3, y, w: 11.5, h: 0.75, fill: { color: '1E293B' }, line: { color: ACCENT, width: 1 }, rectRadius: 0.12 });
        slide.addText(row.icon + '  ' + row.label, { x: 0.5, y: y + 0.1, w: 2.5, h: 0.5, fontSize: 13, bold: true, color: ACCENT, fontFace: 'Calibri' });
        slide.addText(row.text, { x: 3.2, y: y + 0.1, w: 8.3, h: 0.5, fontSize: 13, color: WHITE, fontFace: 'Calibri' });
    });
}

// ── Slide 8: ROI ──
{
    const slide = addSlide('Return on Investment', 'The business case for TCS');

    // Cost savings box
    slide.addShape(pptx.ShapeType.roundRect, { x: 0.3, y: 1.3, w: 5.5, h: 2.8, fill: { color: '1E293B' }, line: { color: 'FCA5A5', width: 2 }, rectRadius: 0.2 });
    slide.addText('💸 Traditional Cost', { x: 0.4, y: 1.4, w: 5.2, h: 0.45, fontSize: 14, bold: true, color: 'FCA5A5', fontFace: 'Calibri' });
    slide.addText('Agency: 150,000–400,000 EGP\nFreelance team: 50,000–150,000 EGP\nTimeline: 3–6 months\nMaintenance: ongoing fees', { x: 0.4, y: 1.9, w: 5.2, h: 2.0, fontSize: 12, color: WHITE, fontFace: 'Calibri' });

    // TCS cost box
    slide.addShape(pptx.ShapeType.roundRect, { x: 6.1, y: 1.3, w: 5.5, h: 2.8, fill: { color: '1E293B' }, line: { color: GREEN, width: 2 }, rectRadius: 0.2 });
    slide.addText('✅ TCS Actual Cost', { x: 6.2, y: 1.4, w: 5.2, h: 0.45, fontSize: 14, bold: true, color: GREEN, fontFace: 'Calibri' });
    slide.addText('Build cost: ~0 EGP (AI + internal time)\nHosting: 0–500 EGP/month\nTimeline: Days\nMaintenance: AI-assisted, minimal', { x: 6.2, y: 1.9, w: 5.2, h: 2.0, fontSize: 12, color: WHITE, fontFace: 'Calibri' });

    // ROI bottom
    slide.addShape(pptx.ShapeType.roundRect, { x: 0.3, y: 4.3, w: 11.3, h: 1.7, fill: { color: '1C3461' }, line: { color: ACCENT, width: 2 }, rectRadius: 0.2 });
    slide.addText('Conservative 12-Month ROI: 10x – 30x', { x: 0.4, y: 4.4, w: 11.0, h: 0.55, fontSize: 20, bold: true, color: YELLOW, align: 'center', fontFace: 'Calibri' });
    slide.addText('Admin time saved · KPI improvement · DRNPS uplift · Reduced parts waste · Scalable globally', { x: 0.4, y: 5.0, w: 11.0, h: 0.7, fontSize: 12, color: MUTED, align: 'center', fontFace: 'Calibri' });
}

// ── Slide 9: Roadmap ──
{
    const slide = addSlide('Future Roadmap', 'What we are building next');
    const roadmap = [
        { phase: 'Phase 2', items: ['Mobile app (React Native)', 'Manager analytics dashboard with trend charts', 'PDF certificate generator per tier'], color: GREEN },
        { phase: 'Phase 3', items: ['Auto data ingestion from SAP/ERP', 'Push notifications for tier promotions', 'Multi-region: KSA · UAE · Global'], color: ACCENT },
        { phase: 'Phase 4', items: ['AI coaching — personalised improvement tips per engineer', 'Predictive performance modelling', 'API integration with Samsung HR systems'], color: PURPLE },
    ];
    roadmap.forEach((r, i) => {
        const x = 0.3 + i * 3.9;
        slide.addShape(pptx.ShapeType.roundRect, { x, y: 1.3, w: 3.6, h: 4.7, fill: { color: '1E293B' }, line: { color: r.color, width: 2 }, rectRadius: 0.2 });
        slide.addText(r.phase, { x, y: 1.45, w: 3.6, h: 0.45, fontSize: 16, bold: true, color: r.color, align: 'center', fontFace: 'Calibri' });
        slide.addText(r.items.map(it => ({ text: it, options: { bullet: true, paraSpaceAfter: 12 } })), { x: x + 0.2, y: 2.0, w: 3.2, h: 3.8, fontSize: 12, color: WHITE, fontFace: 'Calibri' });
    });
}

// ── Slide 10: Closing ──
{
    const slide = pptx.addSlide();
    slide.background = { color: SLIDE_BG };
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.08, fill: { color: ACCENT } });
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 6.92, w: '100%', h: 0.08, fill: { color: ACCENT } });
    slide.addText('More Than a Leaderboard.', { x: 0, y: 1.2, w: '100%', h: 0.8, fontSize: 34, bold: true, color: WHITE, align: 'center', fontFace: 'Calibri' });
    slide.addText('A cultural shift — from ambiguity to accountability,\nfrom guesswork to gamification,\nfrom spreadsheets to a living performance ecosystem.', { x: 1, y: 2.2, w: 10, h: 1.5, fontSize: 16, color: MUTED, align: 'center', fontFace: 'Calibri', italic: true });
    slide.addText('"Earn Your Tier • Own Your Title"', { x: 0, y: 4.0, w: '100%', h: 0.6, fontSize: 22, bold: true, color: YELLOW, align: 'center', fontFace: 'Calibri', italic: true });
    slide.addText('Samsung Service Operations · February 2026', { x: 0, y: 5.5, w: '100%', h: 0.35, fontSize: 12, color: MUTED, align: 'center', fontFace: 'Calibri' });
}

pptx.writeFile({ fileName: path.join(outputDir, 'TCS_Project_Summary.pptx') }).then(() => {
    console.log('✅ PowerPoint created:', path.join(outputDir, 'TCS_Project_Summary.pptx'));
});
