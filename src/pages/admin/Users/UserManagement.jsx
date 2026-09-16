import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // =========================================================
  // FETCH USERS
  // =========================================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Fetch Users Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================================================
  // DISABLE USER
  // =========================================================

  const handleDisable = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to disable this user?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await api.patch(`/api/users/${id}/disable`);

      setMessage("User disabled successfully.");

      await fetchUsers();
    } catch (err) {
      console.error("Disable User Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to disable user"
      );
    }
  };

  // =========================================================
  // ENABLE USER
  // =========================================================

  const handleEnable = async (id) => {
    try {
      setError("");
      setMessage("");

      await api.patch(`/api/users/${id}/enable`);

      setMessage("User enabled successfully.");

      await fetchUsers();
    } catch (err) {
      console.error("Enable User Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to enable user"
      );
    }
  };

  // =========================================================
  // SEARCH + FILTER
  // =========================================================

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.username?.toLowerCase().includes(query) ||
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && user.enabled) ||
        (statusFilter === "DISABLED" && !user.enabled);

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  // =========================================================
  // CLEAR MESSAGES
  // =========================================================

  const clearMessages = () => {
    setError("");
    setMessage("");
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#455565]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#006b55]">
              ADMINISTRATION
            </span>

            <h1 className="mt-2 text-4xl font-bold tracking-[-1.2px] text-[#102333] sm:text-5xl">
              User Management
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#73818d]">
              Manage registered users and control account access.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              clearMessages();
              fetchUsers();
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-white px-7 text-sm font-semibold text-[#006b55] border border-[#d9e5e2] shadow-[0_4px_14px_rgba(16,35,51,0.05)] transition-all hover:border-[#006b55] hover:bg-[#f4faf8]"
          >
            <span className="text-base">↻</span>
            Refresh
          </button>
        </section>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#cce9df] bg-[#effaf6] px-5 py-4 text-sm text-[#08765d]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d8f1e9] font-bold">
              ✓
            </span>

            <span className="font-medium">
              {message}
            </span>
          </div>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#f1cccc] bg-[#fff6f6] px-5 py-4 text-sm text-[#a33838]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fbe0e0] font-bold">
              !
            </span>

            <span className="font-medium">
              {error}
            </span>
          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6f2] text-sm font-bold text-[#006b55]">
                U
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                  Total Users
                </p>

                <p className="mt-1 text-2xl font-bold text-[#102333]">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6f2] text-sm font-bold text-[#16835f]">
                ✓
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                  Active
                </p>

                <p className="mt-1 text-2xl font-bold text-[#102333]">
                  {users.filter((user) => user.enabled).length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4df] text-sm font-bold text-[#c47c00]">
                !
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                  Disabled
                </p>

                <p className="mt-1 text-2xl font-bold text-[#102333]">
                  {users.filter((user) => !user.enabled).length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf1fb] text-sm font-bold text-[#536ba8]">
                A
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                  Admin Accounts
                </p>

                <p className="mt-1 text-2xl font-bold text-[#102333]">
                  {
                    users.filter(
                      (user) => user.role === "ADMIN"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* =================================================
            FILTER / SEARCH
        ================================================= */}

        <section className="mb-7 rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_5px_18px_rgba(16,35,51,0.05)] sm:p-6">

          <div className="mb-5">
            <span className="text-[10px] font-bold tracking-[0.16em] text-[#006b55]">
              USER DIRECTORY
            </span>

            <h2 className="mt-1 text-xl font-bold text-[#102333]">
              Search & Filter
            </h2>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            {/* SEARCH */}

            <div className="relative w-full xl:max-w-[600px]">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#73818d]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setMessage("");
                  setError("");
                }}
                placeholder="Search by username, name, email or role..."
                className="h-12 w-full rounded-lg border border-[#dce7e4] bg-white pl-11 pr-4 text-sm text-[#102333] outline-none transition-all placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-2 focus:ring-[#006b55]/10"
              />
            </div>

            {/* STATUS FILTER */}

            <div className="flex flex-wrap gap-2">
              {[
                ["ALL", "All"],
                ["ACTIVE", "Active"],
                ["DISABLED", "Disabled"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setStatusFilter(value);
                    setMessage("");
                    setError("");
                  }}
                  className={
                    statusFilter === value
                      ? "h-11 rounded-lg bg-[#006b55] px-6 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(0,107,85,0.18)]"
                      : "h-11 rounded-lg border border-[#dce7e4] bg-white px-6 text-sm font-medium text-[#536474] transition-all hover:border-[#006b55] hover:text-[#006b55]"
                  }
                >
                  {label}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-[#73818d]">
            Showing{" "}
            <strong className="font-bold text-[#102333]">
              {filteredUsers.length}
            </strong>{" "}
            user{filteredUsers.length !== 1 ? "s" : ""}
          </p>

          <span className="rounded-full bg-[#e8f6f2] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#006b55]">
            {statusFilter === "ALL"
              ? "All Users"
              : statusFilter === "ACTIVE"
              ? "Active Users"
              : "Disabled Users"}
          </span>
        </div>

        {/* =================================================
            USER TABLE
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.06)]">

          {loading ? (

            <div className="flex min-h-[280px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#dceae7] border-t-[#006b55]" />

                <p className="text-sm text-[#73818d]">
                  Loading users...
                </p>
              </div>
            </div>

          ) : filteredUsers.length === 0 ? (

            <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef7f5] text-xl text-[#006b55]">
                ⌕
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#102333]">
                No users found
              </h3>

              <p className="mt-1 text-sm text-[#73818d]">
                Try changing your search or status filter.
              </p>
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-[1000px] w-full border-collapse">

                <thead>
                  <tr className="border-b border-[#e3ecea] bg-[#f5f9f8]">
                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                      ID
                    </th>

                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                      User
                    </th>

                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                      Role
                    </th>

                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                      Email
                    </th>

                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                      Phone
                    </th>

                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                      Status
                    </th>

                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b border-[#edf2f0] transition-colors last:border-b-0 hover:bg-[#f8fbfa]"
                    >

                      {/* ID */}

                      <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-[#73818d]">
                        #{user.id}
                      </td>

                      {/* USER */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-sm font-bold text-[#006b55]">
                            {(user.name || user.username || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-sm font-bold text-[#102333]">
                              {user.name || "Unnamed user"}
                            </div>

                            <div className="mt-1 truncate text-xs text-[#73818d]">
                              @{user.username}
                            </div>
                          </div>

                        </div>
                      </td>

                      {/* ROLE */}

                      <td className="px-6 py-5">
                        <span
                          className={
                            user.role === "ADMIN"
                              ? "inline-flex rounded-full bg-[#edf1fb] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#536ba8]"
                              : "inline-flex rounded-full bg-[#e8f6f2] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#006b55]"
                          }
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* EMAIL */}

                      <td className="max-w-[220px] px-6 py-5 text-sm text-[#536474]">
                        <span className="block truncate">
                          {user.email || "—"}
                        </span>
                      </td>

                      {/* PHONE */}

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-[#536474]">
                        {user.phone || "—"}
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">
                        <span
                          className={
                            user.enabled
                              ? "inline-flex items-center gap-2 rounded-full bg-[#e5f6ef] px-3 py-1.5 text-[10px] font-bold text-[#16835f]"
                              : "inline-flex items-center gap-2 rounded-full bg-[#fff0f0] px-3 py-1.5 text-[10px] font-bold text-[#c04444]"
                          }
                        >
                          <span
                            className={
                              user.enabled
                                ? "h-1.5 w-1.5 rounded-full bg-[#16835f]"
                                : "h-1.5 w-1.5 rounded-full bg-[#c04444]"
                            }
                          />

                          {user.enabled
                            ? "Active"
                            : "Disabled"}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-5">

                        {user.enabled ? (

                          user.role === "ADMIN" ? (

                            <span
                              title="Admin account is protected"
                              className="inline-flex items-center gap-2 rounded-lg border border-[#dce7e4] bg-[#f6f9f8] px-4 py-2 text-xs font-semibold text-[#73818d]"
                            >
                              <span className="text-[#006b55]">
                                ✓
                              </span>
                              Protected
                            </span>

                          ) : (

                            <button
                              type="button"
                              onClick={() =>
                                handleDisable(user.id)
                              }
                              className="rounded-lg border border-[#efcaca] bg-white px-4 py-2 text-xs font-semibold text-[#c04444] transition-all hover:bg-[#fff5f5] hover:border-[#d95353]"
                            >
                              Disable
                            </button>

                          )

                        ) : (

                          <button
                            type="button"
                            onClick={() =>
                              handleEnable(user.id)
                            }
                            className="rounded-lg bg-[#006b55] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(0,107,85,0.15)] transition-all hover:bg-[#004f40]"
                          >
                            Enable
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>
    </main>
  );
};

export default UserManagement;