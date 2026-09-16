import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

function OAuth2Callback() {
  const navigate = useNavigate();
  const { loginWithTokens } = useAuth();

  const processedRef = useRef(false);

  useEffect(() => {
    // Prevent React StrictMode / re-render from processing the callback twice
    if (processedRef.current) {
      return;
    }

    processedRef.current = true;

    try {
      const hash = window.location.hash.substring(1);

      if (!hash) {
        console.error("Google OAuth callback hash is missing.");
        navigate("/login", { replace: true });
        return;
      }

      const params = new URLSearchParams(hash);

      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");
      const username = params.get("username");
      const role = params.get("role");

      console.log("Google OAuth callback received.");
      console.log("Username:", username);
      console.log("Role:", role);

      if (!accessToken || !refreshToken || !role) {
        console.error("Google login tokens are missing.");
        navigate("/login", { replace: true });
        return;
      }

      // Save authentication
      loginWithTokens(
        accessToken,
        refreshToken,
        username,
        role
      );

      // Remove tokens from browser URL
      window.history.replaceState(
        {},
        document.title,
        "/oauth2/callback"
      );

      // Go to dashboard
      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.error("Google OAuth callback error:", error);

      navigate("/login", { replace: true });
    }
  }, [navigate, loginWithTokens]);

  return (
    <main className="min-h-screen bg-[#f7fafb]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================================
            LEFT SIDE
        ========================================== */}
        <section className="relative hidden overflow-hidden bg-[#005c4b] text-white lg:flex">

          {/* Decorative circles */}
          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#006b55]" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#006b55]" />

          <div className="relative z-10 flex w-full flex-col justify-between px-12 py-10 xl:px-16">

            {/* LOGO */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-light text-[#006b55] shadow-sm">
                  +
                </div>

                <div>
                  <div className="text-xl font-bold leading-none">
                    MediCare
                  </div>

                  <div className="mt-1 text-[9px] tracking-[0.25em] text-white/55">
                    HOSPITAL MANAGEMENT
                  </div>
                </div>

              </div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm font-medium !text-white/80 no-underline transition hover:!text-white"
              >
                ← Back to website
              </button>

            </div>

            {/* LEFT CONTENT */}
            <div className="max-w-lg">

              <p className="text-[10px] font-bold tracking-[0.22em] text-[#bde8dd]">
                MEDICARE HEALTHCARE PORTAL
              </p>

              <h1 className="mt-6 text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">

                Your health,

                <span className="block font-serif font-normal italic text-[#bde8dd]">
                  our priority.
                </span>

              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
                Securely access your MediCare healthcare portal to manage
                appointments, doctors, medical records and healthcare services.
              </p>

              {/* FEATURES */}
              <div className="mt-10 space-y-5">

                {[
                  [
                    "✓",
                    "Secure access",
                    "Protected healthcare information",
                  ],
                  [
                    "+",
                    "Complete care",
                    "Everything in one place",
                  ],
                  [
                    "♥",
                    "Patient first",
                    "Designed for better care",
                  ],
                ].map(([icon, title, text]) => (
                  <div
                    key={title}
                    className="flex items-center gap-4"
                  >

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-sm text-[#bde8dd]">
                      {icon}
                    </span>

                    <div>

                      <strong className="block text-sm text-white">
                        {title}
                      </strong>

                      <span className="text-xs text-white/50">
                        {text}
                      </span>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between text-[9px] text-white/35">

              <span>
                © {new Date().getFullYear()} MediCare Healthcare
              </span>

              <span>
                Care · Security · Trust
              </span>

            </div>

          </div>
        </section>

        {/* =========================================
            RIGHT SIDE
        ========================================== */}
        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-14 lg:hidden">

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-3"
              >

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#006b55] text-2xl font-light text-white">
                  +
                </span>

                <span className="text-left">

                  <strong className="block text-xl leading-none text-[#102333]">
                    MediCare
                  </strong>

                  <small className="text-[9px] tracking-[0.2em] text-[#73818d]">
                    HOSPITAL MANAGEMENT
                  </small>

                </span>

              </button>

            </div>

            {/* STATUS ICON */}
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-2xl font-light text-[#006b55]">
              +
            </div>

            {/* HEADER */}
            <div>

              <p className="text-[10px] font-bold tracking-[0.22em] text-[#006b55]">
                SECURE SIGN IN
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#102333] sm:text-5xl">

                Completing

                <span className="block font-serif font-normal italic text-[#006b55]">
                  authentication.
                </span>

              </h2>

              <p className="mt-5 text-sm leading-6 text-[#73818d]">
                Please wait while we securely complete your Google
                authentication and prepare your MediCare account.
              </p>

            </div>

            {/* LOADING CARD */}
            <div className="mt-9 rounded-2xl border border-[#dce8e5] bg-[#f8fcfb] p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f2]">

                  <span
                    className="h-6 w-6 animate-spin rounded-full border-[3px] border-[#cfe8e2] border-t-[#006b55]"
                    aria-hidden="true"
                  />

                </div>

                <div>

                  <strong className="block text-sm font-bold text-[#102333]">
                    Signing you in...
                  </strong>

                  <span className="mt-1 block text-xs text-[#73818d]">
                    Completing Google authentication
                  </span>

                </div>

              </div>

              {/* Progress line */}
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#dceee9]">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-[#006b55]" />
              </div>

            </div>

            {/* SECURITY INFO */}
            <div className="mt-5 flex gap-3 rounded-2xl border border-[#d9eee8] bg-[#eef8f5] p-4">

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d8f1e9] text-sm font-bold text-[#006b55]">
                ✓
              </span>

              <div>

                <strong className="block text-sm text-[#102333]">
                  Secure & private
                </strong>

                <p className="mt-1 text-xs leading-5 text-[#73818d]">
                  Your authentication information is being processed securely.
                </p>

              </div>

            </div>

            {/* BACKUP LINK */}
            <div className="mt-7 text-center">

              <button
                type="button"
                onClick={() => navigate("/login", { replace: true })}
                className="text-xs font-semibold text-[#006b55] transition hover:text-[#004f40]"
              >
                Return to login
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default OAuth2Callback;