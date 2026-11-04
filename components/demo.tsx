"use client";

import { useEffect, useState } from "react";
import { TermText } from "./terminal";
import { Container, Figure } from "./ui";

// Illustrative output only. Swap in real `skel` output once it exists.

const brief = [
  "{dim:you@laptop ~/app $} skel --remote you@workbox",
  "",
  "{wait:>} Fix the login redirect and the slow search in app,",
  "  and add dark mode to site.",
  "",
  "Created 3 tasks and started a thread on each:",
  "",
  "  app-41    Login sends you to / instead of back    {run:working}",
  "  app-42    Search is slow on large accounts        {run:working}",
  "  site-17   Add dark mode                           {run:working}",
  "",
  "I'll tell you when one of them needs you.",
];

const away = [
  "{dim:app-42, on the server}",
  "",
  "{dim:09:12}  builder    opens pull request #88",
  "{dim:09:20}  reviewer   {bad:asks for 2 changes}   {dim:codex}",
  "{dim:09:31}  builder    pushes the fixes",
  "{dim:09:38}  CI         {bad:fails: search.test.ts}",
  "{dim:09:44}  builder    fixes the test",
  "{dim:09:51}  reviewer   {ok:approves}, CI {ok:green}",
  "",
  "{dim:Two review rounds and a failing check, with the laptop closed.}",
];

const review = [
  "{b:skel reviewer} {bad:requested changes} on #88        {dim:round 1 · codex}",
  "",
  "{bad:HIGH}     Search builds its SQL from user input without parameters",
  "{wait:MEDIUM}   Results load one query per row; slow on large accounts",
  "{dim:LOW}      No test for a search with no results",
  "",
  "{bad:✕} skel/review · changes requested",
  "",
  "{dim:A fresh reviewer every round, on another model than the builder.}",
  "{dim:Its verdict is a GitHub review and a status check, so branch}",
  "{dim:protection can require it.}",
];

const back = [
  "{dim:$} skel ps",
  "{dim:THREAD    STATUS    PR    NEEDS YOU}",
  "app-41    waiting   #87   {ok:ready to merge}",
  "app-42    waiting   #88   {ok:ready to merge}",
  "site-17   waiting   #89   {wait:? builder asks}",
  "",
  "{dim:$} skel attach site-17",
  "{wait:?} Should dark mode follow the system setting, or have its",
  "  own toggle?",
  "  {b:1} Follow the system   {b:2} Its own toggle   {b:3} Both",
];

const tabs = [
  { id: "brief", label: "Brief your lead", lines: brief },
  { id: "away", label: "While you're away", lines: away },
  { id: "review", label: "Review", lines: review },
  { id: "back", label: "Back at your desk", lines: back },
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
            <span>you@workbox · lead</span>
            <span className="ml-auto hidden sm:inline">2 ready to merge · 1 question</span>
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
