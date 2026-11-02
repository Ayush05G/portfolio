import { track } from '@vercel/analytics'

export default function ExperienceSpotlight() {
  return (
    <article className="experience-spotlight">
      <div>
        <span className="eyebrow">IN THE FIELD · BACHATT × ZET</span>
        <h3>From PRD to a credit-card launch.</h3>
        <p>Associate Product Manager Intern · May–July 2026</p>
      </div>
      <div className="experience-proof">
        <span>
          <strong>0 → 1</strong>Partner product launch
        </span>
        <span>
          <strong>40% → 75%</strong>Sprint completion
        </span>
        <span>
          <strong>1 → 4</strong>Partner journey tracking
        </span>
      </div>
      <details
        onToggle={(e) => {
          if (e.currentTarget.open) track('experience_case_study_opened', { case: 'bachatt' })
        }}
      >
        <summary>Read the launch story</summary>
        <div className="case-sections">
          <section>
            <h4>Problem</h4>
            <p>
              Launch a new credit-card line with partner ZET while aligning engineering, design and partner
              teams around one activation journey.
            </p>
          </section>
          <section>
            <h4>My role</h4>
            <p>
              Owned the PRD, activation funnel, success metrics and delivery coordination. Also took
              responsibility for sprint planning and standups.
            </p>
          </section>
          <section>
            <h4>Key decision</h4>
            <p>
              Cut the first release to the smallest shippable slice and sequence the riskiest assumption
              first. Instrument four landing-page themes with consistent GA4 and CleverTap events so their
              conversion funnels can be compared.
            </p>
          </section>
          <section>
            <h4>Evidence</h4>
            <ul>
              <li>Product taken from concept to live with ZET.</li>
              <li>Sprint completion increased from 40% to 75%; standups shortened from 30 to 20 minutes.</li>
              <li>
                BigQuery journey reporting expanded to four partners, with scheduled MIS consolidation for
                three.
              </li>
            </ul>
          </section>
          <section>
            <h4>Scope & limitations</h4>
            <p>
              Work completed as part of a company team. The sprint result reflects the delivery process, not a
              measured causal effect of the card launch. Customer conversion uplift and confidential company
              data are not claimed here.
            </p>
          </section>
        </div>
      </details>
    </article>
  )
}
