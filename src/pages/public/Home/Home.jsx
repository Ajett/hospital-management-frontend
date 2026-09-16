import { Link } from "react-router-dom";

const services = [
  [
    "♡",
    "Cardiology",
    "Heart and cardiovascular care with specialist-led support.",
  ],
  [
    "◉",
    "Neurology",
    "Expert care for brain, nerve and neurological conditions.",
  ],
  [
    "✚",
    "Oncology",
    "Coordinated cancer care with a compassionate patient-first approach.",
  ],
  [
    "⌁",
    "Orthopaedics",
    "Bone, joint and mobility care for every stage of life.",
  ],
  [
    "♧",
    "Women & Child Care",
    "Complete care for women, children and growing families.",
  ],
  [
    "◌",
    "Gastroenterology",
    "Modern diagnosis and treatment for digestive health.",
  ],
];

function Home() {
  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#455565]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#f2f9f7]">

        {/* soft background shapes */}
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#dff3ee] opacity-60 blur-2xl" />

        <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-[#e8f6f2] opacity-70 blur-2xl" />

        <div className="relative mx-auto max-w-[1280px] px-6 py-14 sm:px-8 lg:px-10 lg:py-16">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">

            {/* LEFT */}
            <div className="max-w-[610px]">

              <p className="mb-6 flex items-center gap-2 text-[9px] font-extrabold tracking-[0.25em] text-[#006b55] sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#006b55]" />
                COMPASSION · EXPERTISE · BETTER HEALTH
              </p>

              <h1 className="text-[48px] font-bold leading-[0.98] tracking-[-0.04em] text-[#102333] sm:text-[58px] lg:text-[66px]">
                Your Health
                <br />
                <span className="text-[#006b55]">Our Priority</span>
              </h1>

              <p className="mt-7 max-w-[550px] text-[14px] leading-7 text-[#60727e] sm:text-[15px]">
                Discover trusted doctors, advanced healthcare services and
                seamless hospital care — all connected through one simple
                platform.
              </p>

              {/* ACTIONS */}
              <div className="mt-7 flex flex-wrap items-center gap-3">

                <Link
                  to="/login"
                  className="inline-flex min-h-[46px] items-center gap-5 rounded-[6px] bg-[#006b55] px-5 text-[11px] font-bold text-white no-underline shadow-[0_8px_20px_rgba(0,107,85,0.16)] transition hover:-translate-y-0.5 hover:bg-[#004f40]"
                >
                  Book an Appointment
                  <span className="text-sm">→</span>
                </Link>

                <Link
                  to="/find-doctor"
                  className="home-cta-find inline-flex min-h-[46px] items-center justify-center rounded-[6px] border border-[#b8ccc8] bg-white px-5 text-[11px] font-bold no-underline shadow-sm transition hover:border-[#006b55]"
                >
                  <span>Find a Doctor</span>
                </Link>

              </div>

              {/* TRUST */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-medium text-[#73818d]">
                <span>✓ Trusted care</span>
                <span>✓ Expert doctors</span>
                <span>✓ Secure portal</span>
              </div>

            </div>


            {/* RIGHT VISUAL */}
            <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">

              {/* doctor image */}
              <div className="relative ml-auto h-[340px] w-[82%] overflow-hidden rounded-[22px] sm:h-[390px] lg:h-[420px]">

                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=88"
                  alt="Healthcare professional"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#004f40]/10 to-transparent" />

              </div>


              {/* floating patient card */}
              <div className="absolute bottom-[-30px] left-0 w-[285px] rounded-[12px] border border-[#e0ebe8] bg-white p-4 shadow-[0_18px_40px_rgba(16,35,51,0.13)] sm:w-[310px]">

                <div className="flex items-start justify-between">

                  <div>
                    <p className="m-0 text-[7px] font-extrabold tracking-[0.2em] text-[#006b55]">
                      PATIENT CARE
                    </p>

                    <h3 className="mt-1 text-[12px] font-bold text-[#102333]">
                      Everything in one place
                    </h3>
                  </div>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f6f2] text-[11px] font-bold text-[#006b55]">
                    ✓
                  </span>

                </div>


                {/* connected healthcare */}
                <div className="mt-3 flex items-center gap-2 rounded-[7px] bg-[#f5faf8] p-2">

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#006b55] text-sm font-bold text-white">
                    +
                  </span>

                  <div className="min-w-0 flex-1">
                    <strong className="block text-[8px] font-bold text-[#102333]">
                      Connected healthcare
                    </strong>

                    <span className="block text-[7px] text-[#73818d]">
                      Simple, secure and accessible
                    </span>
                  </div>

                  <span className="rounded-full bg-[#dff3ee] px-2 py-1 text-[6px] font-bold text-[#006b55]">
                    Active
                  </span>

                </div>


                {/* mini cards */}
                <div className="mt-2 grid grid-cols-2 gap-2">

                  {[
                    ["01", "Doctors"],
                    ["02", "Appointments"],
                    ["03", "Medical Records"],
                    ["04", "Billing"],
                  ].map(([number, title]) => (

                    <div
                      key={number}
                      className="flex items-center gap-2 rounded-[6px] border border-[#e2ece9] bg-white px-2 py-2"
                    >

                      <span className="text-[6px] font-bold text-[#006b55]">
                        {number}
                      </span>

                      <div>
                        <strong className="block text-[7px] font-bold text-[#102333]">
                          {title}
                        </strong>

                        <small className="block text-[6px] text-[#89969e]">
                          Manage securely
                        </small>
                      </div>

                    </div>

                  ))}

                </div>


                <div className="mt-3 flex items-center justify-between border-t border-[#e7eeec] pt-2 text-[6px] text-[#73818d]">

                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16835f]" />
                    System ready
                  </span>

                  <span>24/7 portal access</span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK ACTION STRIP
      ===================================================== */}
      <section className="border-y border-[#e1ebe8] bg-white">

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">

          {[
            ["01", "Book Appointment", "/login"],
            ["02", "Find a Doctor", "/find-doctor"],
            ["03", "Find a Location", "/login"],
            ["04", "Health Packages", "/login"],
            ["05", "Lab Tests", "/login"],
          ].map(([number, title, link]) => (

            <Link
              key={number}
              to={link}
              className="group flex min-h-[64px] items-center gap-3 border-b border-[#e5ecea] px-5 py-4 no-underline transition hover:bg-[#f7fafb] lg:min-h-[68px] lg:border-b-0 lg:border-r last:border-r-0"
            >

              <span className="text-[7px] font-bold tracking-widest text-[#8a999f]">
                {number}
              </span>

              <strong className="flex-1 text-[9px] font-bold text-[#102333]">
                {title}
              </strong>

              <span className="text-sm text-[#006b55] transition group-hover:translate-x-1">
                →
              </span>

            </Link>

          ))}

        </div>

      </section>


      {/* =====================================================
          SPECIALITIES
      ===================================================== */}
      <section className="bg-[#f7fafb] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-[1010px] px-6 sm:px-8">

          <div className="mb-10 grid gap-7 lg:grid-cols-[1fr_310px] lg:items-end">

            <div>

              <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#006b55]">
                OUR SPECIALITIES
              </p>

              <h2 className="text-[35px] font-bold leading-[1.05] tracking-[-0.03em] text-[#102333] sm:text-[42px]">
                Comprehensive care,
                <br />
                <span className="font-serif font-normal italic text-[#006b55]">
                  close to you.
                </span>
              </h2>

            </div>

            <p className="text-[11px] leading-6 text-[#73818d]">
              Explore specialist-led healthcare designed around your needs,
              with easy access to doctors, hospitals and services.
            </p>

          </div>


          {/* cards */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">

            {services.map(([icon, title, description], index) => (

              <article
                key={title}
                className="group relative flex min-h-[152px] flex-col rounded-[9px] border border-[#dfe9e6] bg-white p-4 shadow-[0_4px_14px_rgba(16,35,51,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#b9ddd5] hover:shadow-[0_15px_30px_rgba(16,35,51,0.09)]"
              >

                {/* icon + number */}
                <div className="flex items-start justify-between">

                  <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#e8f6f2] text-[13px] text-[#006b55]">
                    {icon}
                  </span>

                  <span className="text-[6px] font-bold tracking-widest text-[#8a999f]">
                    0{index + 1}
                  </span>

                </div>


                <h3 className="mt-3 text-[12px] font-bold text-[#102333]">
                  {title}
                </h3>


                <p className="mt-1.5 line-clamp-2 text-[8px] leading-4 text-[#73818d]">
                  {description}
                </p>


                <Link
                  to="/find-doctor"
                  className="medicare-green-link mt-auto inline-flex items-center gap-2 pt-3 text-[9px] font-semibold no-underline"
                >
                  Find a doctor
                  <span>→</span>
                </Link>

              </article>

            ))}

          </div>


          <div className="mt-7 text-center">

            <Link
              to="/specialities"
              className="medicare-green-link inline-flex items-center gap-2 text-[9px] font-semibold no-underline"
            >
              View all specialities
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONNECTED HEALTHCARE
      ===================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto grid max-w-[1010px] items-center gap-12 px-6 sm:px-8 lg:grid-cols-[360px_1fr] lg:gap-20">

          {/* visual */}
          <div className="relative mx-auto w-full max-w-[360px]">

            <div className="relative h-[280px] overflow-hidden rounded-[18px] bg-[#006b55]">

              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1100&q=88"
                alt="Doctor providing healthcare"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[#006b55]/20" />

            </div>


            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-[7px] bg-white px-4 py-3 shadow-[0_10px_25px_rgba(16,35,51,0.12)]">

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f6f2] text-[10px] font-bold text-[#006b55]">
                ✓
              </span>

              <div>

                <strong className="block text-[8px] text-[#102333]">
                  Patient first
                </strong>

                <small className="block text-[6px] text-[#73818d]">
                  Better connected care
                </small>

              </div>

            </div>

          </div>


          {/* content */}
          <div>

            <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#006b55]">
              CONNECTED HEALTHCARE
            </p>


            <h2 className="text-[35px] font-bold leading-[1.05] tracking-[-0.03em] text-[#102333] sm:text-[42px]">
              Technology that supports
              <br />
              <span className="font-serif font-normal italic text-[#006b55]">
                better care.
              </span>
            </h2>


            <p className="mt-5 max-w-[500px] text-[11px] leading-6 text-[#73818d]">
              From discovering a doctor to managing appointments, records and
              bills, MediCare keeps essential healthcare workflows simple and
              connected.
            </p>


            <div className="mt-6 space-y-3">

              {[
                "Centralized patient information",
                "Secure authentication & role-based access",
                "Simple appointment and billing workflows",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-[#e4ecea] pb-3"
                >

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8f6f2] text-[8px] font-bold text-[#006b55]">
                    ✓
                  </span>

                  <strong className="text-[9px] text-[#102333]">
                    {item}
                  </strong>

                </div>

              ))}

            </div>


            <Link
              to="/about"
              className="medicare-green-link mt-5 inline-flex items-center gap-2 text-[9px] font-semibold no-underline"
            >
              Learn more about MediCare
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY MEDICARE
          COMPACT VERSION
      ===================================================== */}
      <section className="bg-[#f7fafb] py-10 sm:py-12 lg:py-14">

        <div className="mx-auto grid max-w-[1010px] items-center gap-8 px-6 sm:px-8 lg:grid-cols-[350px_1fr] lg:gap-12">

          {/* visual */}
          <div className="relative flex justify-center">

            <div className="relative h-[220px] w-[220px] rounded-[16px] bg-[#00755f] p-5 shadow-[0_18px_40px_rgba(0,107,85,0.18)]">

              <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-white/15 text-lg text-white">
                +
              </div>


              <p className="mt-5 text-[7px] font-bold tracking-[0.2em] text-[#bce5dc]">
                MEDICARE HEALTHCARE
              </p>


              <strong className="mt-2 block text-[21px] leading-[1.05] text-white">
                Care that
                <br />
                puts people
                <br />
                first.
              </strong>


              <p className="mt-4 text-[7px] text-white/65">
                Simple • Secure • Connected
              </p>

            </div>


            {/* floating trusted badge */}
            <div className="absolute -right-2 top-2 rounded-[6px] bg-white px-3 py-2 text-[7px] font-bold text-[#102333] shadow-[0_8px_20px_rgba(16,35,51,0.1)]">
              ✓ Trusted healthcare
            </div>


            {/* floating patient badge */}
            <div className="absolute -left-4 bottom-2 rounded-[6px] bg-white px-3 py-2 text-[7px] font-bold text-[#102333] shadow-[0_8px_20px_rgba(16,35,51,0.1)]">
              ♥ Patient focused
            </div>

          </div>


          {/* content */}
          <div>

            <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#006b55]">
              WHY MEDICARE
            </p>


            <h2 className="text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-[#102333] sm:text-[38px]">
              Designed around the
              <br />
              <span className="font-serif font-normal italic text-[#006b55]">
                patient experience.
              </span>
            </h2>


            <p className="mt-3 max-w-[520px] text-[10px] leading-5 text-[#73818d]">
              Our platform combines a professional healthcare experience with
              the tools hospitals, doctors and patients need every day.
            </p>


            <div className="mt-5">

              {[
                [
                  "01",
                  "Secure by design",
                  "Authentication and role-based access help protect sensitive information.",
                ],
                [
                  "02",
                  "One connected system",
                  "Patients, doctors, appointments and records work together.",
                ],
                [
                  "03",
                  "Simple experience",
                  "Clear workflows make everyday healthcare management easier.",
                ],
              ].map(([number, title, description]) => (

                <div
                  key={number}
                  className="grid grid-cols-[25px_1fr] gap-3 border-b border-[#dfe9e6] py-2.5"
                >

                  <span className="text-[7px] font-bold text-[#006b55]">
                    {number}
                  </span>


                  <div>

                    <h3 className="text-[10px] font-bold text-[#102333]">
                      {title}
                    </h3>

                    <p className="mt-1 text-[8px] leading-4 text-[#73818d]">
                      {description}
                    </p>

                  </div>

                </div>

              ))}

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

              {/* CTA content */}
              <div>

                <p className="mb-3 text-[8px] font-extrabold tracking-[0.25em] text-[#bce5dc]">
                  READY WHEN YOU ARE
                </p>


                <h2 className="text-[27px] font-bold leading-[1.05] text-[#102333] sm:text-[32px]">
                  Take the next step
                  <br />

                  <span className="font-serif font-normal italic text-[#005f4d]">
                    towards better care.
                  </span>
                </h2>


                <p className="mt-3 text-[9px] leading-5 text-white/80">
                  Find a doctor or access your secure healthcare portal today.
                </p>

              </div>


              {/* CTA BUTTONS */}
              <div className="relative flex flex-wrap items-center gap-3">

                {/* Find a Doctor */}
                <Link
                  to="/find-doctor"
                  className="home-cta-find inline-flex min-h-[52px] min-w-[230px] items-center justify-between rounded-[8px] bg-white px-6 text-[9px] font-bold no-underline shadow-sm transition hover:bg-[#e8f6f2]"
                >
                  <span>Find a Doctor</span>
                  <span>→</span>
                </Link>


                {/* Contact us */}
                <Link
                  to="/contact"
                  className="home-cta-contact inline-flex min-h-[52px] min-w-[150px] items-center justify-center rounded-[8px] border border-white bg-transparent px-6 text-[9px] font-bold no-underline transition hover:bg-white"
                >
                  <span>Contact us</span>
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;