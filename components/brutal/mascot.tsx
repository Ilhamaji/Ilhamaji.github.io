/**
 * Stylized character illustration, hand-authored SVG.
 *
 * Flat shapes, heavy #0D0D0D outline, waving pose. A character in the
 * design's own vocabulary, not a portrait of a specific person.
 *
 * The wrapper carries `data-mascot="true"` so the hero can swap this for an
 * <Image> of commissioned artwork later without touching layout rules.
 *
 * Filled areas have no stroke; `stroke` is applied only to outlined groups and
 * then switched off explicitly, so no fill inherits an unexpected outline.
 */
export function Mascot({ className }: { className?: string }) {
  const ink = "#0D0D0D";
  const skin = "#F5C9A8";
  const hair = "#1A1A1A";
  const hoodie = "#7C3AED";
  const hoodieDark = "#6527C9";

  return (
    <div data-mascot="true" className={className}>
      <svg
        viewBox="0 0 440 480"
        role="img"
        aria-labelledby="mascot-title"
        className="h-auto w-full"
      >
        <title id="mascot-title">
          Stylized illustration of the site owner waving
        </title>

        {/* ---------- confetti ---------- */}
        <g stroke="none">
          <path d="M372 34l7 22 22 7-22 7-7 22-7-22-22-7 22-7z" fill="#C6F135" />
          <circle cx="404" cy="158" r="7" fill="#38BDF8" />
          <circle cx="44" cy="104" r="6" fill="#F97316" />
          <path
            d="M22 236c13-16 24-16 37 0s24 16 37 0"
            stroke="#F97316"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M340 250l14-6-3 15 14 5-14 6 3 15-14-9-13 9 3-15-14-6 14-5-3-15z"
            fill="#C6F135"
          />
        </g>

        {/* ---------- waving arm (behind torso, rooted in the shoulder) ---------- */}
        <g stroke={ink} strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
          {/* upper arm sweeping up and out from the shoulder */}
          <path
            d="M262 258c26-4 52-22 66-48l22 14c-14 34-42 60-78 74z"
            fill={hoodie}
          />
          {/* forearm rising to the hand */}
          <path
            d="M330 212c10-16 20-30 28-44l24 12c-10 22-24 40-40 56z"
            fill={hoodie}
          />
          {/* cuff */}
          <path d="M356 166c8-8 20-4 22 6 2 10-6 18-14 22z" fill={hoodieDark} />
          {/* hand, palm open in a wave */}
          <path
            d="M366 186c-6-16 2-32 16-34 12-2 20 8 20 20 0 18-12 32-26 38-8-6-12-14-10-24z"
            fill={skin}
          />
          {/* thumb */}
          <path d="M396 168c6-10 18-10 20 0 2 8-4 14-10 18" fill={skin} strokeWidth="6" />
          {/* finger line */}
          <path d="M382 172v20" fill="none" strokeWidth="5" />
        </g>

        {/* ---------- torso / hoodie ---------- */}
        <g stroke={ink} strokeWidth="7" strokeLinejoin="round">
          <path
            d="M152 300c0-46 30-76 68-76s68 30 68 76l14 130c2 20-16 30-38 30H176c-22 0-40-10-38-30z"
            fill={hoodie}
          />
          {/* hood behind the neck */}
          <path
            d="M186 236c8-18 22-26 34-26s26 8 34 26c-10 14-58 14-68 0z"
            fill={hoodieDark}
          />
          {/* drawstrings */}
          <path d="M206 250v34M234 250v30" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* kangaroo pocket */}
          <path
            d="M186 372h68"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ---------- neck ---------- */}
        <path d="M202 206h32v42h-32z" fill={skin} stroke="none" />

        {/* ---------- head ---------- */}
        <g stroke={ink} strokeWidth="7" strokeLinejoin="round">
          <path
            d="M218 96c42 0 72 28 72 68 0 40-30 68-72 68s-72-28-72-68c0-40 30-68 72-68z"
            fill={skin}
          />
          {/* ears */}
          <path d="M146 156c-10 0-16 8-16 16s6 16 16 16" fill={skin} />
          <path d="M290 156c10 0 16 8 16 16s-6 16-16 16" fill={skin} />
        </g>

        {/* ---------- hair: rounded cap with a fringe ---------- */}
        <g stroke={ink} strokeWidth="7" strokeLinejoin="round">
          <path
            d="M146 160c-4-44 30-76 72-76s76 32 72 76c-6 6-12 0-16-10-8 10-20 6-24-6-10 10-24 6-28-6-12 10-26 6-30-6-10 12-22 10-26 28z"
            fill={hair}
          />
        </g>

        {/* ---------- headphones ---------- */}
        <path
          d="M136 158c-6-44 34-78 82-78s88 34 82 78"
          stroke={ink}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <g stroke={ink} strokeWidth="6">
          <rect x="120" y="148" width="26" height="46" rx="11" fill={hoodieDark} stroke="none" />
          <rect x="294" y="148" width="26" height="46" rx="11" fill={hoodieDark} stroke="none" />
        </g>

        {/* ---------- face ---------- */}
        <g stroke="none">
          {/* brows */}
          <g stroke={ink} strokeWidth="6" strokeLinecap="round" fill="none">
            <path d="M186 158c7-6 16-6 22-2" />
            <path d="M228 156c6-4 15-4 22 2" />
          </g>
          {/* eyes */}
          <circle cx="196" cy="178" r="7" fill={ink} />
          <circle cx="240" cy="178" r="7" fill={ink} />
          {/* cheek blush */}
          <ellipse cx="172" cy="196" rx="9" ry="6" fill="#F08C74" opacity="0.55" />
          <ellipse cx="264" cy="196" rx="9" ry="6" fill="#F08C74" opacity="0.55" />
          {/* grin */}
          <path
            d="M198 204c10 14 30 14 40 0"
            stroke={ink}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
