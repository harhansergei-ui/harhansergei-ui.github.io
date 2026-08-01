# Kuula FOH Pilot Website Implementation Plan

> Implementation note (1 August 2026): Google Sites editing became unreliable in the available Chrome accessibility session. The approved design and content are therefore implemented as a standalone hosted site, preserving the same public routes and custom-domain goal.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a small public Kuula FOH Pilot website, connect `fohpilot.com`, and use it to satisfy the current ELAVHÕBE OÜ website-verification requirement in Google Play Console.

**Architecture:** Google Sites hosts three public pages: Home, Support, and Privacy. `www.fohpilot.com` maps to the Google Site, `fohpilot.com` redirects permanently to `https://www.fohpilot.com`, and a Search Console Domain property proves ownership to Google Play Console. Existing email-related DNS records remain unchanged.

**Tech Stack:** Google Sites, Google Search Console, Squarespace Domains DNS and forwarding, Google Play Console, DNS/HTTPS command-line verification.

## Global Constraints

- Public language is English.
- Product name is exactly `Kuula FOH Pilot`.
- Responsible organization is exactly `ELAVHÕBE OÜ`.
- Public support address is exactly `kuula@fohpilot.com`.
- Public organization location is `Tallinn, Estonia`; the street address and phone number are not published.
- Visual treatment uses a near-black background, warm off-white text, and one amber accent.
- Use Google Sites native components and typography; do not add external scripts, forms, embeds, analytics, advertising, or animation.
- Every page footer reads `© 2026 ELAVHÕBE OÜ · Tallinn, Estonia · kuula@fohpilot.com`.
- Do not change nameservers or any MX, SPF, DKIM, DMARC, or other mail-related DNS records.
- Keep the Search Console verification TXT record after verification.
- DNS propagation and Google-managed TLS issuance can take up to 48 hours.
- Before app submission, the temporary website-only privacy wording must be replaced by a policy that matches the released app and its SDKs. Add Account Deletion only if the app supports account creation.

---

## External State Map

- Google Sites draft: the existing untitled site owned by `harhansergei@gmail.com`.
- Google Play developer account: `ELAVHÕBE OÜ`, account ID `4793617972457275142`.
- Google Play public developer email: `kuula@fohpilot.com`, already verified.
- Domain: `fohpilot.com`, currently showing a Squarespace parking page.
- Current web DNS: apex A records point to Squarespace; `www.fohpilot.com` is a CNAME to `ext-sq.squarespace.com`.
- Current known mail DNS: apex TXT includes `v=spf1 include:_spf.google.com ~all`.
- Local documentation:
  - Design: `docs/superpowers/specs/2026-07-31-kuula-foh-pilot-site-design.md`
  - Plan: `docs/superpowers/plans/2026-08-01-kuula-foh-pilot-site.md`

---

### Task 1: Build the Home Page

**External state:** Modify the existing Google Sites draft.

**Produces:** A named site and complete Home page with approved product and organization copy.

- [ ] **Step 1: Open the existing Google Sites draft and name the file**

Set the Google Sites file name to `Kuula FOH Pilot Website`.

- [ ] **Step 2: Set the visible site name**

Set the header site name to `Kuula FOH Pilot`.

- [ ] **Step 3: Replace the default page title**

Set the page hero heading to:

```text
Confidence at front of house.
```

- [ ] **Step 4: Add the supporting product copy**

Insert one text block under the hero:

```text
Kuula FOH Pilot is a focused companion for live sound professionals. The Android app is being prepared for release on Google Play.
```

- [ ] **Step 5: Add the organization statement**

Insert a second text block:

```text
Kuula FOH Pilot is developed and published by ELAVHÕBE OÜ in Tallinn, Estonia.
```

- [ ] **Step 6: Add the primary action**

Add a button labeled `Contact support` that links to the Support page after Task 2 creates it.

- [ ] **Step 7: Add the global footer**

Set the footer text to:

```text
© 2026 ELAVHÕBE OÜ · Tallinn, Estonia · kuula@fohpilot.com
```

- [ ] **Step 8: Inspect the saved draft**

Confirm the editor reports that changes are saved to Drive and that no default `Page title` or `Untitled site` text remains visible.

---

### Task 2: Build the Support Page

**External state:** Modify the same Google Sites draft.

**Consumes:** The site name and footer from Task 1.

**Produces:** A navigation item and direct support contact at `/support`.

- [ ] **Step 1: Create a top-level page**

Create a page named `Support` and keep it visible in top navigation.

- [ ] **Step 2: Set the page heading**

Use the heading:

```text
Support
```

- [ ] **Step 3: Add the support copy**

Insert this paragraph:

```text
For product questions, technical support, or privacy requests, email us at kuula@fohpilot.com.
```

- [ ] **Step 4: Link the email address**

Select only `kuula@fohpilot.com` and set its link target to:

```text
mailto:kuula@fohpilot.com
```

- [ ] **Step 5: Confirm the inherited footer**

Verify the Support page displays:

```text
© 2026 ELAVHÕBE OÜ · Tallinn, Estonia · kuula@fohpilot.com
```

- [ ] **Step 6: Link the Home button**

Return to Home and set `Contact support` to the internal Support page.

---

### Task 3: Build the Privacy Page

**External state:** Modify the same Google Sites draft.

**Produces:** A website-specific privacy notice at `/privacy` with fully specified text.

- [ ] **Step 1: Create a top-level page**

Create a page named `Privacy` and keep it visible in top navigation.

- [ ] **Step 2: Set the heading and effective date**

Add:

```text
Privacy Policy

Effective date: 31 July 2026
```

- [ ] **Step 3: Add the introduction**

```text
This Privacy Policy explains how ELAVHÕBE OÜ handles information in connection with the Kuula FOH Pilot website.
```

- [ ] **Step 4: Add the website data section**

```text
Website data

This website does not provide user accounts or forms. ELAVHÕBE OÜ has not configured advertising or analytics on this website.
```

- [ ] **Step 5: Add the support communications section**

```text
Support communications

If you contact us by email, you voluntarily provide your email address, message, and any information you include. We use that information only to answer your request and maintain support records when necessary. We do not sell this information.
```

- [ ] **Step 6: Add the app-release notice**

```text
Kuula FOH Pilot app

Kuula FOH Pilot is being prepared for release. Before public release, this policy will be updated to describe the app's actual data handling and any third-party SDKs used by the app.
```

- [ ] **Step 7: Add the responsible organization and contact**

```text
Contact

ELAVHÕBE OÜ
Tallinn, Estonia
kuula@fohpilot.com
```

Link the final email address to `mailto:kuula@fohpilot.com`.

- [ ] **Step 8: Confirm the inherited footer**

Verify the Privacy page displays the approved global footer and contains no form, account, analytics, advertising, or unsupported app-data claim.

---

### Task 4: Apply the Visual System and Validate Navigation

**External state:** Modify and preview the same Google Sites draft.

**Consumes:** Home, Support, and Privacy pages from Tasks 1–3.

**Produces:** A consistent desktop and mobile presentation.

- [ ] **Step 1: Select the closest native dark theme**

Choose a Google Sites theme with a near-black or charcoal page background and warm off-white text. Use an amber theme accent when the theme controls expose a compatible accent selector.

- [ ] **Step 2: Use a text-only brand header**

Keep `Kuula FOH Pilot` as the visible brand. Do not upload an invented logo or stock photograph.

- [ ] **Step 3: Check top navigation order**

Ensure the top navigation order is exactly:

```text
Home | Support | Privacy
```

- [ ] **Step 4: Preview desktop**

Use Google Sites Preview and confirm headings do not wrap awkwardly, body text remains readable, and each page fits without horizontal scrolling.

- [ ] **Step 5: Preview mobile**

Switch Preview to phone width and confirm the menu exposes all three pages, footer text remains legible, and the support address is not clipped.

- [ ] **Step 6: Exit preview and confirm saving**

Return to the editor and confirm all changes are saved to Drive.

---

### Task 5: Publish the Google Sites Version

**External state:** Publish the Google Sites draft publicly.

**Consumes:** Validated site from Tasks 1–4.

**Produces:** A public Google Sites fallback URL.

- [ ] **Step 1: Open Publish settings**

Choose the web address `kuula-foh-pilot`. If Google Sites reports that exact address unavailable, use `kuula-foh-pilot-app` and record the resulting public URL in the completion notes.

- [ ] **Step 2: Set viewer access**

Set the published site to `Anyone` or the equivalent option that allows public viewing without sign-in.

- [ ] **Step 3: Publish**

Click `Publish` and complete only non-binding publication prompts. Publication is authorized by the user's instruction to implement the site.

- [ ] **Step 4: Test the public fallback URL**

Open the published URL in a separate tab and confirm Home, Support, and Privacy load without sign-in.

- [ ] **Step 5: Test links**

Confirm navigation works and the email link resolves to `mailto:kuula@fohpilot.com` without sending a message.

---

### Task 6: Prepare Search Console Ownership Verification

**External state:** Create the Search Console property and obtain its DNS token; do not verify it yet.

**Consumes:** Domain `fohpilot.com` and the signed-in Google account that owns the site and Play Console account.

**Produces:** The exact Search Console TXT value needed for DNS.

- [ ] **Step 1: Open Search Console in a new tab**

Navigate to `https://search.google.com/search-console` using the current Google account.

- [ ] **Step 2: Add a Domain property**

Choose `Domain`, enter exactly `fohpilot.com`, and continue.

- [ ] **Step 3: Capture the TXT record**

Copy the exact value beginning with:

```text
google-site-verification=
```

Do not click `Verify` yet.

- [ ] **Step 4: Record the token safely for the active session**

Keep the token only in the active working context long enough to add it to DNS. Do not write it to the repository or expose it in the final response.

---

### Task 7: Update DNS and Domain Forwarding

**External state:** Modify Squarespace-managed DNS and forwarding for `fohpilot.com`.

**Consumes:** Search Console TXT token from Task 6 and the Google Sites custom-domain target shown by Google Sites.

**Produces:** Search Console verification DNS, `www` mapping, and apex redirect while preserving email.

- [ ] **Step 1: Open Squarespace Domains in a new tab**

Navigate to the Squarespace domain dashboard. If the destination requires a new login or reauthentication, pause and hand the login step to the user.

- [ ] **Step 2: Audit current DNS before editing**

Record the current A, CNAME, TXT, MX, DKIM, and DMARC entries in the working context. Confirm the known SPF value remains present:

```text
v=spf1 include:_spf.google.com ~all
```

- [ ] **Step 3: Request action-time confirmation**

Before saving any DNS, forwarding, or Search Console ownership change, ask the user to confirm this exact batch:

```text
Add the Search Console TXT record, replace the Squarespace web records needed for Google Sites, configure fohpilot.com to redirect to https://www.fohpilot.com, and verify permanent Search Console ownership. Email DNS records and nameservers will not be changed.
```

- [ ] **Step 4: Add the Search Console TXT record**

After confirmation, add the TXT token from Task 6 at the apex host (`@` or the blank/root host required by Squarespace). Do not remove the SPF TXT record.

- [ ] **Step 5: Replace the `www` web mapping**

Remove or edit only the conflicting `www` CNAME that currently points to `ext-sq.squarespace.com`. Set `www` to the exact Google Sites CNAME target shown in Google Sites; the expected target is:

```text
ghs.googlehosted.com
```

- [ ] **Step 6: Configure the apex redirect**

Remove only Squarespace web-hosting A records that conflict with domain forwarding, then create a permanent `301` forwarding rule from `fohpilot.com` to:

```text
https://www.fohpilot.com
```

Choose path preservation if Squarespace offers it so `/support` and `/privacy` remain meaningful.

- [ ] **Step 7: Re-audit mail DNS**

Confirm MX, SPF, DKIM, and DMARC values are unchanged from Step 2 and nameservers were not edited.

---

### Task 8: Verify Search Console and Attach the Custom Domain

**External state:** Verify the Domain property and configure Google Sites custom domains.

**Consumes:** DNS changes from Task 7 and public Google Site from Task 5.

**Produces:** Verified Search Console ownership and a Google-managed custom-domain mapping.

- [ ] **Step 1: Verify the Domain property**

Return to Search Console and click `Verify`. If DNS is not yet visible, leave the dialog available and retry only after an external DNS lookup returns the verification TXT value.

- [ ] **Step 2: Open Google Sites custom domains**

In the site editor, open `Settings` → `Custom domains` → `Start setup`.

- [ ] **Step 3: Add the custom URL**

Enter exactly:

```text
www.fohpilot.com
```

Complete the mapping flow using the verified Search Console property.

- [ ] **Step 4: Publish the mapping change**

Publish again if Google Sites requires publication after custom-domain configuration.

- [ ] **Step 5: Check DNS visibility**

Run:

```bash
dig +short fohpilot.com TXT
dig +short www.fohpilot.com CNAME
```

Expected evidence: the Search Console TXT token is present and the `www` CNAME resolves to the Google Sites target.

---

### Task 9: Register and Request Verification in Play Console

**External state:** Modify the ELAVHÕBE OÜ Play Console account details and submit the website verification request.

**Consumes:** Verified Search Console property and reachable organization site.

**Produces:** `fohpilot.com` recorded as the organization website and a submitted ownership request.

- [ ] **Step 1: Open account details**

Navigate to `Developer account` → `About you` in Play Console.

- [ ] **Step 2: Set the organization website**

Enter:

```text
https://fohpilot.com
```

Save the account-details change.

- [ ] **Step 3: Submit the verification request**

Click `Submit verification request` for the organization website. The request must target the Search Console owner associated with the same Google account.

- [ ] **Step 4: Inspect resulting status**

Confirm Play Console no longer shows a blank organization website and reports either verified ownership or a clearly identified pending approval state.

---

### Task 10: End-to-End Verification and Completion Audit

**External state:** Public DNS, HTTPS endpoints, Google Sites, Search Console, and Play Console.

**Consumes:** All prior tasks.

**Produces:** Evidence-backed completion report or a precise propagation status.

- [ ] **Step 1: Verify DNS without relying on browser cache**

Run:

```bash
dig +short fohpilot.com A
dig +short fohpilot.com TXT
dig +short www.fohpilot.com CNAME
dig +short fohpilot.com MX
```

Confirm web records point away from the Squarespace parking configuration, the Search Console TXT record exists, and mail records still exist.

- [ ] **Step 2: Verify HTTP and HTTPS behavior**

Run:

```bash
curl -I -L --max-time 20 https://fohpilot.com
curl -I -L --max-time 20 https://www.fohpilot.com
```

Expected evidence: the apex redirects to `https://www.fohpilot.com`, the final response is successful, and no certificate error occurs.

- [ ] **Step 3: Verify public pages in a separate browser context**

Open Home, Support, and Privacy without relying on editor authentication. Confirm all approved copy, navigation, footer text, and email links are present.

- [ ] **Step 4: Verify responsive presentation**

Inspect desktop and phone-width views of the published custom domain. Confirm no clipped text, unusable navigation, or horizontal scrolling.

- [ ] **Step 5: Verify Google control-plane status**

Confirm Search Console shows `fohpilot.com` as verified and Play Console shows the organization website value plus verified or submitted status.

- [ ] **Step 6: Record completion evidence**

Report the public URLs, Google Sites fallback URL, Search Console status, Play Console status, DNS propagation status, and any remaining time-based propagation condition. Do not claim completion while any required evidence is missing.
