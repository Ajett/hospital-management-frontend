import { useEffect, useState } from "react";
import api from "../../../services/api";

function Departments() {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  // =========================================================
  // GET DEPARTMENTS
  // =========================================================

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/departments/all"
      );

      setDepartments(response.data || []);
    } catch (error) {
      console.error(
        "Departments Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load departments"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchDepartments();
  }, []);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingId) {
        await api.put(
          `/api/departments/${editingId}`,
          formData
        );
      } else {
        await api.post(
          "/api/departments",
          formData
        );
      }

      setMessage(
        editingId
          ? "Department updated successfully!"
          : "Department created successfully!"
      );

      setFormData({
        name: "",
        location: "",
      });

      setShowForm(false);
      setEditingId(null);

      await fetchDepartments();
    } catch (error) {
      console.error(
        "Department Save Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to save department"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (department) => {
    setFormData({
      name: department.name || "",
      location: department.location || "",
    });

    setEditingId(department.id);
    setShowForm(true);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DEACTIVATE
  // =========================================================

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this department?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await api.delete(
        `/api/departments/${id}`
      );

      setMessage(
        "Department deactivated successfully."
      );

      await fetchDepartments();
    } catch (error) {
      console.error(
        "Deactivate Department Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to deactivate department"
      );
    }
  };

  // =========================================================
  // RESTORE
  // =========================================================

  const handleRestore = async (id) => {
    try {
      setError("");
      setMessage("");

      await api.patch(
        `/api/departments/${id}/restore`
      );

      setMessage(
        "Department restored successfully."
      );

      await fetchDepartments();
    } catch (error) {
      console.error(
        "Restore Department Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to restore department"
      );
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
    });

    setShowForm(false);
    setEditingId(null);
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredDepartments =
    departments.filter((department) => {
      if (statusFilter === "ACTIVE") {
        return department.active;
      }

      if (statusFilter === "INACTIVE") {
        return !department.active;
      }

      return true;
    });

  const activeDepartments =
    departments.filter(
      (department) => department.active
    ).length;

  const inactiveDepartments =
    departments.length - activeDepartments;

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
              MEDICARE HEALTHCARE PORTAL
            </span>

            <h1 className="mt-2 text-4xl font-bold tracking-[-1px] text-[#102333]">
              Departments
            </h1>

            <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#73818d]">
              Manage hospital departments and
              their locations from one central place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() => {
                setShowForm((value) => !value);
                setMessage("");
                setError("");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white shadow-[0_7px_20px_rgba(0,107,85,0.18)] transition-all hover:bg-[#004f40] hover:shadow-[0_10px_25px_rgba(0,107,85,0.24)]"
            >
              <span className="text-lg leading-none">
                {showForm ? "×" : "+"}
              </span>

              {showForm
                ? "Close Form"
                : "Create Department"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMessage("");
                setError("");
                fetchDepartments();
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-[#cddfd9] bg-white px-5 py-3 text-xs font-bold text-[#006b55] transition-all hover:border-[#006b55] hover:bg-[#eef8f5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-base">
                ↻
              </span>

              Refresh
            </button>

          </div>
        </section>

        {/* =================================================
            ALERTS
        ================================================= */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#cce8dc] bg-[#f0faf6] p-4 text-[#176d50]">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d9f2e8] font-bold">
              ✓
            </div>

            <div>
              <strong className="block text-sm">
                Success
              </strong>

              <p className="mt-1 text-xs">
                {message}
              </p>
            </div>

          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#f1cccc] bg-[#fff6f6] p-4 text-[#a33333]">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fbe1e1] font-bold">
              !
            </div>

            <div>
              <strong className="block text-sm">
                Unable to complete request
              </strong>

              <p className="mt-1 text-xs">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg text-[#006b55]">
                ▦
              </div>

              <div>
                <span className="block text-[10px] text-[#73818d]">
                  Total Departments
                </span>

                <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                  {departments.length}
                </strong>
              </div>

            </div>
          </div>

          {/* ACTIVE */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7ef] text-lg text-[#16835f]">
                ✓
              </div>

              <div>
                <span className="block text-[10px] text-[#73818d]">
                  Active Departments
                </span>

                <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                  {activeDepartments}
                </strong>
              </div>

            </div>
          </div>

          {/* INACTIVE */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff4e7] text-lg text-[#c47a20]">
                !
              </div>

              <div>
                <span className="block text-[10px] text-[#73818d]">
                  Inactive Departments
                </span>

                <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                  {inactiveDepartments}
                </strong>
              </div>

            </div>
          </div>

          {/* DIRECTORY */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0eefb] text-lg text-[#6d62a8]">
                ⌂
              </div>

              <div>
                <span className="block text-[10px] text-[#73818d]">
                  Directory Status
                </span>

                <strong className="mt-1 block text-xl font-bold text-[#102333]">
                  Available
                </strong>
              </div>

            </div>
          </div>

        </section>

        {/* =================================================
            CREATE / EDIT FORM
        ================================================= */}

        {showForm && (
          <section className="mb-6 overflow-hidden rounded-2xl border border-[#d9e8e3] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.06)]">

            <div className="flex items-center justify-between gap-4 border-b border-[#e3ecea] bg-[#f5faf8] px-6 py-5">

              <div>
                <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                  DEPARTMENT MANAGEMENT
                </span>

                <h2 className="mt-1 text-xl font-bold text-[#102333]">
                  {editingId
                    ? "Edit Department"
                    : "Create New Department"}
                </h2>

                <p className="mt-1 text-xs text-[#73818d]">
                  Add department information to
                  the hospital directory.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#006b55] text-lg text-white">
                +
              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="grid gap-5 md:grid-cols-2">

                {/* NAME */}

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Department Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Cardiology"
                    value={formData.name}
                    onChange={handleChange}
                    minLength="3"
                    maxLength="100"
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />

                  <small className="mt-2 block text-[10px] text-[#8a979f]">
                    Enter the official hospital
                    department name.
                  </small>
                </div>

                {/* LOCATION */}

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Department Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. First Floor"
                    value={formData.location}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="100"
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />

                  <small className="mt-2 block text-[10px] text-[#8a979f]">
                    Enter the floor, wing or building
                    location.
                  </small>
                </div>

              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-[#edf2f0] pt-5">

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "✓ Update Department"
                    : "✓ Create Department"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border border-[#dce8e4] bg-white px-5 py-3 text-xs font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55] disabled:opacity-50"
                >
                  Cancel
                </button>

              </div>

            </form>
          </section>
        )}

        {/* =================================================
            DEPARTMENT DIRECTORY
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_6px_20px_rgba(16,35,51,0.05)]">

          {/* HEADER */}

          <div className="flex flex-col gap-5 border-b border-[#e3ecea] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                HOSPITAL DIRECTORY
              </span>

              <h2 className="mt-1 text-xl font-bold text-[#102333]">
                Department Directory
              </h2>

              <p className="mt-1 text-xs text-[#73818d]">
                View registered hospital departments
                and their locations.
              </p>
            </div>

            {/* FILTER */}

            <div className="flex flex-wrap gap-2">

              {[
                "ALL",
                "ACTIVE",
                "INACTIVE",
              ].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setStatusFilter(filter)
                  }
                  className={`rounded-lg px-4 py-2 text-[10px] font-semibold transition-all ${
                    statusFilter === filter
                      ? "bg-[#006b55] text-white shadow-sm"
                      : "border border-[#dce8e4] bg-white text-[#596a78] hover:border-[#006b55] hover:text-[#006b55]"
                  }`}
                >
                  {filter === "ALL"
                    ? "All"
                    : filter === "ACTIVE"
                    ? "Active"
                    : "Inactive"}
                </button>
              ))}

            </div>
          </div>

          {/* RECORD COUNT */}

          <div className="flex items-center justify-between border-b border-[#edf2f0] bg-[#fbfdfc] px-6 py-3">

            <span className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
              SHOWING DEPARTMENTS
            </span>

            <span className="rounded-lg bg-[#e8f6f2] px-3 py-1.5 text-[10px] font-bold text-[#006b55]">
              {filteredDepartments.length}
            </span>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12">

              <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#dceee9] border-t-[#006b55]" />

              <h3 className="mt-5 text-sm font-bold text-[#102333]">
                Loading departments
              </h3>

              <p className="mt-1 text-xs text-[#73818d]">
                Please wait while the department
                directory is being loaded.
              </p>

            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            filteredDepartments.length === 0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-xl text-[#006b55]">
                  ▦
                </div>

                <h3 className="mt-5 text-base font-bold text-[#102333]">
                  No departments found
                </h3>

                <p className="mt-2 max-w-[450px] text-xs leading-5 text-[#73818d]">
                  There are currently no departments
                  registered in the hospital directory.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(true);
                    setMessage("");
                    setError("");
                  }}
                  className="mt-5 rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white hover:bg-[#004f40]"
                >
                  + Create Department
                </button>

              </div>
            )}

          {/* TABLE */}

          {!loading &&
            filteredDepartments.length > 0 && (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px] border-collapse">

                  <thead>
                    <tr className="bg-[#f7faf9] text-left">

                      <th className="px-6 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        DEPARTMENT
                      </th>

                      <th className="px-6 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        LOCATION
                      </th>

                      <th className="px-6 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        STATUS
                      </th>

                      <th className="px-6 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        ACTIONS
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {filteredDepartments.map(
                      (department) => (
                        <tr
                          key={department.id}
                          className="border-t border-[#edf2f0] transition-colors hover:bg-[#fbfdfc]"
                        >

                          {/* DEPARTMENT */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-xs font-bold text-[#006b55]">
                                {department.name
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  "D"}
                              </div>

                              <div>
                                <strong className="block text-xs font-semibold text-[#102333]">
                                  {department.name}
                                </strong>

                                <span className="mt-1 block text-[9px] text-[#73818d]">
                                  Department ID #
                                  {department.id}
                                </span>
                              </div>

                            </div>
                          </td>

                          {/* LOCATION */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2 text-xs text-[#455565]">

                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f7f6] text-[#006b55]">
                                ⌖
                              </span>

                              <span>
                                {department.location}
                              </span>

                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold ${
                                department.active
                                  ? "bg-[#e8f7ef] text-[#16835f]"
                                  : "bg-[#fff0f0] text-[#c13f3f]"
                              }`}
                            >
                              <i
                                className={`h-1.5 w-1.5 rounded-full ${
                                  department.active
                                    ? "bg-[#16835f]"
                                    : "bg-[#c13f3f]"
                                }`}
                              />

                              {department.active
                                ? "Active"
                                : "Inactive"}
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-4">

                            <div className="flex flex-wrap gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    department
                                  )
                                }
                                className="rounded-lg border border-[#cfe1dc] bg-white px-3 py-2 text-[9px] font-bold text-[#006b55] transition-colors hover:bg-[#e8f6f2]"
                              >
                                Edit
                              </button>

                              {department.active ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeactivate(
                                      department.id
                                    )
                                  }
                                  className="rounded-lg border border-[#f0d2d2] bg-white px-3 py-2 text-[9px] font-bold text-[#c13f3f] transition-colors hover:bg-[#fff4f4]"
                                >
                                  Deactivate
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRestore(
                                      department.id
                                    )
                                  }
                                  className="rounded-lg border border-[#cfe1dc] bg-white px-3 py-2 text-[9px] font-bold text-[#16835f] transition-colors hover:bg-[#effaf5]"
                                >
                                  Restore
                                </button>
                              )}

                            </div>
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>
              </div>
            )}

        </section>

        {/* =================================================
            SECURITY
        ================================================= */}

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#d9e9e4] bg-[#eef8f5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#006b55] text-white">
              🔒
            </div>

            <div>
              <strong className="block text-xs font-bold text-[#102333]">
                Hospital department information is secure
              </strong>

              <p className="mt-1 text-[10px] leading-5 text-[#73818d]">
                Department records are accessible only
                through authenticated hospital management
                system access.
              </p>
            </div>

          </div>

          <span className="text-[9px] font-bold tracking-[0.12em] text-[#16835f]">
            SECURE
          </span>

        </div>

      </div>
    </main>
  );
}

export default Departments;