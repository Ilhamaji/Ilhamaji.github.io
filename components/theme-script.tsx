/**
 * Sets the theme before the first paint.
 *
 * Without this, the server-rendered HTML has no `data-theme`, so a visitor on
 * a dark OS sees a flash of the light theme until React hydrates. The script
 * runs synchronously in <head>, which is the only place early enough.
 *
 * It is intentionally tiny and dependency-free: a module import would be
 * deferred, which reintroduces the flash.
 *
 * Storage access is wrapped because `localStorage` throws in private mode and
 * when cookies are blocked; a throwing inline script would abort the whole
 * head and leave `data-theme` unset.
 */
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:(d?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function ThemeScript() {
  return (
    <script
      // The content is a constant defined above, not user input.
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
