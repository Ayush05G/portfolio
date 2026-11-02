# Portfolio content review — 3 November 2026

## Sources and decisions

Compared the current site with `../resume-maker/portal/data/master-profile.json`,
the current portal renderer and project documentation across all 25 folders
(the portfolio, Resume Maker, and 23 other project folders).

The user confirmed updating the portfolio resumes only: Resume Maker, its
master profile and the Docs PDFs were left untouched. Resume Maker remains
excluded as a project card, as previously requested.

The November Google APM export says CGPA 7.55; the master profile says 7.73.
The user explicitly confirmed 7.73 for the site and both public resumes.

The portal now has persistent draft recovery, profile-version checks, optional
research, rewrite validation, job ranking/tracking, and track-specific internship
certificate links. These affect the source and rendering workflow; they are
not additional claims about the applicant's employment or project outcomes.

## Applied updates

- Refreshed `public/resume.pdf` for Product/Analyst roles and
  `public/resume-developer.pdf` for Software roles using the portal's current
  layout and factual bullets. Both are one page. Phone removal happens before
  layout so the contact line and link annotations are positioned together.
- Added `scripts/refresh-resumes.mjs` for repeatable, read-only exports from the
  sibling portal, with explicit editorial selections and source-ID validation.
  The old master-profile DSA entry remains stale; public exports retain the
  site's established 600+ lower bound and omit Top 100K.
- Findesk: replaced the old 89-test description with the November record of
  752 passing tests; added the synthetic 60-question benchmark, evidence guards,
  request coalescing/cooldowns, account-read protections and search/save fixes.
  The 1.62s versus 5.73s latency comparison is explicitly a single benchmark
  observation, not measured production performance or factual accuracy.
- Findesk strategy: retained the point-in-time membership reconstruction but
  removed the absolute survivorship-free claim; the 2019–24 snapshot gap is
  still a documented limitation.
- Product Analytics: surfaced the recorded 173 MB to 66 MB funnel-memory
  improvement and the 17-week versus 4.5-week experiment sizing decision.
  The proposed conversion experiment has no claimed uplift.
- Scrum Dashboard: reflected implemented burndown, velocity, retrospective
  notes, coverage-aware units, missing-day gaps and per-user encrypted tokens.
  Its July handoff predates the August implementation. Local code establishes
  features; this review did not establish deployment of every feature.
- PM Club: Executive Committee changed to Vice President, following the current
  profile; removed the frozen ten-month duration.
- Aether: replaced phone-to-phone deployment language with local multi-node
  verification, retained measured convergence figures, and stated outstanding
  physical-device/model-quality milestones.
- Removed old static LeetCode rank text from the biography-facing copy. The
  live-stats fallback remains a dated historical snapshot, not a current rank.

## Best new project candidates — not added yet

| Candidate                   | Evidence                                                                                     | Defensible presentation                                                                                                                                                  | Limits                                                                                                                                                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Practice Desk               | `../finance-project/practice-desk/CONFERENCE-DEMO.md`, payment/import API, integration tests | Implemented conference demo combining receivables ageing, partial payments, atomic CSV import and document review/upload workflows; configured for D1/R2 private hosting | Hosting configuration is not proof of publication. Six clients, nine invoices, 24 requests and demonstration balances are fictional fixtures, not adoption or recovered revenue. Client access requires platform invitations. |
| Document assistant template | `../freelance/README.md`, `app/api/chat/route.ts`, `lib/limits.ts`                           | Reusable prototype with document ingestion, retrieval, streamed citations and refusal when retrieval finds no qualifying source                                          | Fictional demo corpus; no evidenced client delivery or measured business outcome. Instance-local usage fallback is not a reliable global daily cap.                                                                           |

Recommendation: Practice Desk is the stronger next card because it demonstrates
a complete operational workflow beyond finance analytics. Keep its status as a
demo and omit a live link until publication is verified. The document assistant
can follow when it has a reviewed demo or documented delivery.

## Folder coverage

Dates refer to locally available commits or documentation, not freshly checked
production state. No new employer project cards were added.

| Folder                      | Findings since the previous August review                                         |
| --------------------------- | --------------------------------------------------------------------------------- |
| admin-panel                 | Latest local commit July 31; existing card/MIS work already covered               |
| aqi-analytics               | Latest local commit July 29; existing validated-analysis card remains relevant    |
| atlassian-migration         | June commit / July handoff; already represented in Experience                     |
| bachatt-main-webapp         | June local commit; no newer shipped contribution established                      |
| cdn-compressor              | July scratch/report material; already covered by CDN episode                      |
| coding-env                  | Windows folder redirects to WSL; actual repository not examined                   |
| disaster-mesh               | August demo transcript; clarify local versus hardware verification                |
| equity-research-assistant   | November 2 evidence guards and evaluation; strongest existing-card update         |
| finance-project             | October Practice Desk implementation/docs; strongest new candidate                |
| freelance                   | Implemented document-assistant template; delivery not established                 |
| gift                        | July birthday project; lower priority for career portfolio                        |
| groww-teardown              | Interview-stage handoff; no finished teardown established                         |
| hermes-slack-bot            | Empty folder                                                                      |
| infra-deployment            | July local commit; existing infrastructure episode covers it                      |
| job-apply                   | Empty top-level folder; separate active implementation exists inside Resume Maker |
| outline-confluence-alt      | June PDF-viewer changes; employer fork work already covered                       |
| plane-jira-alt              | July attachment fixes; employer fork work already covered                         |
| plane-slack-relay           | June relay work; already represented in Experience                                |
| product case study          | Raw event dataset, not a separate completed project                               |
| product-analytics-dashboard | August/September funnel/UI work, October date-picker repair                       |
| resume-maker                | Current source profile and renderer inspected; excluded from project cards        |
| rta-reports-scripts         | July local commit; existing Orbit episode covers the report automation            |
| scrum-dashboard             | August 19 burndown/velocity/retro work supersedes July handoff                    |
| zetapp-card                 | July tooling; seminar pipeline moved into Orbit; avoid double-counting            |
| portfolio                   | Updated current content and public resume assets                                  |

## Supporting project evidence

- Findesk: `../equity-research-assistant/docs/evaluation/report.md`,
  `docs/model-comparison/report.md`, `docs/evidence-guards/report.md`, and README.
  These use synthetic financial snapshots with real model calls, not recruited
  research participants. Scores are narrow rule checks with service failures
  retained. No token-cost saving or investment-return improvement is claimed.
- Scrum: `../scrum-dashboard/src/lib/burndown/series.ts` and
  `src/lib/retro/notes.ts`; August commits `ac48a5d` and `ca0aec5`.
- Product Analytics: README and HANDOFF; the data is the public RetailRocket
  dataset, not company operational data.
- Aether: README's single-machine demo and hardware-blocker sections.

This review used local files and available history. Live deployment availability,
employer production state and the WSL coding environment were not re-audited.

## Validation

Both PDFs were rendered and visually inspected. Extraction checks confirmed one
page each, CGPA 7.73, the 600+ solved lower bound, no phone or roll number, no
Top 100K claim, and text/link rectangles inside page bounds. Browser checks
verified that Recruiter and Developer open and download their respective new
PDFs, with downloaded bytes matching the public files. The updated leadership
role, CGPA, and three changed project modals were checked at desktop and mobile
widths with no browser exceptions.

At 390px, the document has an existing 14px horizontal overflow; serving the
unchanged HEAD content reproduced it. The project modals have no internal
horizontal overflow. No layout change was made as part of this content review.

Formatting, lint, TypeScript and production-build checks passed locally before
publication. Live deployment availability was not part of this local review.
