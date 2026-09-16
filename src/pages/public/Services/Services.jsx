import { Link } from "react-router-dom";

const services = [
  {
    title: "Find a Doctor",
    description:
      "Search experienced doctors by speciality and find the right healthcare professional.",
    icon: "⌕",
    link: "/find-doctor",
    label: "Find Doctor",
  },
  {
    title: "Book an Appointment",
    description:
      "Manage your healthcare appointments through the MediCare platform.",
    icon: "▣",
    link: "/appointments",
    label: "Book Appointment",
  },
  {
    title: "Explore Hospitals",
    description:
      "Explore hospitals and healthcare facilities available through our platform.",
    icon: "⌂",
    link: "/hospitals",
    label: "View Hospitals",
  },
  {
    title: "Medical Records",
    description:
      "Access and manage your medical records securely in one place.",
    icon: "▤",
    link: "/medical-records",
    label: "View Records",
  },
  {
    title: "Billing & Payments",
    description:
      "Review your billing information and payment records conveniently.",
    icon: "₹",
    link: "/bills",
    label: "View Bills",
  },
  {
    title: "Health Checkups",
    description:
      "Explore useful healthcare information and resources for everyday wellness.",
    icon: "♥",
    link: "/health-library",
    label: "Health Library",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#f7fafb] text-[#102333]">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative overflow-hidden bg-[#004f40]">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#0b8068] opacity-25" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-[#dff3ee]">
              OUR SERVICES
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Healthcare made
              <span className="block text-[#9fe0d0]">
                simple and accessible.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Access the healthcare services and resources you need through
              one secure and convenient platform.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
          ===================================================== */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006b55]">
            WHAT WE OFFER
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Healthcare services
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#73818d]">
            Everything you need to manage your healthcare journey with
            MediCare.
          </p>
        </div>

        {/* SERVICE CARDS */}
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <Link
              key={service.title}
              to={service.link}
              className="group flex h-full min-h-[290px] flex-col rounded-2xl border border-[#e3ecea] bg-white p-6 no-underline shadow-[0_4px_14px_rgba(16,35,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_14px_30px_rgba(16,35,51,0.10)]"
            >

              {/* ICON */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl font-bold text-[#006b55] transition group-hover:bg-[#006b55] group-hover:text-white">
                {service.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-5 min-h-[56px] text-xl font-bold leading-7 text-[#102333]">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 min-h-[72px] text-sm leading-6 text-[#73818d]">
                {service.description}
              </p>

              {/* ACTION */}
              <div className="mt-auto flex items-center pt-5 text-sm font-semibold text-[#006b55]">
                {service.label}

                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

            </Link>
          ))}

        </div>

        {/* =====================================================
            INFO STRIP
            ===================================================== */}
        <section className="mt-14 grid gap-4 md:grid-cols-3">

          {[
            {
              number: "01",
              title: "Easy Access",
              text: "Access important healthcare services from one place.",
            },
            {
              number: "02",
              title: "Secure Platform",
              text: "Your healthcare information is handled through a secure system.",
            },
            {
              number: "03",
              title: "Patient Focused",
              text: "Designed to make healthcare management simpler.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_4px_14px_rgba(16,35,51,0.04)]"
            >

              <div className="text-sm font-bold text-[#006b55]">
                {item.number}
              </div>

              <h3 className="mt-3 text-lg font-bold text-[#102333]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#73818d]">
                {item.text}
              </p>

            </div>
          ))}

        </section>

        {/* =====================================================
            CTA
            ===================================================== */}
        <section className="mt-14 rounded-[28px] bg-[#006b55] px-7 py-9 shadow-[0_18px_45px_rgba(16,35,51,0.14)] sm:px-10 sm:py-10">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#bde8dd]">
                BETTER HEALTHCARE
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Start with the care you need.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                Find a doctor or explore our healthcare resources.
              </p>

            </div>

            <Link
              to="/find-doctor"
              className="services-find-doctor-btn inline-flex h-12 w-fit shrink-0 items-center justify-center gap-3 rounded-[14px] bg-white px-7 text-sm font-bold no-underline"
            >
              <span>Find a Doctor</span>
              <span>→</span>
            </Link>

          </div>

        </section>

      </main>
    </div>
  );
}