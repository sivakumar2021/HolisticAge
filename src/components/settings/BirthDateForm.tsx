"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function BirthDateForm({ initialBirthDate }: { initialBirthDate: string | null }) {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState(initialBirthDate ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/settings/birthdate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthDate }),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved." : "Failed to save.");
    if (res.ok) router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="flex items-end gap-3">
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-stone-500">Birth date</label>
        <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </Button>
      {message && <span className="text-sm text-stone-500">{message}</span>}
    </form>
  );
}
