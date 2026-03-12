"use client";

import { useState } from "react";

export type LanguageCode = "id" | "en";

export function LanguageSwitcher() {
  const [lang, setLang] = useState<LanguageCode>("id");

  return (
    <div className="inline-flex items-center rounded-full border border-slate-300 bg-white px-1 text-[11px] font-medium text-slate-700 shadow-sm">
      <button
        type="button"
        onClick={() => setLang("id")}
        className={`px-2 py-1 rounded-full ${
          lang === "id"
            ? "bg-[color:var(--color-navy)] text-white"
            : "hover:text-[color:var(--color-navy)]"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded-full ${
          lang === "en"
            ? "bg-[color:var(--color-navy)] text-white"
            : "hover:text-[color:var(--color-navy)]"
        }`}
      >
        EN
      </button>
    </div>
  );
}

