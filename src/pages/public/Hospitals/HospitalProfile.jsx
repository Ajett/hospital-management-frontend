import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      setDoctor(null);

      setError(
        err.response?.status === 404
          ? "Doctor not found."
          : "Unable to load doctor information."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    navigate("/login", {
      state: {
        from: `/doctors/${id}`,
        doctorId: doctor?.id,
      },
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7fafb] text-[#102333]">
        <section className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dff3ee] border-t-[#006b55]" />

            <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
              MEDICARE · DOCTOR PROFILE
            </p>

            <p className="mt-2 text-sm text-[#73818d]">
              Loading doctor information...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !doctor) {
    return (
      <main className="min-h-screen bg-[#f7fafb] px-4 py-12 text-[#102333] sm:px-6 lg:px-8">
        <section className="mx-auto flex min-h-[55vh] max-w-4xl items-center justify-center">
          <div className="w-full rounded-[26px] border border-[#e3ecea] bg-white px-6 py-14 text-center shadow-[0_10px_30px_rgba(16,35,51,0.06)]">

            <span className="text-5xl font-bold text-[#dce8e5]">
              404
            </span>

            <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
              MEDICARE · DOCTOR PROFILE
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Doctor{" "}
              <span className="font-serif font-normal italic text-[#006b55]">
                not found.
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#73818d]">
              {error ||
                "The doctor information could not be found."}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => navigate("/find-doctor")}
                className="rounded-[9px] bg-[#006b55] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#004f40]"
              >
                ← Back to Doctors
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-[9px] border border-[#dce8e5] bg-white px-6 py-3 text-xs font-bold text-[#006b55] no-underline transition hover:bg-[#e8f6f2]"
              >
                Contact MediCare
              </Link>

            </div>
          </div>
        </section>
      </main>
    );
  }

  const doctorInitial = doctor.name
    ? doctor.name.charAt(0).toUpperCase()
    : "D";

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#e8f6f2]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <Link
            to="/find-doctor"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-[#006b55] no-underline transition hover:text-[#004f40]"
          >
            ← Back to Doctors
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">

            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                MEDICARE · DOCTOR PROFILE
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Meet{" "}
                <span className="font-serif font-normal italic text-[#006b55]">
                  Dr. {doctor.name}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#667783] sm:text-base">
                Professional healthcare information for your
                selected MediCare doctor.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-[18px] border border-[#dce8e5] bg-[#f7fafb] p-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#006b55] text-2xl font-bold text-white">
                {doctorInitial}
              </div>

              <div>
                <p className="text-[9px] font-bold tracking-[0.15em] text-[#73818d]">
                  SPECIALIST
                </p>

                <p className="mt-1 text-sm font-bold text-[#102333]">
                  {doctor.specialization ||
                    "Medical Specialist"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

          <div className="grid gap-6 lg:grid-cols-[1fr_330px]">

            {/* MAIN CARD */}
            <article className="rounded-[24px] border border-[#e3ecea] bg-white p-6 shadow-[0_8px_28px_rgba(16,35,51,0.06)] sm:p-8">

              <div className="flex flex-col gap-5 border-b border-[#e3ecea] pb-7 sm:flex-row sm:items-center">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] bg-[#006b55] text-3xl font-bold text-white">
                  {doctorInitial}
                </div>

                <div>
                  <p className="text-[9px] font-bold tracking-[0.18em] text-[#006b55]">
                    OUR MEDICAL TEAM
                  </p>

                  <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                    {doctor.name}
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-[#0b8068]">
                    {doctor.specialization ||
                      "Medical Specialist"}
                  </p>
                </div>

              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                <div className="rounded-[16px] bg-[#f7fafb] p-5">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#73818d]">
                    01 · SPECIALITY
                  </span>

                  <h3 className="mt-2 text-base font-bold text-[#102333]">
                    {doctor.specialization ||
                      "Medical Specialist"}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#73818d]">
                    Area of medical specialization.
                  </p>
                </div>

                <div className="rounded-[16px] bg-[#f7fafb] p-5">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#73818d]">
                    02 · DEPARTMENT
                  </span>

                  <h3 className="mt-2 text-base font-bold text-[#102333]">
                    {doctor.departmentName ||
                      "Not specified"}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#73818d]">
                    Associated medical department.
                  </p>
                </div>

                <div className="rounded-[16px] bg-[#f7fafb] p-5 sm:col-span-2">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#73818d]">
                    03 · LOCATION
                  </span>

                  <h3 className="mt-2 text-base font-bold text-[#102333]">
                    {doctor.location ||
                      "Location not specified"}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#73818d]">
                    Current MediCare practice location.
                  </p>
                </div>

              </div>

              <div className="mt-7 rounded-[18px] bg-[#e8f6f2] p-6">
                <p className="text-[9px] font-bold tracking-[0.18em] text-[#006b55]">
                  DOCTOR INFORMATION
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Compassionate care,
                  <br />
                  <span className="font-serif font-normal italic text-[#006b55]">
                    focused on you.
                  </span>
                </h3>

                <p className="mt-3 max-w-2xl text-xs leading-6 text-[#60716e]">
                  View the available professional information
                  for this doctor and continue to appointment
                  login when you are ready to book.
                </p>
              </div>

            </article>

            {/* BOOKING CARD */}
            <aside className="h-fit rounded-[24px] bg-[#006b55] p-6 text-white shadow-[0_12px_35px_rgba(0,107,85,0.16)] sm:p-7 lg:sticky lg:top-6">

              <p className="text-[9px] font-bold tracking-[0.2em] text-[#bce5db]">
                APPOINTMENT
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Ready to meet
                <br />
                <span className="font-serif font-normal italic text-[#dff3ee]">
                  your doctor?
                </span>
              </h2>

              <p className="mt-4 text-xs leading-6 text-[#d6ebe6]">
                Continue to MediCare login to proceed with
                your appointment.
              </p>

              <button
                type="button"
                onClick={handleBookAppointment}
                className="mt-7 flex h-12 w-full items-center justify-between rounded-[9px] bg-white px-5 text-xs font-bold text-[#006b55] shadow-sm transition hover:bg-[#e8f6f2]"
              >
                <span>Book Appointment</span>
                <span>→</span>
              </button>

              <Link
                to="/find-doctor"
                className="mt-3 flex h-11 items-center justify-center rounded-[9px] border border-white/50 text-xs font-bold text-white no-underline transition hover:bg-white hover:text-[#006b55]"
              >
                Find Another Doctor
              </Link>

            </aside>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 rounded-[22px] bg-[#e8f6f2] p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#006b55]">
                MEDICARE CARE
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Need help choosing{" "}
                <span className="font-serif font-normal italic text-[#006b55]">
                  a doctor?
                </span>
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#73818d]">
                Explore all available doctors or contact our
                team for assistance.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <Link
                to="/find-doctor"
                className="inline-flex h-11 items-center justify-center rounded-[9px] bg-[#006b55] px-6 text-xs font-bold text-white no-underline transition hover:bg-[#004f40]"
              >
                Find a Doctor
              </Link>

              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-[9px] border border-[#006b55] bg-transparent px-6 text-xs font-bold text-[#006b55] no-underline transition hover:bg-[#006b55] hover:text-white"
              >
                Contact us
              </Link>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default DoctorProfile;