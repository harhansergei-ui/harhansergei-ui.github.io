import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Kuula FOH Pilot",
  description: "Contact support for Kuula FOH Pilot.",
};

export default function Support() {
  return (
    <main className="page-main shell">
      <div className="page-grid">
        <div className="page-heading">
          <p className="eyebrow">SUPPORT / 01</p>
          <h1>Support</h1>
        </div>
        <div className="page-content">
          <p className="lead">
            For product questions, technical support, or privacy requests,
            email us at kuula@fohpilot.com.
          </p>
          <a className="contact-card" href="mailto:kuula@fohpilot.com">
            <span>
              <small>EMAIL SUPPORT</small>
              <strong>kuula@fohpilot.com</strong>
            </span>
            <b aria-hidden="true">↗</b>
          </a>
          <p className="muted-copy">
            Please include a short description of your question and the device
            you are using so we can help efficiently.
          </p>
        </div>
      </div>
    </main>
  );
}
