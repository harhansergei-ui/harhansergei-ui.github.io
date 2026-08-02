import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© 2026 ELAVHÕBE OÜ · Tallinn, Estonia</p>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/#screens">Screens</Link>
          <Link href="/privacy">Privacy</Link>
          <a href="mailto:kuula@fohpilot.com">kuula@fohpilot.com</a>
        </div>
      </div>
    </footer>
  );
}
