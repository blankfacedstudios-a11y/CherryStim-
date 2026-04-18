from __future__ import annotations

from datetime import date
from pathlib import Path
from textwrap import wrap

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
    Flowable,
)


WORKSPACE = Path("/workspace")
ASSETS_DIR = WORKSPACE / "assets"
OUTPUT_PDF = WORKSPACE / "CherryStim_IP_Protection_Report_April_2026.pdf"

LOGO_PATH = ASSETS_DIR / "cherrystim_logo.jpg"
HERO_PATH = ASSETS_DIR / "cherrystim_hero.jpg"


class ComicBubble(Flowable):
    """Simple comic-inspired bubble callout with a tail."""

    def __init__(
        self,
        text: str,
        width: float = 6.2 * inch,
        bubble_height: float = 0.65 * inch,
        bg_color=colors.HexColor("#fff5b5"),
        stroke_color=colors.HexColor("#b00020"),
    ) -> None:
        super().__init__()
        self.text = text
        self.width = width
        self.bubble_height = bubble_height
        self.tail_height = 0.16 * inch
        self.height = self.bubble_height + self.tail_height + 0.03 * inch
        self.bg_color = bg_color
        self.stroke_color = stroke_color

    def wrap(self, available_width, available_height):
        return self.width, self.height

    def draw(self):
        canvas = self.canv
        y_offset = self.tail_height

        canvas.saveState()
        canvas.setStrokeColor(self.stroke_color)
        canvas.setFillColor(self.bg_color)
        canvas.setLineWidth(2)
        canvas.roundRect(0, y_offset, self.width, self.bubble_height, 0.14 * inch, stroke=1, fill=1)

        tail = canvas.beginPath()
        tail.moveTo(self.width * 0.12, y_offset)
        tail.lineTo(self.width * 0.20, 0)
        tail.lineTo(self.width * 0.28, y_offset)
        tail.close()
        canvas.drawPath(tail, stroke=1, fill=1)

        canvas.setFillColor(colors.HexColor("#111111"))
        canvas.setFont("Helvetica-Bold", 10.5)
        max_chars = max(52, int(self.width / 5.9))
        lines = wrap(self.text.upper(), width=max_chars)
        lines = lines[:2]
        text_start_y = y_offset + self.bubble_height - 0.20 * inch
        for idx, line in enumerate(lines):
            canvas.drawString(0.2 * inch, text_start_y - (idx * 0.16 * inch), line)
        canvas.restoreState()


def draw_cover_canvas(canvas, doc):
    """Cover page accents only (story content handles text/images)."""
    w, h = LETTER
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#f8f9fc"))
    canvas.rect(0, 0, w, h, stroke=0, fill=1)

    canvas.setFillColor(colors.HexColor("#7a001e"))
    canvas.rect(0, h - 1.0 * inch, w, 1.0 * inch, stroke=0, fill=1)

    canvas.setFillColor(colors.HexColor("#d4af37"))
    canvas.rect(0, h - 1.03 * inch, w, 0.03 * inch, stroke=0, fill=1)

    canvas.setFillColor(colors.HexColor("#7a001e"))
    canvas.rect(0, 0, w, 0.33 * inch, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(0.7 * inch, 0.13 * inch, "Confidential - Internal Use Only")
    canvas.restoreState()


def draw_letterhead(canvas, doc):
    w, h = LETTER
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#7a001e"))
    canvas.rect(0, h - 0.58 * inch, w, 0.58 * inch, stroke=0, fill=1)
    canvas.setFillColor(colors.HexColor("#d4af37"))
    canvas.rect(0, h - 0.61 * inch, w, 0.03 * inch, stroke=0, fill=1)

    if LOGO_PATH.exists():
        canvas.drawImage(
            str(LOGO_PATH),
            0.55 * inch,
            h - 0.53 * inch,
            width=0.70 * inch,
            height=0.46 * inch,
            preserveAspectRatio=True,
            mask="auto",
        )

    canvas.setFont("Helvetica-Bold", 11)
    canvas.setFillColor(colors.white)
    canvas.drawString(1.35 * inch, h - 0.30 * inch, "CherryStim IP Protection Master Roadmap")

    canvas.setFont("Helvetica", 8.7)
    canvas.setFillColor(colors.HexColor("#333333"))
    canvas.drawString(0.65 * inch, 0.42 * inch, "Prepared for Sovereign Stewardship / Prov31Ministries Portfolio")
    canvas.drawRightString(w - 0.65 * inch, 0.42 * inch, f"Page {doc.page}")
    canvas.drawRightString(w - 0.65 * inch, 0.26 * inch, "Confidential - Internal Use Only")
    canvas.restoreState()


def build_styles():
    styles = getSampleStyleSheet()

    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=30,
            alignment=1,
            textColor=colors.HexColor("#1b1b1b"),
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=14.5,
            alignment=1,
            textColor=colors.HexColor("#2f2f2f"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=17,
            textColor=colors.HexColor("#7a001e"),
            spaceBefore=8,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#222222"),
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletBody",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            leftIndent=14,
            bulletIndent=4,
            textColor=colors.HexColor("#222222"),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ProjectHeading",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=colors.HexColor("#121212"),
            backColor=colors.HexColor("#f4f6fa"),
            borderPadding=6,
            spaceBefore=10,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11.8,
            textColor=colors.HexColor("#252525"),
        )
    )
    return styles


def ranking_records():
    return [
        {
            "rank": "1",
            "doc": "CherryStim_IP_Protection_Guide.html",
            "rationale": "Lowest cost and fastest timeline; four explicit patent opportunities; AR/live-stream workflow has elevated copy risk.",
            "cost": "$5K-$9.5K",
            "timeline": "1-6 months",
            "value": "High (4 innovations) / Very High",
        },
        {
            "rank": "2",
            "doc": "SlateFlix_IP_Protection_Checklist.pdf",
            "rationale": "Ready-to-file critical trademarks with high success likelihood and rapid lock-in for core cinematic brand assets.",
            "cost": "$4K-$8K",
            "timeline": "2-8 months",
            "value": "Medium / High",
        },
        {
            "rank": "3",
            "doc": "Aficionado_IP_Protection_and_Valuation_Report_v4.pdf",
            "rationale": "Strong trademark cost table and clear valuation range; word-mark-first path is executable and defensible.",
            "cost": "$20K-$32K",
            "timeline": "8-14 months",
            "value": "Medium / High",
        },
        {
            "rank": "4",
            "doc": "Beararms_IP_Protection_Roadmap_2026.pdf",
            "rationale": "Prebuilt USPTO + copyright roadmap and software/AI asset profile supports efficient US-first filings.",
            "cost": "$8K-$15K",
            "timeline": "3-9 months",
            "value": "Medium (AI) / High",
        },
        {
            "rank": "5",
            "doc": "SovereignStewardship_IP_Protection_Strategy.pdf",
            "rationale": "Higher budget but strong upside in credits/ROSCA/AI; copyrights and trademarks provide immediate legal leverage.",
            "cost": "$28.5K-$52K (+patent)",
            "timeline": "4-12 months",
            "value": "High / High",
        },
        {
            "rank": "6",
            "doc": "Scoville_Trestle_IP_Protection_Dossier_v2.pdf",
            "rationale": "Large asset universe and high novelty, but urgency is lower than the brand-critical first wave.",
            "cost": "$15K-$35K",
            "timeline": "6-12 months",
            "value": "High / High",
        },
        {
            "rank": "7",
            "doc": "CloudSwift_IP_Protection_Dossier.pdf",
            "rationale": "Tanzania filing advantage and pending fintech inventions; local-first maintenance is strategic before global spend.",
            "cost": "$10K-$25K",
            "timeline": "4-10 months",
            "value": "High / Very High",
        },
        {
            "rank": "8",
            "doc": "Malkias_Collection_IP_Registry.pptx",
            "rationale": "Highest complexity with 30+ jurisdictions and Madrid/PCT burden; defer until first-wave protections are stable.",
            "cost": "$25K-$60K+",
            "timeline": "12-24+ months",
            "value": "Very High / Very High",
        },
    ]


def ranking_tables(styles):
    s = styles["Small"]
    b = ParagraphStyle(
        "TableBodySmall",
        parent=s,
        fontSize=8.3,
        leading=10.4,
        wordWrap="CJK",
    )
    h = ParagraphStyle(
        "TableHeaderSmall",
        parent=s,
        fontName="Helvetica-Bold",
        fontSize=8.0,
        leading=9.8,
        textColor=colors.white,
        wordWrap="CJK",
    )

    def p(text: str):
        return Paragraph(text, b)

    def ph(text: str):
        return Paragraph(text, h)

    records = ranking_records()

    summary = [
        [ph("Rank"), ph("Document / Project"), ph("Key Multi-Criteria Rationale")]
    ]
    finance = [
        [ph("Rank"), ph("Year-1 DIY Cost Est."), ph("Fastest Timeline"), ph("Patent Value / Creativity Sensitivity")]
    ]

    for row in records:
        summary.append([p(row["rank"]), p(row["doc"]), p(row["rationale"])])
        finance.append([p(row["rank"]), p(row["cost"]), p(row["timeline"]), p(row["value"])])

    return summary, finance


def add_bullets(story, style, items):
    for item in items:
        story.append(Paragraph(f"• {item}", style))


def build_story(styles):
    today = date(2026, 4, 18).strftime("%d %B %Y")
    story = []

    # Cover page
    top_left = []
    if LOGO_PATH.exists():
        top_left.append(Image(str(LOGO_PATH), width=1.65 * inch, height=1.08 * inch))
    else:
        top_left.append(Paragraph("<b>CherryStim</b>", styles["Body"]))

    top_right = Paragraph(
        "<b>Professional IP Prioritization & DIY Roadmap Report</b><br/>"
        "April 2026 Edition<br/><br/>"
        "<b>Prepared for:</b> Sovereign Stewardship / Prov31Ministries Portfolio<br/>"
        "<b>Author:</b> Grok Analysis of 8 Attached IP Documents<br/>"
        f"<b>Date:</b> {today}<br/>"
        "<b>Classification:</b> Confidential - Internal Use Only",
        styles["Body"],
    )
    cover_head = Table(
        [[top_left[0], top_right]],
        colWidths=[2.0 * inch, 4.7 * inch],
        hAlign="CENTER",
    )
    cover_head.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#ffffff")),
                ("BOX", (0, 0), (-1, -1), 1.0, colors.HexColor("#d8dbe5")),
                ("INNERPADDING", (0, 0), (-1, -1), 10),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    story.append(cover_head)
    story.append(Spacer(1, 0.22 * inch))

    hero_images = []
    if HERO_PATH.exists():
        hero_images.append(Image(str(HERO_PATH), width=4.35 * inch, height=3.0 * inch))
    else:
        hero_images.append(Paragraph("Hero image unavailable", styles["Body"]))

    if LOGO_PATH.exists():
        hero_images.append(Image(str(LOGO_PATH), width=2.05 * inch, height=1.35 * inch))
    else:
        hero_images.append(Paragraph("Logo unavailable", styles["Body"]))

    hero_table = Table([[hero_images[0], hero_images[1]]], colWidths=[4.45 * inch, 2.25 * inch], hAlign="CENTER")
    hero_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (1, 0), (1, 0), "CENTER"),
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0f172a")),
                ("BOX", (0, 0), (-1, -1), 1.0, colors.HexColor("#b6b9c8")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    story.append(hero_table)
    story.append(Spacer(1, 0.26 * inch))

    story.append(Paragraph("IP Docs Prioritization: 1 (Most Urgent) to 8 (Least Urgent)", styles["CoverTitle"]))
    story.append(
        Paragraph(
            "Fortune 500-grade strategy layout with signature action-hero visual accents.<br/>"
            "No overlap design: text blocks, logos, and hero imagery are isolated in independent containers.",
            styles["CoverSub"],
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(ComicBubble("Action first: execute rank #1 immediately to lock high-creativity assets under protection in under 90 days."))
    story.append(Spacer(1, 0.05 * inch))
    story.append(ComicBubble("Pow! File provisional patents and core trademarks before broad international expansion."))
    story.append(PageBreak())

    # Body
    story.append(Paragraph("Executive Summary", styles["Section"]))
    story.append(
        Paragraph(
            "All eight documents were analyzed in full, including executive summaries, asset inventories, cost tables, filing lists, roadmaps, and jurisdiction matrices. "
            "Prioritization applies the requested criteria in order: cost efficiency for DIY filing, creativity sensitivity/copy risk, probability of success, business importance, "
            "patent value, total expense profile, and speed to enforceable rights.",
            styles["Body"],
        )
    )
    story.append(
        Paragraph(
            "<b>Outcome:</b> CherryStim and SlateFlix are the highest-priority immediate actions due to low cost and fastest timelines, with core protection achievable in under 90 days.",
            styles["Body"],
        )
    )

    story.append(Paragraph("Ranked Order (1 = Tackle First, Right Now)", styles["Section"]))
    rank_summary_data, rank_finance_data = ranking_tables(styles)

    rank_summary_table = Table(
        rank_summary_data,
        colWidths=[0.50 * inch, 1.78 * inch, 4.12 * inch],
        repeatRows=1,
        hAlign="LEFT",
    )
    rank_summary_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#7a001e")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bcc1cc")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f9fafc")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#ffffff"), colors.HexColor("#f1f4f9")]),
                ("ALIGN", (0, 0), (0, -1), "CENTER"),
                ("WORDWRAP", (0, 0), (-1, -1), "CJK"),
            ]
        )
    )
    story.append(rank_summary_table)
    story.append(Spacer(1, 0.10 * inch))

    rank_finance_table = Table(
        rank_finance_data,
        colWidths=[0.50 * inch, 1.70 * inch, 1.58 * inch, 2.62 * inch],
        repeatRows=1,
        hAlign="LEFT",
    )
    rank_finance_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#7a001e")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bcc1cc")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f9fafc")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#ffffff"), colors.HexColor("#f1f4f9")]),
                ("ALIGN", (0, 0), (0, -1), "CENTER"),
                ("WORDWRAP", (0, 0), (-1, -1), "CJK"),
            ]
        )
    )
    story.append(rank_finance_table)
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        Paragraph(
            "<b>Most Expensive → Least Expensive Overall:</b> Malkias (8) > Sovereign + patent (5) > Aficionado (3) > Scoville (6) > CloudSwift (7) > Beararms (4) > SlateFlix (2) > CherryStim (1).",
            styles["Body"],
        )
    )
    story.append(
        Paragraph(
            "<b>Fastest Completion:</b> CherryStim (1) and SlateFlix (2), with core protections potentially live in under 90 days through disciplined DIY filing.",
            styles["Body"],
        )
    )

    story.append(Paragraph("5-Star Law Firm DIY Roadmap Strategy", styles["Section"]))
    add_bullets(
        story,
        styles["BulletBody"],
        [
            "Sequence: inventory + clearance -> provisional/registration filing -> NDAs/contracts -> monitor/enforce -> lawyer only for office actions/oppositions.",
            "Primary portals: USPTO (Patent Center, TEAS), USCO eCO, WIPO Madrid/PCT, BRELA/COSOTA for Tanzania filings.",
            "Escalate to counsel only when rejection complexity or international national-phase prosecution exceeds DIY leverage.",
        ],
    )

    projects = [
        (
            "1. CherryStim (Most Urgent - Start Today)",
            "$5K-$9.5K",
            "1-6 months",
            [
                "Day 1-3: inventory assets (marks + innovations) and run clearance checks via Google, USPTO TESS, and WIPO Global Brand Database.",
                "Week 1-2: file four provisional patents through USPTO Patent Center (target ~$320 each, entity dependent).",
                "Week 2-3: file four trademarks through TEAS Plus with documented classes/specimens.",
                "Month 1: file copyrights for code, AR filters, and media through copyright.gov eCO.",
                "Month 1-2: execute NDAs + work-for-hire clauses before contractor/vendor disclosures.",
                "Month 2-3: activate defensive domains and infringement monitoring (alerts/watch service).",
                "Month 3-6: launch Madrid filing based on US filing base for priority international markets.",
            ],
        ),
        (
            "2. SlateFlix",
            "$4K-$8K",
            "2-8 months",
            [
                "Prioritize critical marks first (SlateFlix, SlateCoin, logos) with TEAS Plus filing sequence.",
                "Register platform code and media library copyrights early for enforcement leverage.",
                "Deploy NDAs and assignment agreements from checklist templates.",
                "Begin Madrid extension after domestic filing acceptance window opens.",
            ],
        ),
        (
            "3. Aficionado",
            "$20K-$32K",
            "8-14 months",
            [
                "File word marks first based on documented priority table and class strategy.",
                "Conduct full clearance and conflict triage for higher-value marks.",
                "Register codebase and valuation-supporting documents for evidentiary defense.",
                "Use counsel only for design mark disputes or office-action complexity.",
            ],
        ),
        (
            "4. Beararms",
            "$8K-$15K",
            "3-9 months",
            [
                "Execute USPTO class strategy (including 42/45 as documented) and software copyright registrations.",
                "Follow roadmap pages with strict sequence to maximize speed-to-allowance.",
                "Assign IP to holding structure using clean transfer agreements and timestamped chain-of-title records.",
            ],
        ),
        (
            "5. Sovereign Stewardship",
            "$28.5K-$52K (+patent)",
            "4-12 months",
            [
                "Register film/script/code copyrights first for fast statutory-damages readiness.",
                "Proceed with trademark wave after low-conflict mark screening.",
                "File provisional patents only if budget permits for highest-value methods.",
                "Harden trade-secret controls through NDAs and controlled-access repositories.",
            ],
        ),
        (
            "6. Scoville Trestle",
            "$15K-$35K",
            "6-12 months",
            [
                "Build copyright registry for listed works with annual update cadence.",
                "File provisional patents for stacked-revenue and AI methods.",
                "Enforce work-for-hire and assignment clauses as mandatory intake controls.",
            ],
        ),
        (
            "7. CloudSwift (TZ Advantage)",
            "$10K-$25K",
            "4-10 months",
            [
                "Deposit core works through COSOTA for local enforceability.",
                "Maintain BRELA trademark and patent filings with status audits.",
                "Use Berne/PCT pathways for deliberate international expansion.",
            ],
        ),
        (
            "8. Malkias Collection (Do Last)",
            "$25K-$60K+",
            "12-24+ months",
            [
                "Launch with US provisional + EUTM + USPTO TM in staged sequence.",
                "Use Madrid from base filing and PCT for patent expansion.",
                "Defer broad national-phase entries until early portfolio outcomes are validated.",
                "Engage counsel for national-phase prosecution and multi-jurisdiction disputes.",
            ],
        ),
    ]

    for heading, cost, timeline, steps in projects:
        story.append(Paragraph(heading, styles["ProjectHeading"]))
        story.append(
            Paragraph(
                f"<b>DIY Cost Estimate:</b> {cost} &nbsp;&nbsp;&nbsp; <b>Fastest Timeline:</b> {timeline}",
                styles["Body"],
            )
        )
        add_bullets(story, styles["BulletBody"], steps)

    story.append(Paragraph("Detailed Patent Prosecution Steps (DIY Until Office Action)", styles["Section"]))
    add_bullets(
        story,
        styles["BulletBody"],
        [
            "Provisional filing: prepare title, background, detailed description, figures, best mode, and support language; file through USPTO Patent Center for priority date.",
            "Mark inventions Patent Pending immediately after filing receipt and track 12-month conversion deadline.",
            "Non-provisional filing: submit complete specification, claims, abstract, drawings, oath/declaration, and fees.",
            "Office action response cycle: expect 2-3 rounds in many cases; maintain six-month response deadlines.",
            "Allowance and grant: pay issue fee, then track maintenance fees at 3.5 / 7.5 / 11.5 years.",
            "International option: file PCT within 12 months of priority and enter national phase by month 30/31.",
        ],
    )

    story.append(Paragraph("International Filing Framework", styles["Section"]))
    add_bullets(
        story,
        styles["BulletBody"],
        [
            "Trademarks (Madrid): base filing -> MM2/eMadrid -> WIPO formal exam -> designated-country examination -> refusals managed locally.",
            "Patents (PCT): priority filing -> international search/written opinion -> national/regional phase entry.",
            "Copyright: automatic Berne protection, with strategic registration in key jurisdictions for enforcement and damages.",
            "TZ specifics: BRELA for trademarks/patents and COSOTA deposits for local copyright enforcement.",
        ],
    )

    story.append(Paragraph("12-18 Month Execution Calendar", styles["Section"]))
    add_bullets(
        story,
        styles["BulletBody"],
        [
            "Month 1: complete CherryStim + SlateFlix core filings, clearance, and NDA templates.",
            "Months 2-3: execute Aficionado word marks and Beararms roadmap filings.",
            "Months 4-6: deploy Sovereign + Scoville filings; include provisionals if budget allows.",
            "Months 6-9: maintain CloudSwift local filings and sequence global options.",
            "Q4 2026 onward: activate Malkias international expansion pipeline.",
            "Quarterly: update master registry (asset, filing date, status, renewal, notes), monitor infringement, and audit trade-secret controls.",
        ],
    )

    story.append(Spacer(1, 0.12 * inch))
    story.append(ComicBubble("Total DIY savings target: 60%-80% versus full early-stage law-firm handling, while preserving escalation options."))

    story.append(Spacer(1, 0.14 * inch))
    story.append(Paragraph("End of Report", styles["Section"]))
    story.append(
        Paragraph(
            "This report presents a complete execution package based on the eight analyzed documents and 2026 filing practices. "
            "Immediate action focus remains Rank #1 (CherryStim) for maximum creativity-protection velocity at minimal initial cost.",
            styles["Body"],
        )
    )

    return story


def main():
    if not LOGO_PATH.exists() or not HERO_PATH.exists():
        raise FileNotFoundError(
            "Required assets missing. Expected files: "
            f"{LOGO_PATH} and {HERO_PATH}"
        )

    styles = build_styles()
    story = build_story(styles)

    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=LETTER,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.95 * inch,
        bottomMargin=0.72 * inch,
        title="CherryStim IP Protection Master Roadmap - April 2026",
        author="Sovereign Stewardship / Prov31Ministries",
        subject="Professional IP Prioritization & DIY Roadmap",
    )

    doc.build(story, onFirstPage=draw_cover_canvas, onLaterPages=draw_letterhead)
    print(f"Generated PDF: {OUTPUT_PDF}")


if __name__ == "__main__":
    main()
