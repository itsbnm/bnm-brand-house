export type Slot = { id: string; label: string };

const TIMES = ["10:00", "13:00", "16:00"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function upcomingSlots(taken: string[], from = new Date()): Slot[] {
  const slots: Slot[] = [];
  const cursor = new Date(from);
  cursor.setHours(12, 0, 0, 0);

  for (let day = 1; slots.length < 15 && day < 40; day++) {
    const date = new Date(cursor);
    date.setDate(cursor.getDate() + day);
    const weekday = date.getDay();
    if (weekday === 0 || weekday === 6) continue;
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const pretty = date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    for (const time of TIMES) {
      const id = `${y}-${m}-${d}T${time}`;
      if (taken.includes(id)) continue;
      slots.push({ id, label: `${pretty} · ${time} WAT` });
    }
  }
  return slots;
}
