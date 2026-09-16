import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const FindDoctor = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/public/doctors");

      setDoctors(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load doctors:", err);
      setError("Unable to load doctors right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setSearching(true);
      setError("");

      const params = {};

      if (query.trim()) {
        params.query = query.trim();
      }

      if (specialization.trim()) {
        params.specialization = specialization.trim();
      }

      if (location.trim()) {
        params.location = location.trim();
      }

      const response = await api.get("/api/public/doctors/search", { params });

      setDoctors(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Doctor search failed:", err);
      setError("Unable to search doctors. Please try again.");
      setDoctors([]);
    } finally {
      setSearching(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSpecialization("");
    setLocation("");
    fetchDoctors();
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/doctors/${doctorId}`, {
      state: {
        booking: true,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#e8f6f2]" />
        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#f1f8f6]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="mb-7 inline-flex items-center gap-2 !rounded-full !border !border-[#dce8e5] !bg-white !px-4 !py-2 !font-sans !text-sm !font-semibold !text-[#006b55] no-underline shadow-sm transition hover:!border-[#006b55] hover:!bg-[#e8f6f2]"
            >
              <span aria-hidden="true" className="text-base">
                ←
              </span>
              Back to Patient Portal
            </Link>
          )}

          <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                MEDICARE · DOCTOR DISCOVERY
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                Find the right
                <br />
                <span className="font-serif font-normal italic text-[#006b55]">
                  doctor for you.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#667783] sm:text-base">
                Search our doctors by name, speciality, or location and discover
                the right medical care for your needs.
              </p>
            </div>

            <div className="rounded-[18px] border border-[#dce8e5] bg-[#f7fafb] p-5">
              <span className="text-3xl font-bold text-[#006b55]">01</span>

              <p className="mt-2 text-sm font-semibold text-[#455565]">
                Explore doctors freely.
                <br />
                <span className="font-normal text-[#73818d]">
                  No login required.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="border-y border-[#e3ecea] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSearch}
            className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_auto]"
          >
            <div>
              <label className="mb-2 block text-[9px] font-bold tracking-[0.14em] text-[#73818d]">
                DOCTOR / SPECIALITY
              </label>

              <input
                type="text"
                placeholder="Search doctor or speciality"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 w-full rounded-[9px] border border-[#dce8e5] bg-white px-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[9px] font-bold tracking-[0.14em] text-[#73818d]">
                SPECIALITY
              </label>

              <input
                type="text"
                placeholder="e.g. Cardiology"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="h-12 w-full rounded-[9px] border border-[#dce8e5] bg-white px-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[9px] font-bold tracking-[0.14em] text-[#73818d]">
                LOCATION
              </label>

              <input
                type="text"
                placeholder="e.g. Delhi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 w-full rounded-[9px] border border-[#dce8e5] bg-white px-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
              />
            </div>

            <button
              type="submit"
              disabled={searching}
              className="h-12 self-end rounded-[9px] bg-[#006b55] px-6 text-xs font-bold text-white shadow-[0_8px_20px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40] disabled:opacity-60"
            >
              {searching ? "Searching..." : "Search Doctors"}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#73818d]">
              <strong className="text-[#102333]">{doctors.length}</strong>{" "}
              doctor{doctors.length !== 1 ? "s" : ""} found
            </span>

            {(query || specialization || location) && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-bold text-[#006b55] transition hover:text-[#004f40] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {error && (
            <div className="mb-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[20px] border border-[#e3ecea] bg-white">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dff3ee] border-t-[#006b55]" />

              <p className="mt-4 text-sm font-semibold text-[#455565]">
                Finding doctors...
              </p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[#cdded9] bg-white px-6 py-14 text-center">
              <span className="text-5xl font-bold text-[#dce8e5]">00</span>

              <h2 className="mt-3 text-3xl font-bold">
                No doctors{" "}
                <span className="font-serif font-normal italic text-[#006b55]">
                  found.
                </span>
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#73818d]">
                Try changing your search terms or clearing the filters to see
                all available doctors.
              </p>

              <button
                type="button"
                onClick={handleClear}
                className="mt-6 rounded-[9px] bg-[#006b55] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#004f40]"
              >
                View all doctors
              </button>
            </div>
          ) : (
            <>
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                    OUR MEDICAL TEAM
                  </p>

                  <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                    Doctors who are{" "}
                    <span className="font-serif font-normal italic text-[#006b55]">
                      here for you.
                    </span>
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-[#e8f6f2] px-4 py-2 text-[10px] font-bold tracking-wide text-[#006b55]">
                  {doctors.length} RESULTS
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {doctors.map((doctor) => (
                  <article
                    key={doctor.id}
                    className="group flex flex-col overflow-hidden rounded-[20px] border border-[#e3ecea] bg-white shadow-[0_7px_24px_rgba(16,35,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(16,35,51,0.11)]"
                  >
                    <div className="flex items-start justify-between bg-[#f7fafb] p-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#006b55] text-2xl font-bold text-white">
                        {doctor.name
                          ? doctor.name.charAt(0).toUpperCase()
                          : "D"}
                      </div>

                      <span className="text-xl font-bold text-[#d5e7e2]">
                        {String(doctor.id).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold text-[#102333]">
                        {doctor.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-[#0b8068]">
                        {doctor.specialization || "Medical Specialist"}
                      </p>

                      <div className="mt-5 space-y-3 border-t border-[#e3ecea] pt-5">
                        {doctor.departmentName && (
                          <div>
                            <p className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
                              DEPARTMENT
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#102333]">
                              {doctor.departmentName}
                            </p>
                          </div>
                        )}

                        {doctor.location && (
                          <div>
                            <p className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
                              LOCATION
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#102333]">
                              {doctor.location}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/doctors/${doctor.id}`)}
                          className="h-11 rounded-[9px] border border-[#dce8e5] bg-white text-[11px] font-bold text-[#006b55] transition hover:bg-[#e8f6f2]"
                        >
                          View Profile →
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBookAppointment(doctor.id)}
                          className="h-11 rounded-[9px] bg-[#006b55] text-[11px] font-bold text-white transition hover:bg-[#004f40]"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-[22px] bg-[#006b55] p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#bce5db]">
                NEED HELP?
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Not sure where{" "}
                <span className="font-serif font-normal italic text-[#dff3ee]">
                  to start?
                </span>
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-[#d6ebe6]">
                Our team can help you find the right department or doctor for
                your healthcare needs.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="contact-medicare-btn inline-flex h-12 shrink-0 items-center justify-center gap-3 bg-white px-6 text-xs font-bold text-[#006b55] transition hover:bg-[#e8f6f2]"
              style={{ borderRadius: "14px" }}
            >
              <span>Contact MediCare</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FindDoctor;
