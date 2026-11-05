import { site } from "@/lib/site";
import { TermText } from "./terminal";
import { Container, Figure, H2, Label, Section } from "./ui";

const glance = [
  [
    "For",
    "Developers who already live in a coding agent.",
    "Solo founders and senior developers first, then their team.",
  ],
  ["Runs", "On a server that stays on.", "A Sprite on Fly.io, or any Linux server of your own."],
  [
    "Works with",
    "Claude Code, Codex and GitHub.",
    "Built to take any harness, any model and any forge.",
  ],
  ["Price", "Free and open source.", "On the subscriptions you already pay for."],
];

export function AtAGlance() {
  return (
    <Container className="pb-20 md:pb-32">
      <Label className="mb-6 border-b border-line pb-6">At a glance</Label>
      <dl className="grid gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {glance.map(([term, main, rest]) => (
          <div key={term}>
            <dt>
              <Label className="mb-3">{term}</Label>
            </dt>
            <dd className="text-xl leading-snug">
              {main} <span className="text-muted">{rest}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

const problems = [
  [
    "You are the scheduler",
    "Five chat windows, one laptop that has to stay open, and you checking on each agent in turn. Parallel work runs at the speed of your attention.",
  ],
  [
    "The work stops at the pull request",
    "CI fails, a reviewer comments, main moves on. By then the agent is gone, so you pick it up and explain everything again.",
  ],
];

export function Problem() {
  return (
    <Section rule id="problem">
      <Label className="mb-6">The problem</Label>
      <H2 className="mb-14 max-w-[16ch]">Assign tasks, not tabs.</H2>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {problems.map(([title, body], i) => (
          <div key={title} className="bg-panel p-6 sm:p-8">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Problem {i + 1}
            </p>
            <h3 className="mb-3 text-2xl font-semibold tracking-tight">{title}</h3>
            <p className="text-[17px] leading-relaxed text-fg-2">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Box({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-line bg-bg p-5 ${className}`}>
      <Label className="mb-3">{label}</Label>
      {children}
    </div>
  );
}

/** Vertical connector between diagram rows, with a dot travelling down it. */
function Connector() {
  return (
    <div className="relative mx-auto h-10 w-px overflow-hidden bg-line-2">
      <span className="absolute inset-x-0 top-0 h-3 animate-flow bg-accent" />
    </div>
  );
}

/** Big two-tone statement, then the team as a diagram. */
export function Team() {
  return (
    <Section rule id="team">
      <Label className="mb-8">What we believe</Label>
      <p className="max-w-[24ch] text-[clamp(30px,4.2vw,56px)] font-medium leading-[1.12] tracking-[-0.03em]">
        Run agents like a team, not a pipeline.{" "}
        <span className="text-faint">
          Capable agents need what a good team needs: a clear brief, a space of their own, a
          colleague who reviews their work, and someone who decides. Not a flowchart.
        </span>
      </p>
      <TeamDiagram />
    </Section>
  );
}

function TeamDiagram() {
  const phases = ["Task", "Build", "Review", "Merge"];
  return (
    <Figure n="0.2" note="Your team" className="mt-16 md:mt-24">
      <Box label="Your brief">
        <p className="text-lg">
          One sentence to your lead{" "}
          <span className="text-muted">in the harness you already use</span>
        </p>
      </Box>
      <Connector />
      <div className="grid gap-3 md:grid-cols-[1fr_40px_260px] md:items-center md:gap-0">
        <div className="rounded-xl border border-accent/70 bg-bg p-5 shadow-[0_0_60px_-24px_var(--color-accent)]">
          <Label className="mb-3 text-accent">The lead</Label>
          <p className="mb-4 text-xl font-semibold">
            Takes your brief.{" "}
            <span className="font-normal text-muted">Turns it into tasks and hands them out.</span>
          </p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
            {phases.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="rounded-full border border-line-2 px-3 py-1.5">{p}</span>
                {i < phases.length - 1 && <span className="text-faint">→</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden h-px bg-line-2 md:block" />
        <Box label="You" className="border-dashed">
          <p className="text-lg">Answer questions.</p>
          <p className="text-lg text-muted">Decide what merges.</p>
        </Box>
      </div>
      <Connector />
      <div className="grid gap-3 md:grid-cols-2">
        <Box label="Builders">
          <p className="text-lg">
            One per task.{" "}
            <span className="text-muted">
              Each in its own clone and sandbox, on the work until it merges.
            </span>
          </p>
        </Box>
        <Box label="Reviewers">
          <p className="text-lg">
            A fresh pair of eyes.{" "}
            <span className="text-muted">
              A new one every round, on another model, looking for what the builder missed.
            </span>
          </p>
        </Box>
      </div>
    </Figure>
  );
}

const handoffs = [
  "Task to merged PR, while you're away",
  "Many tasks at once, across repos",
  "Every PR reviewed by a fresh agent",
  "CI failures and comments handled",
  "Asks you only when it needs you",
  "You decide what merges",
];

const steps: { n: string; name: string; body: string; lines: string[] }[] = [
  {
    n: "01",
    name: "Brief",
    body: "Tell your lead what you want, in one sentence. It writes the task as a GitHub issue and starts a thread for it.",
    lines: [
      "{dim:lead}",
      "{wait:>} Search is slow on",
      "  large accounts in app.",
      "",
      "{ok:✓} task app-42 created",
      "{ok:✓} thread started",
      "{ok:→ build}",
    ],
  },
  {
    n: "02",
    name: "Build",
    body: "A builder works in its own clone, branch and sandbox, and opens the pull request. It stays on the thread after that, and remembers why it made each choice.",
    lines: [
      "{dim:app-42 · builder}",
      "{ok:✓} batched the queries",
      "{ok:✓} test for no results",
      "{ok:✓} bun test",
      "{dim:$} skel submit",
      "{ok:✓} pushed · PR #88",
      "{ok:→ review}",
    ],
  },
  {
    n: "03",
    name: "Review",
    body: "A fresh reviewer on another model reads the diff and runs the tests. Its verdict is a GitHub review and a status check. The builder fixes, and it checks again.",
    lines: [
      "{dim:#88 · reviewer · codex}",
      "{bad:changes requested}",
      "· SQL built from input",
      "· one query per row",
      "{dim:#88 · round 2}",
      "{ok:approved}",
      "{ok:→ CI}",
    ],
  },
  {
    n: "04",
    name: "Merge",
    body: "A failing check or a comment on the PR wakes the builder again. When it's approved and green, the thread asks for you. You merge.",
    lines: [
      "{dim:app-42 · PR #88}",
      "{bad:✕} CI: search.test.ts",
      "{ok:✓} builder fixed it",
      "{ok:✓} approved, CI green",
      "{wait:! ready to merge}",
      "",
      "{ok:✓ you merge}",
    ],
  },
];

export function Handoff() {
  return (
    <Section rule id="how">
      <Label className="mb-6">What you hand off</Label>
      <H2 className="mb-6 max-w-[18ch]">Your team owns the loop, from task to merge.</H2>
      <p className="mb-10 max-w-150 text-lg text-fg-2">
        Most coding agents stop when they open a pull request. Skel's team stays on it, so you can
        hand off the whole task, not just the first draft.
      </p>
      <ul className="mb-14 flex flex-wrap gap-2.5">
        {handoffs.map((h) => (
          <li
            key={h}
            className="rounded-full border border-line-2 px-4 py-2 font-mono text-[13px] text-fg-2"
          >
            {h}
          </li>
        ))}
      </ul>
      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="flex flex-col rounded-2xl border border-line bg-panel p-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              {s.n} · {s.name}
            </p>
            <div className="mb-5 rounded-lg border border-line bg-bg px-3.5 py-3">
              <TermText lines={s.lines} small />
            </div>
            <p className="text-[15px] leading-relaxed text-fg-2">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const openPoints = [
  [
    "Any harness, any model",
    "Claude Code and Codex today, builder on one and reviewer on the other, so a review doesn't share the builder's blind spots. Built to take any harness and any model, on the subscriptions you already pay for.",
  ],
  [
    "Any forge",
    "GitHub today. Tasks, pull requests and checks all go through one small seam, so GitLab, Forgejo and Codeberg can plug in without touching the rest.",
  ],
  [
    "Any server",
    "The demo runs on a Sprite on Fly.io, which sleeps when there's no work. Any Linux machine that stays on works the same way, reached over SSH.",
  ],
  [
    "Yours, and sandboxed",
    "Open source, on a machine you control. Every agent gets its own clone and sandbox, your credentials stay hidden, and agents never see your tokens.",
  ],
];

const config = [
  "{dim:# ~/.config/skel/config.yaml}",
  "{key:harness}: claude",
  "{key:builder}:  { {key:model}: opus }",
  "{key:reviewer}: { {key:harness}: codex }",
  "{key:max_rounds}: 3",
  "",
  "{dim:# skel.yaml in a repository}",
  "{key:setup}: [bun install]",
  "{key:test}: [bun test]",
];

export function Open() {
  return (
    <Section rule id="open">
      <Label className="mb-6">Open</Label>
      <H2 className="mb-6 max-w-[16ch]">Open and adaptable, by design.</H2>
      <p className="mb-14 max-w-150 text-lg text-fg-2">
        Agents, models and tools will keep changing. Skel is built so the team you set up today
        isn't tied to any of them: each harness, forge and server sits behind one small seam, and
        the code is open for you to read, change and run.
      </p>
      <div className="grid gap-3 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {openPoints.map(([title, body], i) => (
            <div key={title} className="bg-panel p-6">
              <p className="mb-6 font-mono text-xs text-accent">0{i + 1}</p>
              <h3 className="mb-2 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-[15px] leading-relaxed text-fg-2">{body}</p>
            </div>
          ))}
        </div>
        <Figure n="0.3" note="Settings" caption="The whole setup. Both files are optional.">
          <div className="rounded-lg border border-line bg-bg p-4">
            <TermText lines={config} />
          </div>
        </Figure>
      </div>
    </Section>
  );
}

type Stage = "done" | "now" | "next";

const roadmap: [Stage, React.ReactNode][] = [
  ["done", "Four versions: task to pull request, unattended and sandboxed, with four harnesses"],
  ["done", "Learned from daily use that flows got in the way; a new design around threads"],
  [
    "done",
    <>
      Parallel threads, and <code className="font-mono text-[0.9em]">skel --remote</code> from the
      laptop
    </>,
  ],
  ["now", "Skel on the server, and one thread to a reviewed pull request. Skel builds Skel"],
  ["now", "First developers onboarded by hand"],
  ["next", "Follow-through after the PR, the demo, and the first public release in December 2026"],
];

const stageColor = (stage: Stage) =>
  stage === "done" ? "text-ok" : stage === "now" ? "text-accent" : "text-faint";

export function Status() {
  return (
    <Section rule id="status">
      <Label className="mb-6">Status</Label>
      <H2 className="mb-6 max-w-[16ch]">Early, and moving fast.</H2>
      <div className="mb-14 max-w-150 space-y-5 text-lg leading-relaxed text-fg-2">
        <p>
          Earlier versions of Skel were a software factory: phases, roles and gates defined as
          files. Using it every day, I kept stepping outside the flow just to get things done. The
          models improved faster than the flows.
        </p>
        <p>
          So the new Skel organises agents the way a good small team works, and keeps one piece of
          process: build and review. It's being rewritten now, carrying over what four versions
          taught.
        </p>
      </div>
      <ol className="max-w-200 border-t border-line">
        {roadmap.map(([stage, text], i) => (
          <li
            key={String(i)}
            className={`grid grid-cols-[72px_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[110px_1fr] ${stage === "now" ? "text-fg" : "text-fg-2"}`}
          >
            <span className={`font-mono text-xs uppercase tracking-[0.16em] ${stageColor(stage)}`}>
              {stage}
            </span>
            <span className="text-[17px]">{text}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const faq = [
  [
    "How is this different from a few Claude Code windows and tmux?",
    "Those stop when your laptop sleeps, and you are the scheduler. Skel's team runs on your server, each agent in its own sandbox, and stays on each task through review and CI until it's ready to merge. It asks for you only when it needs you.",
  ],
  [
    "Do I have to move to a new app?",
    "No. You brief your lead in the harness you already use, and results arrive as pull requests where you already review them. To answer a builder's question, you attach to its session, still in the same tool.",
  ],
  [
    "Is it tied to Claude Code and GitHub?",
    "Today it runs Claude Code and Codex, on GitHub. But being open and adaptable is a core design principle: harnesses, models, forges and servers each sit behind one seam, so other harnesses, any model, and GitLab, Forgejo or Codeberg can plug in.",
  ],
  [
    "Does it merge code for me?",
    "No. Every change is reviewed by a fresh agent on another model and has to pass your CI. Then the pull request waits for you. You decide what merges.",
  ],
  [
    "Do I need a server?",
    "A machine that stays on, so the work carries on when you close the laptop. Skel can create a Sprite on Fly.io for you, which sleeps when there's no work, or run on any Linux server you already have, over SSH.",
  ],
  [
    "Do I need a new subscription?",
    "No. Skel is free and open source, and runs on the model plans you already pay for. It never resells model usage.",
  ],
  [
    "When can I use it?",
    "The first public release is planned for December 2026, once the demo runs for real: label issues on GitHub, close the laptop, and come back to reviewed, green pull requests. Leave your email and you'll hear the day it ships.",
  ],
];

export function Faq() {
  return (
    <Section rule id="faq" className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <Label className="mb-6">Before you install</Label>
        <H2 className="max-w-[10ch]">Questions, answered.</H2>
      </div>
      <div className="border-t border-line">
        {faq.map(([q, a]) => (
          <details key={q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <span className="font-mono text-xl text-muted transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-6 text-[17px] leading-relaxed text-fg-2">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function About() {
  const links = [
    ["simonbc.com", site.author.site],
    ["GitHub", site.author.github],
    ["LinkedIn", site.author.linkedin],
  ];
  return (
    <Section rule id="about" className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <Label className="mb-6">Who's building it</Label>
        <H2 className="mb-8">Simon Carstensen</H2>
        <div className="inline-flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3">
          <span className="grid size-7 place-items-center rounded-[4px] bg-[#f26522] font-bold text-white">
            Y
          </span>
          <span className="font-medium">Combinator S05</span>
        </div>
      </div>
      <div className="space-y-5 text-lg leading-relaxed text-fg-2 md:pt-12">
        <p>I'm building Skel because I hit this wall every day, building with coding agents.</p>
        <p>
          In Y Combinator's first batch in 2005, I co-founded Infogami and Jottit with Aaron Swartz.
          Since then, twenty years of shipping web software: agencies, SaaS, and startups like
          GoMore and TRAEDE. Lately I rebuilt Jottit as open source, with a donation from Paul
          Graham, using coding agents every day.
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} rel="me" className="text-fg underline underline-offset-4">
              {label}
            </a>
          ))}
        </p>
        <p className="rounded-xl border border-line bg-panel p-5 text-base">
          Interested in backing Skel?{" "}
          <a
            href={`mailto:${site.email}?subject=Skel`}
            className="text-fg underline underline-offset-4"
          >
            Get in touch
          </a>{" "}
          and I'll send you the memo and a short demo.
        </p>
      </div>
    </Section>
  );
}
