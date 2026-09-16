import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [searchSpecialization, setSearchSpecialization] =
    useState("");

  const [isSearching, setIsSearching] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    departmentId: "",
    hospitalId: "",
  });

  // =========================================================
  // FETCH DOCTORS
  // =========================================================

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/doctors/all");

      setDoctors(response.data || []);
      setStatusFilter("ALL");
      setIsSearching(false);
      setPage(0);
      setTotalPages(0);
    } catch (error) {
      console.error("Doctors Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load doctors"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH DEPARTMENTS
  // =========================================================

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/api/departments");

      setDepartments(response.data || []);
    } catch (error) {
      console.error("Departments Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load departments"
      );
    }
  };

  // =========================================================
  // FETCH HOSPITALS
  // =========================================================

  const fetchHospitals = async () => {
    try {
      const response = await api.get("/api/hospitals");

      setHospitals(response.data || []);
    } catch (error) {
      console.error("Hospitals Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load hospitals"
      );
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const searchDoctors = async (pageNumber = 0) => {
    if (!searchSpecialization.trim()) {
      await fetchDoctors();
      return;
    }

    try {
      setIsSearchLoading(true);
      setError("");
      setIsSearching(true);

      const response = await api.get(
        "/api/doctors/search",
        {
          params: {
            specialization:
              searchSpecialization.trim(),
            page: pageNumber,
            size,
            sortBy: "name",
            direction: "asc",
          },
        }
      );

      setDoctors(response.data.content || []);
      setPage(response.data.number || 0);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error(
        "Doctor Search Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to search doctors"
      );
    } finally {
      setIsSearchLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
    fetchHospitals();
  }, []);

  // =========================================================
  // FORM
  // =========================================================

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      phone: "",
      departmentId: "",
      hospitalId: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    resetForm();

    setError("");
    setMessage("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // ADD / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const requestData = {
        name: formData.name.trim(),
        specialization:
          formData.specialization.trim(),
        phone: formData.phone.trim(),
        departmentId: Number(formData.departmentId),
        hospitalId: Number(formData.hospitalId),
      };

      if (editingId) {
        await api.put(
          `/api/doctors/${editingId}`,
          requestData
        );

        setMessage(
          "Doctor information updated successfully!"
        );
      } else {
        await api.post(
          "/api/doctors",
          requestData
        );

        setMessage(
          "Doctor added successfully!"
        );
      }

      resetForm();

      setSearchSpecialization("");
      setIsSearching(false);

      await fetchDoctors();
    } catch (error) {
      console.error(
        "Doctor Save Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to save doctor"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (doctor) => {
    setEditingId(doctor.id);

    setFormData({
      name: doctor.name || "",
      specialization:
        doctor.specialization || "",
      phone: doctor.phone || "",
      departmentId:
        doctor.departmentId ||
        doctor.department?.id ||
        "",
      hospitalId:
        doctor.hospitalId ||
        doctor.hospital?.id ||
        "",
    });

    setError("");
    setMessage("");
    setShowForm(true);

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
      "Are you sure you want to deactivate this doctor?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await api.delete(`/api/doctors/${id}`);

      setMessage(
        "Doctor deactivated successfully."
      );

      await fetchDoctors();
    } catch (error) {
      console.error(
        "Deactivate Doctor Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to deactivate doctor"
      );
    }
  };

  // =========================================================
  // RESTORE
  // =========================================================

  const handleRestore = async (id) => {
    try {
      setMessage("");
      setError("");

      await api.patch(
        `/api/doctors/${id}/restore`
      );

      setMessage(
        "Doctor restored successfully."
      );

      await fetchDoctors();
    } catch (error) {
      console.error(
        "Restore Doctor Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to restore doctor"
      );
    }
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const clearSearch = async () => {
    setSearchSpecialization("");
    setStatusFilter("ALL");
    setIsSearching(false);
    setPage(0);
    setTotalPages(0);

    await fetchDoctors();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchDoctors(0);
    }
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const statistics = useMemo(() => {
    const departmentIds = new Set();

    doctors.forEach((doctor) => {
      const departmentId =
        doctor.departmentId ||
        doctor.department?.id;

      if (departmentId) {
        departmentIds.add(departmentId);
      }
    });

    const cardiologyCount = doctors.filter(
      (doctor) =>
        doctor.specialization
          ?.toLowerCase()
          .includes("cardio")
    ).length;

    return {
      totalDoctors: doctors.length,
      departments: departmentIds.size,
      cardiologists: cardiologyCount,
    };
  }, [doctors]);

  // =========================================================
  // DEPARTMENT NAME
  // =========================================================

  const getDepartmentName = (doctor) => {
    return (
      doctor.departmentName ||
      doctor.department?.name ||
      departments.find(
        (department) =>
          Number(department.id) ===
          Number(doctor.departmentId)
      )?.name ||
      "Not assigned"
    );
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredDoctors = doctors.filter(
    (doctor) => {
      if (statusFilter === "ACTIVE") {
        return doctor.active;
      }

      if (statusFilter === "INACTIVE") {
        return !doctor.active;
      }

      return true;
    }
  );

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
              Doctors
            </h1>

            <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#73818d]">
              Manage doctors, specializations and
              department assignments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={fetchDoctors}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-[#cddfd9] bg-white px-5 py-3 text-xs font-bold text-[#006b55] transition-all hover:border-[#006b55] hover:bg-[#eef8f5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-base">
                ↻
              </span>

              Refresh
            </button>

            <button
              type="button"
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  openAddForm();
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white shadow-[0_7px_20px_rgba(0,107,85,0.18)] transition-all hover:bg-[#004f40] hover:shadow-[0_10px_25px_rgba(0,107,85,0.24)]"
            >
              <span className="text-lg leading-none">
                +
              </span>

              {showForm ? "Close" : "Add Doctor"}
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
              <strong className="block text-sm font-semibold">
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
              <strong className="block text-sm font-semibold">
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

        {!loading && (
          <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg text-[#006b55]">
                  ⚕
                </div>

                <div>
                  <span className="block text-[10px] text-[#73818d]">
                    Total Doctors
                  </span>

                  <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                    {statistics.totalDoctors}
                  </strong>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf7f5] text-lg text-[#087963]">
                  🏥
                </div>

                <div>
                  <span className="block text-[10px] text-[#73818d]">
                    Departments
                  </span>

                  <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                    {statistics.departments}
                  </strong>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0eefb] text-lg text-[#6d62a8]">
                  ♡
                </div>

                <div>
                  <span className="block text-[10px] text-[#73818d]">
                    Specialists
                  </span>

                  <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                    {statistics.cardiologists}
                  </strong>

                  <small className="block text-[9px] text-[#73818d]">
                    Cardiologists
                  </small>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7ef] text-lg text-[#16835f]">
                  ✓
                </div>

                <div>
                  <span className="block text-[10px] text-[#73818d]">
                    Availability
                  </span>

                  <strong className="mt-1 block text-xl font-bold text-[#102333]">
                    Active
                  </strong>

                  <small className="block text-[9px] text-[#73818d]">
                    Healthcare team
                  </small>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            FILTER + SEARCH
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            <div>
              <span className="mb-3 block text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                TEAM STATUS
              </span>

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
                    className={`rounded-lg px-4 py-2 text-[11px] font-semibold transition-all ${
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

            <div className="flex w-full flex-col gap-2 sm:flex-row xl:max-w-[650px]">

              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#73818d]">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search specialization..."
                  value={searchSpecialization}
                  onChange={(e) =>
                    setSearchSpecialization(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleSearchKeyDown
                  }
                  className="h-11 w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] pl-10 pr-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:bg-white focus:ring-4 focus:ring-[#006b55]/10"
                />
              </div>

              <button
                type="button"
                onClick={() => searchDoctors(0)}
                disabled={isSearchLoading}
                className="h-11 rounded-xl bg-[#006b55] px-5 text-xs font-bold text-white transition-colors hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSearchLoading
                  ? "Searching..."
                  : "Search"}
              </button>

              {(isSearching ||
                searchSpecialization) && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="h-11 rounded-xl border border-[#dce8e4] bg-white px-5 text-xs font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            ADD / EDIT FORM
        ================================================= */}

        {showForm && (
          <section className="mb-6 overflow-hidden rounded-2xl border border-[#d9e8e3] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.06)]">

            <div className="flex items-center gap-4 border-b border-[#e3ecea] bg-[#f5faf8] px-6 py-5">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#006b55] text-lg text-white">
                ⚕
              </div>

              <div>
                <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                  {editingId
                    ? "UPDATE DOCTOR"
                    : "NEW DOCTOR"}
                </span>

                <h2 className="mt-1 text-xl font-bold text-[#102333]">
                  {editingId
                    ? "Edit Doctor Information"
                    : "Add New Doctor"}
                </h2>

                <p className="mt-1 text-xs text-[#73818d]">
                  Enter the doctor's professional
                  and contact information.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Doctor Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter doctor name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Hospital
                  </label>

                  <select
                    name="hospitalId"
                    value={formData.hospitalId}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  >
                    <option value="">
                      Select hospital
                    </option>

                    {hospitals.map(
                      (hospital) => (
                        <option
                          key={hospital.id}
                          value={hospital.id}
                        >
                          {hospital.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Specialization
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    placeholder="e.g. Cardiologist"
                    value={
                      formData.specialization
                    }
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Department
                  </label>

                  <select
                    name="departmentId"
                    value={
                      formData.departmentId
                    }
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  >
                    <option value="">
                      Select department
                    </option>

                    {departments.map(
                      (department) => (
                        <option
                          key={department.id}
                          value={department.id}
                        >
                          {department.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-[#edf2f0] pt-5">

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border border-[#dce8e4] bg-white px-5 py-3 text-xs font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Doctor"
                    : "Add Doctor"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* =================================================
            DOCTOR DIRECTORY
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_6px_20px_rgba(16,35,51,0.05)]">

          <div className="flex flex-col gap-4 border-b border-[#e3ecea] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                MEDICAL TEAM
              </span>

              <h2 className="mt-1 text-xl font-bold text-[#102333]">
                Doctor Directory
              </h2>

              <p className="mt-1 text-xs text-[#73818d]">
                {isSearching
                  ? `${filteredDoctors.length} search result${
                      filteredDoctors.length !==
                      1
                        ? "s"
                        : ""
                    }`
                  : `${filteredDoctors.length} doctor${
                      filteredDoctors.length !==
                      1
                        ? "s"
                        : ""
                    } shown`}
              </p>
            </div>

            <div className="rounded-lg bg-[#eef8f5] px-3 py-2 text-[10px] font-bold text-[#006b55]">
              {filteredDoctors.length}
            </div>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12">

              <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#dceee9] border-t-[#006b55]" />

              <strong className="mt-5 text-sm font-bold text-[#102333]">
                Loading doctors...
              </strong>

              <span className="mt-1 text-xs text-[#73818d]">
                Retrieving medical team information.
              </span>
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            filteredDoctors.length === 0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-xl text-[#006b55]">
                  ⚕
                </div>

                <h3 className="mt-5 text-base font-bold text-[#102333]">
                  No doctors found
                </h3>

                <p className="mt-2 max-w-[450px] text-xs leading-5 text-[#73818d]">
                  {isSearching
                    ? "No doctors match the selected specialization."
                    : statusFilter ===
                      "ACTIVE"
                    ? "There are no active doctors."
                    : statusFilter ===
                      "INACTIVE"
                    ? "There are no inactive doctors."
                    : "There are no doctors registered yet."}
                </p>

                {isSearching ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-5 rounded-xl border border-[#dce8e4] bg-white px-5 py-3 text-xs font-bold text-[#006b55] hover:bg-[#eef8f5]"
                  >
                    Clear Search
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={openAddForm}
                    className="mt-5 rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white hover:bg-[#004f40]"
                  >
                    + Add Doctor
                  </button>
                )}
              </div>
            )}

          {/* TABLE */}

          {!loading &&
            filteredDoctors.length > 0 && (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[1150px] border-collapse">

                  <thead>
                    <tr className="bg-[#f7faf9] text-left">

                      <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        DOCTOR
                      </th>

                      <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        SPECIALIZATION
                      </th>

                      <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        CONTACT
                      </th>

                      <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        DEPARTMENT
                      </th>

                      <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        HOSPITAL
                      </th>

                      <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        STATUS
                      </th>

                      <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredDoctors.map(
                      (doctor) => (
                        <tr
                          key={doctor.id}
                          className="border-t border-[#edf2f0] transition-colors hover:bg-[#fbfdfc]"
                        >

                          {/* DOCTOR */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-xs font-bold text-[#006b55]">
                                {doctor.name
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  "D"}
                              </div>

                              <div className="min-w-0">

                                <strong className="block truncate text-xs font-semibold text-[#102333]">
                                  {doctor.name}
                                </strong>

                                <span className="mt-1 block text-[9px] text-[#73818d]">
                                  Doctor ID #
                                  {doctor.id}
                                </span>

                              </div>
                            </div>
                          </td>

                          {/* SPECIALIZATION */}

                          <td className="px-5 py-4">

                            <span className="inline-flex items-center gap-2 rounded-lg bg-[#e8f6f2] px-3 py-2 text-[9px] font-semibold text-[#006b55]">
                              <span>⚕</span>

                              {doctor.specialization ||
                                "General Physician"}
                            </span>
                          </td>

                          {/* CONTACT */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2 text-xs text-[#455565]">

                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f3f7f6] text-[#006b55]">
                                ☎
                              </span>

                              <span>
                                {doctor.phone ||
                                  "Not provided"}
                              </span>
                            </div>
                          </td>

                          {/* DEPARTMENT */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2 text-xs text-[#455565]">

                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f3f7f6]">
                                🏥
                              </span>

                              <span>
                                {getDepartmentName(
                                  doctor
                                )}
                              </span>
                            </div>
                          </td>

                          {/* HOSPITAL */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2 text-xs text-[#455565]">

                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f3f7f6]">
                                🏥
                              </span>

                              <span>
                                {doctor.hospitalName ||
                                  doctor.hospital
                                    ?.name ||
                                  "Not assigned"}
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold ${
                                doctor.active
                                  ? "bg-[#e8f7ef] text-[#16835f]"
                                  : "bg-[#fff0f0] text-[#c13f3f]"
                              }`}
                            >
                              <i
                                className={`h-1.5 w-1.5 rounded-full ${
                                  doctor.active
                                    ? "bg-[#16835f]"
                                    : "bg-[#c13f3f]"
                                }`}
                              />

                              {doctor.active
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </td>

                          {/* ACTIONS */}

                          <td className="px-5 py-4">

                            <div className="flex flex-wrap items-center gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedDoctor(
                                    doctor
                                  )
                                }
                                className="rounded-lg border border-[#dce8e4] bg-white px-3 py-2 text-[9px] font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55]"
                              >
                                View
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    doctor
                                  )
                                }
                                className="rounded-lg border border-[#cfe1dc] bg-white px-3 py-2 text-[9px] font-bold text-[#006b55] transition-colors hover:bg-[#e8f6f2]"
                              >
                                Edit
                              </button>

                              {doctor.active ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeactivate(
                                      doctor.id
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
                                      doctor.id
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

          {/* =================================================
              SEARCH PAGINATION
          ================================================= */}

          {!loading &&
            isSearching &&
            totalPages > 0 && (
              <div className="flex flex-col items-center justify-between gap-4 border-t border-[#e3ecea] bg-[#fbfdfc] px-5 py-4 sm:flex-row">

                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() =>
                    searchDoctors(page - 1)
                  }
                  className="rounded-lg border border-[#dce8e4] bg-white px-4 py-2.5 text-[10px] font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <span className="text-[10px] text-[#73818d]">
                  Page{" "}
                  <strong className="text-[#102333]">
                    {page + 1}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-[#102333]">
                    {totalPages}
                  </strong>
                </span>

                <button
                  type="button"
                  disabled={
                    page >= totalPages - 1
                  }
                  onClick={() =>
                    searchDoctors(page + 1)
                  }
                  className="rounded-lg border border-[#dce8e4] bg-white px-4 py-2.5 text-[10px] font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
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
                Healthcare information is secure
              </strong>

              <p className="mt-1 text-[10px] leading-5 text-[#73818d]">
                Doctor information is protected
                through authenticated access.
              </p>
            </div>
          </div>

          <span className="text-[9px] font-bold tracking-[0.12em] text-[#16835f]">
            SECURE
          </span>
        </div>
      </div>

      {/* =================================================
          DOCTOR DETAILS MODAL
      ================================================= */}

      {selectedDoctor && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102333]/50 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedDoctor(null)
          }
        >
          <div
            className="max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-2xl border border-[#e3ecea] bg-white shadow-[0_25px_70px_rgba(16,35,51,0.22)]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-[#e3ecea] bg-[#f5faf8] px-6 py-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#006b55] text-sm font-bold text-white">
                  {selectedDoctor.name
                    ?.charAt(0)
                    ?.toUpperCase() || "D"}
                </div>

                <div>
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#006b55]">
                    MEDICAL PROFESSIONAL
                  </span>

                  <h2 className="mt-1 text-xl font-bold text-[#102333]">
                    {/^\s*dr\.?\s+/i.test(
                      selectedDoctor.name ||
                        ""
                    )
                      ? selectedDoctor.name
                      : `Dr. ${
                          selectedDoctor.name ||
                          ""
                        }`}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDoctor(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce8e4] bg-white text-xl text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55]"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}

            <div className="p-6">

              <div className="grid gap-3 sm:grid-cols-2">

                <div className="rounded-xl border border-[#e3ecea] bg-[#fbfdfc] p-4">
                  <span className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
                    DOCTOR ID
                  </span>

                  <strong className="mt-2 block text-sm text-[#102333]">
                    #{selectedDoctor.id}
                  </strong>
                </div>

                <div className="rounded-xl border border-[#e3ecea] bg-[#fbfdfc] p-4">
                  <span className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
                    SPECIALIZATION
                  </span>

                  <strong className="mt-2 block text-sm text-[#102333]">
                    {selectedDoctor.specialization ||
                      "General Physician"}
                  </strong>
                </div>

                <div className="rounded-xl border border-[#e3ecea] bg-[#fbfdfc] p-4">
                  <span className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
                    PHONE
                  </span>

                  <strong className="mt-2 block text-sm text-[#102333]">
                    {selectedDoctor.phone ||
                      "Not provided"}
                  </strong>
                </div>

                <div className="rounded-xl border border-[#e3ecea] bg-[#fbfdfc] p-4">
                  <span className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
                    DEPARTMENT
                  </span>

                  <strong className="mt-2 block text-sm text-[#102333]">
                    {getDepartmentName(
                      selectedDoctor
                    )}
                  </strong>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-[#e3ecea] bg-[#fbfdfc] p-4">
                <span className="text-[9px] font-bold tracking-[0.12em] text-[#73818d]">
                  HOSPITAL
                </span>

                <strong className="mt-2 block text-sm text-[#102333]">
                  {selectedDoctor.hospitalName ||
                    selectedDoctor.hospital
                      ?.name ||
                    "Not assigned"}
                </strong>
              </div>

              <div
                className={`mt-4 flex items-start gap-3 rounded-xl p-4 ${
                  selectedDoctor.active
                    ? "bg-[#eef9f4]"
                    : "bg-[#fff4f4]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${
                    selectedDoctor.active
                      ? "bg-[#d9f2e8] text-[#16835f]"
                      : "bg-[#fbe1e1] text-[#c13f3f]"
                  }`}
                >
                  {selectedDoctor.active
                    ? "✓"
                    : "!"}
                </span>

                <div>
                  <strong className="block text-xs font-bold text-[#102333]">
                    {selectedDoctor.active
                      ? "Active Medical Professional"
                      : "Inactive Medical Professional"}
                  </strong>

                  <p className="mt-1 text-[10px] leading-5 text-[#73818d]">
                    {selectedDoctor.active
                      ? "This doctor is currently registered in the MediCare healthcare system."
                      : "This doctor is currently inactive in the MediCare healthcare system."}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex flex-wrap justify-end gap-3 border-t border-[#e3ecea] bg-[#fbfdfc] px-6 py-4">

              <button
                type="button"
                onClick={() =>
                  setSelectedDoctor(null)
                }
                className="rounded-xl border border-[#dce8e4] bg-white px-5 py-3 text-xs font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55]"
              >
                Close
              </button>

              {selectedDoctor.active ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoctor(null);
                    handleEdit(
                      selectedDoctor
                    );
                  }}
                  className="rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#004f40]"
                >
                  Edit Doctor
                </button>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    await handleRestore(
                      selectedDoctor.id
                    );

                    setSelectedDoctor(null);
                  }}
                  className="rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#004f40]"
                >
                  Restore Doctor
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Doctors;