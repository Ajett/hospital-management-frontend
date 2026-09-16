import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";

function HospitalManagement() {
  const emptyForm = {
    name: "",
    location: "",
    address: "",
    phone: "",
  };

  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/hospitals");
      setHospitals(response.data || []);
    } catch (err) {
      console.error("Failed to load hospitals:", err);
      setError(
        err.response?.data?.message || "Unable to load hospitals."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = useMemo(() => {
    if (statusFilter === "ACTIVE") {
      return hospitals.filter((hospital) => hospital.active);
    }

    if (statusFilter === "INACTIVE") {
      return hospitals.filter((hospital) => !hospital.active);
    }

    return hospitals;
  }, [hospitals, statusFilter]);

  const activeCount = hospitals.filter(
    (hospital) => hospital.active
  ).length;

  const inactiveCount = hospitals.filter(
    (hospital) => !hospital.active
  ).length;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
  };

  const openCreateForm = () => {
    resetForm();
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Hospital name is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Address is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(
          `/api/hospitals/${editingId}`,
          formData
        );

        setSuccess("Hospital updated successfully.");
      } else {
        await api.post("/api/hospitals", formData);

        setSuccess("Hospital created successfully.");
      }

      resetForm();
      setShowForm(false);

      await loadHospitals();
    } catch (err) {
      console.error("Failed to save hospital:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save hospital."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (hospital) => {
    setEditingId(hospital.id);

    setFormData({
      name: hospital.name || "",
      location: hospital.location || "",
      address: hospital.address || "",
      phone: hospital.phone || "",
    });

    setShowForm(true);
    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this hospital?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/api/hospitals/${id}`);

      setSuccess("Hospital deactivated successfully.");

      if (editingId === id) {
        resetForm();
      }

      await loadHospitals();
    } catch (err) {
      console.error("Failed to deactivate hospital:", err);

      setError(
        err.response?.data?.message ||
          "Unable to deactivate hospital."
      );
    }
  };

  const handleRestore = async (id) => {
    try {
      setError("");
      setSuccess("");

      await api.patch(
        `/api/hospitals/${id}/restore`
      );

      setSuccess("Hospital restored successfully.");

      await loadHospitals();
    } catch (err) {
      console.error("Failed to restore hospital:", err);

      setError(
        err.response?.data?.message ||
          "Unable to restore hospital."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#102333]">
      {/* PAGE HEADER */}
      <section className="border-b border-[#e3ecea] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#006b55]">
                <span className="h-2 w-2 rounded-full bg-[#006b55]" />
                MEDICARE · ADMINISTRATION
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Hospital{" "}
                <span className="font-serif italic font-normal text-[#006b55]">
                  management.
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#73818d] sm:text-base">
                Create and manage hospitals available across
                the MediCare healthcare network.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* COUNT */}
              <div className="rounded-2xl border border-[#e3ecea] bg-[#f7fafb] px-5 py-4">
                <p className="text-[10px] font-bold tracking-[0.16em] text-[#73818d]">
                  TOTAL HOSPITALS
                </p>

                <div className="mt-1 flex items-end gap-3">
                  <strong className="text-3xl font-bold text-[#102333]">
                    {hospitals.length}
                  </strong>

                  <span className="pb-1 text-xs text-[#73818d]">
                    {activeCount} active · {inactiveCount} inactive
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={openCreateForm}
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#006b55] px-6 text-sm font-bold text-white shadow-[0_8px_22px_rgba(0,107,85,0.22)] transition hover:bg-[#004f40] active:scale-[0.99]"
              >
                + Create Hospital
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ALERTS */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="font-bold">!</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span className="font-bold">✓</span>
            <span>{success}</span>
          </div>
        )}

        {/* CREATE / EDIT FORM */}
        {showForm && (
          <section className="mb-8 overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_10px_30px_rgba(16,35,51,0.07)]">
            <div className="flex flex-col gap-4 border-b border-[#e3ecea] bg-[#f7fafb] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#006b55]">
                  {editingId ? "EDIT HOSPITAL" : "NEW HOSPITAL"}
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#102333]">
                  {editingId
                    ? "Update hospital"
                    : "Create hospital"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="self-start rounded-lg border border-[#d7e4e1] bg-white px-4 py-2 text-sm font-semibold text-[#455565] transition hover:bg-[#e8f6f2] sm:self-auto"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7"
            >
              {/* NAME */}
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wide text-[#455565]">
                  HOSPITAL NAME
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                  className="h-12 w-full rounded-xl border border-[#dce8e5] bg-white px-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wide text-[#455565]">
                  LOCATION
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter city / location"
                  className="h-12 w-full rounded-xl border border-[#dce8e5] bg-white px-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                />
              </div>

              {/* ADDRESS */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs font-bold tracking-wide text-[#455565]">
                  ADDRESS
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  className="h-12 w-full rounded-xl border border-[#dce8e5] bg-white px-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wide text-[#455565]">
                  PHONE
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="h-12 w-full rounded-xl border border-[#dce8e5] bg-white px-4 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                />
              </div>

              {/* ACTION */}
              <div className="flex items-end justify-start sm:justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="h-12 w-full rounded-xl bg-[#006b55] px-7 text-sm font-bold text-white shadow-[0_7px_18px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Hospital"
                    : "Create Hospital"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* LIST HEADER */}
        <section>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#006b55]">
                HEALTHCARE NETWORK
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Existing{" "}
                <span className="font-serif italic font-normal text-[#006b55]">
                  hospitals.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm text-[#73818d]">
              Manage active and inactive hospitals across
              the MediCare system.
            </p>
          </div>

          {/* FILTERS */}
          <div className="mb-5 flex flex-wrap gap-2">
            {[
              ["ALL", "All", hospitals.length],
              ["ACTIVE", "Active", activeCount],
              ["INACTIVE", "Inactive", inactiveCount],
            ].map(([value, label, count]) => {
              const active = statusFilter === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#006b55] text-white shadow-sm"
                      : "border border-[#dce8e5] bg-white text-[#455565] hover:border-[#9bcfc3] hover:bg-[#e8f6f2]"
                  }`}
                >
                  {label}

                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-[#f1f6f5] text-[#73818d]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="rounded-2xl border border-[#e3ecea] bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[#dff3ee] border-t-[#006b55]" />

              <p className="text-sm font-semibold text-[#455565]">
                Loading hospitals...
              </p>
            </div>
          ) : filteredHospitals.length === 0 ? (
            /* EMPTY */
            <div className="rounded-2xl border border-dashed border-[#cdded9] bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                01
              </div>

              <h3 className="text-lg font-bold text-[#102333]">
                No hospitals found.
              </h3>

              <p className="mt-1 text-sm text-[#73818d]">
                There are no hospitals matching the selected
                status.
              </p>
            </div>
          ) : (
            /* TABLE */
            <div className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_8px_26px_rgba(16,35,51,0.06)]">
              {/* DESKTOP HEADER */}
              <div className="hidden grid-cols-[1.4fr_1fr_1.8fr_0.8fr_1.2fr] gap-4 border-b border-[#e3ecea] bg-[#f7fafb] px-5 py-4 text-[10px] font-bold tracking-[0.12em] text-[#73818d] lg:grid">
                <span>HOSPITAL</span>
                <span>LOCATION</span>
                <span>ADDRESS</span>
                <span>STATUS</span>
                <span>ACTIONS</span>
              </div>

              {filteredHospitals.map((hospital, index) => (
                <div
                  key={hospital.id}
                  className="border-b border-[#edf2f1] p-5 last:border-b-0 hover:bg-[#fbfdfd]"
                >
                  {/* DESKTOP */}
                  <div className="hidden grid-cols-[1.4fr_1fr_1.8fr_0.8fr_1.2fr] items-center gap-4 lg:grid">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#a0adb5]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#102333]">
                            {hospital.name}
                          </p>

                          {hospital.phone && (
                            <p className="mt-1 text-xs text-[#73818d]">
                              {hospital.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-[#455565]">
                      {hospital.location || "—"}
                    </div>

                    <div className="text-sm leading-5 text-[#455565]">
                      {hospital.address || "—"}
                    </div>

                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          hospital.active
                            ? "bg-[#e8f6f2] text-[#006b55]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {hospital.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(hospital)}
                        className="rounded-lg border border-[#dce8e5] bg-white px-3 py-2 text-xs font-bold text-[#455565] transition hover:border-[#9bcfc3] hover:bg-[#e8f6f2] hover:text-[#006b55]"
                      >
                        Edit
                      </button>

                      {hospital.active ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleDeactivate(hospital.id)
                          }
                          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleRestore(hospital.id)
                          }
                          className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </div>

                  {/* MOBILE / TABLET CARD */}
                  <div className="lg:hidden">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-1 text-xs font-bold text-[#a0adb5]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-[#102333]">
                            {hospital.name}
                          </h3>

                          {hospital.phone && (
                            <p className="mt-1 text-xs text-[#73818d]">
                              {hospital.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                          hospital.active
                            ? "bg-[#e8f6f2] text-[#006b55]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {hospital.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-bold tracking-wide text-[#73818d]">
                          LOCATION
                        </p>
                        <p className="mt-1 text-sm text-[#455565]">
                          {hospital.location || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold tracking-wide text-[#73818d]">
                          ADDRESS
                        </p>
                        <p className="mt-1 text-sm leading-5 text-[#455565]">
                          {hospital.address || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(hospital)}
                        className="rounded-lg border border-[#dce8e5] bg-white px-4 py-2 text-xs font-bold text-[#455565] hover:bg-[#e8f6f2] hover:text-[#006b55]"
                      >
                        Edit
                      </button>

                      {hospital.active ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleDeactivate(hospital.id)
                          }
                          className="rounded-lg border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleRestore(hospital.id)
                          }
                          className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER NOTE */}
        <div className="mt-6 flex items-center gap-2 text-xs text-[#8a969e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#006b55]" />
          Hospital information is managed securely by MediCare
          administration.
        </div>
      </div>
    </main>
  );
}

export default HospitalManagement;