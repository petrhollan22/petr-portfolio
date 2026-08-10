"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createEvent } from "./actions";

type Person = { id: string; full_name: string; groups: string[] };
type Group = { id: string; name: string; slug: string };
type Template = { id: string; name: string; activity: string; place: string | null;
  duration_minutes: number; capacity: number | null; plus_one: string; deadline_hours: number };

export default function NewEventForm({
  groups, people, templates,
}: { groups: Group[]; people: Person[]; templates: Template[] }) {
  const [groupId, setGroupId] = useState(groups[0]?.id ?? "");
  const [unchecked, setUnchecked] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    activity: "", place: "", starts_at: "",
    duration_minutes: 120, capacity: "", plus_one: "no", deadline_hours: 24,
  });

  const visible = groupId === "ALL" ? people : people.filter((p) => p.groups.includes(groupId));
  const selected = visible.filter((p) => !unchecked.has(p.id));

  function applyTemplate(t: Template) {
    setForm((f) => ({
      ...f,
      activity: t.activity,
      place: t.place ?? "",
      duration_minutes: t.duration_minutes,
      capacity: t.capacity ? String(t.capacity) : "",
      plus_one: t.plus_one,
      deadline_hours: t.deadline_hours,
    }));
  }

  function toggle(id: string) {
    setUnchecked((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  }

  const inp = { width: "100%", padding: 12, fontSize: 16, border: "1px solid #ddd",
    borderRadius: 8, boxSizing: "border-box" as const, marginTop: 4 };
  const lbl = { fontSize: 13, opacity: 0.7, display: "block", marginTop: 14 };

  return (
    <form action={createEvent} style={{ paddingBottom: 90 }}>
      {templates.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {templates.map((t) => (
            <button key={t.id} type="button" onClick={() => applyTemplate(t)}
              style={{ padding: "8px 14px", fontSize: 14, background: "#eef2ff",
                border: "1px solid #c7d2fe", borderRadius: 999, cursor: "pointer" }}>
              {t.name}
            </button>
          ))}
        </div>
      )}

      <label style={lbl}>Skupina</label>
      <select name="group_id" value={groupId} style={inp}
        onChange={(e) => { setGroupId(e.target.value); setUnchecked(new Set()); }}>
        <option value="ALL">- Vsichni -</option>
        {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>

      <label style={lbl}>Aktivita</label>
      <input name="activity" value={form.activity} required style={inp}
        onChange={(e) => setForm({ ...form, activity: e.target.value })} />

      <label style={lbl}>Misto (nepovinne)</label>
      <input name="place" value={form.place} style={inp}
        onChange={(e) => setForm({ ...form, place: e.target.value })} />

      <label style={lbl}>Zacatek</label>
      <input type="datetime-local" name="starts_at" value={form.starts_at} required style={inp}
        onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={lbl}>Delka (min)</label>
          <input type="number" name="duration_minutes" value={form.duration_minutes} style={inp}
            onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={lbl}>Odpoved do (h predem)</label>
          <input type="number" name="deadline_hours" value={form.deadline_hours} style={inp}
            onChange={(e) => setForm({ ...form, deadline_hours: Number(e.target.value) })} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={lbl}>Kapacita (prazdne = neomezena)</label>
          <input type="number" name="capacity" value={form.capacity} style={inp}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={lbl}>Kamos s sebou</label>
          <select name="plus_one" value={form.plus_one} style={inp}
            onChange={(e) => setForm({ ...form, plus_one: e.target.value })}>
            <option value="no">Ne</option>
            <option value="yes">Ano</option>
            <option value="ask">Kontaktuj me</option>
          </select>
        </div>
      </div>

      <h2 style={{ fontSize: 15, textTransform: "uppercase", opacity: 0.6, marginTop: 24 }}>
        Koho pozvat ({selected.length})
      </h2>

      {visible.length === 0 && <p style={{ opacity: 0.6 }}>V teto skupine nikdo neni.</p>}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {visible.map((p) => {
          const on = !unchecked.has(p.id);
          return (
            <li key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 2px", cursor: "pointer" }}>
                <input type="checkbox" checked={on} onChange={() => toggle(p.id)}
                  style={{ width: 20, height: 20 }} />
                <span style={{ opacity: on ? 1 : 0.4 }}>{p.full_name}</span>
                {on && <input type="hidden" name="person" value={p.id} />}
              </label>
            </li>
          );
        })}
      </ul>

      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, padding: 12,
        background: "#fff", borderTop: "1px solid #eee" }}>
        <SubmitButton count={selected.length} />
      </div>
    </form>
  );
}

function SubmitButton({ count }: { count: number }) {
  const { pending } = useFormStatus();
  const active = count > 0 && !pending;
  return (
    <button type="submit" disabled={!active}
      style={{ width: "100%", maxWidth: 536, margin: "0 auto", display: "block",
        padding: 16, fontSize: 16, color: "#fff",
        background: active ? "#16a34a" : "#bbb",
        border: 0, borderRadius: 10, cursor: pending ? "wait" : "pointer" }}>
      {pending ? "Zakladam..." : `Zalozit akci (${count} lidi)`}
    </button>
  );
}
