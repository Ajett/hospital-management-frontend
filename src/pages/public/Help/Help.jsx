import { useState } from "react";
import { Link } from "react-router-dom";

function Help() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create a MediCare account?",
      answer:
        "Click Create Account or Get Started and complete the registration form with your username and password. After successful registration, you can sign in to the healthcare portal.",
    },
    {
      question: "I forgot my password. What should I do?",
      answer:
        "Go to the Forgot Password page from the Sign In screen. Enter your registered email address and follow the password reset link sent to your email.",
    },
    {
      question: "Can I sign in with Google?",
      answer:
        "Yes. Select Continue with Google on the Sign In page and complete the Google authentication process. You will then be redirected to your MediCare dashboard.",
    },
    {
      question: "Why can't I access some features?",
      answer:
        "MediCare uses role-based access. The features available to you depend on your account role and the permissions associated with that role.",
    },
    {
      question: "How do I manage appointments?",
      answer:
        "After signing in, open the Appointments section from the healthcare portal navigation. Authorized users can manage appointment information according to their permissions.",
    },
    {
      question: "How can I access medical records?",
      answer:
        "Sign in to your MediCare account and open Medical Records from the portal navigation. Access is controlled according to your account permissions.",
    },
    {
      question: "What should I do if I receive an error?",
      answer:
        "First, refresh the page and try the action again. If the problem continues, note the error message and contact support with the relevant details.",
    },
    {
      question: "How do I sign out?",
      answer:
        "Use the Logout option available in your account navigation. Your current session will be ended and you will need to sign in again to access protected areas.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#455565]">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative overflow-hidden bg-[#004f40]">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#0b8068]/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#16835f]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_390px]">

            {/* LEFT */}
            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#a9e5d6]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a9e5d6]">
                  MediCare Help Center
                </span>
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-1px] text-white sm:text-5xl lg:text-[56px]">

                How can we
                <br />

                <span className="font-light italic text-[#a9e5d6]">
                  help you?
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
                Find answers to common questions about your MediCare account,
                authentication and healthcare management portal.
              </p>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-wrap gap-3">

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold !text-[#006b55] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f6f2]"
                >
                  Contact support
                  <span>→</span>
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3.5 text-sm font-bold !text-white transition duration-200 hover:bg-white/10"
                >
                  Sign in
                </Link>

              </div>

              {/* TRUST */}
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/65">

                <span>
                  <b className="mr-2 text-[#a9e5d6]">✓</b>
                  Account help
                </span>

                <span>
                  <b className="mr-2 text-[#a9e5d6]">✓</b>
                  Password support
                </span>

                <span>
                  <b className="mr-2 text-[#a9e5d6]">✓</b>
                  Portal guidance
                </span>

              </div>

            </div>


            {/* RIGHT SUPPORT CARD */}
            <div className="rounded-[26px] border border-white/15 bg-white p-6 shadow-2xl sm:p-7">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#006b55]">
                    MediCare Support
                  </span>

                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.4px] text-[#102333]">
                    How can we help?
                  </h2>

                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-lg font-bold text-[#006b55]">
                  ✓
                </div>

              </div>


              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-4 rounded-2xl border border-[#e3ecea] bg-[#f7fafb] p-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#006b55] shadow-sm">
                    ?
                  </div>

                  <div>
                    <strong className="block text-sm font-bold text-[#102333]">
                      Frequently asked questions
                    </strong>

                    <span className="text-xs text-[#73818d]">
                      Find quick answers
                    </span>
                  </div>

                </div>


                <div className="flex items-center gap-4 rounded-2xl border border-[#e3ecea] bg-[#f7fafb] p-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg font-bold text-[#006b55]">
                    +
                  </div>

                  <div>
                    <strong className="block text-sm font-bold text-[#102333]">
                      Account assistance
                    </strong>

                    <span className="text-xs text-[#73818d]">
                      Login and password support
                    </span>
                  </div>

                </div>

              </div>


              <div className="mt-5 flex items-center justify-between border-t border-[#e3ecea] pt-4 text-[11px] text-[#73818d]">

                <span className="flex items-center">
                  <i className="mr-2 h-2 w-2 rounded-full bg-[#16835f]" />
                  Support available
                </span>

                <span>
                  Secure portal
                </span>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          QUICK HELP
          ===================================================== */}
      <section className="bg-[#f7fafb] py-14 sm:py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#006b55]">
                Quick help
              </p>

              <h2 className="text-3xl font-bold tracking-[-0.7px] text-[#102333] sm:text-4xl">
                Find what you need
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-[#73818d]">
              Common tasks and support options for using the MediCare
              healthcare portal.
            </p>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* CARD 01 */}
            <Link
              to="/login"
              className="group rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#b7dcd4] hover:shadow-[0_12px_28px_rgba(16,35,51,0.10)]"
            >

              <div className="flex items-center justify-between">

                <span className="text-[11px] font-bold text-[#73818d]">
                  01
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f2] text-[#006b55] transition group-hover:bg-[#006b55] group-hover:!text-white">
                  →
                </span>

              </div>

              <h3 className="mt-6 text-lg font-bold text-[#102333]">
                Account & Login
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#73818d]">
                Sign in or access your account.
              </p>

              <span className="mt-5 block text-sm font-bold !text-[#006b55]">
                Open →
              </span>

            </Link>


            {/* CARD 02 */}
            <Link
              to="/register"
              className="group rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#b7dcd4] hover:shadow-[0_12px_28px_rgba(16,35,51,0.10)]"
            >

              <div className="flex items-center justify-between">

                <span className="text-[11px] font-bold text-[#73818d]">
                  02
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f2] text-[#006b55] transition group-hover:bg-[#006b55] group-hover:!text-white">
                  +
                </span>

              </div>

              <h3 className="mt-6 text-lg font-bold text-[#102333]">
                Create Account
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#73818d]">
                Register for a new account.
              </p>

              <span className="mt-5 block text-sm font-bold !text-[#006b55]">
                Register →
              </span>

            </Link>


            {/* CARD 03 */}
            <Link
              to="/forgot-password"
              className="group rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#b7dcd4] hover:shadow-[0_12px_28px_rgba(16,35,51,0.10)]"
            >

              <div className="flex items-center justify-between">

                <span className="text-[11px] font-bold text-[#73818d]">
                  03
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff6df] text-[#b27a00]">
                  *
                </span>

              </div>

              <h3 className="mt-6 text-lg font-bold text-[#102333]">
                Password Reset
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#73818d]">
                Recover access to your account.
              </p>

              <span className="mt-5 block text-sm font-bold !text-[#006b55]">
                Reset →
              </span>

            </Link>


            {/* CARD 04 */}
            <Link
              to="/contact"
              className="group rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#b7dcd4] hover:shadow-[0_12px_28px_rgba(16,35,51,0.10)]"
            >

              <div className="flex items-center justify-between">

                <span className="text-[11px] font-bold text-[#73818d]">
                  04
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf0f7] text-[#102333]">
                  @
                </span>

              </div>

              <h3 className="mt-6 text-lg font-bold text-[#102333]">
                Contact Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#73818d]">
                Get assistance with an issue.
              </p>

              <span className="mt-5 block text-sm font-bold !text-[#006b55]">
                Contact →
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
          ===================================================== */}
      <section className="bg-white py-14 sm:py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[330px_1fr] lg:gap-14">

            {/* FAQ INTRO */}
            <div>

              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#006b55]">
                Frequently asked questions
              </p>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.7px] text-[#102333] sm:text-4xl">

                Common questions,

                <br />

                <span className="font-light italic text-[#006b55]">
                  clear answers.
                </span>

              </h2>

              <p className="mt-5 text-sm leading-7 text-[#73818d]">
                Browse the questions below for quick guidance on using the
                MediCare platform.
              </p>


              <div className="mt-7 flex items-center gap-4 rounded-2xl border border-[#e3ecea] bg-[#f7fafb] p-4">

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] font-bold text-[#006b55]">
                  ✓
                </span>

                <div>

                  <strong className="block text-sm text-[#102333]">
                    Secure access
                  </strong>

                  <small className="text-xs text-[#73818d]">
                    Protected healthcare portal
                  </small>

                </div>

              </div>

            </div>


            {/* FAQ LIST */}
            <div className="space-y-3">

              {faqs.map((faq, index) => {

                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                      isOpen
                        ? "border-[#9ccfc4] bg-[#f7fafb] shadow-sm"
                        : "border-[#e3ecea] bg-white hover:border-[#c9dfda]"
                    }`}
                  >

                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-4.5 text-left sm:px-6 sm:py-5"
                    >

                      <span className="w-7 shrink-0 text-[11px] font-bold text-[#006b55]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1 text-sm font-bold text-[#102333] sm:text-[15px]">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-medium transition-all ${
                          isOpen
                            ? "bg-[#006b55] !text-white"
                            : "bg-[#e8f6f2] text-[#006b55]"
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>

                    </button>


                    {isOpen && (
                      <div className="border-t border-[#e3ecea] px-5 pb-5 pt-4 pl-16 text-sm leading-7 text-[#73818d] sm:px-6 sm:pl-[4.5rem]">
                        {faq.answer}
                      </div>
                    )}

                  </div>
                );

              })}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SUPPORT CTA
          ===================================================== */}
      <section className="bg-[#e8f6f2] px-5 py-12 sm:px-8 sm:py-14 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-7 rounded-[26px] bg-[#004f40] p-7 shadow-xl sm:p-9 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a9e5d6]">
                Still need help?
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-[-0.6px] text-white sm:text-4xl">
                We're here to help.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                If you couldn't find the answer you were looking for,
                contact our support team.
              </p>

            </div>


            <div className="flex flex-wrap items-center gap-3">

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold !text-[#006b55] transition hover:bg-[#e8f6f2]"
              >
                Contact Us
                <span>→</span>
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-sm font-bold !text-white/80 transition hover:border-white/50 hover:!text-white"
              >
                Back to Sign In
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Help;