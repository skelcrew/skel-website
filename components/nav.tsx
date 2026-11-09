import { site } from "@/lib/site";
import { Container, GithubIcon, Logo } from "./ui";

// Pre-launch nav: just the mark. Section links come back with the full page after launch.
export function Nav() {
  return (
    <header className="border-b border-line">
      <Container className="flex h-16 items-center gap-10">
        <a href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <Logo size={26} />
          Skel
        </a>
        {site.repoPublic && (
          <a
            href={site.repo}
            className="ml-auto flex items-center gap-2 text-sm text-fg-2 hover:text-fg"
            aria-label="Skel on GitHub"
          >
            <GithubIcon size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        )}
      </Container>
    </header>
  );
}
