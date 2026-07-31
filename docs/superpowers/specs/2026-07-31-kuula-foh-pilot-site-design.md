# Kuula FOH Pilot Website Design

## Purpose

Create a small, public English-language website for Kuula FOH Pilot at `fohpilot.com`. The first release replaces the Squarespace parking page, establishes `ELAVHÕBE OÜ` as the organization behind the app, provides a working support contact, and enables organization website verification in Google Play Console through Google Search Console.

This release addresses the current Google Play developer-account blocker. It does not claim that the app's future Data safety declaration is complete; that declaration and the final app-specific privacy wording must match the released app and its SDKs.

## Hosting and Domain Architecture

- Build and publish the site with Google Sites under the Google account that owns the existing draft.
- Map the published site to `www.fohpilot.com` because Google Sites requires a subdomain for a custom URL.
- Redirect the apex domain `fohpilot.com` permanently to `https://www.fohpilot.com`.
- Verify the Search Console Domain property `fohpilot.com` with the TXT record supplied by Search Console.
- Keep the Search Console verification TXT record in DNS after verification.
- Preserve all mail-related DNS records, including the existing SPF record, so `kuula@fohpilot.com` continues to work.
- Remove only web-hosting records that conflict with the Google Sites mapping or apex redirect. Do not change mail records or nameservers.

## Information Architecture

### Home

The home page presents the product and the organization without making unverifiable launch or feature claims.

- Site name: `Kuula FOH Pilot`
- Hero heading: `Confidence at front of house.`
- Supporting copy: `Kuula FOH Pilot is a focused companion for live sound professionals. The Android app is being prepared for release on Google Play.`
- Organization statement: `Kuula FOH Pilot is developed and published by ELAVHÕBE OÜ in Tallinn, Estonia.`
- Primary action: `Contact support`, linking to the Support page.

### Support

The support page provides a direct and functional contact path.

- Heading: `Support`
- Copy: `For product questions, technical support, or privacy requests, email us at kuula@fohpilot.com.`
- Clickable email link: `mailto:kuula@fohpilot.com`
- Response-time promises are intentionally omitted.

### Privacy

The initial privacy page covers the website itself and avoids unsupported statements about the unreleased app.

- State that the website has no account system, forms, advertising, or analytics configured by ELAVHÕBE OÜ.
- State that visitors who email support provide their email address and message voluntarily and that this information is used only to answer the request and maintain necessary support records.
- State that information is not sold.
- Identify `ELAVHÕBE OÜ` as the responsible organization and list `kuula@fohpilot.com` for privacy requests.
- Display an effective date of `31 July 2026`.
- State clearly that an updated app-specific privacy policy will be published before the public release of Kuula FOH Pilot and will reflect the app's actual data handling and third-party SDKs.

An Account Deletion page is not included in this release. It must be added before app submission if Kuula FOH Pilot allows users to create an account.

## Visual Design

- Use a restrained dark theme suited to live audio work: near-black background, warm off-white text, and a single amber accent.
- Prefer Google Sites' native typography and components so the custom domain renders reliably.
- Use a text-based brand treatment until an approved logo or screenshot is supplied.
- Keep each page short, readable on mobile, and free of animation, embedded trackers, and unnecessary media.
- Footer on every page: `© 2026 ELAVHÕBE OÜ · Tallinn, Estonia · kuula@fohpilot.com`.

## Navigation and Content Behavior

- Top navigation contains `Home`, `Support`, and `Privacy`.
- All pages are visible to anyone without sign-in.
- The support email opens the visitor's default mail application.
- No form submission, database, account, cookies controlled by ELAVHÕBE OÜ, or application backend is introduced.
- The temporary Google Sites URL remains available as a diagnostic fallback during DNS propagation.

## Publication and Verification Flow

1. Create the three pages and apply the selected theme in the existing Google Sites draft.
2. Preview desktop and mobile layouts.
3. Publish the site publicly with an appropriate Google Sites web address.
4. Create and verify the `fohpilot.com` Domain property in Search Console using a DNS TXT record.
5. Map `www.fohpilot.com` to the published Google Site.
6. Replace the current Squarespace `www` mapping with the Google Sites CNAME supplied by Google Sites.
7. Configure a permanent redirect from `fohpilot.com` to `https://www.fohpilot.com` without altering email DNS records.
8. Wait for DNS and TLS propagation, which can take up to 48 hours.
9. Enter `https://fohpilot.com` as the organization website in Play Console and submit the website-verification request to the verified Search Console owner.

DNS changes are security-sensitive network changes. They require explicit confirmation at action time before they are saved. Any password or two-factor authentication prompt is handed back to the user.

## Verification Criteria

- `https://fohpilot.com` redirects to `https://www.fohpilot.com`.
- `https://www.fohpilot.com` loads without authentication or certificate errors.
- Home, Support, and Privacy pages are reachable through navigation on desktop and mobile.
- The site visibly names both `Kuula FOH Pilot` and `ELAVHÕBE OÜ`.
- `kuula@fohpilot.com` appears as a clickable support address.
- The privacy page contains the effective date and the website data-handling statements above.
- DNS still contains the existing email records and the Search Console TXT verification record.
- Search Console reports the `fohpilot.com` Domain property as verified for the same Google account used in Play Console.
- Play Console accepts the organization website and enables submission of the website-verification request.

## Deferred App-Release Requirements

Before the app is submitted to Google Play, confirm whether it creates accounts and inventory every type of user data collected or shared by the app and its SDKs. Then replace the pre-release privacy wording with a comprehensive app-specific policy, ensure the Play Console Data safety form matches it, add an in-app privacy link, and add a public account-deletion path if account creation is supported.
