import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center bg-[#f7fafb] px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-3xl border border-[#e3ecea] bg-white shadow-[0_18px_50px_rgba(16,35,51,0.09)]">

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

            {/* VISUAL */}
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#004f40]">
              <div className="absolute h-80 w-80 rounded-full border border-white/10" />
              <div className="absolute h-56 w-56 rounded-full border border-white/10" />

              <div className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl font-bold text-[#006b55] shadow-xl">
                  +
                </div>

                <div className="mt-6 text-8xl font-black tracking-tighter text-white/95 md:text-9xl">
                  404
                </div>

                <p className="mt-2 text-xs font-bold tracking-[0.3em] text-[#bce5dc]">
                  MEDICARE PORTAL
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-8 md:p-12 lg:p-16">

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#006b55]">
                Page not found
              </p>

              <h1 className="text-4xl font-bold leading-tight text-[#102333] md:text-5xl">
                We couldn't find
                <br />
                <span className="font-serif font-normal italic text-[#006b55]">
                  that page.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-[#73818d]">
                The page you are looking for may have been moved, removed or
                the address may be incorrect.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-4 rounded-lg bg-[#006b55] px-6 py-4 text-sm font-bold text-white no-underline transition hover:bg-[#004f40]"
                >
                  Go to Home
                  <span>→</span>
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg border border-[#d5e4e1] px-6 py-4 text-sm font-bold text-[#102333] no-underline transition hover:border-[#006b55] hover:text-[#006b55]"
                >
                  Sign In
                </Link>
              </div>

            </div>
          </div>

          {/* HELP */}
          <div className="flex flex-col gap-5 border-t border-[#e3ecea] bg-[#f7fafb] px-8 py-6 md:flex-row md:items-center md:justify-between md:px-12">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6f2] font-bold text-[#006b55]">
                ?
              </div>

              <div>
                <strong className="block text-sm text-[#102333]">
                  Need assistance?
                </strong>

                <span className="text-sm text-[#73818d]">
                  Visit our Help Center or contact support.
                </span>
              </div>
            </div>

            <Link
              to="/help"
              className="inline-flex items-center gap-3 text-sm font-bold text-[#006b55] no-underline"
            >
              Help Center
              <span>→</span>
            </Link>

          </div>
        </div>

        {/* FOOTNOTE */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium tracking-wide text-[#8a989f]">
          <span className="h-2 w-2 rounded-full bg-[#006b55]" />
          <span>MediCare healthcare portal</span>
          <span className="hidden h-px w-10 bg-[#ccd9d7] sm:block" />
          <span>Secure & connected care</span>
        </div>

      </div>
    </main>
  );
}

export default NotFound;