function fold(line: string): string {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let start = 0;
  while (start < bytes.length) {
    let end = Math.min(start + (start === 0 ? 75 : 74), bytes.length);
    while (end > start && (bytes[end] & 0xc0) === 0x80) end--;
    out.push(bytes.subarray(start, end).toString("utf8"));
    start = end;
  }
  return out.join("\r\n ");
}

function stamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildIcs(ev: {
  ics_uid: string;
  ics_sequence: number;
  activity: string;
  place: string | null;
  description: string | null;
  starts_at: string;
  duration_minutes: number;
}): string {
  const start = new Date(ev.starts_at);
  const end = new Date(start.getTime() + ev.duration_minutes * 60000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//hollan.cz//planovac//CS",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${ev.ics_uid}@hollan.cz`,
    `SEQUENCE:${ev.ics_sequence}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    fold(`SUMMARY:${esc(ev.activity)}`),
    ev.place ? fold(`LOCATION:${esc(ev.place)}`) : null,
    ev.description ? fold(`DESCRIPTION:${esc(ev.description)}`) : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n") + "\r\n";
}
