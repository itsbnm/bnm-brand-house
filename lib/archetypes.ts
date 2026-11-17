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
    personal: "Which one sounds most like you?",
    business: "Which one sounds most like the business?",
    choices: [
      { id: "innocent", personal: "I keep things simple and I mean what I say.", business: "We keep it simple, and we mean what we say." },
      { id: "explorer", personal: "I get bored when every day looks the same.", business: "We'd rather try something new than copy everyone else." },
      { id: "sage", personal: "Friends ask me when they need something explained.", business: "People come to us when they want a straight answer." },
      { id: "hero", personal: "Give me a goal. I like seeing it through.", business: "Give us a hard job. We like finishing it." },
    ],
  },
  {
    personal: "What do people notice about you first?",
    business: "What do customers notice first?",
    choices: [
      { id: "everyman", personal: "I'm easy to talk to. Nobody feels out of place.", business: "We're easy to deal with. Nobody feels out of place." },
      { id: "lover", personal: "I care how things look, feel, and fit together.", business: "We care how things look, feel, and fit together." },
      { id: "jester", personal: "I make people laugh before I make a point.", business: "We're fun to deal with, even when the work is serious." },
      { id: "caregiver", personal: "I notice when someone needs a hand, and I offer it.", business: "We notice when a customer needs help, and we stay with them." },
    ],
  },
  {
    personal: "What would you rather spend your time doing?",
    business: "What would the team rather spend time doing?",
    choices: [
      { id: "creator", personal: "Making something of my own, from scratch.", business: "Making something of our own, from scratch." },
      { id: "ruler", personal: "Organising things so they run the right way.", business: "Setting the standard and keeping everything in order." },
      { id: "magician", personal: "Helping someone go from stuck to a whole new place.", business: "Taking a customer from stuck to a whole new place." },
      { id: "outlaw", personal: "Dropping a rule that everyone follows and nobody likes.", business: "Dropping an industry habit that everyone copies and nobody likes." },
    ],
  },
  {
    personal: "After spending time with you, people usually feel",
    business: "After buying from you, customers usually feel",
    choices: [
      { id: "caregiver", personal: "Looked after.", business: "Looked after." },
      { id: "everyman", personal: "Like they were with one of their own.", business: "Like this was made for people like them." },
      { id: "jester", personal: "Lighter than when they arrived.", business: "Glad it was easy, and a bit of fun." },
      { id: "lover", personal: "Noticed. Like you actually paid attention.", business: "Noticed. Like the details were chosen for them." },
    ],
  },
  {
    personal: "Which compliment would you rather hear?",
    business: "Which compliment would you rather hear about the business?",
    choices: [
      { id: "innocent", personal: "You're genuine. I trust you.", business: "They're genuine. I trust them." },
      { id: "explorer", personal: "You always find a more interesting way.", business: "They always find a more interesting way." },
      { id: "sage", personal: "You made that so clear.", business: "They made that so clear." },
      { id: "hero", personal: "You don't quit when it gets hard.", business: "They don't quit when it gets hard." },
    ],
  },
  {
    personal: "Which of these would make you proud?",
    business: "Which of these would make the business proud?",
    choices: [
      { id: "creator", personal: "I made something people can see and use.", business: "We made something people can see and use." },
      { id: "ruler", personal: "People look to me when they want it done properly.", business: "People look to us when they want it done properly." },
      { id: "magician", personal: "Someone's life or work looks different because of me.", business: "A customer's situation looks different because of us." },
      { id: "outlaw", personal: "I said no to what everyone else was doing.", business: "We said no to what everyone else in the market was doing." },
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
