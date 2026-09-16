import { Link } from "react-router-dom";

function About() {
  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#455565]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#f2f9f7]">

        <div className="absolute -right-32 -top-24 h-80 w-80 rounded-full bg-[#dff3ee] opacity-60 blur-2xl" />
        <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-[#e8f6f2] opacity-70 blur-2xl" />

        <div className="relative mx-auto max-w-[1010px] px-6 py-12 sm:px-8 lg:py-16">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">

            {/* LEFT */}
            <div className="max-w-[560px]">

              <p className="mb-5 flex items-center gap-2 text-[8px] font-extrabold tracking-[0.25em] text-[#006b55] sm:text-[9px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#006b55]" />
                ABOUT MEDICARE
              </p>

              <h1 className="text-[42px] font-bold leading-[0.98] tracking-[-0.04em] text-[#102333] sm:text-[52px] lg:text-[58px]">
                Healthcare management,
                <br />
                <span className="font-serif font-normal italic text-[#006b55]">
                  made simpler.
                </span>
              </h1>

              <p className="mt-6 max-w-[520px] text-[12px] leading-6 text-[#60727e] sm:text-[13px]">
                MediCare is a modern hospital management platform designed to
                bring essential healthcare operations together in one secure
                and organized system.
              </p>

              {/* ACTIONS */}
              <div className="mt-7 flex flex-wrap items-center gap-3">

                <Link
                  to="/register"
                  className="inline-flex min-h-[46px] items-center gap-5 rounded-[6px] bg-[#006b55] px-5 text-[10px] font-bold text-white no-underline shadow-[0_8px_20px_rgba(0,107,85,0.16)] transition hover:-translate-y-0.5 hover:bg-[#004f40]"
                >
                  Get started
                  <span>→</span>
                </Link>

                <Link
                  to="/contact"
                  className="medicare-green-link inline-flex min-h-[46px] items-center justify-center rounded-[6px] border border-[#b8ccc8] bg-white px-5 text-[10px] font-bold no-underline transition hover:border-[#006b55] hover:bg-[#e8f6f2]"
                >
                  Contact us
                </Link>

              </div>

            </div>


            {/* RIGHT VISUAL */}
            <div className="relative mx-auto w-full max-w-[430px]">

              <div className="absolute -inset-5 rounded-[24px] bg-[#e8f6f2]/70 blur-2xl" />

              <div className="relative rounded-[20px] border border-[#dfeae7] bg-white p-4 shadow-[0_18px_45px_rgba(16,35,51,0.11)] sm:p-5">

                {/* header */}
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#006b55] text-xl font-bold text-white">
                    +
                  </div>

                  <div>
                    <p className="text-[8px] font-bold tracking-[0.16em] text-[#006b55]">
                      MEDICARE
                    </p>

                    <h2 className="mt-1 text-[14px] font-bold text-[#102333]">
                      Healthcare portal
                    </h2>
                  </div>

                </div>


                <div className="my-4 h-px bg-[#e3ecea]" />


                {/* items */}
                <div className="space-y-2.5">

                  <div className="flex items-center gap-3 rounded-[9px] bg-[#f7fafb] p-3">

                    <span className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#e8f6f2] text-[11px] font-bold text-[#006b55]">
                      ✓
                    </span>

                    <div>
                      <strong className="block text-[9px] font-bold text-[#102333]">
                        Secure
                      </strong>

                      <span className="text-[7px] text-[#73818d]">
                        Protected access
                      </span>
                    </div>

                  </div>


                  <div className="flex items-center gap-3 rounded-[9px] bg-[#f7fafb] p-3">

                    <span className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#e8f6f2] text-[11px] font-bold text-[#006b55]">
                      +
                    </span>

                    <div>
                      <strong className="block text-[9px] font-bold text-[#102333]">
                        Connected
                      </strong>

                      <span className="text-[7px] text-[#73818d]">
                        One integrated platform
                      </span>
                    </div>

                  </div>


                  <div className="flex items-center gap-3 rounded-[9px] bg-[#f7fafb] p-3">

                    <span className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#e8f6f2] text-[11px] text-[#006b55]">
                      ♥
                    </span>

                    <div>
                      <strong className="block text-[9px] font-bold text-[#102333]">
                        Patient focused
                      </strong>

                      <span className="text-[7px] text-[#73818d]">
                        Better healthcare experience
                      </span>
                    </div>

                  </div>

                </div>


                {/* bottom card */}
                <div className="mt-3 rounded-[9px] bg-[#006b55] p-4 text-white">

                  <p className="text-[7px] font-bold tracking-[0.18em] text-white/65">
                    HEALTHCARE MANAGEMENT
                  </p>

                  <p className="mt-2 text-[14px] font-semibold leading-5">
                    One platform.
                    <br />
                    Connected healthcare.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}
      <section className="border-y border-[#e3ecea] bg-[#f7fafb]">

        <div className="mx-auto grid max-w-[1010px] gap-8 px-6 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:py-14">

          {/* LEFT */}
          <div>

            <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#006b55]">
              OUR APPROACH
            </p>

            <h2 className="text-[31px] font-bold leading-[1.05] tracking-[-0.03em] text-[#102333] sm:text-[37px]">
              One platform for
              <br />
              <span className="font-serif font-normal italic text-[#006b55]">
                connected healthcare.
              </span>
            </h2>

          </div>


          {/* RIGHT */}
          <div className="max-w-[560px] space-y-4 text-[11px] leading-6 text-[#73818d]">

            <p>
              Managing healthcare information can involve many different
              processes. MediCare brings these workflows into a structured
              digital environment so authorized users can manage essential
              hospital activities more efficiently.
            </p>

            <p>
              From patient and doctor management to appointments, medical
              records and billing, the platform provides a centralized
              approach to everyday healthcare administration.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}
      <section className="bg-white">

        <div className="mx-auto max-w-[1010px] px-6 py-12 sm:px-8 lg:py-14">

          {/* heading */}
          <div className="max-w-[600px]">

            <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#006b55]">
              WHAT WE PROVIDE
            </p>

            <h2 className="text-[31px] font-bold leading-[1.05] tracking-[-0.03em] text-[#102333] sm:text-[37px]">
              Designed around essential
              <br />
              <span className="font-serif font-normal italic text-[#006b55]">
                healthcare workflows.
              </span>
            </h2>

            <p className="mt-4 text-[10px] leading-5 text-[#73818d]">
              MediCare brings important hospital management capabilities
              together in a single platform.
            </p>

          </div>


          {/* cards */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">

            {/* CARD 1 */}
            <div className="group rounded-[10px] border border-[#dfe9e6] bg-[#f7fafb] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b9ddd5] hover:bg-white hover:shadow-[0_15px_30px_rgba(16,35,51,0.08)]">

              <div className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-[#e8f6f2] text-[15px] text-[#006b55]">
                ♙
              </div>

              <h3 className="mt-4 text-[13px] font-bold text-[#102333]">
                Patient management
              </h3>

              <p className="mt-2 text-[9px] leading-5 text-[#73818d]">
                Organize patient information and make important details easier
                for authorized users to access and manage.
              </p>

            </div>


            {/* CARD 2 */}
            <div className="group rounded-[10px] border border-[#dfe9e6] bg-[#f7fafb] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b9ddd5] hover:bg-white hover:shadow-[0_15px_30px_rgba(16,35,51,0.08)]">

              <div className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-[#e8f6f2] text-[15px] text-[#006b55]">
                ✚
              </div>

              <h3 className="mt-4 text-[13px] font-bold text-[#102333]">
                Doctor & department management
              </h3>

              <p className="mt-2 text-[9px] leading-5 text-[#73818d]">
                Manage doctors, specializations and department information
                through a centralized system.
              </p>

            </div>


            {/* CARD 3 */}
            <div className="group rounded-[10px] border border-[#dfe9e6] bg-[#f7fafb] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b9ddd5] hover:bg-white hover:shadow-[0_15px_30px_rgba(16,35,51,0.08)]">

              <div className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-[#e8f6f2] text-[15px] text-[#006b55]">
                ✓
              </div>

              <h3 className="mt-4 text-[13px] font-bold text-[#102333]">
                Appointment management
              </h3>

              <p className="mt-2 text-[9px] leading-5 text-[#73818d]">
                Keep appointment information organized and support a smoother
                healthcare management workflow.
              </p>

            </div>


            {/* CARD 4 */}
            <div className="group rounded-[10px] border border-[#dfe9e6] bg-[#f7fafb] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b9ddd5] hover:bg-white hover:shadow-[0_15px_30px_rgba(16,35,51,0.08)]">

              <div className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-[#e8f6f2] text-[15px] text-[#006b55]">
                ▣
              </div>

              <h3 className="mt-4 text-[13px] font-bold text-[#102333]">
                Medical records & billing
              </h3>

              <p className="mt-2 text-[9px] leading-5 text-[#73818d]">
                Keep medical records and billing information structured and
                accessible to authorized users.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SECURITY
      ===================================================== */}
      <section className="bg-[#f7fafb]">

        <div className="mx-auto max-w-[1010px] px-6 py-12 sm:px-8 lg:py-14">

          <div className="grid items-center gap-10 lg:grid-cols-[330px_1fr] lg:gap-14">

            {/* LEFT CARD */}
            <div className="rounded-[18px] bg-[#006b55] p-6 text-white shadow-[0_18px_40px_rgba(0,107,85,0.18)]">

              <div className="flex h-11 w-11 items-center justify-center rounded-[9px] bg-white/15 text-lg font-bold">
                ✓
              </div>

              <p className="mt-6 text-[8px] font-bold tracking-[0.2em] text-white/60">
                SECURITY
              </p>

              <h3 className="mt-2 text-[21px] font-bold leading-tight">
                Secure access
                <br />
                matters.
              </h3>

              <div className="mt-6 h-px bg-white/15" />

              <p className="mt-4 text-[9px] leading-5 text-white/75">
                Controlled access helps keep healthcare management organized
                and available according to user permissions.
              </p>

            </div>


            {/* RIGHT CONTENT */}
            <div>

              <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#006b55]">
                BUILT WITH SECURITY IN MIND
              </p>

              <h2 className="text-[31px] font-bold leading-[1.05] tracking-[-0.03em] text-[#102333] sm:text-[37px]">
                Designed to keep access
                <br />
                <span className="font-serif font-normal italic text-[#006b55]">
                  controlled and organized.
                </span>
              </h2>

              <p className="mt-4 max-w-[550px] text-[10px] leading-5 text-[#73818d]">
                MediCare uses authentication and role-based access controls to
                help ensure that healthcare management features are available
                according to user permissions.
              </p>


              <div className="mt-5 space-y-2.5">

                {[
                  "Authentication-based access",
                  "Role-based permissions",
                  "Centralized healthcare management",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-[#dfe9e6] pb-2.5"
                  >

                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-[8px] font-bold text-[#006b55]">
                      ✓
                    </span>

                    <strong className="text-[9px] text-[#102333]">
                      {item}
                    </strong>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">

        <div className="mx-auto max-w-[1010px] px-6 sm:px-8">

          <div className="relative overflow-hidden rounded-[14px] bg-[#00755f] px-7 py-8 shadow-[0_18px_40px_rgba(0,107,85,0.16)] sm:px-9 sm:py-9">

            {/* background circle */}
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#0b8068] opacity-40" />


            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              {/* content */}
              <div>

                <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#bce5dc]">
                  START WITH MEDICARE
                </p>

                <h2 className="text-[27px] font-bold leading-[1.05] text-[#102333] sm:text-[32px]">
                  Ready to get started?
                </h2>

                <p className="mt-3 max-w-[500px] text-[9px] leading-5 text-white/80">
                  Create your account or sign in to access the healthcare
                  management portal.
                </p>

              </div>


              {/* buttons */}
              <div className="relative flex flex-wrap items-center gap-3">

                <Link
                  to="/register"
                  className="home-cta-find inline-flex min-h-[52px] min-w-[170px] items-center justify-between rounded-[8px] bg-white px-6 text-[9px] font-bold no-underline shadow-sm transition hover:bg-[#e8f6f2]"
                >
                  <span>Create account</span>
                  <span>→</span>
                </Link>


                <Link
                  to="/login"
                  className="home-cta-contact inline-flex min-h-[52px] min-w-[110px] items-center justify-center rounded-[8px] border border-white bg-transparent px-5 text-[9px] font-bold no-underline transition hover:bg-white"
                >
                  <span>Sign in</span>
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;