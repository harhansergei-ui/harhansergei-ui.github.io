import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Kuula FOH Pilot",
  description: "Privacy information for Kuula FOH Pilot and fohpilot.com.",
};

export default function Privacy() {
  return (
    <main className="page-main shell">
      <div className="page-grid privacy-grid">
        <div className="page-heading privacy-heading">
          <p className="eyebrow">LEGAL / 01</p>
          <h1>Privacy Policy</h1>
          <p className="effective-date">Effective 2 August 2026</p>
        </div>
        <article className="page-content policy">
          <section>
            <h2>About this policy</h2>
            <p>
              This Privacy Policy applies to the Kuula FOH Pilot Android app
              and the Kuula FOH Pilot website at fohpilot.com. Kuula FOH Pilot
              is operated by ELAVHÕBE OÜ.
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
            <h2>How the Android app works</h2>
            <p>
              The Kuula FOH Pilot Android app has no Kuula servers. It does
              not use analytics, telemetry, ads, advertising, or advertising
              IDs, and it does not automatically upload crash reports
              remotely.
            </p>
            <p>
              The app uses the microphone for measurement, Live Monitor, Setup
              meters, audio I/O diagnostics, real-WING diagnostics, and USB
              input scanning. App-owned playback and generated test signals
              stop when the app is paused. It uses local Wi-Fi or LAN for WING
              discovery and OSC communication and enumerates connected audio
              endpoints to identify available inputs and outputs.
            </p>
          </section>

          <section>
            <h2>Data stored on your device</h2>
            <p>
              Local app-private storage holds calibration data, reference file
              references, and local crash reports. Captures stay in RAM unless
              you export them. PDFs are written only to a destination you
              select. Crash reports remain local and are only shared if you
              choose to send them.
            </p>
            <p>
              On your local network, the app uses UDP port 2222 for WING
              discovery and OSC port 2223 for control.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              The microphone permission and, when applicable, notification
              permission can be revoked at any time in Android settings.
              Revoking the microphone permission prevents audio-dependent
              features from working.
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
            <h2>Children</h2>
            <p>
              Kuula FOH Pilot is not directed to children under 13, and we do
              not knowingly collect personal information from children under
              13.
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
