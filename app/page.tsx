import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SignupForm } from "@/components/signup";
import { Container, Label } from "@/components/ui";
import { site } from "@/lib/site";

// Pre-launch page: a short introduction and the mailing list. The full page's sections
// still live in components/ for after launch.

const points = [
  [
    "A team, not a chat",
    "A lead plans the work and hands each task to a builder. A fresh reviewer checks every pull request. You stop passing messages between agents.",
  ],
  [
    "Always on, sandboxed",
    "The team runs on a server you control and keeps working after you close the laptop. Every agent gets its own branch and sandbox, and never sees your tokens.",
  ],
  [
    "In the apps you already use",
    "Work comes in as GitHub issues and goes out as pull requests, so your team keeps working where it already works. More apps through plugins.",
  ],
  [
    "Any harness, any model",
    "Claude Code and Codex today, on the subscriptions you already pay for. Built to take any harness and any model, so you're never locked in.",
  ],
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Container className="pt-20 pb-20 md:pt-32 md:pb-32">
          <Label className="mb-8">Launching November 2026</Label>
          <h1 className="mb-8 max-w-[15ch] text-[clamp(44px,6.6vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em]">
            Your own team of coding agents, working while you're away.
          </h1>
          <p className="mb-10 max-w-150 text-[clamp(18px,1.9vw,22px)] leading-normal text-fg-2">
            Skel gives you a team of coding agents that work together, always on and each in its own
            sandbox, on your server. They pick up work in the apps your team already uses and run on
            whichever harness you prefer. You close the laptop. You decide what merges.
          </p>
          <SignupForm id="email-top" button="Tell me when it's out" />
          <p className="mt-4 text-sm text-muted">
            I'll email you when Skel launches. No newsletter.
          </p>

          <ul className="mt-20 grid gap-6 border-t border-line pt-10 md:mt-28 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {points.map(([title, text]) => (
              <li key={title}>
                <p className="mb-2 font-medium text-fg">{title}</p>
                <p className="text-fg-2 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>

          <p className="mt-16 max-w-150 text-fg-2 leading-relaxed">
            Free and open source. Built in public by{" "}
            <a
              href={site.author.linkedin}
              rel="me"
              className="text-fg underline underline-offset-4"
            >
              {site.author.name}
            </a>
            , who co-founded Infogami and Jottit with Aaron Swartz in Y Combinator's first batch.
            Questions?{" "}
            <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
