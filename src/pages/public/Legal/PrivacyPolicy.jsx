import { Link } from "react-router-dom";

function PrivacyPolicy() {
  const sections = [
    ["#introduction", "Introduction"],
    ["#information", "Information We Handle"],
    ["#usage", "How Information Is Used"],
    ["#security", "Security"],
    ["#cookies", "Cookies & Local Storage"],
    ["#third-party", "Third-Party Services"],
    ["#rights", "Your Choices"],
    ["#contact", "Contact"],
  ];

  const informationItems = [
    "Account information such as username, email address and password-related data.",
    "Profile information provided through the healthcare portal.",
    "Patient, doctor and appointment information entered by authorized users.",
    "Medical record and billing information managed through authorized portal access.",
    "Authentication and session-related information required to operate the portal.",
  ];

  const usageItems = [
    "Creating and managing user accounts.",
    "Authenticating users and controlling access to available features.",
    "Managing patients, doctors, departments and appointments.",
    "Maintaining medical record and billing information within the application.",
    "Supporting password recovery and account-related communication.",
  ];

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#455565]">

      {/* HERO */}
      <section className="bg-[#004f40]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">

          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#bce5dc]">
                MEDICARE PRIVACY
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Privacy
                <span className="block font-serif font-normal italic text-[#bce5dc]">
                  Policy.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                This page explains how information may be handled when you use
                the MediCare healthcare management portal.
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
                      Privacy & security
                    </h3>

                    <p className="mt-1 text-xs text-[#73818d]">
                      Information handled responsibly
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 text-white">

                <span className="h-2.5 w-2.5 rounded-full bg-[#bce5dc]" />

                <div>
                  <strong className="block text-xs">
                    Protected access
                  </strong>

                  <span className="text-[11px] text-white/55">
                    Authentication and access controls
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
                id="introduction"
                className="border-b border-[#e3ecea] py-8 first:pt-0"
              >
                <SectionNumber number="01" />

                <h2 className="section-title">
                  Introduction
                </h2>

                <p className="section-text">
                  MediCare is a hospital management system designed to help
                  authorized users manage healthcare-related information and
                  administrative workflows.
                </p>

                <p className="section-muted">
                  We aim to handle information responsibly and provide
                  appropriate controls around authentication and access to the
                  portal.
                </p>
              </section>

              {/* 02 */}
              <section
                id="information"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="02" />

                <h2 className="section-title">
                  Information We Handle
                </h2>

                <p className="section-text">
                  Depending on how you use the application, the system may
                  process information such as:
                </p>

                <BulletList items={informationItems} />
              </section>

              {/* 03 */}
              <section
                id="usage"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="03" />

                <h2 className="section-title">
                  How Information Is Used
                </h2>

                <p className="section-text">
                  Information handled by MediCare may be used to provide and
                  operate the features of the hospital management system.
                </p>

                <BulletList items={usageItems} />
              </section>

              {/* 04 */}
              <section
                id="security"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="04" />

                <h2 className="section-title">
                  Security
                </h2>

                <p className="section-text">
                  MediCare uses authentication and role-based access controls
                  to help restrict access to protected areas of the
                  application.
                </p>

                <div className="mt-5 flex gap-3 rounded-2xl border border-[#b8ddd5] bg-[#e8f6f2] p-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-[#006b55] shadow-sm">
                    ✓
                  </div>

                  <div>
                    <strong className="block text-sm text-[#102333]">
                      Controlled access
                    </strong>

                    <span className="mt-1 block text-xs leading-5 text-[#73818d]">
                      Protected application areas require authenticated access.
                    </span>
                  </div>

                </div>

                <p className="section-muted">
                  No method of electronic storage or transmission can be
                  guaranteed to be completely secure. Users should also protect
                  their login credentials and avoid sharing account passwords.
                </p>
              </section>

              {/* 05 */}
              <section
                id="cookies"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="05" />

                <h2 className="section-title">
                  Cookies & Local Storage
                </h2>

                <p className="section-text">
                  The web application may use browser storage to maintain
                  authentication-related information and user session state.
                </p>

                <p className="section-muted">
                  For example, authentication tokens and basic user information
                  may be stored in the browser so that authenticated portal
                  functionality can operate.
                </p>
              </section>

              {/* 06 */}
              <section
                id="third-party"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="06" />

                <h2 className="section-title">
                  Third-Party Services
                </h2>

                <p className="section-text">
                  Certain application features may rely on third-party
                  services to provide authentication, database hosting,
                  application hosting or email delivery.
                </p>

                <p className="section-muted">
                  These services may process information according to their own
                  terms and privacy policies. Users should review the relevant
                  third-party policies where applicable.
                </p>
              </section>

              {/* 07 */}
              <section
                id="rights"
                className="border-b border-[#e3ecea] py-8"
              >
                <SectionNumber number="07" />

                <h2 className="section-title">
                  Your Choices
                </h2>

                <p className="section-text">
                  You are responsible for keeping your account credentials
                  confidential and for providing accurate information when
                  using the portal.
                </p>

                <p className="section-muted">
                  If you believe that account information needs to be corrected
                  or you have a question about information associated with your
                  account, please contact the appropriate support channel.
                </p>
              </section>

              {/* 08 */}
              <section
                id="contact"
                className="py-8"
              >
                <SectionNumber number="08" />

                <h2 className="section-title">
                  Contact
                </h2>

                <p className="section-text">
                  If you have questions about this Privacy Policy or the
                  handling of information within the MediCare portal, please
                  use the Contact Us page.
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
              <div className="mt-2 flex gap-3 rounded-2xl border border-[#ead9a8] bg-[#fffaf0] p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f8e8b8] font-bold text-[#9a7200]">
                  !
                </div>

                <div>
                  <strong className="block text-sm text-[#102333]">
                    Important
                  </strong>

                  <p className="mt-1 text-xs leading-5 text-[#73818d]">
                    This Privacy Policy is provided as general information for
                    the MediCare application. It should be reviewed and adapted
                    to the actual organization, jurisdiction, data practices
                    and legal requirements before being used as an official
                    legal policy.
                  </p>
                </div>

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
                Have a privacy question?
              </h2>

              <p className="mt-2 text-sm text-white/70">
                Contact us if you need more information about the MediCare
                portal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold !text-[#006b55] no-underline transition hover:bg-[#e8f6f2]"
              >
                Contact Us
                <span>→</span>
              </Link>

              <Link
                to="/"
                className="text-sm font-semibold !text-white/80 no-underline transition hover:!text-white"
              >
                Back to Home
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

export default PrivacyPolicy;