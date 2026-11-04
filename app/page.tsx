import { Demo } from "@/components/demo";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { About, AtAGlance, Faq, Handoff, Open, Problem, Status, Team } from "@/components/sections";
import { FinalCta } from "@/components/signup";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Demo />
        <AtAGlance />
        <Problem />
        <Team />
        <Handoff />
        <Open />
        <Status />
        <Faq />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
