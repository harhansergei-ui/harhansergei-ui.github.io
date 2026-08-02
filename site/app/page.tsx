import type { Metadata } from "next";
import Link from "next/link";
import { ProductScreenshot } from "./_components/ProductScreenshot";
import {
  productScreens,
  screenById,
  type ProductStage,
} from "./_data/productScreens";

export const metadata: Metadata = {
  title: "Kuula FOH Pilot — Confidence at front of house",
  description:
    "A focused Android companion for live sound professionals, developed by ELAVHÕBE OÜ in Tallinn, Estonia.",
};

const workflow: Array<{
  stage: ProductStage;
  step: string;
  screenId: string;
  title: string;
  body: string;
}> = [
  {
    stage: "Setup",
    step: "01",
    screenId: "02",
    title: "Build a trusted signal path.",
    body: "Route the measurement mic, reference playback, PA outputs, and matrix correction before the room gets loud.",
  },
  {
    stage: "Measure",
    step: "02",
    screenId: "06",
    title: "Capture the room, not a single seat.",
    body: "Work through practical microphone positions, then review every capture together before analysis.",
  },
  {
    stage: "Correction",
    step: "03",
    screenId: "07-balanced",
    title: "Shape with context.",
    body: "Compare the target, left, and right response on one graph before applying correction to the system.",
  },
  {
    stage: "Live",
    step: "04",
    screenId: "08",
    title: "Keep the analyzer in sight.",
    body: "Monitor SPL, analyzer health, RTA, transfer function, and waterfall views while the system is working.",
  },
];

const signalStatus = [
  {
    label: "Workflow",
    value: "Setup → Measure → Correct → Live",
    tone: "orange",
  },
  {
    label: "Analysis",
    value: "RTA · transfer function · waterfall",
    tone: "cyan",
  },
  {
    label: "Console",
    value: "WING discovery and OSC control",
    tone: "green",
  },
];

export default function Home() {
  const heroScreen = screenById("07-balanced");

  return (
    <main className="home-main">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Android release in preparation
          </p>
          <p className="product-code">FOH / PILOT</p>
          <h1 id="hero-title">Confidence at front of house.</h1>
          <p className="hero-summary">
            Kuula FOH Pilot is a focused companion for live sound
            professionals. The Android app is being prepared for release on
            Google Play.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/support">
              Contact support
              <span aria-hidden="true">↗</span>
            </Link>
            <span className="platform-note">Built for Android</span>
          </div>
        </div>

        <div className="hero-product" data-app-shell="true">
          <ProductScreenshot
            screen={heroScreen}
            priority
            className="hero-screen"
            showCaption={false}
          />
          <div className="hero-product-status" aria-hidden="true">
            <span>
              <i className="status-light status-cyan" />
              Analyzer ready
            </span>
            <span>WI-FI</span>
            <span>USB</span>
          </div>
        </div>
      </section>

      <section className="signal-strip shell" aria-label="Product overview">
        {signalStatus.map((item) => (
          <div className={`signal-card signal-${item.tone}`} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="workflow-section shell" id="workflow">
        <div className="section-heading">
          <p className="eyebrow">SYSTEM WORKFLOW / 01—04</p>
          <h2>From first route to final response.</h2>
          <p>
            One connected path for preparing, measuring, correcting, and
            monitoring a live system.
          </p>
        </div>

        <div className="workflow-list">
          {workflow.map((item, index) => (
            <article
              className={`workflow-step ${index % 2 ? "workflow-reverse" : ""}`}
              key={item.stage}
            >
              <div className="workflow-copy">
                <p className="step-index">{item.step} / 04</p>
                <h3>{item.stage}</h3>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
                <span className="status-pill">
                  <i className="status-light" />
                  {item.stage} ready
                </span>
              </div>
              <ProductScreenshot
                screen={screenById(item.screenId)}
                className="workflow-screen"
                showCaption={false}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="analysis-section" id="analysis">
        <div className="shell">
          <div className="section-heading analysis-heading">
            <p className="eyebrow">MEASUREMENT + CORRECTION</p>
            <h2>See the room. Shape the response.</h2>
            <p>
              Compare capture positions, target response, and channel detail
              without leaving the same working surface.
            </p>
          </div>
          <div className="analysis-grid">
            <ProductScreenshot
              screen={screenById("06")}
              className="analysis-screen"
              showCaption={false}
            />
            <ProductScreenshot
              screen={screenById("07-balanced")}
              className="analysis-screen analysis-screen-raised"
              showCaption={false}
            />
          </div>
          <div className="analysis-legend" aria-hidden="true">
            <span>
              <i className="legend-line legend-cyan" /> Captures
            </span>
            <span>
              <i className="legend-line legend-green" /> Target
            </span>
            <span>
              <i className="legend-line legend-orange" /> Correction
            </span>
          </div>
        </div>
      </section>

      <section
        className="screens-section shell"
        id="screens"
        aria-label="Kuula FOH Pilot product screens"
      >
        <div className="section-heading screens-heading">
          <p className="eyebrow">PRODUCT SCREENS / 01—09</p>
          <h2>The complete FOH path.</h2>
          <p>
            Real screens from the Android release in preparation, from input
            assignment to live analysis.
          </p>
        </div>
        <div className="screen-gallery">
          {productScreens.map((screen) => (
            <ProductScreenshot screen={screen} key={screen.id} />
          ))}
        </div>
      </section>

      <section className="company-band" aria-label="Publisher information">
        <div className="shell company-content">
          <div>
            <span className="company-label">DEVELOPED IN TALLINN</span>
            <p>
              Kuula FOH Pilot is developed and published by <b>ELAVHÕBE OÜ</b>
              in Tallinn, Estonia.
            </p>
          </div>
          <span className="coordinates">59.4370° N · 24.7536° E</span>
        </div>
      </section>
    </main>
  );
}
