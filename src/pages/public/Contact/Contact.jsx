import { Link } from "react-router-dom";

function Contact() {
  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333]">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative overflow-hidden bg-[#004f40]">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#0b8068] opacity-25" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#006b55] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.75fr]">

            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#bce5dc]">
                CONTACT MEDICARE
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                We're here to
                <span className="block font-serif font-normal italic text-[#bce5dc]">
                  help.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Have a question about the MediCare healthcare management
                portal? Find the right way to reach us or explore our help
                resources.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/help"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-white px-6 text-sm font-bold !text-[#006b55] no-underline transition hover:bg-[#e8f6f2]"
                >
                  <span className="!text-[#006b55]">
                    Visit Help Center
                  </span>
                  <span className="!text-[#006b55]">→</span>
                </Link>

                <a
                  href="mailto:support@medicare.example"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-bold text-white no-underline transition hover:bg-white/10"
                >
                  Email support
                </a>

              </div>
            </div>

            {/* HERO INFO CARD */}
            <div className="rounded-[26px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-bold text-[#006b55]">
                +
              </div>

              <p className="mt-6 text-[9px] font-bold tracking-[0.2em] text-[#bce5dc]">
                MEDICARE SUPPORT
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white">
                We're here to help.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Get assistance with your account, portal access and everyday
                healthcare management needs.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <span className="block text-lg font-bold text-white">
                    01
                  </span>
                  <span className="mt-1 block text-[9px] text-white/60">
                    Support
                  </span>
                </div>

                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <span className="block text-lg font-bold text-white">
                    02
                  </span>
                  <span className="mt-1 block text-[9px] text-white/60">
                    Guidance
                  </span>
                </div>

                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <span className="block text-lg font-bold text-white">
                    03
                  </span>
                  <span className="mt-1 block text-[9px] text-white/60">
                    Assistance
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT OPTIONS
          ===================================================== */}
      <section className="bg-[#f7fafb]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                GET IN TOUCH
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Choose the right way
                <span className="block font-serif font-normal italic text-[#006b55]">
                  to reach us.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-[#73818d]">
              Find support for your account, portal access and everyday
              healthcare management needs.
            </p>

          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">

            {/* EMAIL */}
            <div className="group flex min-h-[280px] flex-col rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_4px_14px_rgba(16,35,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_14px_30px_rgba(16,35,51,0.10)]">

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                  @
                </div>

                <span className="text-2xl font-bold text-[#d5e7e2]">
                  01
                </span>
              </div>

              <p className="mt-6 text-[9px] font-bold tracking-[0.18em] text-[#006b55]">
                EMAIL SUPPORT
              </p>

              <h3 className="mt-2 text-xl font-bold">
                General questions
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-[#73818d]">
                For general questions, account support and assistance with the
                MediCare platform.
              </p>

              <a
                href="mailto:support@medicare.example"
                className="mt-5 inline-flex w-fit text-sm font-bold !text-[#006b55] no-underline hover:!text-[#004f40]"
              >
                support@medicare.example
                <span className="ml-2">↗</span>
              </a>

            </div>

            {/* HELP CENTER */}
            <div className="group flex min-h-[280px] flex-col rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_4px_14px_rgba(16,35,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_14px_30px_rgba(16,35,51,0.10)]">

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                  ?
                </div>

                <span className="text-2xl font-bold text-[#d5e7e2]">
                  02
                </span>
              </div>

              <p className="mt-6 text-[9px] font-bold tracking-[0.18em] text-[#006b55]">
                HELP CENTER
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Find quick answers
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-[#73818d]">
                Find answers to common questions about login, registration and
                using the portal.
              </p>

              <Link
                to="/help"
                className="mt-5 inline-flex w-fit text-sm font-bold !text-[#006b55] no-underline hover:!text-[#004f40]"
              >
                Visit Help Center
                <span className="ml-2">→</span>
              </Link>

            </div>

            {/* ACCOUNT */}
            <div className="group flex min-h-[280px] flex-col rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_4px_14px_rgba(16,35,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_14px_30px_rgba(16,35,51,0.10)]">

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                  +
                </div>

                <span className="text-2xl font-bold text-[#d5e7e2]">
                  03
                </span>
              </div>

              <p className="mt-6 text-[9px] font-bold tracking-[0.18em] text-[#006b55]">
                ACCOUNT ACCESS
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Sign in to MediCare
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-[#73818d]">
                Already have an account? Sign in to access your healthcare
                management dashboard.
              </p>

              <Link
                to="/login"
                className="mt-5 inline-flex w-fit text-sm font-bold !text-[#006b55] no-underline hover:!text-[#004f40]"
              >
                Sign In
                <span className="ml-2">→</span>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          INFORMATION
          ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-16">

          <div>

            <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
              HOW WE CAN HELP
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Support for your
              <span className="block font-serif font-normal italic text-[#006b55]">
                everyday needs.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-[#73818d]">
              If you are experiencing an issue with the MediCare portal,
              provide the relevant details when contacting support so the issue
              can be understood more easily.
            </p>

            <div className="mt-7 flex gap-4 rounded-2xl bg-[#e8f6f2] p-5">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-[#006b55]">
                ✓
              </span>

              <div>
                <strong className="text-sm">
                  Keep your details ready
                </strong>

                <p className="mt-1 text-xs leading-5 text-[#73818d]">
                  Include your account or issue details when contacting
                  support.
                </p>
              </div>

            </div>
          </div>

          {/* SUPPORT AREAS */}
          <div className="divide-y divide-[#e3ecea]">

            {[
              [
                "01",
                "Account & Login",
                "Questions about signing in, registration, password reset or account access.",
              ],
              [
                "02",
                "Appointments",
                "Assistance related to appointment management within the portal.",
              ],
              [
                "03",
                "Technical Support",
                "Report problems or unexpected behavior while using the application.",
              ],
              [
                "04",
                "Portal Guidance",
                "Get guidance on using the different features available in MediCare.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="flex gap-5 py-6 first:pt-0"
              >

                <span className="text-sm font-bold text-[#006b55]">
                  {number}
                </span>

                <div>
                  <h3 className="text-lg font-bold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#73818d]">
                    {text}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
          ===================================================== */}
      <section className="bg-[#f7fafb]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">

          <div className="rounded-[28px] bg-[#006b55] px-7 py-9 shadow-[0_18px_45px_rgba(16,35,51,0.14)] sm:px-10">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-[9px] font-bold tracking-[0.2em] text-[#bde8dd]">
                  NEED ASSISTANCE?
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Looking for quick
                  <span className="block font-serif font-normal italic text-[#dff3ee]">
                    answers?
                  </span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
                  Visit our Help Center for common questions and guidance
                  about the MediCare portal.
                </p>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/help"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-[14px] bg-white px-6 text-sm font-bold !text-[#006b55] no-underline transition hover:bg-[#e8f6f2]"
                >
                  <span className="!text-[#006b55]">
                    Visit Help Center
                  </span>
                  <span className="!text-[#006b55]">
                    →
                  </span>
                </Link>

                <a
                  href="mailto:support@medicare.example"
                  className="inline-flex h-12 items-center justify-center rounded-[14px] border border-white/25 px-6 text-sm font-bold text-white no-underline transition hover:bg-white/10"
                >
                  Email support
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Contact;