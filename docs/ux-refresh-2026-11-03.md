# Usability refresh — 3 November 2026

Implemented in the order approved in chat, retaining the dark streaming-service
identity. No publication or new project cards were part of this implementation.

## 1. Entry and first screen

First-time visitors enter the portfolio directly. More offers Play intro and
Choose profile; both cinematic screens have an explicit Skip to portfolio
button. A delayed intro completion cannot redirect someone who already skipped.
Saved profiles and project deep links still work.

The hero explains the product/engineering focus, former Bachatt internship and
NSUT graduation year. Explore my work and View resume are the primary actions.
Email, copy-email, LinkedIn and About me are visible without scrolling through
the entire portfolio. The trailer only mounts after an explicit request.

## 2. Selected work and case studies

Findesk, Product Analytics and Aether lead the featured grid; an explicit toggle
reveals the other three projects. Cards show a real status, role and supported
outcome instead of match percentages. Prototype and internal-tool status are
visible, and protected apps describe their sign-in requirement.

All six existing projects have structured Problem, My role, Key decision,
Evidence and Limitations fields in `src/data.ts`. Long descriptions remain in a
Technical details disclosure. Product Analytics has a clickable external case
study action. The Bachatt launch story is an experience spotlight, not an
additional employer project card; the existing seasons and episodes remain
available beneath it.

Screenshot provenance:

- `public/projects/findesk-overview.webp`: captured from the signed-out public
  `/home` screen of the existing Findesk deployment on 3 November. No account was
  signed in. Market values are a static screenshot, not a live data feed.
- `public/projects/product-analytics-dashboard.webp`: compressed from the
  project's existing `docs/dashboard.png`. It illustrates an earlier dashboard
  version; the case-study limitations state that historical chart definitions
  may differ from the progression rates used in the current analysis.
- Projects without verified screenshots use text covers; their existing
  architecture/chart assets remain in detail views. No app screens were invented.

## 3. Hierarchy and mobile browsing

The main flow is Work → Experience → Skills → Achievements → About → Contact.
Live stats, learning and the extra tools row are behind an optional Behind the
scenes disclosure near the bottom. Profile-specific resumes and hero emphasis
remain available.

Skills are grouped by Build, Analyze, Ship and Collaborate with evidence tied to
actual projects. Old numeric level fields remain for compatibility, but no
fluency percentage or ranked skill claim is presented. The share image also
uses the professional positioning instead of 98% Match.

Mobile features a vertical project grid, Work / Resume / Contact / More bottom
navigation, wrapping actions, bounded project dialogs and a sticky close button.
The page and project dialogs were checked for horizontal overflow at widths
320, 390, 768 and 1440 pixels. Horizontal carousels remain only in secondary
recommendations and bonus content.

## 4. Accessibility and controls

`useDialog` provides labelled modal semantics, initial focus, wrapping Tab and
Shift+Tab, Escape handling, focus restoration, background inert and shared scroll
locking. Project, resume, search, profile and More dialogs use it. Switching
from Search or More to another dialog finishes the first cleanup before opening
the next, avoiding focus theft. Profile selection has an explicit close control
in addition to drag/backdrop dismissal.

Sound is off by default, stored only as an on/off preference, and controlled
globally from the header or More. All synthesized effects check that preference;
turning it off suspends the shared audio context. The optional trailer uses the
same preference. MotionConfig respects the system reduced-motion setting, and
programmatic scrolling chooses auto rather than smooth when requested.

Clipboard failure exposes the address for manual copying. The contact form has
autocomplete, success status and an announced error state. A keyboard skip link
targets the selected work section.

## 5. Measurement and verification

Retained profile/project/resume-open events and added demo/code/case-study
clicks, resume downloads, email copying, contact/social clicks, contact-form
start/success, all-project expansion and experience-story expansion. Analytics
properties contain fixed action labels or project/profile identifiers; form
contents, clipboard values and visitor email addresses are not sent as event
properties. Actual production analytics delivery was not tested locally.

Browser checks passed for:

- Direct entry and featured/all-project toggles.
- Structured case studies, keyboard wrapping, inert background and return focus.
- More → Search → project, and More → profile sheet transitions.
- Optional intro/profile skip and absence of delayed redirects.
- Clipboard success and persisted opt-in sound.
- Product and Developer resume routing.
- Contact success feedback using a mocked response; no real message was sent.
- External case-study URL and sticky project close at all four tested widths.
- No browser page exceptions in the tested paths.

Screenshots of the desktop/mobile hero, selected work and mobile project details
were visually inspected. Formatting, lint, TypeScript and production build were
checked locally. These checks do not establish a full assistive-technology audit,
live form deliverability, successful third-party sign-in or improved recruiting
conversion. Those need separate real-world verification after release.
