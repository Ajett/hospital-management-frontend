import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/useAuth";

function Patients() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchName, setSearchName] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
  });

  // =========================================================
  // FETCH PATIENTS
  // =========================================================

  const fetchPatients = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/patients/page/all",
        {
          params: {
            page: pageNumber,
            size,
            sortBy: "id",
            direction: "asc",
          },
        }
      );

      setPatients(response.data.content);
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load patients"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(0);
  }, []);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredPatients = patients.filter((patient) => {
    if (statusFilter === "ACTIVE") {
      return patient.active;
    }

    if (statusFilter === "INACTIVE") {
      return !patient.active;
    }

    return true;
  });

  // =========================================================
  // SEARCH
  // =========================================================

  const searchPatients = async () => {
    if (!searchName.trim()) {
      setIsSearching(false);
      fetchPatients(0);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      setIsSearching(true);

      const response = await api.get(
        "/api/patients/search",
        {
          params: {
            name: searchName,
          },
        }
      );

      setPatients(response.data);
      setPage(0);
      setTotalPages(0);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to search patients"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchName("");
    setIsSearching(false);
    setError("");
    setMessage("");
    fetchPatients(0);
  };

  // =========================================================
  // FORM
  // =========================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      if (editingId) {
        await api.put(
          `/api/patients/${editingId}`,
          formData
        );

        setMessage("Patient updated successfully!");
      } else {
        await api.post(
          "/api/patients",
          formData
        );

        setMessage("Patient added successfully!");
      }

      resetForm();

      if (isSearching) {
        await searchPatients();
      } else {
        await fetchPatients(page);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save patient"
      );
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (patient) => {
    setEditingId(patient.id);

    setFormData({
      name: patient.name || "",
      dateOfBirth: patient.dateOfBirth || "",
      gender: patient.gender || "",
      phone: patient.phone || "",
      email: patient.email || "",
      address: patient.address || "",
    });

    setMessage("");
    setError("");
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
      "Are you sure you want to deactivate this patient?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await api.delete(`/api/patients/${id}`);

      setMessage(
        "Patient deactivated successfully."
      );

      await fetchPatients(page);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to deactivate patient"
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
        `/api/patients/${id}/restore`
      );

      setMessage(
        "Patient restored successfully."
      );

      await fetchPatients(page);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to restore patient"
      );
    }
  };

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
              Patients
            </h1>

            <p className="mt-2 max-w-[600px] text-sm leading-6 text-[#73818d]">
              Manage patient information and healthcare
              records securely.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  if (showForm) {
                    resetForm();
                  } else {
                    setShowForm(true);
                  }

                  setMessage("");
                  setError("");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white shadow-[0_7px_20px_rgba(0,107,85,0.18)] transition-all hover:bg-[#004f40] hover:shadow-[0_10px_25px_rgba(0,107,85,0.24)]"
              >
                <span className="text-lg leading-none">
                  +
                </span>

                {showForm ? "Close Form" : "Add Patient"}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setSearchName("");
                setIsSearching(false);
                setStatusFilter("ALL");
                setMessage("");
                setError("");
                fetchPatients(0);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-[#cddfd9] bg-white px-5 py-3 text-xs font-bold text-[#006b55] transition-all hover:border-[#006b55] hover:bg-[#eef8f5]"
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

        <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg text-[#006b55]">
                ♟
              </div>

              <div>
                <span className="block text-[10px] font-medium text-[#73818d]">
                  Patients Shown
                </span>

                <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                  {patients.length}
                </strong>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1fb] text-lg text-[#5267a8]">
                ▣
              </div>

              <div>
                <span className="block text-[10px] font-medium text-[#73818d]">
                  Current Page
                </span>

                <strong className="mt-1 block text-2xl font-bold text-[#102333]">
                  {page + 1}
                </strong>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg text-[#16835f]">
                ✓
              </div>

              <div>
                <span className="block text-[10px] font-medium text-[#73818d]">
                  Portal Access
                </span>

                <strong className="mt-1 block text-xl font-bold text-[#102333]">
                  Secure
                </strong>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff5e5] text-lg text-[#c98613]">
                ⌕
              </div>

              <div>
                <span className="block text-[10px] font-medium text-[#73818d]">
                  Search Status
                </span>

                <strong className="mt-1 block text-xl font-bold text-[#102333]">
                  {isSearching ? "Active" : "Ready"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FILTER + SEARCH
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.05)]">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            {/* Filter */}
            <div>
              <span className="mb-3 block text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                STATUS FILTER
              </span>

              <div className="flex flex-wrap gap-2">
                {["ALL", "ACTIVE", "INACTIVE"].map(
                  (filter) => (
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
                  )
                )}
              </div>
            </div>

            {/* Search */}
            <div className="flex w-full flex-col gap-2 sm:flex-row xl:max-w-[650px]">

              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#73818d]">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search patient by name..."
                  value={searchName}
                  onChange={(e) =>
                    setSearchName(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchPatients();
                    }
                  }}
                  className="h-11 w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] pl-10 pr-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:bg-white focus:ring-4 focus:ring-[#006b55]/10"
                />
              </div>

              <button
                type="button"
                onClick={searchPatients}
                className="h-11 rounded-xl bg-[#006b55] px-5 text-xs font-bold text-white transition-colors hover:bg-[#004f40]"
              >
                Search
              </button>

              <button
                type="button"
                onClick={clearSearch}
                className="h-11 rounded-xl border border-[#dce8e4] bg-white px-5 text-xs font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55]"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            ADD / EDIT FORM
        ================================================= */}

        {showForm && isAdmin && (
          <section className="mb-6 overflow-hidden rounded-2xl border border-[#d9e8e3] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.06)]">

            <div className="flex items-center justify-between border-b border-[#e3ecea] bg-[#f5faf8] px-6 py-5">
              <div>
                <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                  PATIENT INFORMATION
                </span>

                <h2 className="mt-1 text-xl font-bold text-[#102333]">
                  {editingId
                    ? "Edit Patient"
                    : "Add New Patient"}
                </h2>

                <p className="mt-1 text-xs text-[#73818d]">
                  Enter accurate patient information below.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006b55] text-lg text-white">
                +
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid gap-5 md:grid-cols-2">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Patient Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter patient name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  >
                    <option value="">
                      Select gender
                    </option>

                    <option value="MALE">
                      Male
                    </option>

                    <option value="FEMALE">
                      Female
                    </option>

                    <option value="OTHER">
                      Other
                    </option>
                  </select>
                </div>

                {/* Phone */}
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

                {/* Email */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#455565]">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-[#dce8e4] bg-white px-4 text-xs text-[#102333] outline-none transition-all placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-[#edf2f0] pt-5">

                <button
                  type="submit"
                  className="rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#004f40]"
                >
                  {editingId
                    ? "✓ Update Patient"
                    : "+ Add Patient"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-[#dce8e4] bg-white px-5 py-3 text-xs font-bold text-[#596a78] transition-colors hover:border-[#006b55] hover:text-[#006b55]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* =================================================
            PATIENT DIRECTORY
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_6px_20px_rgba(16,35,51,0.05)]">

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[#e3ecea] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                PATIENT RECORDS
              </span>

              <h2 className="mt-1 text-xl font-bold text-[#102333]">
                Patient Directory
              </h2>

              <p className="mt-1 text-xs text-[#73818d]">
                {isSearching
                  ? `${filteredPatients.length} result(s) found`
                  : "View and manage registered patients."}
              </p>
            </div>

            <div className="rounded-lg bg-[#eef8f5] px-3 py-2 text-[10px] font-bold text-[#006b55]">
              {isSearching
                ? patients.length
                : `Page ${page + 1}`}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12">

              <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#dceee9] border-t-[#006b55]" />

              <h3 className="mt-5 text-sm font-bold text-[#102333]">
                Loading patients
              </h3>

              <p className="mt-1 text-xs text-[#73818d]">
                Please wait while patient records are being loaded.
              </p>
            </div>
          ) : filteredPatients.length === 0 ? (

            /* Empty */
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-xl text-[#006b55]">
                ♟
              </div>

              <h3 className="mt-5 text-base font-bold text-[#102333]">
                {isSearching
                  ? "No patients found"
                  : "No patients registered"}
              </h3>

              <p className="mt-2 max-w-[400px] text-xs leading-5 text-[#73818d]">
                {isSearching
                  ? "Try searching with another patient name."
                  : "There are currently no patient records."}
              </p>

              {isAdmin && !isSearching && (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mt-5 rounded-xl bg-[#006b55] px-5 py-3 text-xs font-bold text-white hover:bg-[#004f40]"
                >
                  + Add Patient
                </button>
              )}
            </div>
          ) : (

            /* =================================================
               TABLE
            ================================================= */

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse">

                <thead>
                  <tr className="bg-[#f7faf9] text-left">
                    <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                      PATIENT
                    </th>

                    <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                      DATE OF BIRTH
                    </th>

                    <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                      GENDER
                    </th>

                    <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                      PHONE
                    </th>

                    <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                      EMAIL
                    </th>

                    <th className="px-5 py-4 text-[9px] font-bold tracking-[0.1em] text-[#73818d]">
                      ADDRESS
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
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-t border-[#edf2f0] transition-colors hover:bg-[#fbfdfc]"
                    >

                      {/* Patient */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-xs font-bold text-[#006b55]">
                            {patient.name
                              ?.charAt(0)
                              ?.toUpperCase() || "P"}
                          </div>

                          <div className="min-w-0">
                            <strong className="block truncate text-xs font-semibold text-[#102333]">
                              {patient.name}
                            </strong>

                            <span className="mt-1 block text-[9px] text-[#73818d]">
                              Patient ID #{patient.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* DOB */}
                      <td className="px-5 py-4 text-xs text-[#455565]">
                        {patient.dateOfBirth ||
                          "Not provided"}
                      </td>

                      {/* Gender */}
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-[#f2f6f5] px-2.5 py-1.5 text-[9px] font-semibold text-[#596a78]">
                          {patient.gender
                            ? patient.gender
                                .charAt(0)
                                .toUpperCase() +
                              patient.gender
                                .slice(1)
                                .toLowerCase()
                            : "Not provided"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4 text-xs text-[#455565]">
                        {patient.phone
                          ? `☎ ${patient.phone}`
                          : "Not provided"}
                      </td>

                      {/* Email */}
                      <td className="max-w-[220px] px-5 py-4">
                        <span className="block truncate text-xs text-[#455565]">
                          {patient.email ||
                            "Not provided"}
                        </span>
                      </td>

                      {/* Address */}
                      <td className="max-w-[200px] px-5 py-4">
                        <span className="block truncate text-xs text-[#455565]">
                          {patient.address ||
                            "Not provided"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold ${
                            patient.active
                              ? "bg-[#e8f7ef] text-[#16835f]"
                              : "bg-[#fff0f0] text-[#c13f3f]"
                          }`}
                        >
                          <i
                            className={`h-1.5 w-1.5 rounded-full ${
                              patient.active
                                ? "bg-[#16835f]"
                                : "bg-[#c13f3f]"
                            }`}
                          />

                          {patient.active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        {isAdmin ? (
                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(patient)
                              }
                              className="rounded-lg border border-[#cfe1dc] bg-white px-3 py-2 text-[9px] font-bold text-[#006b55] transition-colors hover:bg-[#e8f6f2]"
                            >
                              Edit
                            </button>

                            {patient.active ? (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeactivate(
                                    patient.id
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
                                    patient.id
                                  )
                                }
                                className="rounded-lg border border-[#cfe1dc] bg-white px-3 py-2 text-[9px] font-bold text-[#16835f] transition-colors hover:bg-[#effaf5]"
                              >
                                Restore
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="rounded-lg bg-[#f3f5f5] px-3 py-2 text-[9px] font-semibold text-[#73818d]">
                            View Only
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* =================================================
              PAGINATION
          ================================================= */}

          {!loading &&
            !isSearching &&
            totalPages > 0 && (
              <div className="flex flex-col items-center justify-between gap-4 border-t border-[#e3ecea] bg-[#fbfdfc] px-5 py-4 sm:flex-row">

                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() =>
                    fetchPatients(page - 1)
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
                    fetchPatients(page + 1)
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
                Your healthcare information is secure
              </strong>

              <p className="mt-1 text-[10px] leading-5 text-[#73818d]">
                Patient information is protected through
                authenticated access and secure communication.
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

export default Patients;