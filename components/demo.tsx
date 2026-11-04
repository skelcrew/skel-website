"use client";

import { useEffect, useState } from "react";
import { TermText } from "./terminal";
import { Container, Figure } from "./ui";

// Illustrative output only. Swap in real `skel` output once it exists.

const lead = [
  "{dim:you@laptop $} skel --remote you@workbox",
  "",
  "{b:you}   Make issues for the two checkout bugs in app and the",
  "      broken footer link in site, and start them.",
  "",
  "{b:lead}  Created app#12, app#13 and site#4, and started a thread",
  "      for each. I'll tell you when one needs you.",
  '      {dim:$ skel issue app "VAT number lost at checkout"}',
  "      {dim:$ skel start app#12}  {dim:…}",
  "",
  "{dim:Ctrl-] to detach. Close the laptop; the threads keep working.}",
];

/** One `skel ls` row. Pads by visible text, then adds the tone markup. */
function row(cells: [string, number, string?][]) {
  return cells
    .map(([text, width, tone]) => {
      const pad = " ".repeat(Math.max(0, width - text.length));
      return (tone ? `{${tone}:${text}}` : text) + pad;
    })
    .join("")
    .trimEnd();
}

const threads = [
  "{dim:$} skel ls",
  `{dim:${row([
    ["THREAD", 9],
    ["ISSUE", 30],
    ["STATUS", 10],
    ["PR", 6],
    ["NEEDS YOU", 0],
  ])}}`,
  row([
    ["app#12", 9],
    ["VAT number lost at checkout", 30],
    ["waiting", 10],
    ["#31", 6],
    ["! ready to merge", 0, "wait"],
  ]),
  row([
    ["app#13", 9],
    ["Coupon applied twice", 30],
    ["working", 10, "run"],
    ["#32", 6],
  ]),
  row([
    ["site#4", 9],
    ["Broken footer link", 30],
    ["waiting", 10],
    ["–", 6],
    ["? builder asks", 0, "wait"],
  ]),
  row([
    ["app#9", 9],
    ["Saved addresses at checkout", 30],
    ["done", 10, "ok"],
    ["#27", 6],
    ["merged", 0, "dim"],
  ]),
  "",
  "{dim:2 repositories · 3 open threads · 2 need you}",
];

const review = [
  "{dim:app#13 · Coupon applied twice · PR #32}",
  "",
  "{b:round 1}   builder    7 commits · bun test {ok:passing}",
  "          reviewer   {bad:changes requested}",
  "                     · discount applied again on page reload",
  "                     · no test for two coupons in one cart",
  "{b:round 2}   builder    2 commits · bun test {ok:passing}",
  "          reviewer   {run:reviewing…}",
  "",
  "{dim:Each round is a fresh reviewer that never sees the builder's context.}",
  "{dim:Its verdict is the skel/review check. After 3 rounds, the thread needs you.}",
];

const needsYou = [
  "{wait:!} {b:site#4} needs you. Its builder asks:",
  "  The footer links to /legal, which was removed in March.",
  "  Point it to /terms, or drop the link?",
  "",
  "{b:you}   Point it to /terms.",
  "",
  "{b:lead}  Sent to site#4.",
  '      {dim:$ skel say site#4 "Point it to /terms."}',
  "",
  "{wait:!} {b:app#12} is approved and CI is green. PR #31 is ready to merge.",
  "",
  "{dim:Notes arrive in the lead's session, and on your phone if you set a notify command.}",
];

const tabs = [
  { id: "lead", label: "Talk to the lead", lines: lead },
  { id: "threads", label: "Threads", lines: threads },
  { id: "review", label: "Build ⇄ review", lines: review },
  { id: "needs", label: "Needs you", lines: needsYou },
];

/** Product preview: a terminal window with tabs that advance on their own until clicked. */
export function Demo() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % tabs.length), 6000);
    return () => clearInterval(timer);
  }, [auto]);

  return (
    <Container className="pb-20 md:pb-32">
      <Figure n="0.1" note="skel · illustrative">
        <div
          role="tablist"
          aria-label="Product preview"
          className="mb-3 flex gap-1 overflow-x-auto rounded-xl border border-line bg-bg p-1 sm:w-fit"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setAuto(false);
                setActive(i);
              }}
              className="shrink-0 cursor-pointer rounded-lg px-3.5 py-2 text-sm text-muted transition hover:text-fg aria-selected:bg-panel-2 aria-selected:text-fg"
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-bg">
          <div className="flex h-10 items-center gap-4 border-b border-line px-4 font-mono text-xs text-muted">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-line-2" />
              <i className="size-2.5 rounded-full bg-line-2" />
              <i className="size-2.5 rounded-full bg-line-2" />
            </span>
            <span>you@workbox · skel</span>
            <span className="ml-auto hidden sm:inline">3 threads · 2 need you</span>
          </div>
          <div
            key={active}
            role="tabpanel"
            className="min-h-85 animate-fade-in px-4 py-5 sm:min-h-95 sm:px-7 sm:py-7"
          >
            <TermText lines={tabs[active]?.lines ?? []} />
          </div>
        </div>
      </Figure>
    </Container>
  );
}
