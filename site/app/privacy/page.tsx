import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Kuula FOH Pilot",
  description: "Privacy information for the Kuula FOH Pilot website.",
};

export default function Privacy() {
  return (
    <main className="page-main shell">
      <div className="page-grid privacy-grid">
        <div className="page-heading privacy-heading">
          <p className="eyebrow">LEGAL / 01</p>
          <h1>Privacy Policy</h1>
          <p className="effective-date">Effective 31 July 2026</p>
        </div>
        <article className="page-content policy">
          <section>
            <h2>About this policy</h2>
            <p>
              This Privacy Policy applies to the Kuula FOH Pilot website at
              fohpilot.com and describes our current website practices. The
              Android app is being prepared for release; an app-specific policy
              will be published before release.
            </p>
          </section>

          <section>
            <h2>Information collected by this website</h2>
            <p>
              This website does not use analytics, advertising trackers, or
              user accounts. We do not intentionally collect personal
              information through forms because the website has no contact
              form.
            </p>
          </section>

          <section>
            <h2>When you contact us</h2>
            <p>
              If you contact us by email, we receive the information you choose
              to send, such as your email address, name, and message. We use it
              only to answer your request and maintain ordinary support and
              business records.
            </p>
          </section>

          <section>
            <h2>Sharing and sale</h2>
            <p>
              We do not sell personal information. Service providers may
              process limited information only where needed to operate our
              email and website hosting. We may also disclose information when
              required by law.
            </p>
          </section>

          <section>
            <h2>Retention and security</h2>
            <p>
              Email correspondence is retained only as long as reasonably
              needed to respond, provide support, maintain business records, or
              meet legal obligations. We use reasonable safeguards appropriate
              to the limited information we handle.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <address>
              <strong>ELAVHÕBE OÜ</strong>
              <br />
              Tallinn, Estonia
              <br />
              <a href="mailto:kuula@fohpilot.com">kuula@fohpilot.com</a>
            </address>
          </section>
        </article>
      </div>
    </main>
  );
}
