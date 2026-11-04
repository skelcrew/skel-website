import { SignupForm } from "./signup";
import { Container, Label } from "./ui";

export function Hero() {
  return (
    <Container className="pt-20 pb-14 md:pt-32 md:pb-20">
      <h1 className="mb-8 max-w-[15ch] text-[clamp(44px,6.6vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em]">
        Your own team of coding agents, working while you're away.
      </h1>
      <p className="mb-10 max-w-150 text-[clamp(18px,1.9vw,22px)] leading-normal text-fg-2">
        Brief a lead agent in the harness you already use. It writes the tasks and hands each one to
        a builder, and a fresh reviewer on another model checks every pull request. The team works
        on your own server, so you can close the laptop. You decide what merges.
      </p>
      <SignupForm id="email-top" />
      <Label className="mt-6 leading-relaxed">
        Open source · open and adaptable by design · your own server
      </Label>
    </Container>
  );
}
