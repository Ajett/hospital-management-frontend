import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/forgot-password", {
        email: email.trim(),
      });

      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );

      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7fafb]">
      <div className="min-h-screen grid lg:grid-cols-[0.9fr_1.1fr]">

        {/* =====================================================
            LEFT BRAND PANEL
            ===================================================== */}
        <section className="relative hidden overflow-hidden bg-[#004f40] px-10 py-10 text-white lg:flex xl:px-16">

          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#0b8068] opacity-25" />

          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#006b55] opacity-40" />

          <div className="relative z-10 flex w-full flex-col justify-between">

            {/* BRAND */}
            <div className="flex items-center justify-between">

              <Link
                to="/"
                className="flex items-center gap-3 no-underline text-white"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-3xl font-light text-[#006b55] shadow-lg">
                  +
                </span>

                <span className="flex flex-col">
                  <strong className="text-xl tracking-tight">
                    MediCare
                  </strong>

                  <small className="text-[9px] tracking-[0.2em] text-white/60">
                    HOSPITAL MANAGEMENT
                  </small>
                </span>
              </Link>

              <Link
                to="/"
                className="text-xs font-semibold text-white/60 no-underline transition hover:text-white"
              >
                ← Back to website
              </Link>

            </div>

            {/* CONTENT */}
            <div className="max-w-xl">

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#bce5dc]">
                MEDICARE HEALTHCARE PORTAL
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                Stay secure,
                <span className="block font-serif font-normal italic text-[#bce5dc]">
                  stay protected.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/70 xl:text-base">
                Forgot your password? Don't worry. We'll help you
                securely regain access to your MediCare account.
              </p>

              {/* FEATURES */}
              <div className="mt-9 space-y-5">

                {[
                  [
                    "✓",
                    "Secure Recovery",
                    "Your account remains protected",
                  ],
                  [
                    "@",
                    "Email Verification",
                    "Reset instructions are sent securely",
                  ],
                  [
                    "♥",
                    "Patient First",
                    "Your privacy always matters",
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

            {/* FOOTER */}
            <div className="flex justify-between text-[10px] text-white/40">

              <span>
                © {new Date().getFullYear()} MediCare Healthcare
              </span>

              <span>
                Care · Security · Trust
              </span>

            </div>

          </div>
        </section>

        {/* =====================================================
            RIGHT FORM
            ===================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-14">

          <div className="w-full max-w-md">

            {/* MOBILE BRAND */}
            <div className="mb-12 lg:hidden">

              <Link
                to="/"
                className="flex items-center gap-3 no-underline text-[#102333]"
              >

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006b55] text-3xl font-light text-white">
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

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                @
              </div>

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                ACCOUNT RECOVERY
              </p>

              <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#102333]">
                Forgot your
                <span className="block font-serif font-normal italic text-[#006b55]">
                  password?
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#73818d]">
                Enter your registered email address and we'll send
                you a secure reset link.
              </p>

            </header>

            {/* SUCCESS MESSAGE */}
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
                    Check your email
                  </strong>

                  <span>
                    {message}
                  </span>

                </div>

              </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
              >

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                  !
                </span>

                <span>
                  {error}
                </span>

              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              <label
                htmlFor="forgot-email"
                className="mb-2 block text-sm font-semibold text-[#102333]"
              >
                Email Address
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006b55]">
                  @
                </span>

                <input
                  type="email"
                  id="forgot-email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setMessage("");
                  }}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="h-13 w-full rounded-xl border border-[#dce8e5] bg-[#fbfdfc] pl-11 pr-4 text-sm text-[#102333] outline-none transition placeholder:text-[#a1adb4] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10 disabled:opacity-60"
                />

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#006b55] text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send reset link
                    <span className="text-lg">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>

            {/* BACK TO LOGIN */}
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
                  Your information is secure
                </strong>

                <span className="text-xs text-[#73818d]">
                  We never reveal whether an account exists.
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

export default ForgotPassword;