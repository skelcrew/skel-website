import { SignupForm } from "./signup";
import { Container, Label } from "./ui";

export function Hero() {
  return (
    <Container className="pt-20 pb-14 md:pt-32 md:pb-20">
      <h1 className="mb-8 max-w-[10ch] text-[clamp(48px,9vw,120px)] font-semibold leading-[0.95] tracking-[-0.05em]">
        Claude Code, always on.
      </h1>
      <p className="mb-10 max-w-150 text-[clamp(18px,1.9vw,22px)] leading-normal text-fg-2">
        Skel runs Claude Code on your server, many sessions at once, each in its own sandbox. You
        tell the lead what you want; it writes the issues and starts the work. Every issue ends as a
        pull request that a fresh agent has reviewed. You merge.
      </p>
      <SignupForm id="email-top" />
      <Label className="mt-6 leading-relaxed">
        Open source at first release · bring your own Claude · one or two emails a year
      </Label>
    </Container>
  );
}
