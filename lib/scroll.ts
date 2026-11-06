/**
 * In-page navigation that never writes to the address bar.
 *
 * These anchors stay real `<a href="#id">` elements so middle-click, "open in
 * a new tab", the status-bar preview and the accessible name all keep
 * working. Only a plain left click is intercepted. Intercepting matters
 * because the default action appends `#id` to the URL, and the site then
 * advertises `/#projects` instead of `/` — which visitors copy, share, and
 * land on mid-page with.
 */

/**
 * True when the click should be left to the browser.
 *
 * Anything with a modifier is a deliberate "do something else" gesture:
 * ctrl/cmd-click opens a tab, shift-click a window, alt-click downloads.
 * Non-left buttons are context menus. `defaultPrevented` means something
 * further up already had an opinion.
 */
export function isPlainClick(e: React.MouseEvent<HTMLAnchorElement>): boolean {
  return (
    !e.defaultPrevented &&
    e.button === 0 &&
    !e.metaKey &&
    !e.ctrlKey &&
    !e.shiftKey &&
    !e.altKey
  );
}

/**
 * Scrolls to `id` and returns whether the jump happened.
 *
 * "auto" still resolves to the stylesheet's `scroll-behavior: smooth`, so it
 * is not an escape hatch: in a background tab (or a browser that is not
 * compositing) the smooth scroll then silently never moves. "instant" is
 * honoured there, so it is used whenever the motion cannot be relied on.
 */
export function scrollToSection(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior =
    reduce || !document.hasFocus() ? "instant" : "smooth";

  target.scrollIntoView({ behavior, block: "start" });
  return true;
}
