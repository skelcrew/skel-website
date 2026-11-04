import { site } from "@/lib/site";
import { TermText } from "./terminal";
import { Container, Figure, H2, Label, Section } from "./ui";

/** Big two-tone statement: what Skel does, then how, in a quieter colour. */
export function Statement() {
  return (
    <Section rule id="how">
      <Label className="mb-8">What it does</Label>
      <p className="max-w-[24ch] text-[clamp(30px,4.2vw,56px)] font-medium leading-[1.12] tracking-[-0.03em]">
        Skel runs Claude Code on your server and sees each issue through to the merge.{" "}
        <span className="text-faint">
          You talk to one lead. It writes the issues and starts a thread for each, and every thread
          goes back and forth between a builder and a fresh reviewer until it's ready.
        </span>
      </p>
      <SystemDiagram />
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

function SystemDiagram() {
  const phases = ["Issue", "Build", "Review", "Merge"];
  return (
    <Figure n="0.2" note="System" className="mt-16 md:mt-24">
      <Box label="Work comes in">
        <p className="flex flex-wrap gap-x-8 gap-y-1 text-lg">
          <span>Tell the lead</span>
          <span>GitHub issues</span>
          <code className="font-mono text-base leading-7">skel issue</code>
        </p>
      </Box>
      <Connector />
      <div className="grid gap-3 md:grid-cols-[1fr_40px_260px] md:items-center md:gap-0">
        <div className="rounded-xl border border-accent/70 bg-bg p-5 shadow-[0_0_60px_-24px_var(--color-accent)]">
          <p className="mb-4 text-xl font-semibold">Skel, on your server</p>
          <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
            {phases.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="rounded-full border border-line-2 px-3 py-1.5">{p}</span>
                {i < phases.length - 1 && <span className="text-faint">→</span>}
              </span>
            ))}
          </div>
          <Label>Lead · threads · builder ⇄ reviewer · sandboxed</Label>
        </div>
        <div className="hidden h-px bg-line-2 md:block" />
        <Box label="You" className="border-dashed">
          <p className="text-lg">Answer questions.</p>
          <p className="text-lg text-muted">Merge what's ready.</p>
        </Box>
      </div>
      <Connector />
      <div className="grid gap-3 md:grid-cols-2">
        <Box label="Threads in parallel">
          <p className="text-lg">
            One per issue{" "}
            <span className="text-muted">each with its own branch, worktree and sandbox</span>
          </p>
        </Box>
        <Box label="Work goes out">
          <p className="text-lg">
            A reviewed pull request <span className="text-muted">with CI green, on GitHub</span>
          </p>
        </Box>
      </div>
    </Figure>
  );
}

const glance = [
  ["For", "Developers who live in Claude Code.", "Solo or in a small team."],
  ["Runs", "On a Linux server.", "Attach from your laptop over SSH, then close the lid."],
  ["Works with", "Claude Code and GitHub.", "Other harnesses and trackers later."],
  ["Price", "Free, open source core.", "At first release. Bring your own Claude subscription."],
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

const steps: { n: string; name: string; body: string; lines: string[] }[] = [
  {
    n: "01",
    name: "Issue",
    body: "Tell the lead what you want. It writes a GitHub issue and starts a thread: a branch, a worktree and a sandbox of its own.",
    lines: [
      "{dim:lead · app#12}",
      "VAT number is lost on",
      "blur in the EU checkout.",
      "",
      "{dim:$} skel start app#12",
      "{ok:✓} skel/12-vat-number",
      "{ok:→ build}",
    ],
  },
  {
    n: "02",
    name: "Build",
    body: "A builder, a Claude Code session in the sandbox, works on the issue. When it's done, Skel pushes the branch and opens the pull request.",
    lines: [
      "{dim:app#12 · builder}",
      "{ok:✓} failing test added",
      "{ok:✓} fix in AddressForm",
      "{ok:✓} bun test",
      "{dim:$} skel done",
      "{ok:✓} pushed · PR #31",
      "{ok:→ review}",
    ],
  },
  {
    n: "03",
    name: "Review",
    body: "A fresh reviewer reads the diff adversarially and runs the tests. Changes go back to the builder, up to three rounds, then it asks you.",
    lines: [
      "{dim:app#12 · reviewer · r1}",
      "{bad:changes requested}",
      "· empty VAT not handled",
      "{dim:app#12 · reviewer · r2}",
      "{ok:approved}",
      "skel/review {ok:✓ success}",
      "{ok:→ CI}",
    ],
  },
  {
    n: "04",
    name: "Merge",
    body: "Failed checks and your PR comments wake the builder again. Approved and green, it waits for you. You merge, and Skel cleans up.",
    lines: [
      "{dim:app#12 · PR #31}",
      "{ok:✓} review approved",
      "{ok:✓} CI green",
      "{wait:! needs you: ready}",
      "",
      "{dim:you merge on GitHub}",
      "{ok:✓ thread done}",
    ],
  },
];

export function TaskSteps() {
  return (
    <Section rule>
      <Label className="mb-6">How an issue moves</Label>
      <H2 className="mb-14 max-w-[18ch]">From one sentence to a merged pull request.</H2>
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

export function Why() {
  return (
    <Section rule className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <Label className="mb-6">Why</Label>
        <H2 className="max-w-[12ch]">You lead. Agents do the work.</H2>
      </div>
      <div className="space-y-5 text-lg leading-relaxed text-fg-2 md:pt-12">
        <p>
          Coding agents can do real work now, but each one still needs you in a chat window, and
          stops when your laptop does. Run three at once and your day becomes switching between
          them.
        </p>
        <p>
          Skel keeps them running on a server, in parallel, and only interrupts you when a decision
          is yours: a question, a review that won't settle, a pull request ready to merge. You stay
          the team lead who knows the architecture.
        </p>
        <p>
          It stays small. You stay in Claude Code, with no new app to live in. Its test for every
          feature: if the next model is twice as good, does this become dead code? If yes, it isn't
          built.
        </p>
      </div>
    </Section>
  );
}

const rules = [
  [
    "No agent reviews its own work",
    "Every review round is a fresh session that never sees the builder's context. Its verdict is a GitHub status check, so branch protection can require it.",
  ],
  [
    "Your tokens stay out",
    "Agents never see your GitHub token. They call Skel, and Skel pushes and posts with your login, outside the sandbox.",
  ],
  [
    "Every agent is sandboxed",
    "Each thread gets its own branch, worktree and sandbox. The rest of the system is read-only, and your home folder and credentials are hidden.",
  ],
  [
    "Nothing is lost",
    "Sessions outlive the daemon, and every change goes into an append-only log. After a restart, Skel resumes each thread and catches up on what it missed.",
  ],
];

const config = [
  "{dim:# ~/.config/skel/config.yaml}",
  "{key:harness}: claude",
  "{key:builder}:  { {key:model}: opus }",
  "{key:reviewer}: { {key:model}: opus }",
  "{key:max_rounds}: 3",
  "",
  "{dim:# skel.yaml in a repository}",
  "{key:setup}: [bun install]",
  "{key:test}: [bun test]",
];

export function Guarantees() {
  return (
    <Section rule id="guarantees">
      <Label className="mb-6">Why you can leave it running</Label>
      <H2 className="mb-6 max-w-[16ch]">Free inside the box. Skel holds the keys.</H2>
      <p className="mb-14 max-w-150 text-lg text-fg-2">
        Agents get room to work without asking permission for every step. Skel draws the boundary
        around them, and does everything that reaches the outside world itself.
      </p>
      <div className="grid gap-3 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {rules.map(([title, body], i) => (
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

const stats = [
  ["3 Nov", "2026: the rewrite started, from a spec and an empty repository"],
  ["6", "milestones to the first release, each one used every day from the day it lands"],
  [
    "2 min",
    "the demo it's built for: three issues in, the laptop closed, two reviewed pull requests out",
  ],
];

type Stage = "done" | "now" | "next" | "then" | "later";

const roadmap: [Stage, React.ReactNode][] = [
  ["now", "Skel on the server: the lead in its sandbox, still running after you log out"],
  ["next", "One issue to a reviewed pull request, with the builder and reviewer loop"],
  ["next", "Many threads across repositories, and a note in the lead when one needs you"],
  ["then", "Follow-through: failed checks, PR comments, conflicts, merges and restarts"],
  [
    "then",
    <>
      <code className="font-mono text-[0.9em]">skel --remote</code>: from an empty server to a
      running lead with one command
    </>,
  ],
  ["later", "The demo, recorded for real with nothing faked. Then the first release"],
];

const stageColor = (stage: Stage) =>
  stage === "done" ? "text-ok" : stage === "now" ? "text-accent" : "text-faint";

export function Status() {
  return (
    <Section rule id="status">
      <Label className="mb-6">Status</Label>
      <H2 className="mb-6 max-w-[16ch]">Skel will be built by Skel.</H2>
      <p className="mb-14 max-w-150 text-lg text-fg-2">
        This is a rewrite. An earlier version ran planner, builder and tester agents end to end; the
        new one is smaller and runs on a server. From the second milestone on, Skel builds itself.
      </p>
      <div className="mb-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {stats.map(([value, label]) => (
          <div key={value} className="bg-panel p-6">
            <p className="mb-3 text-[40px] font-semibold leading-none tracking-[-0.04em]">
              {value}
            </p>
            <p className="text-[15px] leading-relaxed text-fg-2">{label}</p>
          </div>
        ))}
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
    "Is this an IDE, or a new app?",
    "Neither. You stay in Claude Code. Running skel attaches your terminal to the lead, a Claude Code session on your server, and Ctrl-] detaches. Results arrive as pull requests on GitHub.",
  ],
  [
    "Does it merge code for me?",
    "No. Every change is reviewed by a fresh agent and has to pass your CI, then the pull request waits for you. You merge on GitHub, and Skel cleans up the branch and worktree.",
  ],
  [
    "Why a server?",
    "So the work carries on when you close your laptop. Skel runs on a Linux machine you own and you reach it over SSH, with skel --remote you@server. Sessions survive logouts, restarts and upgrades.",
  ],
  [
    "Which agents does it work with?",
    "Claude Code, for the first release. All GitHub calls sit behind one seam, so other trackers and forges can follow, and other harnesses after that.",
  ],
  [
    "Do I need a new account or AI subscription?",
    "No. Skel uses your own Claude subscription and your own GitHub login. It never resells model usage, and the core will be free and open source.",
  ],
  [
    "When can I use it?",
    "When the demo runs for real: three issues from one sentence to the lead, the laptop closed, and two reviewed, green pull requests waiting when it opens. Leave your email and you'll hear the day it does.",
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
        <p>
          Senior full-stack developer with two decades of JavaScript and Python, based in Denmark.
          At Y Combinator in 2005 I co-founded Infogami with Aaron Swartz, and later co-created the
          original Jottit with him.
        </p>
        <p>
          These days I focus on putting AI into the development process: agentic coding tools, MCP
          servers, and shaping stacks for agents to work in.
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
