"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Theme state lives on <html data-theme>, which ThemeScript sets before paint.
 * React reads it through an external store rather than copying it into state
 * in an effect:
 *
 * - an effect that calls setState on mount causes a cascading render (the lint
 *   rule `react-hooks/set-state-in-effect` flags exactly that);
 * - useSyncExternalStore gives a `getServerSnapshot` for SSR, so the server
 *   renders a stable placeholder and hydration matches.
 *
 * The server cannot know the visitor's theme, so the snapshot is `null` there
 * and the button renders its box without an icon until mounted.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme | null {
  return null;
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode / blocked storage: the toggle still works for this page
    // view, it just will not be remembered. Never throw from a click handler.
  }
  listeners.forEach((l) => l());
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === null ? "Toggle theme" : label}
      title={theme === null ? "Toggle theme" : label}
      // The box is always rendered so the navbar does not shift on hydration.
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-separator bg-surface-2 text-label transition-colors hover:bg-surface ${className ?? ""}`}
    >
      {theme === null ? null : isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
