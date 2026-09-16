import { Link } from "react-router-dom";

function PublicFooter() {
  return (
    <footer className="bg-[#082f2b] !text-[#c6d7d4]">
      {/* =========================
          FOOTER MAIN
          ========================= */}
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-9 pb-5 sm:px-8 lg:px-8">

        {/* TOP FOUR COLUMNS */}
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* ================= BRAND ================= */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 !text-white no-underline"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#008b70] text-[24px] font-light !text-white">
                +
              </span>

              <span className="flex flex-col leading-none">
                <strong className="text-[23px] font-bold tracking-[-0.6px] !text-white">
                  Medi<span className="!text-[#62c8b1]">Care</span>
                </strong>

                <small className="mt-1 text-[8px] font-bold tracking-[0.25em] !text-[#9bbab4]">
                  HEALTHCARE
                </small>
              </span>
            </Link>

            <p className="mt-4 max-w-[300px] text-[13px] leading-6 !text-[#b5cbc7]">
              Compassionate healthcare supported by connected technology,
              trusted doctors and patient-first services.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium !text-[#a8c4be]">
              <span>✓ Secure</span>
              <span>✓ Patient First</span>
              <span>✓ 24/7 Access</span>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h4 className="mb-4 text-[16px] font-bold !text-white">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3.5">
              <Link
                to="/about"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                About Us
              </Link>

              <Link
                to="/find-doctor"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                Find a Doctor
              </Link>

              <Link
                to="/hospitals"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                Our Hospitals
              </Link>

              <Link
                to="/specialities"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                Specialities
              </Link>
            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h4 className="mb-4 text-[16px] font-bold !text-white">
              Services
            </h4>

            <div className="flex flex-col gap-3.5">
              <Link
                to="/services"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                Healthcare Services
              </Link>

              <Link
                to="/health-library"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                Health Library
              </Link>

              <Link
                to="/login"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                Patient Portal
              </Link>

              <Link
                to="/contact"
                className="text-[13px] !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                Support
              </Link>
            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h4 className="mb-4 text-[16px] font-bold !text-white">
              Contact
            </h4>

            <div className="flex flex-col gap-3.5">

              {/* PHONE */}
              <a
                href="tel:+9118001234567"
                className="flex items-center gap-3 !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm">
                  ☎
                </span>

                <span className="text-[13px]">
                  +91 1800 123 4567
                </span>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:care@medicare.health"
                className="flex items-center gap-3 !text-[#b5cbc7] no-underline transition hover:!text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm">
                  ✉
                </span>

                <span className="text-[13px]">
                  care@medicare.health
                </span>
              </a>

              {/* LOCATION */}
              <div className="flex items-center gap-3 !text-[#b5cbc7]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm">
                  📍
                </span>

                <span className="text-[13px]">
                  Noida, Uttar Pradesh, India
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* =========================
            CENTER SOCIAL SECTION
            ========================= */}
        <div className="mt-9 border-t border-white/10 pt-7">

          <div className="flex flex-col items-center text-center">

            <p className="mb-3 text-[15px] font-semibold !text-white">
              Connect with us
            </p>

            <div className="flex items-center justify-center gap-4">

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/aj.eet4110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 !text-white no-underline transition hover:border-white hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/ajeet-kumar-it/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 !text-white no-underline transition hover:border-white hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3C3.65 3 3 3.72 3 4.63c0 .91.65 1.63 1.72 1.63h.03c1.1 0 1.75-.72 1.75-1.63C6.5 3.72 5.85 3 4.75 3ZM21 13.83C21 10.13 19.03 8 16.28 8c-2.23 0-3.23 1.23-3.78 2.09V8.5H9V21h3.5v-6.97c0-.37.03-.75.14-1.02.3-.75.98-1.52 2.12-1.52 1.5 0 2.1 1.14 2.1 2.81V21H21v-7.17Z" />
                </svg>
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/Ajettbhi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 !text-white no-underline transition hover:border-white hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 .7C5.73.7.7 5.73.7 12c0 4.99 3.24 9.22 7.73 10.71.57.1.78-.25.78-.55v-2.1c-3.15.69-3.81-1.52-3.81-1.52-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.11 1.16A10.8 10.8 0 0 1 12 5.93c.96 0 1.92.13 2.82.38 2.16-1.46 3.11-1.16 3.11-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.04 0 4.35-2.65 5.3-5.17 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55A11.31 11.31 0 0 0 23.3 12C23.3 5.73 18.27.7 12 .7Z" />
                </svg>
              </a>

            </div>

            {/* GET IN TOUCH */}
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 !text-white no-underline transition hover:gap-3"
            >
              <span className="text-[14px]">
                Get in touch
              </span>

              <span>→</span>
            </Link>

          </div>
        </div>

        {/* =========================
            FOOTER BOTTOM
            ========================= */}
        <div className="mt-6 border-t border-white/10 pt-4">

          <div className="flex flex-col items-center justify-between gap-3 text-[11px] !text-[#8faeaa] sm:flex-row">

            <span>
              © {new Date().getFullYear()} MediCare Healthcare. All rights reserved.
            </span>

            <div className="flex items-center gap-6">

              <Link
                to="/privacy"
                className="!text-[#8faeaa] no-underline transition hover:!text-white"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="!text-[#8faeaa] no-underline transition hover:!text-white"
              >
                Terms &amp; Conditions
              </Link>

            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default PublicFooter;