export type ArchetypeId =
  | "innocent"
  | "explorer"
  | "sage"
  | "hero"
  | "outlaw"
  | "magician"
  | "everyman"
  | "lover"
  | "jester"
  | "caregiver"
  | "creator"
  | "ruler";

export type Audience = "personal" | "business";

export type Archetype = {
  id: ArchetypeId;
  name: string;
  line: string;
  reading: string;
};

export const archetypes: Archetype[] = [
  {
    id: "innocent",
    name: "Innocent",
    line: "Simplicity, optimism, and a promise people can trust.",
    reading:
      "The brand wins by being clear and good-faith. It should feel light to approach, free of cynicism, and consistent enough that people relax.",
  },
  {
    id: "explorer",
    name: "Explorer",
    line: "Freedom, discovery, and a refusal to stay in the familiar lane.",
    reading:
      "The brand is for people who want a wider life. It should sound independent, specific about the journey, and uninterested in looking like everyone else.",
  },
  {
    id: "sage",
    name: "Sage",
    line: "Clarity, judgment, and the confidence to teach.",
    reading:
      "The brand is trusted because it knows. It should explain without performing, cite what it has learned, and leave people more certain than when they arrived.",
  },
  {
    id: "hero",
    name: "Hero",
    line: "Courage, effort, and a result that can be proved.",
    reading:
      "The brand asks people to rise to something. It should show the standard, the work, and the win, without turning the story into a lecture.",
  },
  {
    id: "outlaw",
    name: "Outlaw",
    line: "A break with a rule that no longer deserves obedience.",
    reading:
      "The brand moves people by refusing the usual script. It should be candid, pointed, and useful to anyone who has outgrown the category as it stands.",
  },
  {
    id: "magician",
    name: "Magician",
    line: "Transformation: a before, an after, and the moment in between.",
    reading:
      "The brand exists to change a state. It should name the shift it makes, show the method lightly, and feel inevitable rather than theatrical.",
  },
  {
    id: "everyman",
    name: "Everyman",
    line: "Belonging, plain speech, and a product people can share.",
    reading:
      "The brand is a place in the group, not above it. It should sound like a person, stay useful, and avoid any pose that makes the audience feel late or lesser.",
  },
  {
    id: "lover",
    name: "Lover",
    line: "Beauty, closeness, and the feeling of being chosen.",
    reading:
      "The brand is felt before it is argued. It should be sensory, particular, and intimate, with restraint so the attention feels earned.",
  },
  {
    id: "jester",
    name: "Jester",
    line: "Wit, ease, and the relief of not being solemn.",
    reading:
      "The brand keeps people in the room by being alive. It should be sharp rather than noisy, and the joke should never cost the offer its dignity.",
  },
  {
    id: "caregiver",
    name: "Caregiver",
    line: "Protection, steadiness, and care that shows up twice.",
    reading:
      "The brand is a duty of care. It should be calm, specific about who it looks after, and reliable in the small things as well as the promise.",
  },
  {
    id: "creator",
    name: "Creator",
    line: "Craft, imagination, and something that did not exist before.",
    reading:
      "The brand is known by what it makes. It should show the hand, the material, and the idea, and treat originality as a discipline rather than a mood.",
  },
  {
    id: "ruler",
    name: "Ruler",
    line: "Standards, leadership, and a category held in order.",
    reading:
      "The brand sets the terms. It should look composed, speak with authority, and make the audience feel they are in the most capable hands available.",
  },
];

const byId = Object.fromEntries(archetypes.map((item) => [item.id, item])) as Record<ArchetypeId, Archetype>;

export function archetypeById(id: ArchetypeId) {
  return byId[id];
}

type Choice = { id: ArchetypeId; personal: string; business: string };

export const archetypeQuestions: { personal: string; business: string; choices: Choice[] }[] = [
  {
    personal: "What do people come to you for?",
    business: "What do people come to the business for?",
    choices: [
      { id: "innocent", personal: "A simpler, kinder way through it.", business: "A simpler, kinder way to buy or begin." },
      { id: "explorer", personal: "A way out of the usual path.", business: "A way out of the category as it is usually done." },
      { id: "sage", personal: "An answer they can trust.", business: "Judgment they can rely on." },
      { id: "hero", personal: "Help reaching a result they want.", business: "A result they could not reach alone." },
    ],
  },
  {
    personal: "How should your public voice sound?",
    business: "How should the public voice sound?",
    choices: [
      { id: "everyman", personal: "Warm, plain, and easy to stand next to.", business: "Warm, plain, and easy to recommend." },
      { id: "lover", personal: "Close, considered, and a little intimate.", business: "Close, considered, and sensory." },
      { id: "jester", personal: "Light. People should feel the day lift.", business: "Light. The offer should feel easy to enjoy." },
      { id: "caregiver", personal: "Steady. People should feel looked after.", business: "Steady. Customers should feel looked after." },
    ],
  },
  {
    personal: "Which ambition fits you?",
    business: "Which ambition fits the business?",
    choices: [
      { id: "creator", personal: "To make something that did not exist.", business: "To make something the market did not have." },
      { id: "ruler", personal: "To be the standard others measure against.", business: "To lead the category and set its terms." },
      { id: "magician", personal: "To change what people believe is possible.", business: "To change the state a customer is in." },
      { id: "outlaw", personal: "To retire a rule that no longer serves.", business: "To break a convention the category still obeys." },
    ],
  },
  {
    personal: "After meeting you, a person should leave feeling",
    business: "After buying, a customer should leave feeling",
    choices: [
      { id: "caregiver", personal: "Looked after.", business: "Looked after." },
      { id: "everyman", personal: "Part of something, not outside it.", business: "That this was made for people like them." },
      { id: "jester", personal: "Lighter than when they arrived.", business: "That the brand was a pleasure to deal with." },
      { id: "lover", personal: "Seen, and a little chosen.", business: "That the thing was made with them in mind." },
    ],
  },
  {
    personal: "What would you rather be known for?",
    business: "What should the business be known for?",
    choices: [
      { id: "innocent", personal: "Honesty and a hopeful point of view.", business: "Honesty and a hopeful point of view." },
      { id: "explorer", personal: "Range. You go where the work is.", business: "Discovery. It keeps opening new ground." },
      { id: "sage", personal: "Clarity. You help people decide.", business: "Clarity. It helps people decide." },
      { id: "hero", personal: "Courage and follow-through.", business: "Proof. It does the hard thing and shows it." },
    ],
  },
  {
    personal: "Which piece of work would make you proudest?",
    business: "Which outcome would the business be proudest of?",
    choices: [
      { id: "creator", personal: "A new form, made with care.", business: "An original product or identity, made with care." },
      { id: "ruler", personal: "A field you quietly lead.", business: "A market it holds, and a standard others copy." },
      { id: "magician", personal: "A visible before and after in someone’s life.", business: "A visible transformation for the customer." },
      { id: "outlaw", personal: "A refusal that moved the conversation.", business: "A refusal that reset what the category accepts." },
    ],
  },
];

export function readArchetypes(answers: ArchetypeId[]) {
  const scores = new Map<ArchetypeId, { score: number; last: number }>();
  answers.forEach((id, index) => {
    const current = scores.get(id) ?? { score: 0, last: -1 };
    scores.set(id, { score: current.score + 1, last: index });
  });
  const ranked = [...scores.entries()].sort((a, b) => b[1].score - a[1].score || b[1].last - a[1].last);
  const primary = byId[ranked[0][0]];
  const secondary = byId[ranked[1]?.[0] ?? ranked[0][0]];
  return {
    primary,
    secondary,
    close: ranked[0][1].score === ranked[1]?.[1].score,
  };
}
