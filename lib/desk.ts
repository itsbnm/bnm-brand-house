export const deskAnswers = [
  {
    q: "Where do I start?",
    keys: ["start", "help", "guide", "which", "choose", "recommend"],
    a: "Open the guide. Answer three questions and it will point you to a consultation, a fixed package, the shop, a custom print estimate, or a resource.",
    href: "/guide",
    label: "Open the guide",
  },
  {
    q: "What does identity cost?",
    keys: ["price", "cost", "how much", "identity", "logo", "package", "rate"],
    a: "Brand essentials is $800, presence is $1,500, signature is $2,500, and the premium system is $3,500. Bespoke partnerships start from $5,000 after discovery. Strategy is scoped separately.",
    href: "/services/brand-identity",
    label: "See identity packages",
  },
  {
    q: "How do I book a consultation?",
    keys: ["consult", "book", "session", "call", "calendar", "slot"],
    a: "The brand strategy session is $250 and runs 75 minutes on a weekday. Pick a free slot, leave your details, and you will get a reference plus what to send beforehand.",
    href: "/consult",
    label: "See open slots",
  },
  {
    q: "Can I buy merch today?",
    keys: ["shop", "buy", "merch", "shirt", "cup", "tote", "gift"],
    a: "Ready-made tees, caps, cups, totes, and gift sets have a price and a checkout. Anything with your artwork is a custom run.",
    href: "/shop",
    label: "Browse the shop",
  },
  {
    q: "How do custom and bulk orders work?",
    keys: ["custom", "bulk", "print", "quote", "t-shirt", "quantity"],
    a: "Tell the desk the item, quantity, sides, and deadline. You get an automated estimate immediately. Production starts only after the studio confirms the quote.",
    href: "/shop/custom",
    label: "Get a print estimate",
  },
  {
    q: "How do I read a course or workbook?",
    keys: ["course", "book", "resource", "learn", "workbook", "download"],
    a: "The readiness checklist is open. The workbook and the Brand decisions course open in this browser after Paystack marks the order paid.",
    href: "/resources",
    label: "Browse resources",
  },
  {
    q: "How does payment work?",
    keys: ["pay", "payment", "paystack", "card", "invoice", "transfer"],
    a: "Shop orders, fixed services, paid resources, and the $250 consultation are charged on Paystack. Custom print stays an estimate until the studio confirms it. If the Paystack key is missing on the server, checkout reserves a reference instead of charging the card.",
    href: "/checkout",
    label: "Go to checkout",
  },
  {
    q: "How do I reach a person?",
    keys: ["contact", "email", "phone", "human", "talk", "whatsapp"],
    a: "Email bnmbrandhouse@gmail.com or call +234 905 961 0911, weekdays. Service, print, and general questions also land in the studio inbox from the contact page.",
    href: "/contact",
    label: "Contact the studio",
  },
];

export function answerDesk(query: string) {
  const text = query.toLowerCase();
  const hit = deskAnswers.find((item) => item.keys.some((key) => text.includes(key)));
  return hit ?? deskAnswers[0];
}
