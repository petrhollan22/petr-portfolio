export const DAY_START_HOUR = 8;
export const DAY_END_HOUR = 21;

export function getAllTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = DAY_START_HOUR; h <= DAY_END_HOUR; h++) {
    for (const m of [0, 30]) {
      if (h === DAY_END_HOUR && m === 30) continue;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

export function getAvailableSlotsForDate(dateStr: string): string[] {
  const all = getAllTimeSlots();
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (dateStr !== todayStr) return all;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return all.filter((slot) => {
    const [h, m] = slot.split(':').map(Number);
    return h * 60 + m > nowMinutes;
  });
}

export function hasAvailableSlots(dateStr: string): boolean {
  return getAvailableSlotsForDate(dateStr).length > 0;
}
