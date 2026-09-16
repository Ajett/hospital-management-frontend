import { Link } from "react-router-dom";

const specialities = [
  {
    title: "Cardiology",
    description: "Expert care for heart and cardiovascular conditions.",
    icon: "♥",
  },
  {
    title: "Neurology",
    description:
      "Specialized diagnosis and treatment of neurological disorders.",
    icon: "✦",
  },
  {
    title: "Orthopedics",
    description: "Comprehensive care for bones, joints and muscles.",
    icon: "✚",
  },
  {
    title: "Dermatology",
    description: "Advanced care for skin, hair and nail conditions.",
    icon: "◇",
  },
  {
    title: "Pediatrics",
    description:
      "Compassionate healthcare for children and families.",
    icon: "♡",
  },
  {
    title: "Gastroenterology",
    description:
      "Diagnosis and treatment of digestive system conditions.",
    icon: "◉",
  },
  {
    title: "Gynecology",
    description:
      "Complete healthcare for women's health and wellness.",
    icon: "♀",
  },
  {
    title: "Ophthalmology",
    description:
      "Comprehensive eye care and vision treatment.",
    icon: "◌",
  },
  {
    title: "ENT",
    description:
      "Specialized treatment for ear, nose and throat conditions.",
    icon: "◍",
  },
  {
    title: "General Medicine",
    description:
      "Primary care for everyday health concerns.",
    icon: "＋",
  },
  {
    title: "Urology",
    description:
      "Expert care for urinary and men's health conditions.",
    icon: "⌁",
  },
  {
    title: "Pulmonology",
    description:
      "Advanced care for respiratory and lung conditions.",
    icon: "≈",
  },
];

export default function Specialities() {
  return (
    <div className="min-h-screen bg-[#f7fafb] text-[#102333]">
      {/* HERO */}
      <section className="bg-[#004f40]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-18">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#dff3ee]">
              MEDICAL SPECIALITIES
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Specialized care for
              <span className="block text-[#9fe0d0]">
                every healthcare need.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Explore our medical specialities and connect with experienced
              healthcare professionals dedicated to your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTORY */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#006b55]">
              Our Expertise
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Find the right speciality
            </h2>

            <p className="mt-2 max-w-2xl text-[#73818d]">
              Our multidisciplinary medical services cover a wide range of
              healthcare needs.
            </p>
          </div>

          <Link
            to="/find-doctor"
            className="speciality-find-doctor-btn inline-flex w-fit items-center rounded-lg bg-white px-6 py-3 text-sm font-bold"
          >
            <span>Find a Doctor</span>
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* SPECIALITY CARDS */}
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specialities.map((speciality) => (
            <Link
              key={speciality.title}
              to="/find-doctor"
              className="group flex h-full flex-col rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_4px_14px_rgba(16,35,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_14px_30px_rgba(16,35,51,0.10)]"
            >
              {/* ICON */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl font-bold text-[#006b55] transition group-hover:bg-[#006b55] group-hover:text-white">
                {speciality.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-5 min-h-[56px] text-lg font-bold text-[#102333]">
                {speciality.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 min-h-[72px] text-sm leading-6 text-[#73818d]">
                {speciality.description}
              </p>

              {/* VIEW DOCTORS */}
              <div className="mt-auto flex items-center pt-5 text-sm font-semibold text-[#006b55]">
                View Doctors
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* HIGHLIGHT */}
        <section className="mt-14 overflow-hidden rounded-3xl bg-[#e8f6f2]">
          <div className="grid items-center gap-8 px-7 py-9 lg:grid-cols-[1.4fr_1fr] lg:px-10 lg:py-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#006b55]">
                Comprehensive Healthcare
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Expert teams. Better care. Healthier lives.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-[#455565]">
                Choose a speciality to explore available doctors and find the
                care that is right for you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Experienced Doctors",
                "Modern Facilities",
                "Patient Focused",
                "Trusted Care",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-white px-4 py-4 text-sm font-semibold text-[#102333] shadow-sm"
                >
                  <span className="mr-2 text-[#006b55]">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl bg-[#006b55] px-7 py-9 shadow-[0_18px_45px_rgba(16,35,51,0.14)] sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Need help choosing a specialist?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                Find a doctor based on speciality and get the care you need.
              </p>
            </div>

            <Link
              to="/find-doctor"
              className="speciality-cta-find-doctor inline-flex w-fit items-center rounded-lg bg-white px-6 py-3 text-sm font-bold"
            >
              <span>Find a Doctor</span>
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}