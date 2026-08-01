import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Kuula FOH Pilot home">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>KUULA</span>
          <small>FOH PILOT</small>
        </Link>
        <nav aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}
