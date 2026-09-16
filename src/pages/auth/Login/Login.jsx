import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      await login(username.trim(), password);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
  window.location.href =
    "https://hospital-management-system-dap5.onrender.com/oauth2/authorization/google";
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
                  <strong className="text-xl tracking-tight">MediCare</strong>

                  <small className="text-[9px] tracking-[0.2em] text-white/60">
                    HOSPITAL MANAGEMENT
                  </small>
                </span>
              </Link>

              <Link
                to="/"
                className="!text-white no-underline transition hover:!text-[#bce5dc]"
              >
                ← Back to website
              </Link>
            </div>

            {/* CONTENT */}
            <div className="max-w-xl">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#bce5dc]">
                MEDICARE HEALTHCARE PORTAL
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white xl:text-6xl">
                Your health,
                <span className="block font-serif font-normal italic text-[#bce5dc]">
                  our priority.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/70 xl:text-base">
                Securely access your MediCare healthcare portal to manage
                appointments, doctors, medical records and healthcare services.
              </p>

              {/* FEATURES */}
              <div className="mt-9 space-y-5">
                {[
                  ["✓", "Secure access", "Protected healthcare information"],
                  ["+", "Complete care", "Everything in one place"],
                  ["♥", "Patient first", "Designed for better care"],
                ].map(([icon, title, text]) => (
                  <div key={title} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[#bce5dc]">
                      {icon}
                    </span>

                    <div>
                      <strong className="block text-sm">{title}</strong>

                      <span className="text-xs text-white/55">{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between text-[10px] text-white/40">
              <span>© {new Date().getFullYear()} MediCare Healthcare</span>

              <span>Care · Security · Trust</span>
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
                  <strong className="text-xl">MediCare</strong>

                  <small className="text-[9px] tracking-[0.2em] text-[#9aa7ae]">
                    HOSPITAL MANAGEMENT
                  </small>
                </span>
              </Link>
            </div>

            {/* HEADER */}
            <header className="mb-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                +
              </div>

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#006b55]">
                WELCOME BACK
              </p>

              <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#102333]">
                Sign in to your
                <span className="block font-serif font-normal italic text-[#006b55]">
                  account.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#73818d]">
                Enter your credentials to access the healthcare portal.
              </p>
            </header>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="mb-6 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                  !
                </span>

                <span>{error}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* USERNAME */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-[#102333]"
                >
                  Username
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006b55]">
                    ◉
                  </span>

                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your username"
                    autoComplete="username"
                    disabled={loading}
                    required
                    className="h-13 w-full rounded-xl border border-[#dce8e5] bg-[#fbfdfc] pl-11 pr-4 text-sm text-[#102333] outline-none transition placeholder:text-[#a1adb4] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#102333]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold !text-[#006b55] no-underline hover:!text-[#004f40]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006b55]">
                    ◆
                  </span>

                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    required
                    className="h-13 w-full rounded-xl border border-[#dce8e5] bg-[#fbfdfc] pl-11 pr-4 text-sm text-[#102333] outline-none transition placeholder:text-[#a1adb4] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* LOGIN */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#006b55] text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#e5eeec]" />
              <span className="text-[10px] font-bold tracking-widest text-[#9aa7ae]">
                OR
              </span>
              <span className="h-px flex-1 bg-[#e5eeec]" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-[#dce8e5] bg-white text-sm font-semibold text-[#26343d] transition hover:bg-[#f7faf9] disabled:opacity-60"
            >
              <span className="text-lg font-bold">G</span>
              Continue with Google
            </button>

            {/* REGISTER */}
            <div className="mt-7 text-center text-sm">
              <span className="text-[#73818d]">Don't have an account? </span>

              <Link
                to="/register"
                className="font-semibold !text-[#006b55] no-underline hover:!text-[#004f40]"
              >
                Create an account →
              </Link>
            </div>

            {/* SECURITY */}
            <div className="mt-8 flex gap-3 rounded-xl border border-[#d9eee8] bg-[#eef8f5] p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d8f1e9] text-sm font-bold text-[#006b55]">
                ✓
              </span>

              <div>
                <strong className="block text-sm text-[#102333]">
                  Secure & private
                </strong>

                <span className="text-xs text-[#73818d]">
                  Your healthcare information is protected.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;