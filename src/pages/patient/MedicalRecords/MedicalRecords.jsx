import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/useAuth";

function MedicalRecords() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [viewRecord, setViewRecord] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [formData, setFormData] = useState({
    recordDate: "",
    diagnosis: "",
    symptoms: "",
    prescription: "",
    patientId: "",
    doctorId: "",
  });

  // =========================
  // FETCH MEDICAL RECORDS
  // =========================

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError("");

      let response;

      if (isAdmin) {
        response = await api.get("/api/medical-records/all");
      } else if (selectedPatient) {
        response = await api.get(
          `/api/medical-records/patient/${selectedPatient}`
        );
      } else {
        response = await api.get("/api/medical-records");
      }

      let data = response.data;

      if (isAdmin && selectedPatient) {
        data = data.filter(
          (record) =>
            String(record.patientId) === String(selectedPatient)
        );
      }

      setRecords(data);
    } catch (error) {
      console.error("Medical Records Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load medical records"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH PATIENTS
  // =========================

  const fetchPatients = async () => {
    try {
      const response = await api.get("/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Patients Error:", error);
    }
  };

  // =========================
  // FETCH DOCTORS
  // =========================

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Doctors Error:", error);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [selectedPatient, isAdmin]);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      recordDate: "",
      diagnosis: "",
      symptoms: "",
      prescription: "",
      patientId: "",
      doctorId: "",
    });

    setEditingId(null);
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const requestData = {
        recordDate: formData.recordDate,
        diagnosis: formData.diagnosis,
        symptoms: formData.symptoms,
        prescription: formData.prescription,
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId),
      };

      if (editingId) {
        await api.put(
          `/api/medical-records/${editingId}`,
          requestData
        );

        setMessage(
          "Medical record updated successfully!"
        );
      } else {
        await api.post(
          "/api/medical-records",
          requestData
        );

        setMessage(
          "Medical record created successfully!"
        );
      }

      resetForm();
      setShowForm(false);

      await fetchRecords();
    } catch (error) {
      console.error("Medical Record Save Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save medical record"
      );
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (record) => {
    setFormData({
      recordDate: record.recordDate,
      diagnosis: record.diagnosis,
      symptoms: record.symptoms,
      prescription: record.prescription,
      patientId: record.patientId,
      doctorId: record.doctorId,
    });

    setEditingId(record.id);
    setShowForm(true);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DEACTIVATE
  // =========================

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this medical record?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await api.delete(`/api/medical-records/${id}`);

      setMessage(
        "Medical record deactivated successfully."
      );

      await fetchRecords();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to deactivate medical record"
      );
    }
  };

  // =========================
  // RESTORE
  // =========================

  const handleRestore = async (id) => {
    try {
      setError("");
      setMessage("");

      await api.patch(
        `/api/medical-records/${id}/restore`
      );

      setMessage(
        "Medical record restored successfully."
      );

      await fetchRecords();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to restore medical record"
      );
    }
  };

  // =========================
  // VIEW SINGLE RECORD
  // =========================

  const handleView = async (id) => {
    try {
      setError("");
      setMessage("");
      setViewLoading(true);

      const response = await api.get(
        `/api/medical-records/${id}`
      );

      setViewRecord(response.data);
    } catch (error) {
      console.error(
        "View Medical Record Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to view medical record"
      );
    } finally {
      setViewLoading(false);
    }
  };

  // =========================
  // PATIENT FILTER
  // =========================

  const handlePatientFilter = (e) => {
    setSelectedPatient(e.target.value);
    setMessage("");
    setError("");
  };

  const clearFilter = () => {
    setSelectedPatient("");
  };

  // =========================
  // STATUS FILTER
  // =========================

  const filteredRecords = records.filter((record) => {
    if (statusFilter === "ACTIVE") {
      return record.active;
    }

    if (statusFilter === "INACTIVE") {
      return !record.active;
    }

    return true;
  });

  const activeCount = records.filter(
    (record) => record.active
  ).length;

  const inactiveCount = records.filter(
    (record) => !record.active
  ).length;

  return (
    <main className="min-h-screen bg-[#f7fafb] text-[#455565]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <section className="mb-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b8068]">
                <span className="h-2 w-2 rounded-full bg-[#0b8068]" />
                MediCare Healthcare Portal
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#102333] sm:text-4xl">
                Medical Records
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#73818d] sm:text-base">
                Securely manage patient diagnoses, symptoms,
                prescriptions and medical history.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (showForm) {
                  resetForm();
                }

                setShowForm(!showForm);
                setMessage("");
                setError("");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006b55] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,107,85,0.18)] transition hover:bg-[#004f40] focus:outline-none focus:ring-4 focus:ring-[#006b55]/15"
            >
              <span className="text-lg leading-none">
                {showForm ? "×" : "+"}
              </span>

              {showForm
                ? "Close Form"
                : "Create Medical Record"}
            </button>
          </div>
        </section>

        {/* =========================
            ALERTS
        ========================= */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#b9e5d9] bg-[#e8f6f2] px-4 py-3 text-sm text-[#005b49]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16835f] text-xs font-bold text-white">
              ✓
            </span>

            <p>{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              !
            </span>

            <p>{error}</p>
          </div>
        )}

        {/* =========================
            STATS
        ========================= */}

        <section className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#73818d]">
                  Total Records
                </p>

                <p className="mt-2 text-3xl font-bold text-[#102333]">
                  {records.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl text-[#006b55]">
                +
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#73818d]">
                  Active Records
                </p>

                <p className="mt-2 text-3xl font-bold text-[#16835f]">
                  {activeCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg text-[#16835f]">
                ✓
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#73818d]">
                  Inactive Records
                </p>

                <p className="mt-2 text-3xl font-bold text-[#d64545]">
                  {inactiveCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-lg text-[#d64545]">
                !
              </div>
            </div>
          </div>

        </section>

        {/* =========================
            CREATE / EDIT FORM
        ========================= */}

        {showForm && (
          <section className="mb-6 overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_10px_30px_rgba(16,35,51,0.08)]">

            <div className="border-b border-[#e3ecea] bg-gradient-to-r from-[#004f40] to-[#006b55] px-5 py-5 text-white sm:px-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9e5d9]">
                MediCare · Clinical Records
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {editingId
                  ? "Edit Medical Record"
                  : "Create Medical Record"}
              </h2>

              <p className="mt-1 text-sm text-white/75">
                Enter the clinical information below.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-7"
            >
              <div className="grid gap-5 md:grid-cols-2">

                {/* DATE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Record Date
                  </label>

                  <input
                    type="date"
                    name="recordDate"
                    value={formData.recordDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none transition focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* PATIENT */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Patient
                  </label>

                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none transition focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  >
                    <option value="">
                      Select Patient
                    </option>

                    {patients.map((patient) => (
                      <option
                        key={patient.id}
                        value={patient.id}
                      >
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DOCTOR */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Doctor
                  </label>

                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none transition focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  >
                    <option value="">
                      Select Doctor
                    </option>

                    {doctors.map((doctor) => (
                      <option
                        key={doctor.id}
                        value={doctor.id}
                      >
                        {doctor.name} -{" "}
                        {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DIAGNOSIS */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Diagnosis
                  </label>

                  <textarea
                    name="diagnosis"
                    rows="3"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="Enter diagnosis"
                    required
                    className="w-full resize-none rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* SYMPTOMS */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Symptoms
                  </label>

                  <textarea
                    name="symptoms"
                    rows="4"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder="Enter patient symptoms"
                    required
                    className="w-full resize-none rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* PRESCRIPTION */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Prescription
                  </label>

                  <textarea
                    name="prescription"
                    rows="4"
                    value={formData.prescription}
                    onChange={handleChange}
                    placeholder="Enter prescription"
                    required
                    className="w-full resize-none rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none transition placeholder:text-[#9aa7af] focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  />
                </div>

              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#e8efed] pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="rounded-xl border border-[#d5e2df] bg-white px-5 py-3 text-sm font-semibold text-[#455565] transition hover:bg-[#f7fafb]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#006b55] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004f40]"
                >
                  {editingId
                    ? "Update Medical Record"
                    : "Create Medical Record"}
                </button>

              </div>
            </form>
          </section>
        )}

        {/* =========================
            PATIENT HISTORY FILTER
        ========================= */}

        <section className="mb-6 rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)] sm:p-6">

          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b8068]">
              Patient History
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#102333]">
              View Patient Medical History
            </h2>

            <p className="mt-1 text-sm text-[#73818d]">
              Select a patient to view their available medical records.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">

            <select
              value={selectedPatient}
              onChange={handlePatientFilter}
              className="min-w-0 flex-1 rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
            >
              <option value="">
                All Patients
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {patient.name}
                </option>
              ))}
            </select>

            {selectedPatient && (
              <button
                type="button"
                onClick={clearFilter}
                className="rounded-xl border border-[#d5e2df] bg-[#f7fafb] px-5 py-3 text-sm font-semibold text-[#455565] transition hover:bg-[#e8f6f2] hover:text-[#006b55]"
              >
                Show All Records
              </button>
            )}

          </div>
        </section>

        {/* =========================
            RECORD LIST
        ========================= */}

        <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.07)]">

          {/* LIST HEADER */}

          <div className="border-b border-[#e3ecea] px-5 py-5 sm:px-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-[#102333]">
                    Medical Record List
                  </h2>

                  <span className="rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-bold text-[#006b55]">
                    {filteredRecords.length} records
                  </span>
                </div>

                <p className="mt-1 text-sm text-[#73818d]">
                  Review and manage available medical records.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("ALL");
                  fetchRecords();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d5e2df] bg-white px-4 py-2.5 text-sm font-semibold text-[#455565] transition hover:border-[#006b55] hover:text-[#006b55]"
              >
                ↻
                Refresh
              </button>

            </div>

            {/* ADMIN STATUS FILTER */}

            {isAdmin && (
              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  ["ALL", "All"],
                  ["ACTIVE", "Active"],
                  ["INACTIVE", "Inactive"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setStatusFilter(value)
                    }
                    className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                      statusFilter === value
                        ? "bg-[#006b55] text-white shadow-sm"
                        : "border border-[#dce8e5] bg-[#f7fafb] text-[#60717d] hover:bg-[#e8f6f2] hover:text-[#006b55]"
                    }`}
                  >
                    {label}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* CONTENT */}

          {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 py-16">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#d9ebe7] border-t-[#006b55]" />

              <p className="mt-4 text-sm font-medium text-[#73818d]">
                Loading medical records...
              </p>

            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="px-5 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-2xl text-[#006b55]">
                +
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#102333]">
                No medical records found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#73818d]">
                There are no records matching the current
                patient or status filter.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-[1250px] w-full border-collapse">

                <thead>
                  <tr className="bg-[#f5f9f8] text-left">

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      ID
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Date
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Patient
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Doctor
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Specialization
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Diagnosis
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Symptoms
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Prescription
                    </th>

                    {isAdmin && (
                      <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                        Status
                      </th>
                    )}

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-[#edf2f1]">

                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-[#f9fcfb]"
                    >

                      <td className="px-5 py-4 text-sm font-bold text-[#102333]">
                        #{record.id}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-[#455565]">
                        {record.recordDate}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#102333]">
                          {record.patientName || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#102333]">
                          {record.doctorName || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#60717d]">
                        {record.specialization || "—"}
                      </td>

                      <td className="max-w-[220px] px-5 py-4">
                        <p className="line-clamp-2 text-sm text-[#455565]">
                          {record.diagnosis || "—"}
                        </p>
                      </td>

                      <td className="max-w-[220px] px-5 py-4">
                        <p className="line-clamp-2 text-sm text-[#455565]">
                          {record.symptoms || "—"}
                        </p>
                      </td>

                      <td className="max-w-[220px] px-5 py-4">
                        <p className="line-clamp-2 text-sm text-[#455565]">
                          {record.prescription || "—"}
                        </p>
                      </td>

                      {isAdmin && (
                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                              record.active
                                ? "bg-[#e8f6f2] text-[#16835f]"
                                : "bg-red-50 text-[#d64545]"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                record.active
                                  ? "bg-[#16835f]"
                                  : "bg-[#d64545]"
                              }`}
                            />

                            {record.active
                              ? "Active"
                              : "Inactive"}
                          </span>

                        </td>
                      )}

                      <td className="px-5 py-4">

                        {isAdmin ? (
                          <div className="flex min-w-[230px] flex-wrap gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(record)
                              }
                              className="rounded-lg border border-[#cfe0dc] bg-white px-3 py-2 text-xs font-bold text-[#006b55] transition hover:bg-[#e8f6f2]"
                            >
                              Edit
                            </button>

                            {record.active ? (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeactivate(
                                    record.id
                                  )
                                }
                                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-[#d64545] transition hover:bg-red-50"
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handleRestore(
                                    record.id
                                  )
                                }
                                className="rounded-lg border border-[#b9e5d9] bg-white px-3 py-2 text-xs font-bold text-[#16835f] transition hover:bg-[#e8f6f2]"
                              >
                                Restore
                              </button>
                            )}

                            {record.active && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleView(record.id)
                                }
                                className="rounded-lg bg-[#006b55] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#004f40]"
                              >
                                View
                              </button>
                            )}

                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleView(record.id)
                            }
                            className="rounded-lg bg-[#006b55] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#004f40]"
                          >
                            View
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

        {/* =========================
            VIEW RECORD MODAL
        ========================= */}

        {viewRecord && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102333]/60 p-4 backdrop-blur-sm"
            onClick={() => setViewRecord(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(16,35,51,0.25)]"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* MODAL HEADER */}

              <div className="flex items-start justify-between bg-gradient-to-r from-[#004f40] to-[#006b55] px-6 py-6 text-white sm:px-8">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9e5d9]">
                    MediCare · Medical Record
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Record
                    <br />
                    <span className="font-normal italic">
                      details.
                    </span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setViewRecord(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
                >
                  ×
                </button>

              </div>

              {/* MODAL BODY */}

              {viewLoading ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center">

                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d9ebe7] border-t-[#006b55]" />

                  <p className="mt-4 text-sm text-[#73818d]">
                    Loading record...
                  </p>

                </div>
              ) : (
                <div className="max-h-[55vh] overflow-y-auto p-6 sm:p-8">

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div className="rounded-2xl bg-[#f7fafb] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#73818d]">
                        Date
                      </p>

                      <p className="mt-1 font-semibold text-[#102333]">
                        {viewRecord.recordDate || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7fafb] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#73818d]">
                        Patient
                      </p>

                      <p className="mt-1 font-semibold text-[#102333]">
                        {viewRecord.patientName || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7fafb] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#73818d]">
                        Doctor
                      </p>

                      <p className="mt-1 font-semibold text-[#102333]">
                        {viewRecord.doctorName || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7fafb] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#73818d]">
                        Specialization
                      </p>

                      <p className="mt-1 font-semibold text-[#102333]">
                        {viewRecord.specialization || "—"}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 space-y-4">

                    <div className="rounded-2xl border border-[#e3ecea] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#0b8068]">
                        Diagnosis
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#455565]">
                        {viewRecord.diagnosis || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#e3ecea] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#0b8068]">
                        Symptoms
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#455565]">
                        {viewRecord.symptoms || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#e3ecea] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#0b8068]">
                        Prescription
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#455565]">
                        {viewRecord.prescription || "—"}
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {/* MODAL FOOTER */}

              <div className="flex justify-end border-t border-[#e3ecea] bg-[#fbfdfc] px-6 py-4 sm:px-8">

                <button
                  type="button"
                  onClick={() => setViewRecord(null)}
                  className="rounded-xl bg-[#006b55] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004f40]"
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        )}

        {/* =========================
            SECURITY FOOTER
        ========================= */}

        <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-[#dce9e6] bg-white px-5 py-4 text-xs text-[#73818d] sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8f6f2] text-[#006b55]">
              ✓
            </span>

            <span>
              Medical records are protected within the
              MediCare healthcare portal.
            </span>
          </div>

          <span className="font-medium">
            Secure Healthcare Management
          </span>

        </div>

      </div>
    </main>
  );
}

export default MedicalRecords;