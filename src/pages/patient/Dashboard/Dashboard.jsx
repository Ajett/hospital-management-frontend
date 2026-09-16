import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import api from "../../../services/api";

// Cache profile requests by username.
// Prevents duplicate profile requests in React StrictMode.
const profileCache = new Map();

function Dashboard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const isAdmin =
    profile?.role === "ADMIN" ||
    user?.role === "ADMIN";

  const isPatient =
    profile?.role === "PATIENT" ||
    user?.role === "PATIENT";

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {
    const username = user?.username;

    if (!username) {
      return;
    }

    let cancelled = false;

    const loadProfile = async () => {
      try {
        setError("");

        let request = profileCache.get(username);

        if (!request) {
          request = api
            .get("/api/profile/me")
            .then((response) => response.data);

          profileCache.set(username, request);
        }

        const profileData = await request;

        if (!cancelled) {
          setProfile(profileData);
        }
      } catch (err) {
        profileCache.delete(username);

        if (!cancelled) {
          console.error("Dashboard profile error:", err);

          setError(
            err.response?.data?.message ||
              "Unable to load complete profile information"
          );
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [user?.username]);

  // =========================================================
  // USER DATA
  // =========================================================

  const username =
    profile?.username ||
    user?.username ||
    "User";

  const role =
    profile?.role ||
    user?.role ||
    "USER";

  const name =
    profile?.name ||
    username;

  const email =
    profile?.email ||
    "Not provided";

  const phone =
    profile?.phone ||
    "Not provided";

  const initial =
    name?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333]">

      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-7 lg:px-8 lg:py-10">

        {/* =====================================================
            WELCOME HERO
        ====================================================== */}

        <section className="relative overflow-hidden rounded-[28px] bg-[#006b55] px-7 py-8 text-white shadow-[0_20px_45px_rgba(0,107,85,0.16)] sm:px-10 sm:py-10 lg:px-11 lg:py-12">

          {/* Decorative circles */}
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/20" />

          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/15" />

          <div className="absolute -bottom-36 -left-28 h-80 w-80 rounded-full bg-[#005b49]/70" />

          <div className="relative z-10 grid items-center gap-9 lg:grid-cols-[1fr_390px]">

            {/* HERO CONTENT */}
            <div>

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-[#9fe0d0]" />

                <p className="text-[10px] font-bold tracking-[0.22em] text-[#dff3ee]">
                  MEDICARE HEALTHCARE PORTAL
                </p>

              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">

                Welcome back,

                <span className="font-serif font-normal italic text-[#bce5dc]">
                  {" "}{name}
                </span>

                <span className="ml-2">
                  👋
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Manage your healthcare, appointments and medical information
                from one secure place.
              </p>

            </div>

            {/* STATUS CARD */}
            <div className="rounded-[22px] border border-white/35 bg-white/10 p-6 backdrop-blur-sm">

              <div className="flex items-center justify-between">

                <span className="text-[10px] font-bold tracking-[0.18em] text-white/65">
                  PORTAL STATUS
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/80">

                  <span className="h-2 w-2 rounded-full bg-[#9fe0d0]" />

                  Secure

                </span>

              </div>

              <div className="my-5 h-px bg-white/15" />

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-[#006b55]">
                  {initial}
                </div>

                <div className="min-w-0">

                  <strong className="block truncate text-base text-white">
                    {name}
                  </strong>

                  <span className="mt-1 block truncate text-xs text-white/60">
                    {email}
                  </span>

                  <span className="mt-2 inline-flex rounded-full border border-white/30 px-3 py-1 text-[9px] font-bold tracking-[0.14em] text-white/80">
                    {role}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="mt-5 flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
              !
            </span>

            <div>

              <strong className="block">
                Profile information unavailable
              </strong>

              <p className="mt-1 text-xs">
                {error}
              </p>

            </div>

          </div>
        )}

        {/* =====================================================
            QUICK ACCESS
        ====================================================== */}

        <section className="mt-12">

          <div className="mb-7">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#006b55]">
              ESSENTIAL SERVICES
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Quick Access
            </h2>

            <p className="mt-2 text-sm text-[#73818d]">
              Everything you need, in one place.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* APPOINTMENTS */}
            <DashboardServiceCard
              number="01"
              title="Appointments"
              description={
                isPatient
                  ? "Book and manage your appointments"
                  : "Manage hospital appointments"
              }
              to="/appointments"
            />

            {/* MEDICAL RECORDS */}
            <DashboardServiceCard
              number="02"
              title="Medical Records"
              description="Securely view your medical records"
              to="/medical-records"
            />

            {/* BILLING */}
            <DashboardServiceCard
              number="03"
              title="Billing"
              description="View bills and payment information"
              to="/bills"
            />

            {/* PROFILE */}
            <DashboardServiceCard
              number="04"
              title="My Profile"
              description="Manage your personal information"
              to="/my-profile"
            />

          </div>

        </section>

        {/* =====================================================
            ADMINISTRATION
        ====================================================== */}

        {isAdmin && (
          <section className="mt-14">

            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#006b55]">
                  ADMINISTRATION
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Hospital Operations
                </h2>

                <p className="mt-2 text-sm text-[#73818d]">
                  Manage patients, doctors and hospital departments.
                </p>

              </div>

              <span className="w-fit rounded-full bg-[#e8f6f2] px-4 py-2 text-[10px] font-bold tracking-[0.14em] text-[#006b55]">
                ADMIN ACCESS
              </span>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

              <AdminCard
                number="01"
                title="Patients"
                description="Manage patient information"
                to="/patients"
              />

              <AdminCard
                number="02"
                title="Doctors"
                description="Manage doctors and specialists"
                to="/doctors"
              />

              <AdminCard
                number="03"
                title="Departments"
                description="Manage hospital departments"
                to="/departments"
              />

              <AdminCard
                number="04"
                title="Users"
                description="Manage accounts and access"
                to="/users"
              />

              <AdminCard
                number="05"
                title="Hospitals"
                description="Manage healthcare facilities"
                to="/hospital-management"
              />

            </div>

          </section>
        )}

        {/* =====================================================
            ACCOUNT + SHORTCUTS
        ====================================================== */}

        <section className="mt-14 grid gap-5 lg:grid-cols-2">

          {/* ACCOUNT OVERVIEW */}
          <div className="overflow-hidden rounded-[22px] border border-[#e3ecea] bg-white shadow-[0_5px_18px_rgba(16,35,51,0.05)]">

            <div className="flex items-center justify-between border-b border-[#e8efed] px-6 py-5 sm:px-7">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006b55]">
                  ACCOUNT
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Account Overview
                </h2>

              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f2] text-[10px] font-bold text-[#006b55]">
                01
              </span>

            </div>

            <div className="px-6 sm:px-7">

              <AccountRow
                label="Full Name"
                value={name}
              />

              <AccountRow
                label="Username"
                value={username}
              />

              <AccountRow
                label="Email"
                value={email}
              />

              <AccountRow
                label="Phone"
                value={phone}
              />

              <div className="flex items-center justify-between border-b border-[#edf2f0] py-4">

                <span className="text-sm text-[#73818d]">
                  Role
                </span>

                <span className="rounded-full bg-[#e8f6f2] px-4 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#006b55]">
                  {role}
                </span>

              </div>

              <div className="flex items-center justify-between py-4">

                <span className="text-sm text-[#73818d]">
                  Account Status
                </span>

                <span className="flex items-center gap-2 text-xs font-semibold text-[#16835f]">

                  <span className="h-2 w-2 rounded-full bg-[#16835f]" />

                  Active

                </span>

              </div>

              {isPatient && profile?.patientId && (
                <div className="flex items-center justify-between border-t border-[#edf2f0] py-4">

                  <span className="text-sm text-[#73818d]">
                    Patient ID
                  </span>

                  <strong className="text-sm">
                    #{profile.patientId}
                  </strong>

                </div>
              )}

            </div>

            <Link
              to="/my-profile"
              className="flex items-center justify-between border-t border-[#e8efed] bg-[#fbfdfc] px-6 py-4 text-sm font-semibold !text-[#006b55] no-underline transition hover:bg-[#e8f6f2] sm:px-7"
            >

              View & Edit Profile

              <span>
                →
              </span>

            </Link>

          </div>

          {/* HEALTHCARE SHORTCUTS */}
          <div className="overflow-hidden rounded-[22px] border border-[#e3ecea] bg-white shadow-[0_5px_18px_rgba(16,35,51,0.05)]">

            <div className="flex items-center justify-between border-b border-[#e8efed] px-6 py-5 sm:px-7">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006b55]">
                  SERVICES
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Healthcare Shortcuts
                </h2>

              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f2] text-[10px] font-bold text-[#006b55]">
                02
              </span>

            </div>

            <div className="px-6 sm:px-7">

              <Shortcut
                number="01"
                title="Appointments"
                description="View your appointments"
                to="/appointments"
              />

              <Shortcut
                number="02"
                title="Medical Records"
                description="Access health information"
                to="/medical-records"
              />

              <Shortcut
                number="03"
                title="Billing"
                description="Check bills and payments"
                to="/bills"
              />

              <Shortcut
                number="04"
                title="My Profile"
                description="Manage your information"
                to="/my-profile"
              />

            </div>

            <div className="mx-6 mb-6 mt-2 flex items-center gap-3 rounded-2xl bg-[#eef8f5] p-4 sm:mx-7">

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d8f1e9] font-bold text-[#006b55]">
                ✓
              </span>

              <div>

                <strong className="block text-sm text-[#102333]">
                  Secure & Private
                </strong>

                <p className="mt-1 text-xs text-[#73818d]">
                  Your healthcare information is protected with secure
                  authentication.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PATIENT INFORMATION
        ====================================================== */}

        {isPatient && (
          <section className="mt-5 overflow-hidden rounded-[22px] border border-[#e3ecea] bg-white shadow-[0_5px_18px_rgba(16,35,51,0.05)]">

            <div className="flex items-center justify-between border-b border-[#e8efed] px-6 py-5 sm:px-7">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006b55]">
                  PATIENT PROFILE
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Patient Information
                </h2>

                <p className="mt-1 text-xs text-[#73818d]">
                  Your registered healthcare information.
                </p>

              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f2] text-[10px] font-bold text-[#006b55]">
                03
              </span>

            </div>

            <div className="grid gap-0 sm:grid-cols-3">

              <PatientInfo
                label="Date of Birth"
                value={profile?.dateOfBirth || "Not provided"}
              />

              <PatientInfo
                label="Gender"
                value={profile?.gender || "Not provided"}
              />

              <PatientInfo
                label="Address"
                value={profile?.address || "Not provided"}
                last
              />

            </div>

          </section>
        )}

        {/* =====================================================
            FOOTER INFORMATION
        ====================================================== */}

        <div className="mt-8 flex flex-col gap-5 rounded-[22px] border border-[#d9eee8] bg-[#eef8f5] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#006b55] text-xl font-light text-white">
              +
            </div>

            <div>

              <strong className="block text-sm text-[#102333]">
                MediCare Healthcare Portal
              </strong>

              <p className="mt-1 text-xs text-[#73818d]">
                You are securely logged in as{" "}
                <b>{name}</b>{" "}
                with{" "}
                <b>{role}</b>{" "}
                access.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#16835f]">

            <span className="h-2 w-2 rounded-full bg-[#16835f]" />

            Secure

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   QUICK ACCESS CARD
========================================================= */

function DashboardServiceCard({
  number,
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="dashboard-card-link group flex min-h-[170px] ... no-underline shadow-[0_4px_14px_rgba(16,35,51,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_14px_30px_rgba(16,35,51,0.10)]"
    >

      <div className="flex items-center justify-between">

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f6f2] text-[10px] font-bold text-[#006b55] transition group-hover:bg-[#006b55] group-hover:text-white">
          {number}
        </span>

        <span className="text-[#73818d] transition group-hover:translate-x-1 group-hover:text-[#006b55]">
          →
        </span>

      </div>

      <div className="mt-auto pt-7">

        <h3 className="text-lg font-bold">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-[#73818d]">
          {description}
        </p>

      </div>

    </Link>
  );
}

/* =========================================================
   ADMIN CARD
========================================================= */

function AdminCard({
  number,
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="group rounded-[18px] border border-[#e3ecea] bg-white p-5 !text-[#102333] no-underline shadow-[0_4px_14px_rgba(16,35,51,0.04)] transition hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_12px_28px_rgba(16,35,51,0.08)]"
    >

      <div className="flex items-center justify-between">

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f2] text-[10px] font-bold text-[#006b55]">
          {number}
        </span>

        <span className="text-sm text-[#73818d] transition group-hover:translate-x-1 group-hover:text-[#006b55]">
          →
        </span>

      </div>

      <h3 className="mt-6 text-base font-bold">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#73818d]">
        {description}
      </p>

    </Link>
  );
}

/* =========================================================
   ACCOUNT ROW
========================================================= */

function AccountRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-[#edf2f0] py-4">

      <span className="text-sm text-[#73818d]">
        {label}
      </span>

      <strong className="max-w-[65%] truncate text-right text-sm text-[#102333]">
        {value}
      </strong>

    </div>
  );
}

/* =========================================================
   SHORTCUT
========================================================= */

function Shortcut({
  number,
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 border-b border-[#edf2f0] py-4 !text-[#102333] no-underline last:border-b-0"
    >

      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef8f5] text-[10px] font-bold text-[#006b55]">
        {number}
      </span>

      <div className="min-w-0 flex-1">

        <strong className="block text-sm">
          {title}
        </strong>

        <span className="mt-1 block text-xs text-[#73818d]">
          {description}
        </span>

      </div>

      <span className="text-sm text-[#73818d] transition group-hover:translate-x-1 group-hover:text-[#006b55]">
        →
      </span>

    </Link>
  );
}

/* =========================================================
   PATIENT INFO
========================================================= */

function PatientInfo({
  label,
  value,
  last,
}) {
  return (
    <div
      className={`p-6 ${
        !last
          ? "border-b border-[#edf2f0] sm:border-b-0 sm:border-r"
          : ""
      }`}
    >

      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#73818d]">
        {label}
      </span>

      <strong className="mt-3 block text-sm leading-6 text-[#102333]">
        {value}
      </strong>

    </div>
  );
}

export default Dashboard;