import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../services/api";

function ResetPassword() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid or missing password reset link.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });

      setMessage(
        "Your password has been reset successfully."
      );

      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to reset password. The link may be expired or invalid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7fafb]">
      <div className="min-h-screen grid lg:grid-cols-[0.9fr_1.1fr]">

        {/* =====================================================
            LEFT
            ===================================================== */}
        <section className="relative hidden overflow-hidden bg-[#004f40] px-10 py-10 text-white lg:flex xl:px-16">

          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#0b8068] opacity-25" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#006b55] opacity-40" />

          <div className="relative z-10 flex w-full flex-col justify-between">

            {/* BRAND */}
            <Link
              to="/"
              className="flex items-center gap-3 text-white no-underline"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-3xl font-light text-[#006b55]">
                +
              </span>

              <span className="flex flex-col">
                <strong className="text-xl">
                  MediCare
                </strong>

                <small className="text-[9px] tracking-[0.2em] text-white/60">
                  HOSPITAL MANAGEMENT
                </small>
              </span>
            </Link>

            {/* CONTENT */}
            <div className="max-w-xl">

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#bce5dc]">
                MEDICARE HEALTHCARE PORTAL
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                Secure access,
                <span className="block font-serif font-normal italic text-[#bce5dc]">
                  protected always.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/70 xl:text-base">
                Create a new secure password and continue accessing your
                MediCare healthcare portal safely.
              </p>

              {/* FEATURES */}
              <div className="mt-9 space-y-5">

                {[
                  [
                    "✓",
                    "Secure Password",
                    "Keep your account protected",
                  ],
                  [
                    "⏱",
                    "Time Limited",
                    "Reset links expire for your security",
                  ],
                  [
                    "♥",
                    "Patient First",
                    "Your privacy matters to us",
                  ],
                ].map(([icon, title, text]) => (
                  <div
                    key={title}
                    className="flex items-center gap-4"
                  >

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[#bce5dc]">
                      {icon}
                    </span>

                    <div>
                      <strong className="block text-sm">
                        {title}
                      </strong>

                      <span className="text-xs text-white/55">
                        {text}
                      </span>
                    </div>

                  </div>
                ))}

              </div>

            </div>

            <div className="text-[10px] text-white/40">
              © {new Date().getFullYear()} MediCare Healthcare
            </div>

          </div>
        </section>

        {/* =====================================================
            RIGHT
            ===================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-14">

          <div className="w-full max-w-md">

            {/* MOBILE BRAND */}
            <div className="mb-12 lg:hidden">
              <Link
                to="/"
                className="flex items-center gap-3 no-underline text-[#102333]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006b55] text-3xl text-white">
                  +
                </span>

                <span className="flex flex-col">
                  <strong className="text-xl">
                    MediCare
                  </strong>

                  <small className="text-[9px] tracking-[0.2em] text-[#9aa7ae]">
                    HOSPITAL MANAGEMENT
                  </small>
                </span>
              </Link>
            </div>

            {/* HEADER */}
            <header className="mb-8">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-xl text-[#006b55]">
                🔒
              </div>

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                ACCOUNT SECURITY
              </p>

              <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#102333]">
                Reset your
                <span className="block font-serif font-normal italic text-[#006b55]">
                  password.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#73818d]">
                Create a new password for your MediCare account.
              </p>

            </header>

            {/* SUCCESS */}
            {message && (
              <div
                role="alert"
                className="mb-5 flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold">
                  ✓
                </span>

                <div>
                  <strong className="mb-1 block">
                    Password updated
                  </strong>

                  <span>{message}</span>
                </div>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                  !
                </span>

                <span>{error}</span>
              </div>
            )}

            {/* VALID TOKEN */}
            {token ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NEW PASSWORD */}
                <div>

                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold text-[#102333]"
                  >
                    New Password
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006b55]">
                      ◆
                    </span>

                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      disabled={loading}
                      required
                      className="h-13 w-full rounded-xl border border-[#dce8e5] bg-[#fbfdfc] pl-11 pr-4 text-sm text-[#102333] outline-none transition placeholder:text-[#a1adb4] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10 disabled:opacity-60"
                    />

                  </div>
                </div>

                {/* CONFIRM */}
                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#102333]"
                  >
                    Confirm New Password
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006b55]">
                      ◆
                    </span>

                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      disabled={loading}
                      required
                      className="h-13 w-full rounded-xl border border-[#dce8e5] bg-[#fbfdfc] pl-11 pr-4 text-sm text-[#102333] outline-none transition placeholder:text-[#a1adb4] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10 disabled:opacity-60"
                    />

                  </div>
                </div>

                {/* PASSWORD INFO */}
                <div className="flex items-center gap-3 rounded-xl border border-[#dcece7] bg-[#f0f8f5] px-4 py-3">

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9f0e9] text-xs font-bold text-[#006b55]">
                    i
                  </span>

                  <span className="text-xs text-[#61717b]">
                    Password must contain at least 6 characters.
                  </span>

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#006b55] text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Resetting password...
                    </>
                  ) : (
                    <>
                      Reset password
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>

              </form>
            ) : (
              /* INVALID TOKEN */
              <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
                  !
                </div>

                <h3 className="mb-2 text-lg font-bold text-[#102333]">
                  Invalid reset link
                </h3>

                <p className="text-sm leading-6 text-[#73818d]">
                  This password reset link is missing or invalid.
                  Please request a new password reset link.
                </p>

              </div>
            )}

            {/* LOGIN */}
            <div className="mt-7 text-center text-sm">

              <span className="text-[#73818d]">
                Remember your password?{" "}
              </span>

              <Link
                to="/login"
                className="font-semibold !text-[#006b55] no-underline hover:!text-[#004f40]"
              >
                Back to login
              </Link>

            </div>

            {/* SECURITY */}
            <div className="mt-8 flex gap-3 rounded-xl border border-[#d9eee8] bg-[#eef8f5] p-4">

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d8f1e9] font-bold text-[#006b55]">
                ✓
              </span>

              <div>
                <strong className="block text-sm text-[#102333]">
                  Secure password reset
                </strong>

                <span className="text-xs text-[#73818d]">
                  Your password is securely protected.
                </span>
              </div>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

export default ResetPassword;