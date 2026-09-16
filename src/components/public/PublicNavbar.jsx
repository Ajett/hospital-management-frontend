import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const links = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/find-doctor", "Doctors"],
  ["/specialities", "Specialities"],
  ["/hospitals", "Hospitals"],
  ["/services", "Services"],
  ["/health-library", "Health Library"],
  ["/contact", "Contact"],
];

function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const {
    user,
    logout,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const close = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    setOpen(false);

    await logout();
  };

  return (
    <>
      {/* =====================================================
          TOP UTILITY BAR
          THIS BAR SCROLLS AWAY
          ===================================================== */}

      <div className="medicare-topbar w-full bg-[#004f40] !text-white">
        <div className="mx-auto flex min-h-[38px] w-full items-center justify-between px-5 text-[12px] sm:px-8 lg:px-10">

          {/* LEFT */}

          <div className="hidden items-center gap-5 sm:flex">

            <a
              href="tel:+9118001234567"
              className="whitespace-nowrap !text-white no-underline transition hover:!text-[#bde9df]"
            >
              ☎ +91 1800 123 4567
            </a>

            <span className="h-4 w-px bg-white/30" />

            <a
              href="mailto:care@medicare.health"
              className="whitespace-nowrap !text-white no-underline transition hover:!text-[#bde9df]"
            >
              ✉ care@medicare.health
            </a>

          </div>

          {/* RIGHT */}

          <div className="ml-auto flex items-center gap-3 sm:gap-4">

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="whitespace-nowrap font-medium !text-white no-underline transition hover:!text-[#bde9df]"
              >
                {isAdmin
                  ? "Admin Portal"
                  : "Patient Portal"}
              </Link>
            ) : null}

            {isAuthenticated && (
              <span className="hidden h-4 w-px bg-white/30 sm:block" />
            )}

            <Link
              to="/contact"
              className="whitespace-nowrap font-medium !text-white no-underline transition hover:!text-[#bde9df]"
            >
              Contact Us
            </Link>

          </div>
        </div>
      </div>


      {/* =====================================================
          MAIN NAVBAR
          STAYS FIXED/STICKY WHILE PAGE SCROLLS
          ===================================================== */}

      <header className="medicare-public-navbar sticky top-0 z-[1000] w-full border-b border-[#e3ecea] bg-white shadow-[0_2px_12px_rgba(16,35,51,0.06)] dark:border-[#29413b] dark:bg-[#12201d]">

        <div className="mx-auto flex min-h-[76px] w-full items-center gap-4 px-5 sm:px-8 lg:px-8 xl:px-10">

          {/* =================================================
              LOGO
              ================================================= */}

          <Link
            to="/"
            onClick={close}
            className="flex shrink-0 items-center gap-3 !text-[#102333] no-underline dark:!text-[#f2f8f6]"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#006b55] text-[24px] font-light !text-white shadow-[0_4px_12px_rgba(0,107,85,0.15)]">
              +
            </div>

            <div className="leading-none">

              <div className="text-[21px] font-bold tracking-[-0.5px] !text-[#102333] dark:!text-[#f2f8f6]">
                Medi
                <span className="!text-[#006b55] dark:!text-[#43c7a5]">
                  Care
                </span>
              </div>

              <div className="mt-1 text-[8px] font-bold tracking-[0.24em] !text-[#73818d] dark:!text-[#91a49f]">
                HEALTHCARE
              </div>

            </div>

          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">

            {links.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `relative whitespace-nowrap rounded-lg px-2.5 py-3 text-[13px] font-medium no-underline transition xl:px-3 ${
                    isActive
                      ? "!text-[#006b55] dark:!text-[#43c7a5]"
                      : "!text-[#455565] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:!text-[#43c7a5]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}

                    {isActive && (
                      <span className="absolute -bottom-[8px] left-2.5 right-2.5 h-[2px] rounded-full bg-[#006b55] dark:bg-[#43c7a5]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </nav>


          {/* =================================================
              DESKTOP ACTIONS
              ================================================= */}

          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-2.5">

            {/* THEME */}

            <button
              type="button"
              onClick={toggleTheme}
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#dfe9e6] bg-[#f7fafb] text-[16px] transition hover:border-[#006b55] hover:bg-[#e8f6f2] dark:border-[#29413b] dark:bg-[#182a26] dark:hover:border-[#43c7a5] dark:hover:bg-[#163d35]"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>


            {/* FIND DOCTOR */}

            <Link
              to="/find-doctor"
              onClick={close}
              className="whitespace-nowrap rounded-xl border border-[#d5e4e0] px-3.5 py-2.5 text-[13px] font-semibold !text-[#006b55] no-underline transition hover:border-[#006b55] hover:bg-[#e8f6f2] dark:border-[#43c7a5] dark:!text-[#43c7a5] dark:hover:bg-[#163d35]"
            >
              Find a Doctor
            </Link>


            {/* BOOK APPOINTMENT */}

            <Link
              to={
                isAuthenticated
                  ? "/appointments"
                  : "/login"
              }
              onClick={close}
              className="whitespace-nowrap rounded-xl bg-[#006b55] px-4 py-3 text-[13px] font-semibold !text-white no-underline shadow-[0_5px_15px_rgba(0,107,85,0.16)] transition hover:bg-[#004f40] hover:!text-white dark:bg-[#208c74] dark:hover:bg-[#28a98b]"
            >
              Book Appointment
              <span className="ml-1.5">→</span>
            </Link>


            {/* =================================================
                AUTHENTICATED PROFILE
                ================================================= */}

            {isAuthenticated ? (

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((value) => !value)
                  }
                  className="flex min-w-[135px] items-center gap-2 rounded-xl border border-[#dfe9e6] bg-white px-2.5 py-2 text-left dark:border-[#29413b] dark:bg-[#182a26]"
                >

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-sm font-bold !text-[#006b55] dark:bg-[#163d35] dark:!text-[#43c7a5]">
                    {(user?.username || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>

                  <span className="min-w-0 flex-1">

                    <span className="block max-w-[82px] truncate text-[13px] font-semibold !text-[#102333] dark:!text-[#f2f8f6]">
                      {user?.username || "Account"}
                    </span>

                    <span className="block text-[9px] uppercase tracking-wide !text-[#73818d] dark:!text-[#91a49f]">
                      {isAdmin ? "Admin" : "Patient"}
                    </span>

                  </span>

                  <span className="text-xs !text-[#73818d] dark:!text-[#91a49f]">
                    {profileOpen ? "⌃" : "⌄"}
                  </span>

                </button>


                {/* PROFILE DROPDOWN */}

                {profileOpen && (

                  <div className="absolute right-0 top-full z-[1100] mt-2 w-56 overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_15px_40px_rgba(16,35,51,0.14)] dark:border-[#29413b] dark:bg-[#12201d]">

                    <div className="border-b border-[#e3ecea] px-4 py-4 dark:border-[#29413b]">

                      <p className="text-sm font-bold !text-[#102333] dark:!text-[#f2f8f6]">
                        {user?.username || "Account"}
                      </p>

                      <p className="mt-1 text-xs !text-[#73818d] dark:!text-[#91a49f]">
                        {isAdmin
                          ? "Administrator"
                          : "Patient Account"}
                      </p>

                    </div>


                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium !text-[#455565] no-underline transition hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                    >
                      Dashboard
                    </Link>


                    <Link
                      to="/my-profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium !text-[#455565] no-underline transition hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                    >
                      My Profile
                    </Link>


                    {!isAdmin && (
                      <Link
                        to="/appointments"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 text-sm font-medium !text-[#455565] no-underline transition hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                      >
                        My Appointments
                      </Link>
                    )}


                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full border-t border-[#e3ecea] px-4 py-3 text-left text-sm font-semibold !text-red-600 transition hover:bg-red-50 dark:border-[#29413b] dark:!text-red-400 dark:hover:bg-red-950/30"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>

            ) : (

              /* =================================================
                 LOGGED OUT → ONLY ONE SIGN IN
                 ================================================= */

              <Link
                to="/login"
                onClick={close}
                className="whitespace-nowrap rounded-xl px-3 py-2.5 text-[13px] font-semibold !text-[#006b55] no-underline transition hover:bg-[#e8f6f2] hover:!text-[#004f40] dark:!text-[#43c7a5] dark:hover:bg-[#163d35]"
              >
                Sign In
              </Link>

            )}

          </div>


          {/* =================================================
              MOBILE ACTIONS
              ================================================= */}

          <div className="ml-auto flex items-center gap-2 lg:hidden">

            {/* THEME */}

            <button
              type="button"
              onClick={toggleTheme}
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe9e6] bg-[#f7fafb] text-[16px] dark:border-[#29413b] dark:bg-[#182a26]"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>


            {/* MENU */}

            <button
              type="button"
              onClick={() =>
                setOpen((value) => !value)
              }
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe9e6] bg-white text-xl !text-[#102333] dark:border-[#29413b] dark:bg-[#182a26] dark:!text-[#f2f8f6]"
            >
              {open ? "×" : "☰"}
            </button>

          </div>

        </div>


        {/* =====================================================
            MOBILE MENU
            ===================================================== */}

        {open && (

          <div className="border-t border-[#e3ecea] bg-white px-5 pb-5 pt-3 dark:border-[#29413b] dark:bg-[#12201d] lg:hidden">

            <nav className="mx-auto max-w-xl">

              {/* PUBLIC LINKS */}

              {links.map(([path, label]) => (

                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  onClick={close}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium no-underline transition ${
                      isActive
                        ? "bg-[#e8f6f2] !text-[#006b55] dark:bg-[#163d35] dark:!text-[#43c7a5]"
                        : "!text-[#455565] hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                    }`
                  }
                >
                  {label}
                </NavLink>

              ))}


              {/* ACTIONS */}

              <div className="mt-3 space-y-2 border-t border-[#e3ecea] pt-4 dark:border-[#29413b]">

                {/* FIND DOCTOR */}

                <Link
                  to="/find-doctor"
                  onClick={close}
                  className="block rounded-xl border border-[#006b55] px-4 py-3 text-center text-sm font-semibold !text-[#006b55] no-underline dark:border-[#43c7a5] dark:!text-[#43c7a5]"
                >
                  Find a Doctor
                </Link>


                {/* BOOK APPOINTMENT */}

                <Link
                  to={
                    isAuthenticated
                      ? "/appointments"
                      : "/login"
                  }
                  onClick={close}
                  className="block rounded-xl bg-[#006b55] px-4 py-3 text-center text-sm font-semibold !text-white no-underline dark:bg-[#208c74]"
                >
                  Book Appointment →
                </Link>


                {/* AUTH */}

                {isAuthenticated ? (

                  <>

                    <Link
                      to="/dashboard"
                      onClick={close}
                      className="block rounded-xl border border-[#e3ecea] px-4 py-3 text-center text-sm font-semibold !text-[#455565] no-underline dark:border-[#29413b] dark:!text-[#c7d5d1]"
                    >
                      {isAdmin
                        ? "Admin Dashboard"
                        : "Patient Dashboard"}
                    </Link>


                    <Link
                      to="/my-profile"
                      onClick={close}
                      className="block rounded-xl border border-[#e3ecea] px-4 py-3 text-center text-sm font-semibold !text-[#455565] no-underline dark:border-[#29413b] dark:!text-[#c7d5d1]"
                    >
                      My Profile
                    </Link>


                    {!isAdmin && (
                      <Link
                        to="/appointments"
                        onClick={close}
                        className="block rounded-xl border border-[#e3ecea] px-4 py-3 text-center text-sm font-semibold !text-[#455565] no-underline dark:border-[#29413b] dark:!text-[#c7d5d1]"
                      >
                        My Appointments
                      </Link>
                    )}


                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold !text-red-600 dark:border-red-900/50 dark:!text-red-400"
                    >
                      Logout
                    </button>

                  </>

                ) : (

                  /* ONLY SIGN IN */

                  <Link
                    to="/login"
                    onClick={close}
                    className="block rounded-xl border border-[#006b55] bg-[#e8f6f2] px-4 py-3 text-center text-sm font-semibold !text-[#006b55] no-underline dark:border-[#43c7a5] dark:bg-[#163d35] dark:!text-[#43c7a5]"
                  >
                    Sign In
                  </Link>

                )}

              </div>

            </nav>

          </div>

        )}

      </header>
    </>
  );
}

export default PublicNavbar;