import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

function MyProfile() {
  const [profile, setProfile] = useState({
    userId: null,
    username: "",
    role: "",
    name: "",
    email: "",
    phone: "",
    patientId: null,
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isPatient = profile.role === "PATIENT";

  // LOAD PROFILE
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await api.get("/api/profile/me");

      setProfile({
        userId: response.data.userId ?? null,
        username: response.data.username ?? "",
        role: response.data.role ?? "",
        name: response.data.name ?? "",
        email: response.data.email ?? "",
        phone: response.data.phone ?? "",
        patientId: response.data.patientId ?? null,
        dateOfBirth: response.data.dateOfBirth ?? "",
        gender: response.data.gender ?? "",
        address: response.data.address ?? "",
      });
    } catch (err) {
      console.error("Profile loading error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // INPUT CHANGE
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // UPDATE PROFILE
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const requestData = {
        username: profile.username,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      };

      if (isPatient) {
        requestData.dateOfBirth =
          profile.dateOfBirth || null;

        requestData.gender =
          profile.gender || null;

        requestData.address =
          profile.address || null;
      }

      const response = await api.put(
        "/api/profile/me",
        requestData
      );

      setProfile({
        userId: response.data.userId ?? null,
        username: response.data.username ?? "",
        role: response.data.role ?? "",
        name: response.data.name ?? "",
        email: response.data.email ?? "",
        phone: response.data.phone ?? "",
        patientId: response.data.patientId ?? null,
        dateOfBirth: response.data.dateOfBirth ?? "",
        gender: response.data.gender ?? "",
        address: response.data.address ?? "",
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // CHANGE PASSWORD
  const handlePasswordChange = async (event) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setPasswordError(
        "New password and confirm password do not match"
      );
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(
        "New password must contain at least 6 characters"
      );
      return;
    }

    try {
      setChangingPassword(true);

      const response = await api.post(
        "/api/auth/change-password",
        passwordData
      );

      setPasswordMessage(
        response.data.message ||
          "Password changed successfully"
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Change password error:", err);

      setPasswordError(
        err.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7fafb]">
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dff3ee] border-t-[#006b55]" />

          <p className="mt-4 text-sm font-semibold text-[#455565]">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333]">
      {/* HEADER */}
      <section className="border-b border-[#e3ecea] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#006b55]">
                <span className="h-2 w-2 rounded-full bg-[#006b55]" />
                ACCOUNT
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My{" "}
                <span className="font-serif italic font-normal text-[#006b55]">
                  profile.
                </span>
              </h1>

              <p className="mt-3 text-sm text-[#73818d] sm:text-base">
                Manage your personal information and account
                security.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex w-fit items-center rounded-xl border border-[#dce8e5] bg-white px-4 py-2.5 text-sm font-bold text-[#455565] transition hover:border-[#9bcfc3] hover:bg-[#e8f6f2] hover:text-[#006b55]"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {/* GLOBAL MESSAGES */}
        {message && (
          <div
            role="alert"
            className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 font-bold">
              ✓
            </span>
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 font-bold">
              !
            </span>
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
          {/* PROFILE INFORMATION */}
          <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_10px_30px_rgba(16,35,51,0.07)]">
            <div className="flex items-center justify-between border-b border-[#e3ecea] bg-[#f7fafb] px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#006b55]">
                  PERSONAL DETAILS
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Profile information
                </h2>
              </div>

              <span className="rounded-full bg-[#e8f6f2] px-3 py-1.5 text-xs font-bold text-[#006b55]">
                {profile.role || "USER"}
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* USERNAME */}
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                  >
                    USERNAME
                  </label>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={50}
                    required
                    className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none transition focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* FULL NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                  >
                    FULL NAME
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                  >
                    EMAIL
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                  >
                    PHONE
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>
              </div>

              {/* PATIENT DETAILS */}
              {isPatient && (
                <div className="mt-8 border-t border-[#e3ecea] pt-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-8 w-1 rounded-full bg-[#006b55]" />

                    <div>
                      <p className="text-[10px] font-bold tracking-[0.16em] text-[#006b55]">
                        HEALTHCARE INFORMATION
                      </p>

                      <h3 className="mt-0.5 text-lg font-bold">
                        Patient details
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* DOB */}
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                      >
                        DATE OF BIRTH
                      </label>

                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleChange}
                        className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                      />
                    </div>

                    {/* GENDER */}
                    <div>
                      <label
                        htmlFor="gender"
                        className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                      >
                        GENDER
                      </label>

                      <select
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="h-12 w-full rounded-xl border border-[#dce8e5] bg-white px-4 text-sm outline-none focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                      >
                        <option value="">
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">
                          Female
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* ADDRESS */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                      >
                        ADDRESS
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="w-full resize-none rounded-xl border border-[#dce8e5] px-4 py-3 text-sm outline-none placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#e3ecea] pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={loadProfile}
                  disabled={saving}
                  className="h-12 rounded-xl border border-[#dce8e5] bg-white px-6 text-sm font-bold text-[#455565] transition hover:bg-[#f7fafb] disabled:opacity-50"
                >
                  Refresh
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#006b55] px-7 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,107,85,0.2)] transition hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Save Changes
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* SECURITY */}
          <section className="h-fit overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_10px_30px_rgba(16,35,51,0.07)]">
            <div className="flex items-center justify-between border-b border-[#e3ecea] bg-[#f7fafb] px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#006b55]">
                  ACCOUNT SECURITY
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Change password
                </h2>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f2] font-bold text-[#006b55]">
                ✓
              </span>
            </div>

            <div className="p-5 sm:p-7">
              <p className="mb-6 text-sm leading-6 text-[#73818d]">
                Keep your account secure by using a strong
                password that you do not reuse elsewhere.
              </p>

              {passwordMessage && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                >
                  ✓ {passwordMessage}
                </div>
              )}

              {passwordError && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  ! {passwordError}
                </div>
              )}

              <form
                onSubmit={handlePasswordChange}
                className="space-y-5"
              >
                {/* CURRENT */}
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                  >
                    CURRENT PASSWORD
                  </label>

                  <input
                    type="password"
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(event) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword:
                          event.target.value,
                      })
                    }
                    placeholder="Enter current password"
                    required
                    className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* NEW */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                  >
                    NEW PASSWORD
                  </label>

                  <input
                    type="password"
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={(event) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword:
                          event.target.value,
                      })
                    }
                    placeholder="Enter new password"
                    minLength={6}
                    required
                    className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />

                  <p className="mt-2 text-xs text-[#8a969e]">
                    Minimum 6 characters.
                  </p>
                </div>

                {/* CONFIRM */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-bold tracking-wide text-[#455565]"
                  >
                    CONFIRM NEW PASSWORD
                  </label>

                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(event) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword:
                          event.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                    minLength={6}
                    required
                    className="h-12 w-full rounded-xl border border-[#dce8e5] px-4 text-sm outline-none focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={changingPassword}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#006b55] px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {changingPassword ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Changing Password...
                    </>
                  ) : (
                    <>
                      Change Password
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>

              {/* SECURITY NOTE */}
              <div className="mt-6 flex gap-3 rounded-xl bg-[#e8f6f2] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-bold text-[#006b55]">
                  ✓
                </span>

                <div>
                  <strong className="text-sm text-[#102333]">
                    Secure & private
                  </strong>

                  <p className="mt-1 text-xs leading-5 text-[#73818d]">
                    Your account credentials and healthcare
                    information are protected.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM SECURITY STRIP */}
        <div className="mt-6 flex items-center gap-2 text-xs text-[#8a969e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#006b55]" />
          Your MediCare account information is managed securely.
        </div>
      </div>
    </main>
  );
}

export default MyProfile;