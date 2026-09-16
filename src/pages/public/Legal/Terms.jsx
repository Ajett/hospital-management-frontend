import { Link } from "react-router-dom";

function Terms() {
  const sections = [
    ["#acceptance", "Acceptance"],
    ["#account", "User accounts"],
    ["#acceptable-use", "Acceptable use"],
    ["#healthcare", "Healthcare information"],
    ["#security", "Account security"],
    ["#availability", "Service availability"],
    ["#responsibility", "User responsibility"],
    ["#changes", "Changes to terms"],
    ["#contact", "Contact"],
  ];

  const accountItems = [
    "You should provide accurate information when creating an account.",
    "You are responsible for maintaining the confidentiality of your credentials.",
    "You should not knowingly provide your account credentials to another person.",
    "You should notify the appropriate support channel if you believe your account has been compromised.",
  ];

  const responsibilityItems = [
    "Use only the access provided to you.",
    "Keep account information accurate.",
    "Protect confidential information.",
    "Report suspicious or unauthorized account activity.",
  ];

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#455565]">

      {/* HERO */}
      <section className="bg-[#004f40]">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">

          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#bce5dc]">
                MEDICARE TERMS
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Terms &
                <span className="block font-serif font-normal italic text-[#bce5dc]">
                  conditions.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                These terms describe the general conditions for using the
                MediCare healthcare management portal.
              </p>

              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs text-white/75">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#bce5dc] font-bold text-[#004f40]">
                  ✓
                </span>
                Last updated: September 2026
              </div>

            </div>

            <div className="hidden lg:block">

              <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg font-bold text-[#006b55]">
                    ✓
                  </div>

                  <div>

                    <p className="text-[9px] font-bold tracking-[0.18em] text-[#73818d]">
                      MEDICARE PORTAL
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[#102333]">
                      Terms & conditions
                    </h3>

                    <p className="mt-1 text-xs text-[#73818d]">
                      Responsible use of the portal
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 text-white">

                <span className="h-2.5 w-2.5 rounded-full bg-[#bce5dc]" />

                <div>
                  <strong className="block text-xs">
                    Authorized use
                  </strong>

                  <span className="text-[11px] text-white/55">
                    Access based on account permissions
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="py-10 sm:py-14">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">

            {/* SIDEBAR */}
            <aside className="hidden lg:block">

              <div className="sticky top-6 rounded-2xl border border-[#e3ecea] bg-white p-4 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">

                <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#006b55]">
                  On this page
                </p>

                <nav className="space-y-1">

                  {sections.map(([href, label], index) => (
                    <a
                      key={href}
                      href={href}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-[#73818d] no-underline transition hover:bg-[#e8f6f2] hover:text-[#006b55]"
                    >
                      <span className="w-5 text-[9px] font-bold text-[#006b55]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {label}
                    </a>
                  ))}

                </nav>

              </div>

            </aside>

            {/* DOCUMENT */}
            <div className="max-w-4xl">

              {/* 01 */}
              <section
                id="acceptance"
                className="border-b border-[#e3ecea] py-8 first:pt-0"
              >
                <SectionNumber number="01" />

                <h2 className="section-title">
                  Acceptance of terms
                </h2>

                <p className="section-text">
                  By accessing or using the MediCare healthcare management
                  portal, you acknowledge that you have read and understood
                  these terms and agree to use the application responsibly.
                </p>

                <p className="section-muted">
                  If you do not agree with these terms, you should not use the
                  portal.
                </p>
              </section>

              {/* 02 */}
              <section
                id="account"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="02" />

                <h2 className="section-title">
                  User accounts
                </h2>

                <p className="section-text">
                  Certain features of MediCare require an authenticated user
                  account.
                </p>

                <BulletList items={accountItems} />
              </section>

              {/* 03 */}
              <section
                id="acceptable-use"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="03" />

                <h2 className="section-title">
                  Acceptable use
                </h2>

                <p className="section-text">
                  Users are expected to use the MediCare portal only for
                  legitimate healthcare management and administrative purposes
                  permitted by their account.
                </p>

                <p className="section-muted">
                  Users must not intentionally attempt to bypass
                  authentication, access information without authorization,
                  interfere with the application or misuse another user's
                  account.
                </p>
              </section>

              {/* 04 */}
              <section
                id="healthcare"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="04" />

                <h2 className="section-title">
                  Healthcare information
                </h2>

                <p className="section-text">
                  Information entered into the MediCare portal may include
                  patient, medical, appointment or billing information.
                </p>

                <p className="section-muted">
                  Users must only access or manage healthcare information that
                  they are authorized to access as part of their role and
                  responsibilities.
                </p>

                <div className="mt-5 flex gap-3 rounded-2xl border border-[#ead9a8] bg-[#fffaf0] p-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8e8b8] font-bold text-[#9a7200]">
                    !
                  </div>

                  <div>

                    <strong className="block text-sm text-[#102333]">
                      Authorized access only
                    </strong>

                    <span className="mt-1 block text-xs leading-5 text-[#73818d]">
                      Do not access, modify or share healthcare information
                      without appropriate authorization.
                    </span>

                  </div>

                </div>
              </section>

              {/* 05 */}
              <section
                id="security"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="05" />

                <h2 className="section-title">
                  Account security
                </h2>

                <p className="section-text">
                  MediCare uses authentication and role-based access controls
                  to help protect restricted areas of the application.
                </p>

                <p className="section-muted">
                  Users are responsible for protecting their passwords and
                  other account credentials. Do not share passwords or
                  authentication information with others.
                </p>
              </section>

              {/* 06 */}
              <section
                id="availability"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="06" />

                <h2 className="section-title">
                  Service availability
                </h2>

                <p className="section-text">
                  We aim to keep the MediCare application available and
                  functional, but continuous or uninterrupted availability
                  cannot be guaranteed.
                </p>

                <p className="section-muted">
                  The application may occasionally be unavailable because of
                  maintenance, technical issues, infrastructure problems or
                  circumstances outside the application's control.
                </p>
              </section>

              {/* 07 */}
              <section
                id="responsibility"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="07" />

                <h2 className="section-title">
                  User responsibility
                </h2>

                <p className="section-text">
                  Users are responsible for the information they enter, update
                  or manage through the portal and should ensure that their use
                  of the system follows applicable organizational policies.
                </p>

                <BulletList items={responsibilityItems} />
              </section>

              {/* 08 */}
              <section
                id="changes"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="08" />

                <h2 className="section-title">
                  Changes to these terms
                </h2>

                <p className="section-text">
                  These terms may be updated when the application, its features
                  or its operational requirements change.
                </p>

                <p className="section-muted">
                  Updated terms should be reviewed before continuing to use the
                  portal.
                </p>
              </section>

              {/* 09 */}
              <section
                id="contact"
                className="py-8"
              >
                <SectionNumber number="09" />

                <h2 className="section-title">
                  Contact
                </h2>

                <p className="section-text">
                  If you have questions regarding these terms or the use of the
                  MediCare portal, please contact the appropriate support
                  channel.
                </p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-3 rounded-xl bg-[#006b55] px-5 py-3 text-sm font-bold !text-white no-underline shadow-[0_8px_20px_rgba(0,107,85,0.16)] transition hover:bg-[#004f40]"
                >
                  Contact MediCare Support
                  <span>→</span>
                </Link>
              </section>

              {/* DISCLAIMER */}
              <div className="mt-2 rounded-2xl border border-[#ead9a8] bg-[#fffaf0] p-4">

                <strong className="block text-sm text-[#102333]">
                  Important
                </strong>

                <p className="mt-1 text-xs leading-5 text-[#73818d]">
                  These Terms & Conditions are provided as general terms for
                  the MediCare application. They should be reviewed and adapted
                  to the actual organization, jurisdiction, users, services
                  and legal requirements before being used as official legal
                  terms.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-[#e8f6f2] px-5 py-10 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-6 rounded-[28px] bg-[#006b55] p-7 shadow-[0_18px_45px_rgba(16,35,51,0.14)] sm:p-9 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bce8dd]">
                NEED ASSISTANCE?
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Have questions about the portal?
              </h2>

              <p className="mt-2 text-sm text-white/70">
                Visit our Help Center or contact MediCare support.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-4">

              <Link
                to="/help"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold !text-[#006b55] no-underline transition hover:bg-[#e8f6f2]"
              >
                Help Center
                <span>→</span>
              </Link>

              <Link
                to="/contact"
                className="text-sm font-semibold !text-white/80 no-underline transition hover:!text-white"
              >
                Contact us
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

function SectionNumber({ number }) {
  return (
    <span className="text-[11px] font-bold tracking-[0.18em] text-[#006b55]">
      {number}
    </span>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-6 text-[#455565]"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#006b55]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default Terms;