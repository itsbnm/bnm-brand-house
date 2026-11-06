import type { Article, Product, Project, Resource, Service } from "./types";

export const studio = {
  name: "BNM Brand House",
  line: "Strategy. Identity. Experience.",
  promise: "Brands built to be remembered.",
  email: "bnmbrandhouse@gmail.com",
  phone: "+234 905 961 0911",
  phoneHref: "tel:+2349059610911",
  web: "www.bnmbrandhouse.com",
  hours: "Monday to Friday, 10:00–16:00 WAT",
};

export const services: Service[] = [
  {
    slug: "brand-strategy",
    name: "Brand strategy",
    summary:
      "Positioning, audience, and the decisions a brand should make before any visual work begins.",
    forWhom:
      "Founders, personal brands, and organisations whose offer is sound but whose market position is fuzzy.",
    outcomes: [
      "A clear point of view the business can repeat",
      "Audience and offer defined tightly enough to guide design and communications",
      "A practical sequence for what to build next",
    ],
    notes: [
      "Strategy is scoped on its own. It is not automatically included in a visual identity package.",
      "If you are still deciding whether to rebrand, start with the consultation rather than a full engagement.",
    ],
    offers: [
      {
        id: "strategy-session",
        name: "Brand strategy session",
        price: 250,
        summary: "A 75-minute working session for a personal brand or a business brand.",
        bestFor: "Someone who needs a decision, not a full strategy document yet.",
        includes: [
          "Pre-session brief so the hour is spent on decisions",
          "Position, audience, and the single next move",
          "Written summary of what was agreed",
        ],
      },
      {
        id: "strategy-retainer",
        name: "Strategy engagement",
        price: null,
        summary: "A scoped engagement for positioning, messaging, and brand architecture.",
        bestFor: "Companies and public figures who need the system, not a single conversation.",
        includes: [
          "Discovery across the business, audience, and competitors",
          "Positioning and messaging",
          "A roadmap the identity and communications work can follow",
        ],
      },
    ],
    work: ["northline-advisory", "harbor-and-hearth"],
  },
  {
    slug: "brand-identity",
    name: "Brand identity",
    summary:
      "Visual systems that carry a strategy into every touchpoint, from the mark to the templates people actually use.",
    forWhom:
      "Startups establishing a presence, growing businesses whose materials no longer match, and premium brands that need a wider system.",
    outcomes: [
      "A mark and visual system people can apply without guessing",
      "Guidelines and source files the team can keep using",
      "Collateral matched to the stage of the business",
    ],
    notes: [
      "Every identity engagement starts with discovery. Design follows a defined direction.",
      "Final scope can shift with industry and application. The packages below are the studio’s standard frames.",
    ],
    offers: [
      {
        id: "essentials",
        name: "Brand essentials",
        price: 800,
        summary: "A visual foundation for a clean market entry.",
        bestFor: "Startups, entrepreneurs, and new businesses.",
        includes: [
          "Brand discovery and creative direction",
          "Logo design or refinement",
          "Colour, typography, and mini guidelines",
          "Business card, letterhead, and three social templates",
          "Essential digital assets and source files",
        ],
      },
      {
        id: "presence",
        name: "Brand presence",
        price: 1500,
        summary: "A consistent presence across digital and physical touchpoints.",
        bestFor: "Growing businesses, service providers, and polished personal brands.",
        includes: [
          "Everything in Essentials",
          "Expanded guidelines and profile assets",
          "Five social templates and a proposal template",
          "One marketing collateral design, mockups, and a organised asset library",
        ],
      },
      {
        id: "signature",
        name: "Signature brand",
        price: 2500,
        summary: "Strategy-aware identity for brands that need to be taken more seriously.",
        bestFor: "Established businesses and premium service brands.",
        includes: [
          "Everything in Presence",
          "Deeper discovery and a fuller visual system",
          "Eight social templates and two collateral designs",
          "A presentation system, one packaging asset where relevant, and implementation guidance",
        ],
      },
      {
        id: "premium",
        name: "Premium brand system",
        price: 3500,
        summary: "Direction across a wider ecosystem of touchpoints.",
        bestFor: "Product brands, established figures, and expanding companies.",
        includes: [
          "Everything in Signature",
          "Twelve social templates and a stationery suite",
          "Four collateral designs, two packaging assets, and four campaign assets",
          "Further consultation and custom templates",
        ],
      },
      {
        id: "bespoke",
        name: "Bespoke brand partnership",
        price: null,
        summary: "A custom engagement from $5,000, scoped after discovery.",
        bestFor: "Corporates, multi-brand portfolios, and complex mandates.",
        includes: [
          "In-depth strategy and positioning",
          "Identity across more than one brand or audience",
          "A production plan matched to the real footprint of the organisation",
        ],
      },
    ],
    work: ["harbor-and-hearth", "atelier-sola", "fieldnote-foundation"],
  },
  {
    slug: "public-relations",
    name: "Public relations",
    summary:
      "A point of view, placed where the right people will meet it: stories, announcements, and the discipline to stay consistent.",
    forWhom:
      "Brands with something real to say and a need to be understood by press, partners, or a specific public.",
    outcomes: [
      "A narrative the organisation can stand behind",
      "A practical outreach and announcement plan",
      "Materials a journalist or partner can use without a chase",
    ],
    notes: [
      "PR is scoped to the story and the market. It is not sold as a fixed package.",
      "If the story itself is unclear, begin with strategy or a consultation.",
    ],
    offers: [
      {
        id: "pr-retainer",
        name: "PR engagement",
        price: null,
        summary: "Narrative, materials, and a placement plan for a defined period.",
        bestFor: "Launches, reputational resets, and ongoing visibility.",
        includes: [
          "Story and message architecture",
          "Announcement and media materials",
          "A sequenced outreach plan and reporting rhythm",
        ],
      },
    ],
    work: ["fieldnote-foundation", "northline-advisory"],
  },
  {
    slug: "outdoor",
    name: "Outdoor advertising",
    summary:
      "Billboard and out-of-home placement for a message that has to work in a glance, in a specific city.",
    forWhom: "Campaigns that already know what they are saying and need physical presence.",
    outcomes: [
      "A message cut for the format, not a poster of the website",
      "Placement options matched to the audience and the city",
      "Artwork prepared for production",
    ],
    notes: [
      "Media costs depend on site, duration, and city. The studio quotes the campaign after the brief.",
      "Bring the offer and the dates. The desk returns a placement recommendation and a price range.",
    ],
    offers: [
      {
        id: "outdoor-campaign",
        name: "Outdoor campaign",
        price: null,
        summary: "Concept, artwork, and a placement recommendation.",
        bestFor: "Product launches, events, and city-level announcements.",
        includes: [
          "Message cut for the format",
          "Site recommendation",
          "Production-ready artwork and a vendor handoff",
        ],
      },
    ],
    work: ["harbor-and-hearth"],
  },
  {
    slug: "websites",
    name: "Websites",
    summary:
      "Sites that explain the work, show the proof, and let a visitor book, buy, or enquire without a scavenger hunt.",
    forWhom: "Brands whose current site is a brochure, or who have no site that can take a next step.",
    outcomes: [
      "A structure a visitor can understand in a minute",
      "A path to enquire, book, or buy",
      "Pages the team can keep updating",
    ],
    notes: [
      "A marketing site with clear service pages is a fixed engagement. Shops, booking, and custom tools are quoted.",
    ],
    offers: [
      {
        id: "site-launch",
        name: "Launch site",
        price: 2200,
        summary: "A marketing site with service pages, work, journal, and enquiry.",
        bestFor: "Practices that need a credible public home.",
        includes: [
          "Structure, design, and build",
          "Core pages and a journal",
          "Enquiry paths and a handover for routine edits",
        ],
      },
      {
        id: "site-platform",
        name: "Service and shop platform",
        price: null,
        summary: "Booking, payments, and product flows, scoped to the operation.",
        bestFor: "Studios and product brands that want the site to do the work.",
        includes: [
          "The launch site, plus commerce or booking",
          "Admin paths for orders, enquiries, and content",
          "A handover the team can run without a developer for day-to-day updates",
        ],
      },
    ],
    work: ["atelier-sola", "northline-advisory"],
  },
  {
    slug: "social-media",
    name: "Social media strategy",
    summary:
      "A content system with a point of view, not a pile of posts. What to say, where, and what to stop doing.",
    forWhom: "Brands posting often without a position, or going quiet because nobody owns the system.",
    outcomes: [
      "A content territory the brand can sustain",
      "Formats matched to the offer",
      "A short plan the team can execute",
    ],
    notes: [
      "The audit is a fixed, bookable start. Ongoing production is quoted after the audit.",
    ],
    offers: [
      {
        id: "social-audit",
        name: "Social brand audit",
        price: 400,
        summary: "A written read of the current presence and a 30-day correction plan.",
        bestFor: "Teams that want an outside decision before they produce more.",
        includes: [
          "Review of the live profiles and recent work",
          "What to stop, what to keep, what to build",
          "A 30-day plan with formats and a point of view",
        ],
      },
      {
        id: "social-system",
        name: "Content system",
        price: null,
        summary: "An ongoing system for strategy and production.",
        bestFor: "Brands ready to publish on a rhythm.",
        includes: [
          "Territories, series, and a production rhythm",
          "Templates the team can reuse",
          "A monthly review of what the work is doing",
        ],
      },
    ],
    work: ["atelier-sola", "fieldnote-foundation"],
  },
];

export const projects: Project[] = [
  {
    slug: "fieldnote-foundation",
    title: "Fieldnote",
    sector: "Foundation",
    service: "brand-identity",
    year: "2025",
    summary: "A maternal-health foundation whose public face had fallen behind the seriousness of the work.",
    brief:
      "The organisation was trusted in the room and unclear in public. Partners met a different story on every document.",
    solution:
      "A tighter name system, a quieter visual identity, and a small set of materials donors and beneficiaries could both recognise.",
    outcome:
      "One voice across proposals, social templates, and the public site. The team stopped redesigning every announcement.",
  },
  {
    slug: "atelier-sola",
    title: "Atelier",
    sector: "Personal brand",
    service: "social-media",
    year: "2026",
    summary: "A speaker whose expertise was real and whose public materials were still introducing her from scratch.",
    brief:
      "Every new room required a fresh explanation. The content calendar and the stage story did not match.",
    solution:
      "A position in one sentence, a visual system for talks and social, and a series structure she could keep.",
    outcome:
      "The same introduction now works on a slide, a profile, and a proposal. New content extends the position instead of restarting it.",
  },
  {
    slug: "harbor-and-hearth",
    title: "Harbor & Hearth",
    sector: "Hospitality",
    service: "brand-identity",
    year: "2025",
    summary: "A hospitality group opening a second property without a brand that could hold both.",
    brief:
      "The first property had charm and no system. A second site would have produced a second, unrelated brand.",
    solution:
      "A house identity, a way to name properties inside it, packaging for amenities, and a short outdoor announcement.",
    outcome:
      "Guests meet one house. The group can open the next property without commissioning a new logo.",
  },
  {
    slug: "northline-advisory",
    title: "Northline",
    sector: "Professional services",
    service: "brand-strategy",
    year: "2026",
    summary: "An advisory firm that sounded like every other firm on its own website.",
    brief:
      "Capable people, generic language, and a site that listed services without helping a buyer choose.",
    solution:
      "A sharper offer, a site organised around decisions a client actually makes, and a consultation path.",
    outcome:
      "Enquiries arrive with context. The team spends less time explaining what the firm is for.",
  },
];

export const products: Product[] = [
  {
    slug: "heavyweight-tee",
    name: "Heavyweight tee",
    category: "Apparel",
    price: 28,
    summary: "A ready-made studio tee in the house colours.",
    description:
      "Garment-dyed heavyweight cotton with a small chest mark. Ready to ship. For a run with your own artwork, use the custom print desk.",
    colors: ["Ink", "Paper", "Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    lead: "Ships in 5 working days, or collect in Lagos.",
  },
  {
    slug: "studio-cap",
    name: "Studio cap",
    category: "Apparel",
    price: 22,
    summary: "An unstructured cap with a woven mark.",
    description:
      "Washed cotton, adjustable. A ready-made piece. Branded team caps are quoted as a custom run.",
    colors: ["Ink", "Sand"],
    sizes: ["One size"],
    lead: "Ships in 5 working days, or collect in Lagos.",
  },
  {
    slug: "ceramic-cup",
    name: "Ceramic cup",
    category: "Drinkware",
    price: 16,
    summary: "A matte cup for the desk, marked on the base.",
    description:
      "11oz matte ceramic. Ready-made. Printed runs for teams and gifts start on the custom desk.",
    colors: ["Bone", "Ink"],
    sizes: ["11oz"],
    lead: "Ships in 5 working days. Mugs travel boxed.",
  },
  {
    slug: "market-tote",
    name: "Market tote",
    category: "Bags",
    price: 18,
    summary: "A sturdy canvas tote with the house wordmark.",
    description:
      "Heavy canvas, long handles. Ready-made. Event and retail totes with your artwork are a custom order.",
    colors: ["Natural", "Ink"],
    sizes: ["One size"],
    lead: "Ships in 5 working days, or collect in Lagos.",
  },
  {
    slug: "executive-notebook",
    name: "Executive notebook set",
    category: "Gifts",
    price: 45,
    summary: "A cloth notebook and pen, packed as a single gift.",
    description:
      "A6 cloth notebook and a matching pen. Ready to give. Foil names and larger gift programmes are quoted.",
    colors: ["Ink", "Forest"],
    sizes: ["A6"],
    lead: "Ships in 7 working days.",
  },
  {
    slug: "house-gift-box",
    name: "House gift box",
    category: "Gifts",
    price: 68,
    summary: "Cup, notebook, and tea, packed in a rigid box.",
    description:
      "A ready executive set. Corporate programmes with custom inserts, cards, and quantities go through the custom desk.",
    colors: ["Paper"],
    sizes: ["One set"],
    lead: "Packed to order. Allow 7 working days.",
  },
];

export const resources: Resource[] = [
  {
    slug: "readiness-checklist",
    kind: "checklist",
    title: "Brand readiness checklist",
    price: 0,
    summary: "Twelve questions to answer before you commission identity, a site, or a campaign.",
    length: "15 minutes",
    preview: [
      "Use this before you book. If several answers are blank, start with a consultation rather than a full identity.",
    ],
    body: [
      {
        heading: "The offer",
        paragraphs: [
          "Write one sentence a buyer could repeat: who it is for, what it changes, and why this practice rather than a neighbouring one.",
          "If that sentence needs a paragraph of caveats, the work is strategy, not a logo.",
        ],
      },
      {
        heading: "The audience",
        paragraphs: [
          "Name the person who should say yes, and the person you are willing to be wrong for. A brand that is for everyone has no materials that fit.",
        ],
      },
      {
        heading: "The proof",
        paragraphs: [
          "List three pieces of work, clients, or outcomes you are willing to show. If you cannot, the portfolio page should wait and the offer should be narrower.",
        ],
      },
      {
        heading: "The system",
        paragraphs: [
          "Note who will publish, who will answer enquiries, and who approves a quote. A beautiful site with nobody on the other side of the form is a brochure.",
          "Bring this page to a consultation. The session will use your answers, not a generic deck.",
        ],
      },
    ],
  },
  {
    slug: "positioning-workbook",
    kind: "workbook",
    title: "Positioning workbook",
    price: 45,
    summary: "A short working document for founders and personal brands who need the sentence before the system.",
    length: "Half a day",
    preview: [
      "Four exercises: the job, the refusal, the proof, and the sentence. Unlocks on this site after checkout.",
    ],
    body: [
      {
        heading: "1. The job",
        paragraphs: [
          "Describe the situation a client is in the week before they call you. Not the demographic. The mess.",
          "Write the sentence they would use with a friend. Keep their words. Your jargon can wait.",
        ],
      },
      {
        heading: "2. The refusal",
        paragraphs: [
          "List the work you will not take, even if it pays. A position is as much a refusal as a claim.",
          "If the list is empty, you do not have a brand yet. You have availability.",
        ],
      },
      {
        heading: "3. The proof",
        paragraphs: [
          "Attach one story to the claim. Brief, decision, result. If the result is private, describe the decision the work made possible.",
        ],
      },
      {
        heading: "4. The sentence",
        paragraphs: [
          "Draft: We help [person in that mess] to [outcome] by [the specific way you work], so they can [what changes next].",
          "Read it aloud. If you flinch, the flinch is the next edit. Stop when a stranger could repeat it.",
        ],
      },
    ],
  },
  {
    slug: "brand-decisions",
    kind: "course",
    title: "Brand decisions",
    price: 180,
    summary: "Four lessons on the calls that make a brand hold together. Read on this site. No separate login.",
    length: "Four lessons",
    preview: [
      "Discover, define, design, deliver — with the decision each stage is supposed to settle.",
    ],
    body: [
      {
        heading: "Lesson 1 · Discover",
        paragraphs: [
          "Collect the business, the audience, the constraint, and the thing that is already working. Do not collect adjectives.",
          "The output is a page of facts, not a moodboard. If a fact is missing, that is the next question, not a gap to design over.",
        ],
      },
      {
        heading: "Lesson 2 · Define",
        paragraphs: [
          "Choose the position and the creative direction in writing before anyone opens a design file.",
          "A direction is a decision: this audience, this tone, this refusal. If two directions remain, you are not ready to design.",
        ],
      },
      {
        heading: "Lesson 3 · Design",
        paragraphs: [
          "Build the smallest system the team will actually use. A logo nobody can place, and twelve unused templates, is not an identity.",
          "Judge the work by whether a colleague can make the next item without asking.",
        ],
      },
      {
        heading: "Lesson 4 · Deliver",
        paragraphs: [
          "Hand over files, a short guide, and the rule for what requires the studio again.",
          "Book a review six weeks later. The brand is whatever survived contact with a real Tuesday.",
        ],
      },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "strategy-before-design",
    title: "Strategy before design",
    date: "2026-02-12",
    category: "Practice",
    excerpt:
      "A visual system cannot rescue an offer the market cannot repeat. The order of work is the work.",
    related: ["brand-strategy", "brand-identity"],
    paragraphs: [
      "Clients often arrive asking for a logo, a site, or a set of templates. Those are outputs. The input is a decision about who the brand is for and what it is willing to be known for.",
      "At BNM Brand House the sequence is discover, define, design, deliver. Discovery is facts. Definition is the choice. Design expresses a choice that has already been made. Delivery leaves the team able to continue without inventing a new brand every Monday.",
      "Visual identity packages do not silently include a full strategy. When the position is unsettled, the honest start is a strategy session or a scoped strategy engagement. Designing first produces a handsome system that the business cannot explain.",
      "If you are unsure which you need, use the guide on this site. It will send you to a session, a package, or a resource, and it will tell you what to prepare.",
    ],
  },
  {
    slug: "should-you-rebrand",
    title: "Should you rebrand this year?",
    date: "2026-01-20",
    category: "Decisions",
    excerpt:
      "A rebrand is justified by a change in the offer, the audience, or the system. Boredom is not one of the three.",
    related: ["brand-identity", "social-media"],
    paragraphs: [
      "Most rebrands are commissioned because the materials feel tired. Tired is often a publishing problem. The team stopped using the system, so every new item was designed from scratch, and the public face splintered.",
      "Rebrand when the offer has changed, the audience has changed, or the current system cannot stretch to the next site, product, or market. Refresh the system when the position is right and the files are the problem.",
      "A useful test: can a new colleague explain the brand and produce an on-brand item from the files you have today? If the explanation fails, start with strategy. If the explanation holds and the files fail, start with identity.",
      "Bring that answer to a consultation. The session is cheaper than a rebrand you do not need, and it is the right start to a rebrand you do.",
    ],
  },
  {
    slug: "what-a-consultation-covers",
    title: "What a consultation actually covers",
    date: "2026-03-04",
    category: "Working with us",
    excerpt:
      "Seventy-five minutes, a decision, and a written summary. Not a tour of the portfolio.",
    related: ["brand-strategy"],
    paragraphs: [
      "The brand strategy session is a working meeting for a personal brand or a business brand. You leave with a position to test and the single next engagement, if one is warranted.",
      "Before the call, answer the readiness checklist. Name the offer, the audience, and an example of the work. If those are blank, say so. The session can be spent finding them.",
      "We do not use the hour to present a menu. Packages exist so a clear need can be booked without a second meeting. A bespoke partnership, a PR engagement, or an outdoor campaign still needs a quote, because the variables are the work.",
      "Book a time on the consultation page. Weekday slots are held as soon as you confirm. You will get a reference and a short list of what to send before the session.",
    ],
  },
  {
    slug: "merchandise-without-the-chaos",
    title: "Merchandise without the chaos",
    date: "2026-04-02",
    category: "Print",
    excerpt:
      "Ready-made pieces can be bought today. A branded run is a production job, and it should be quoted like one.",
    related: ["brand-identity"],
    paragraphs: [
      "A tee with someone else’s mark is a product. A tee with your mark, in your colour, for a conference date, is a production job. Treating both as a cart creates missed deadlines and unhappy neck labels.",
      "This site splits them. Ready-made goods have a price, options, and a checkout. Custom and bulk work asks for the item, the quantity, the print, and the date, then returns an estimate before a person confirms it.",
      "Send vector artwork. Tell us the deadline on the day you actually need the goods in hand, not the day you hope production starts. If the quantity is under the usual minimum, the estimate will say so.",
      "The custom desk is the right door for gifts, packaging, staff kits, and event runs. The shop is the right door when the item already exists.",
    ],
  },
];

export const categories = ["Apparel", "Drinkware", "Bags", "Gifts"] as const;

export const approach = [
  {
    step: "01",
    title: "Discover",
    text: "We learn the business, the audience, the constraint, and what is already working.",
  },
  {
    step: "02",
    title: "Define",
    text: "We set the direction in writing, before design files open.",
  },
  {
    step: "03",
    title: "Design",
    text: "We build the identity and the assets people will actually use.",
  },
  {
    step: "04",
    title: "Deliver",
    text: "Files, a short guide, and a rule for what comes back to the studio.",
  },
];
