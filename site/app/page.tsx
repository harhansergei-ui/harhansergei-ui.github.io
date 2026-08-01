import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kuula FOH Pilot — Confidence at front of house",
  description:
    "A focused Android companion for live sound professionals, developed by ELAVHÕBE OÜ in Tallinn, Estonia.",
};

const faders = ["fader-high", "fader-low", "fader-mid", "fader-top"];

export default function Home() {
  return (
    <main>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Android release in preparation
          </p>
          <h1 id="hero-title">Confidence at front of house.</h1>
          <p className="hero-summary">
            Kuula FOH Pilot is a focused companion for live sound
            professionals. The Android app is being prepared for release on
            Google Play.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/support">
              Contact support
              <span aria-hidden="true">↗</span>
            </Link>
            <span className="platform-note">Built for Android</span>
          </div>
        </div>

        <div className="console-visual" aria-hidden="true">
          <div className="console-topline">
            <span>FOH / PILOT</span>
            <span className="console-status">SIGNAL READY</span>
          </div>
          <div className="signal-field">
            <div className="signal-rule" />
            <div className="waveform">
              {[22, 36, 58, 84, 48, 30, 66, 96, 54, 28, 44, 70, 38].map(
                (height, index) => (
                  <span key={index} style={{ height }} />
                ),
              )}
            </div>
            <div className="signal-label">MAIN OUTPUT</div>
          </div>
          <div className="fader-bank">
            {faders.map((position, index) => (
              <div className="channel" key={position}>
                <div className="channel-label">0{index + 1}</div>
                <div className={`fader ${position}`}>
                  <span />
                </div>
                <div className="meter">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="company-band" aria-label="Publisher information">
        <div className="shell company-content">
          <p>
            Kuula FOH Pilot is developed and published by <b>ELAVHÕBE OÜ</b> in
            Tallinn, Estonia.
          </p>
          <span className="coordinates">59.4370° N · 24.7536° E</span>
        </div>
      </section>
    </main>
  );
}
