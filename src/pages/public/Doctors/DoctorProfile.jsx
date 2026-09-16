import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/api/public/doctors/${id}`
      );

      setDoctor(response.data);
    } catch (err) {
      console.error("Failed to load doctor:", err);

      setError(
        "We couldn't find this doctor. The profile may no longer be available."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleBookAppointment = () => {
    if (!doctor) {
      return;
    }

    // Not logged in → login first
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/doctors/${id}`,
          doctorId: doctor.id,
        },
      });

      return;
    }

    // Already logged in → appointment page directly
    navigate("/appointments", {
      state: {
        doctorId: doctor.id,
      },
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7fafb] dark:bg-[#0b1513]">
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#dff3ee] border-t-[#006b55] dark:border-[#163d35] dark:border-t-[#43c7a5]" />

          <p className="mt-4 text-sm font-semibold text-[#455565] dark:text-[#c7d5d1]">
            Loading doctor profile...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !doctor) {
    return (
      <main className="min-h-screen bg-[#f7fafb] px-4 py-16 dark:bg-[#0b1513]">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <div className="w-full rounded-[28px] border border-[#e3ecea] bg-white p-8 text-center shadow-[0_15px_40px_rgba(16,35,51,0.08)] dark:border-[#29413b] dark:bg-[#12201d] sm:p-12">

            <span className="text-6xl font-bold text-[#dce8e5] dark:text-[#29413b]">
              404
            </span>

            <h1 className="mt-5 text-3xl font-bold text-[#102333] dark:text-[#f2f8f6]">
              Doctor profile{" "}
              <span className="font-serif italic font-normal text-[#006b55] dark:text-[#43c7a5]">
                not found.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#73818d] dark:text-[#91a49f]">
              {error ||
                "This doctor profile is currently unavailable."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/find-doctor")}
              className="mt-7 inline-flex h-12 items-center gap-3 rounded-xl bg-[#006b55] px-6 text-sm font-bold !text-white shadow-[0_8px_20px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40]"
            >
              Back to Find a Doctor
              <span>→</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333] dark:bg-[#0b1513] dark:text-[#f2f8f6]">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative overflow-hidden bg-white dark:bg-[#12201d]">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#e8f6f2] dark:bg-[#163d35]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <button
            type="button"
            onClick={() => navigate("/find-doctor")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold !text-[#455565] transition hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:!text-[#43c7a5]"
          >
            ← Back to doctors
          </button>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

            <div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[26px] bg-[#006b55] text-4xl font-bold !text-white shadow-[0_12px_30px_rgba(0,107,85,0.2)]">
                  {doctor.name
                    ? doctor.name.charAt(0).toUpperCase()
                    : "D"}
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#006b55] dark:text-[#43c7a5]">
                    MEDICARE · MEDICAL TEAM
                  </p>

                  <h1 className="mt-2 text-3xl font-bold text-[#102333] dark:text-[#f2f8f6] sm:text-4xl lg:text-5xl">
                    {doctor.name}
                  </h1>

                  <p className="mt-2 text-base font-semibold text-[#0b8068] dark:text-[#43c7a5]">
                    {doctor.specialization ||
                      "Medical Specialist"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-[#e3ecea] bg-[#f7fafb] p-6 dark:border-[#29413b] dark:bg-[#182a26]">

              <span className="text-4xl font-bold text-[#d5e7e2] dark:text-[#29413b]">
                {String(doctor.id).padStart(2, "0")}
              </span>

              <p className="mt-4 text-sm leading-6 text-[#667783] dark:text-[#a8b9b5]">
                Discover this doctor's department and
                practice location, then continue to arrange
                your appointment through MediCare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DETAILS
          ===================================================== */}

      <section className="bg-[#f7fafb] dark:bg-[#0b1513]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.18em] text-[#006b55] dark:text-[#43c7a5]">
              PROFILE DETAILS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#102333] dark:text-[#f2f8f6] sm:text-4xl">
              Care with{" "}
              <span className="font-serif italic font-normal text-[#006b55] dark:text-[#43c7a5]">
                clarity.
              </span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {[
              ["DOCTOR", doctor.name],
              [
                "SPECIALIZATION",
                doctor.specialization || "Not specified",
              ],
              [
                "DEPARTMENT",
                doctor.departmentName || "Not specified",
              ],
              [
                "LOCATION",
                doctor.location || "Location not specified",
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-sm dark:border-[#29413b] dark:bg-[#12201d]"
              >
                <p className="text-[10px] font-bold tracking-[0.14em] text-[#73818d] dark:text-[#91a49f]">
                  {label}
                </p>

                <p className="mt-3 text-base font-bold leading-6 text-[#102333] dark:text-[#f2f8f6]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BOOKING CTA
          ===================================================== */}

      <section className="bg-white dark:bg-[#12201d]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          <div className="rounded-[28px] bg-[#006b55] p-7 !text-white shadow-[0_20px_45px_rgba(0,107,85,0.2)] sm:p-10 lg:p-12">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <p className="text-xs font-bold tracking-[0.18em] !text-white/60">
                  APPOINTMENTS
                </p>

                <h2 className="mt-3 text-3xl font-bold !text-white sm:text-4xl">
                  Ready to see{" "}
                  <span className="font-serif italic font-normal">
                    {doctor.name}?
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-6 !text-white/75 sm:text-base">
                  {isAuthenticated
                    ? "Continue directly to appointment booking."
                    : "Sign in first to continue with appointment booking."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleBookAppointment}
                className="inline-flex h-13 shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-7 py-3.5 text-sm font-bold !text-[#006b55] transition hover:bg-[#e8f6f2]"
              >
                Book Appointment
                <span>→</span>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          NOTE
          ===================================================== */}

      <section className="border-t border-[#e3ecea] bg-[#f7fafb] dark:border-[#29413b] dark:bg-[#0b1513]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <p className="text-xs leading-5 text-[#8a969e] dark:text-[#81958f]">
            MediCare provides this information to help
            patients discover available medical services.
            Appointment availability may depend on the
            selected hospital and schedule.
          </p>

        </div>
      </section>

    </main>
  );
};

export default DoctorProfile;