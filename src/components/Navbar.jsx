import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const {
    user,
    logout,
    isAdmin,
    isPatient,
    isAuthenticated,
  } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    setProfileOpen(false);
    setManagementOpen(false);
    setMenuOpen(false);

    try {
      await logout();
    } finally {
      navigate("/login", {
        replace: true,
      });
    }
  };

  // =====================================================
  // CLOSE MENUS
  // =====================================================

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    setManagementOpen(false);
  };

  // =====================================================
  // PUBLIC LINKS
  // =====================================================

  const publicLinks = [
    ["/", "Home"],
    ["/about", "About Us"],
    ["/find-doctor", "Doctors"],
    ["/specialities", "Specialities"],
    ["/hospitals", "Hospitals"],
    ["/services", "Services"],
    ["/health-library", "Health Library"],
    ["/contact", "Contact"],
  ];

  // =====================================================
  // PATIENT LINKS
  // =====================================================

  const patientLinks = [
    ["/dashboard", "Dashboard"],
    ["/appointments", "Appointments"],
    ["/medical-records", "Medical Records"],
    ["/bills", "Billing"],
  ];

  // =====================================================
  // ADMIN MAIN LINKS
  // =====================================================

  const adminMainLinks = [
    ["/dashboard", "Dashboard"],
    ["/appointments", "Appointments"],
    ["/medical-records", "Records"],
    ["/bills", "Billing"],
  ];

  // =====================================================
  // ADMIN MANAGEMENT LINKS
  // =====================================================

  const adminManagementLinks = [
    ["/patients", "Patients"],
    ["/doctors", "Doctors"],
    ["/departments", "Departments"],
    ["/hospital-management", "Hospitals"],
    ["/users", "Users"],
  ];

  return (
    <header className="sticky top-0 z-50">

      {/* =====================================================
          TOP UTILITY BAR
          ===================================================== */}

      <div className="border-b border-[#006b55]/30 bg-[#004f40] text-white">
        <div className="mx-auto flex min-h-[38px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* LEFT */}
          <div className="hidden items-center gap-5 sm:flex">

            <a
              href="tel:+9118001234567"
              className="!text-white no-underline transition hover:!text-[#bde9df]"
            >
              ☎ +91 1800 123 4567
            </a>

            <span className="h-4 w-px bg-white/30" />

            <a
              href="mailto:care@medicare.health"
              className="!text-white no-underline transition hover:!text-[#bde9df]"
            >
              ✉ care@medicare.health
            </a>

          </div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-4">

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="whitespace-nowrap !text-white no-underline transition hover:!text-[#bde9df]"
              >
                {isAdmin ? "Admin Portal" : "Patient Portal"}
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap !text-white no-underline transition hover:!text-[#bde9df]"
                >
                  Patient Login
                </Link>

                <span className="h-4 w-px bg-white/30" />

                <Link
                  to="/login"
                  className="whitespace-nowrap !text-white no-underline transition hover:!text-[#bde9df]"
                >
                  Admin Login
                </Link>
              </>
            )}

            <span className="h-4 w-px bg-white/30" />

            <Link
              to="/contact"
              className="hidden whitespace-nowrap !text-white no-underline transition hover:!text-[#bde9df] sm:block"
            >
              Contact Us
            </Link>

          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN NAVBAR
          ===================================================== */}

      <nav className="border-b border-[#e3ecea] bg-white shadow-[0_2px_12px_rgba(16,35,51,0.06)] dark:border-[#29413b] dark:bg-[#12201d]">

        <div className="mx-auto flex min-h-[76px] w-full max-w-[1600px] items-center gap-5 px-5 sm:px-8 lg:px-10">

          {/* =================================================
              ACTUAL MEDICARE LOGO
              ================================================= */}

          <Link
            to="/"
            onClick={closeMenus}
            className="flex shrink-0 items-center no-underline"
          >
            <img
              src="/images/logo/medicare-logo.svg"
              alt="MediCare Healthcare"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <div className="ml-8 hidden min-w-0 flex-1 items-center lg:flex">

            {/* =================================================
                PATIENT NAV
                ================================================= */}

            {isPatient && (
              <nav className="flex items-center gap-1">

                {patientLinks.map(([path, label]) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === "/dashboard"}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap rounded-lg px-3 py-3 text-[13px] font-medium no-underline transition ${
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
                          <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#006b55] dark:bg-[#43c7a5]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}

              </nav>
            )}

            {/* =================================================
                ADMIN NAV
                ================================================= */}

            {isAdmin && (
              <nav className="flex items-center gap-1">

                {adminMainLinks.map(([path, label]) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === "/dashboard"}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap rounded-lg px-3 py-3 text-[13px] font-medium no-underline transition ${
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
                          <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#006b55] dark:bg-[#43c7a5]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}

                {/* MANAGEMENT */}

                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setManagementOpen((value) => !value)
                    }
                    className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-3 text-[13px] font-medium transition ${
                      managementOpen
                        ? "text-[#006b55] dark:text-[#43c7a5]"
                        : "text-[#455565] hover:text-[#006b55] dark:text-[#c7d5d1] dark:hover:text-[#43c7a5]"
                    }`}
                  >
                    Management

                    <span className="text-[11px]">
                      {managementOpen ? "⌃" : "⌄"}
                    </span>
                  </button>

                  {managementOpen && (
                    <div className="absolute left-0 top-full z-[100] mt-1 w-52 overflow-hidden rounded-2xl border border-[#e3ecea] bg-white py-2 shadow-[0_15px_40px_rgba(16,35,51,0.14)] dark:border-[#29413b] dark:bg-[#12201d]">

                      {adminManagementLinks.map(([path, label]) => (
                        <Link
                          key={path}
                          to={path}
                          onClick={() => setManagementOpen(false)}
                          className="block px-4 py-3 text-sm font-medium !text-[#455565] no-underline transition hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                        >
                          {label}
                        </Link>
                      ))}

                    </div>
                  )}

                </div>

              </nav>
            )}

            {/* =================================================
                LOGGED OUT NAV
                ================================================= */}

            {!isAuthenticated && (
              <nav className="flex flex-1 items-center justify-center gap-0.5">

                {publicLinks.map(([path, label]) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === "/"}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap rounded-lg px-3 py-3 text-[13px] font-medium no-underline transition ${
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
                          <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#006b55] dark:bg-[#43c7a5]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}

              </nav>
            )}

          </div>

          {/* =================================================
              RIGHT SIDE ACTIONS
              ================================================= */}

          <div className="ml-auto hidden shrink-0 items-center gap-2.5 lg:flex">

            {/* THEME BUTTON */}

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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dfe9e6] bg-[#f7fafb] text-[16px] transition hover:border-[#006b55] hover:bg-[#e8f6f2] dark:border-[#29413b] dark:bg-[#182a26] dark:hover:border-[#43c7a5] dark:hover:bg-[#163d35]"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* FIND DOCTOR */}

            <Link
              to="/find-doctor"
              className="whitespace-nowrap rounded-xl border border-[#006b55] px-4 py-2.5 text-[13px] font-semibold !text-[#006b55] no-underline transition hover:bg-[#e8f6f2] dark:border-[#43c7a5] dark:!text-[#43c7a5] dark:hover:bg-[#163d35]"
            >
              Find a Doctor
            </Link>

            {/* BOOK APPOINTMENT */}

            <Link
              to={isAuthenticated ? "/appointments" : "/login"}
              className="whitespace-nowrap rounded-xl bg-[#006b55] px-5 py-3 text-[13px] font-semibold !text-white no-underline shadow-[0_5px_15px_rgba(0,107,85,0.16)] transition hover:bg-[#004f40] hover:!text-white dark:bg-[#208c74] dark:hover:bg-[#28a98b]"
            >
              Book Appointment
              <span className="ml-2">→</span>
            </Link>

            {/* PROFILE */}

            {isAuthenticated ? (
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((value) => !value)
                  }
                  className="flex min-w-[145px] items-center gap-2 rounded-xl border border-[#dfe9e6] bg-white px-3 py-2 text-left dark:border-[#29413b] dark:bg-[#182a26]"
                >

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-sm font-bold !text-[#006b55] dark:bg-[#163d35] dark:!text-[#43c7a5]">
                    {(user?.username || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>

                  <span className="min-w-0 flex-1">

                    <span className="block max-w-[90px] truncate text-[13px] font-semibold !text-[#102333] dark:!text-[#f2f8f6]">
                      {user?.username || "Account"}
                    </span>

                    <span className="block text-[10px] uppercase tracking-wide !text-[#73818d] dark:!text-[#91a49f]">
                      {isAdmin ? "Admin" : "Patient"}
                    </span>

                  </span>

                  <span className="text-xs !text-[#73818d] dark:!text-[#91a49f]">
                    {profileOpen ? "⌃" : "⌄"}
                  </span>

                </button>

                {/* PROFILE DROPDOWN */}

                {profileOpen && (
                  <div className="absolute right-0 top-full z-[100] mt-2 w-56 overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_15px_40px_rgba(16,35,51,0.14)] dark:border-[#29413b] dark:bg-[#12201d]">

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
                      className="block px-4 py-3 text-sm font-medium !text-[#455565] no-underline hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/my-profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium !text-[#455565] no-underline hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                    >
                      My Profile
                    </Link>

                    {isPatient && (
                      <Link
                        to="/appointments"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="block px-4 py-3 text-sm font-medium !text-[#455565] no-underline hover:bg-[#f7fafb] hover:!text-[#006b55] dark:!text-[#c7d5d1] dark:hover:bg-[#182a26] dark:hover:!text-[#43c7a5]"
                      >
                        My Appointments
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full border-t border-[#e3ecea] px-4 py-3 text-left text-sm font-semibold !text-red-600 hover:bg-red-50 dark:border-[#29413b] dark:!text-red-400 dark:hover:bg-red-950/30"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (

              <div className="flex items-center gap-1">

                <Link
                  to="/login"
                  className="whitespace-nowrap rounded-xl px-3 py-2 text-[13px] font-semibold !text-[#006b55] no-underline hover:bg-[#e8f6f2] dark:!text-[#43c7a5]"
                >
                  Patient Login
                </Link>

                <Link
                  to="/login"
                  className="whitespace-nowrap rounded-xl border border-[#d5e4e0] px-3 py-2 text-[13px] font-semibold !text-[#455565] no-underline hover:border-[#006b55] hover:!text-[#006b55] dark:border-[#29413b] dark:!text-[#c7d5d1]"
                >
                  Admin Login
                </Link>

              </div>

            )}

          </div>

          {/* =================================================
              MOBILE BUTTONS
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe9e6] bg-[#f7fafb] text-[16px] dark:border-[#29413b] dark:bg-[#182a26]"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* MENU */}

            <button
              type="button"
              onClick={() =>
                setMenuOpen((value) => !value)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe9e6] bg-white text-xl !text-[#102333] dark:border-[#29413b] dark:bg-[#182a26] dark:!text-[#f2f8f6]"
              aria-label="Toggle menu"
            >
              {menuOpen ? "×" : "☰"}
            </button>

          </div>

        </div>

        {/* =====================================================
            MOBILE MENU
            ===================================================== */}

        {menuOpen && (
          <div className="border-t border-[#e3ecea] bg-white px-5 pb-5 pt-3 dark:border-[#29413b] dark:bg-[#12201d] lg:hidden">

            <div className="mx-auto max-w-xl">

              {/* PATIENT */}

              {isPatient &&
                patientLinks.map(([path, label]) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === "/dashboard"}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-medium no-underline ${
                        isActive
                          ? "bg-[#e8f6f2] !text-[#006b55] dark:bg-[#163d35] dark:!text-[#43c7a5]"
                          : "!text-[#455565] dark:!text-[#c7d5d1]"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}

              {/* ADMIN */}

              {isAdmin && (
                <>
                  {adminMainLinks.map(([path, label]) => (
                    <NavLink
                      key={path}
                      to={path}
                      end={path === "/dashboard"}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-sm font-medium no-underline ${
                          isActive
                            ? "bg-[#e8f6f2] !text-[#006b55] dark:bg-[#163d35] dark:!text-[#43c7a5]"
                            : "!text-[#455565] dark:!text-[#c7d5d1]"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}

                  <div className="mt-2 border-t border-[#e3ecea] pt-2 dark:border-[#29413b]">

                    <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] !text-[#73818d] dark:!text-[#91a49f]">
                      Management
                    </p>

                    {adminManagementLinks.map(
                      ([path, label]) => (
                        <NavLink
                          key={path}
                          to={path}
                          onClick={closeMenus}
                          className="block rounded-xl px-4 py-3 text-sm font-medium !text-[#455565] no-underline dark:!text-[#c7d5d1]"
                        >
                          {label}
                        </NavLink>
                      )
                    )}

                  </div>
                </>
              )}

              {/* LOGGED OUT */}

              {!isAuthenticated &&
                publicLinks.map(([path, label]) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === "/"}
                    onClick={closeMenus}
                    className="block rounded-xl px-4 py-3 text-sm font-medium !text-[#455565] no-underline dark:!text-[#c7d5d1]"
                  >
                    {label}
                  </NavLink>
                ))}

              {/* MOBILE ACTIONS */}

              <div className="mt-3 space-y-2 border-t border-[#e3ecea] pt-4 dark:border-[#29413b]">

                <Link
                  to="/find-doctor"
                  onClick={closeMenus}
                  className="block rounded-xl border border-[#006b55] px-4 py-3 text-center text-sm font-semibold !text-[#006b55] no-underline dark:border-[#43c7a5] dark:!text-[#43c7a5]"
                >
                  Find a Doctor
                </Link>

                <Link
                  to={isAuthenticated
                    ? "/appointments"
                    : "/login"}
                  onClick={closeMenus}
                  className="block rounded-xl bg-[#006b55] px-4 py-3 text-center text-sm font-semibold !text-white no-underline dark:bg-[#208c74]"
                >
                  Book Appointment →
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/my-profile"
                      onClick={closeMenus}
                      className="block rounded-xl border border-[#e3ecea] px-4 py-3 text-center text-sm font-semibold !text-[#455565] no-underline dark:border-[#29413b] dark:!text-[#c7d5d1]"
                    >
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold !text-red-600 dark:border-red-900/50 dark:!text-red-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">

                    <Link
                      to="/login"
                      onClick={closeMenus}
                      className="rounded-xl border border-[#e3ecea] px-3 py-3 text-center text-sm font-semibold !text-[#006b55] no-underline dark:border-[#29413b] dark:!text-[#43c7a5]"
                    >
                      Patient Login
                    </Link>

                    <Link
                      to="/login"
                      onClick={closeMenus}
                      className="rounded-xl border border-[#e3ecea] px-3 py-3 text-center text-sm font-semibold !text-[#455565] no-underline dark:border-[#29413b] dark:!text-[#c7d5d1]"
                    >
                      Admin Login
                    </Link>

                  </div>
                )}

              </div>

            </div>
          </div>
        )}

      </nav>
    </header>
  );
};

export default Navbar;