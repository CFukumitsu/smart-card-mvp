"use client";

import { useState } from "react";

type Theme = "dark" | "light" | "blue" | "gold";

export default function ThemeSelector({
  currentTheme,
  onThemeChange,
}: {
  currentTheme: Theme;
  onThemeChange?: (theme: Theme) => void;
}) {
  const [theme, setTheme] = useState<Theme>(currentTheme || "dark");

  function selectTheme(value: Theme) {
    setTheme(value);
    onThemeChange?.(value);
  }

  const themes = [
    {
      value: "dark",
      label: "Escuro",
      preview:
        "bg-gradient-to-br from-slate-950 via-slate-900 to-black",
    },
    {
      value: "light",
      label: "Claro",
      preview:
        "bg-gradient-to-br from-white via-slate-100 to-slate-200",
    },
    {
      value: "blue",
      label: "Azul",
      preview:
        "bg-gradient-to-br from-blue-950 via-blue-700 to-slate-950",
    },
    {
      value: "gold",
      label: "Dourado",
      preview:
        "bg-gradient-to-br from-yellow-900 via-yellow-600 to-slate-950",
    },
  ] as const;

  return (
    <div>
      <input type="hidden" name="theme" value={theme} />

      <div className="flex flex-wrap gap-3">
        {themes.map((item) => {
          const active = theme === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => selectTheme(item.value)}
              className={`w-15 rounded-lg border p-1.5 transition-all ${
                active
                  ? "border-blue-500 bg-blue-500/10 shadow-[0_0_0_1px_rgba(59,130,246,0.35)]"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div
                className={`relative h-10 rounded-lg overflow-hidden ${item.preview}`}
              >
                <div className="absolute left-2 top-2 h-3 w-3 rounded-full bg-white/50" />

                <div className="absolute left-2 bottom-2 h-1 w-8 rounded-full bg-white/60" />

                <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white/40" />
              </div>

              <p
                className={`mt-2 text-xs font-medium ${
                  active ? "text-white" : "text-slate-300"
                }`}
              >
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}