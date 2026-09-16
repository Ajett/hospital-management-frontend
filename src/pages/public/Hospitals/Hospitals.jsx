import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadHospitals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/public/hospitals");

      if (!response.ok) {
        throw new Error("Failed to load hospitals");
      }

      const data = await response.json();
      setHospitals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load hospitals:", err);
      setError("Unable to load hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const filteredHospitals = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return hospitals;

    return hospitals.filter((hospital) =>
      [
        hospital.name,
        hospital.location,
        hospital.address,
        hospital.phone,
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(query)
        )
    );
  }, [hospitals, search]);

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333]">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative overflow-hidden bg-[#004f40]">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#0b8068] opacity-30" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#006b55] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_280px]">

            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#bce5dc]">
                MEDICARE · HOSPITAL DISCOVERY
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find the right
                <span className="block font-serif font-normal italic text-[#bce5dc]">
                  hospital.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                Explore hospitals and healthcare facilities available through
                the MediCare network.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <span className="text-3xl font-bold text-[#bce5dc]">
                {loading
                  ? "—"
                  : String(hospitals.length).padStart(2, "0")}
              </span>

              <p className="mt-2 text-sm leading-6 text-white/70">
                Healthcare
                <br />
                locations
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          DIRECTORY
          ===================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                HOSPITAL DIRECTORY
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Explore our{" "}
                <span className="font-serif font-normal italic text-[#006b55]">
                  hospitals.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-[#73818d]">
              Find a hospital by name, location or contact information and
              explore its available medical team.
            </p>

          </div>

          {/* SEARCH */}
          <div className="mb-8 rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">

            <label
              htmlFor="hospital-search"
              className="mb-2 block text-[9px] font-bold tracking-[0.16em] text-[#006b55]"
            >
              SEARCH HOSPITALS
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#73818d]">
                  ⌕
                </span>

                <input
                  id="hospital-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by hospital name or location..."
                  className="h-12 w-full rounded-xl border border-[#dce8e5] bg-[#f7fafb] py-3 pl-11 pr-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                />
              </div>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="h-12 rounded-xl border border-[#dce8e5] bg-white px-6 text-sm font-bold text-[#455565] transition hover:border-[#006b55] hover:text-[#006b55]"
                >
                  Clear
                </button>
              )}

              <button
                type="button"
                onClick={loadHospitals}
                className="h-12 rounded-xl bg-[#006b55] px-6 text-sm font-bold text-white transition hover:bg-[#004f40]"
              >
                Refresh
              </button>

            </div>
          </div>

          {/* RESULT COUNT */}
          {!loading && !error && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#73818d]">
                Showing{" "}
                <span className="font-bold text-[#102333]">
                  {filteredHospitals.length}
                </span>{" "}
                hospital
                {filteredHospitals.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-[#e3ecea] bg-white p-7"
                >
                  <div className="h-4 w-12 rounded bg-[#e8f6f2]" />
                  <div className="mt-7 h-7 w-3/4 rounded bg-[#e8f6f2]" />
                  <div className="mt-4 h-4 w-1/2 rounded bg-[#e8f6f2]" />
                  <div className="mt-8 h-16 rounded bg-[#f1f6f5]" />
                  <div className="mt-8 h-5 w-32 rounded bg-[#e8f6f2]" />
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl text-red-500">
                !
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#102333]">
                Unable to load hospitals
              </h3>

              <p className="mt-2 text-sm text-[#73818d]">
                {error}
              </p>

              <button
                type="button"
                onClick={loadHospitals}
                className="mt-6 rounded-xl bg-[#006b55] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#004f40]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            filteredHospitals.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#cdded9] bg-white px-6 py-14 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-2xl text-[#006b55]">
                  +
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#102333]">
                  No hospitals found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#73818d]">
                  Try another hospital name or location.
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-5 font-bold text-[#006b55] transition hover:text-[#004f40]"
                  >
                    Clear search →
                  </button>
                )}

              </div>
            )}

          {/* HOSPITAL CARDS */}
          {!loading &&
            !error &&
            filteredHospitals.length > 0 && (
              <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">

                {filteredHospitals.map((hospital, index) => (
                  <article
                    key={hospital.id}
                    className="group flex h-full min-h-[350px] flex-col rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_4px_14px_rgba(16,35,51,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b9ddd5] hover:shadow-[0_18px_40px_rgba(16,35,51,0.11)]"
                  >

                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between border-b border-[#e3ecea] pb-5">

                      <span className="text-sm font-bold tracking-widest text-[#006b55]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f2] text-xl text-[#006b55] transition group-hover:bg-[#006b55] group-hover:text-white">
                        +
                      </span>

                    </div>

                    {/* CARD CONTENT */}
                    <div className="flex flex-1 flex-col pt-6">

                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#006b55]">
                        Hospital
                      </p>

                      <h3 className="mt-3 min-h-[58px] text-xl font-bold leading-7 text-[#102333]">
                        {hospital.name}
                      </h3>

                      <div className="mt-5 space-y-3">

                        <div className="flex gap-3">
                          <span className="mt-0.5 text-[#006b55]">
                            ⌖
                          </span>

                          <p className="text-sm leading-6 text-[#73818d]">
                            {hospital.location ||
                              "Location unavailable"}
                          </p>
                        </div>

                        {hospital.address && (
                          <div className="flex gap-3">
                            <span className="mt-0.5 text-[#006b55]">
                              ▣
                            </span>

                            <p className="text-sm leading-6 text-[#73818d]">
                              {hospital.address}
                            </p>
                          </div>
                        )}

                        {hospital.phone && (
                          <div className="flex gap-3">
                            <span className="mt-0.5 text-[#006b55]">
                              ☎
                            </span>

                            <p className="text-sm leading-6 text-[#73818d]">
                              {hospital.phone}
                            </p>
                          </div>
                        )}

                      </div>

                      {/* VIEW HOSPITAL */}
                      <Link
                        to={`/hospitals/${hospital.id}`}
                        className="medicare-green-link mt-auto inline-flex items-center gap-3 pt-7 text-sm font-bold no-underline transition group-hover:gap-5"
                      >
                        View Hospital
                        <span className="text-lg">
                          →
                        </span>
                      </Link>

                    </div>
                  </article>
                ))}

              </div>
            )}

        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
          ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">

          <div className="rounded-[28px] bg-[#006b55] px-7 py-9 shadow-[0_18px_45px_rgba(16,35,51,0.14)] sm:px-10 sm:py-10">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-[#bce5dc]">
                  NEXT STEP
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Looking for a{" "}
                  <span className="font-serif font-normal italic text-[#dff3ee]">
                    doctor?
                  </span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
                  Find a doctor based on speciality and discover the right
                  healthcare professional for your needs.
                </p>
              </div>

              <Link
                to="/find-doctor"
                className="hospital-find-doctor-btn inline-flex h-12 w-fit shrink-0 items-center justify-center gap-3 rounded-[14px] bg-white px-7 text-sm font-bold no-underline"
              >
                <span>Find a Doctor</span>
                <span>→</span>
              </Link>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Hospitals;