import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/useAuth";

function Appointments() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isPatient = user?.role === "PATIENT";

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    patientId: "",
    doctorId: "",
  });

  // =========================================================
  // FETCH APPOINTMENTS
  // =========================================================

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const endpoint = isPatient
        ? "/api/appointments/my"
        : isAdmin
          ? "/api/appointments/all"
          : "/api/appointments";

      const response = await api.get(endpoint);

      setAppointments(response.data || []);
    } catch (err) {
      console.error("Appointments Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH PATIENTS - ADMIN
  // =========================================================

  const fetchPatients = async () => {
    if (!isAdmin) return;

    try {
      const response = await api.get("/api/patients");
      setPatients(response.data || []);
    } catch (err) {
      console.error("Patients Error:", err);
    }
  };

  // =========================================================
  // FETCH DOCTORS
  // =========================================================

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/api/doctors");
      setDoctors(response.data || []);
    } catch (err) {
      console.error("Doctors Error:", err);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchPatients();
  }, [user]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const statistics = useMemo(() => {
    return {
      total: appointments.length,

      scheduled: appointments.filter(
        (appointment) =>
          appointment.status === "SCHEDULED"
      ).length,

      confirmed: appointments.filter(
        (appointment) =>
          appointment.status === "CONFIRMED"
      ).length,

      completed: appointments.filter(
        (appointment) =>
          appointment.status === "COMPLETED"
      ).length,

      cancelled: appointments.filter(
        (appointment) =>
          appointment.status === "CANCELLED"
      ).length,
    };
  }, [appointments]);

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
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
      patientId: "",
      doctorId: "",
    });

    setEditingId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setMessage("");
    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

      // -----------------------------------------------------
      // PATIENT CREATE
      // -----------------------------------------------------

      if (isPatient && !editingId) {
        const requestData = {
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          reason: formData.reason,
          doctorId: Number(formData.doctorId),
        };

        await api.post(
          "/api/appointments/patient",
          requestData
        );

        setMessage(
          "Appointment request submitted successfully!"
        );
      }

      // -----------------------------------------------------
      // ADMIN CREATE / UPDATE
      // -----------------------------------------------------

      else if (isAdmin) {
        const requestData = {
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          reason: formData.reason,
          patientId: Number(formData.patientId),
          doctorId: Number(formData.doctorId),
        };

        if (editingId) {
          await api.put(
            `/api/appointments/${editingId}`,
            requestData
          );

          setMessage(
            "Appointment updated successfully!"
          );
        } else {
          await api.post(
            "/api/appointments",
            requestData
          );

          setMessage(
            "Appointment created successfully!"
          );
        }
      }

      resetForm();
      setShowForm(false);

      await fetchAppointments();
    } catch (err) {
      console.error("Appointment Save Error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to save appointment"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // EDIT - ADMIN
  // =========================================================

  const handleEdit = (appointment) => {
    setFormData({
      appointmentDate:
        appointment.appointmentDate || "",

      appointmentTime:
        appointment.appointmentTime?.substring(0, 5) || "",

      reason:
        appointment.reason || "",

      patientId:
        appointment.patientId || "",

      doctorId:
        appointment.doctorId || "",
    });

    setEditingId(appointment.id);
    setShowForm(true);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DEACTIVATE - ADMIN
  // =========================================================

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this appointment?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await api.delete(`/api/appointments/${id}`);

      setMessage(
        "Appointment deactivated successfully."
      );

      await fetchAppointments();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to deactivate appointment"
      );
    }
  };

  // =========================================================
  // RESTORE - ADMIN
  // =========================================================

  const handleRestore = async (id) => {
    try {
      setError("");
      setMessage("");

      await api.patch(
        `/api/appointments/${id}/restore`
      );

      setMessage(
        "Appointment restored successfully."
      );

      await fetchAppointments();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to restore appointment"
      );
    }
  };

  // =========================================================
  // STATUS UPDATE - ADMIN
  // =========================================================

  const handleStatusChange = async (id, status) => {
    try {
      setError("");
      setMessage("");

      await api.patch(
        `/api/appointments/${id}/status`,
        { status }
      );

      setMessage(
        `Appointment status changed to ${status}`
      );

      await fetchAppointments();
    } catch (err) {
      console.error(
        "Status Update Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update appointment status"
      );
    }
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredAppointments =
    appointments.filter((appointment) => {
      if (!isAdmin) {
        return appointment.active !== false;
      }

      if (statusFilter === "ACTIVE") {
        return appointment.active;
      }

      if (statusFilter === "INACTIVE") {
        return !appointment.active;
      }

      return true;
    });

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(
        `${date}T00:00:00`
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (time) => {
    if (!time) return "-";

    try {
      const [hours, minutes] = time
        .substring(0, 5)
        .split(":");

      const date = new Date();

      date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
      );

      return date.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return time.substring(0, 5);
    }
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-[#fff4df] text-[#b87300]";

      case "CONFIRMED":
        return "bg-[#e8f6f2] text-[#006b55]";

      case "COMPLETED":
        return "bg-[#e5f6ef] text-[#16835f]";

      case "CANCELLED":
        return "bg-[#fff0f0] text-[#c04444]";

      default:
        return "bg-[#f0f3f4] text-[#66747e]";
    }
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
              MEDICARE HEALTHCARE PORTAL
            </span>

            <h1 className="mt-2 text-4xl font-bold tracking-[-1.2px] text-[#102333] sm:text-5xl">
              {isPatient
                ? "My Appointments"
                : "Appointments"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#73818d]">
              {isPatient
                ? "View and manage your healthcare appointments."
                : "Manage and organize hospital appointments."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={fetchAppointments}
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 border border-[#d9e5e2] bg-white px-6 text-sm font-semibold text-[#006b55] shadow-[0_4px_14px_rgba(16,35,51,0.05)] transition-all hover:border-[#006b55] hover:bg-[#f4faf8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-base">
                ↻
              </span>

              Refresh
            </button>

            {(isPatient || isAdmin) && (
              <button
                type="button"
                onClick={() => {
                  if (showForm) {
                    resetForm();
                    setShowForm(false);
                  } else {
                    openCreateForm();
                  }
                }}
                className="inline-flex h-12 items-center justify-center gap-2 bg-[#006b55] px-7 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(0,107,85,0.18)] transition-all hover:bg-[#004f40]"
              >
                <span className="text-lg">
                  {showForm ? "×" : "+"}
                </span>

                {showForm
                  ? "Close"
                  : isPatient
                    ? "Book Appointment"
                    : "Create Appointment"}
              </button>
            )}

          </div>
        </section>

        {/* =================================================
            ALERTS
        ================================================= */}

        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#cce9df] bg-[#effaf6] px-5 py-4 text-sm text-[#08765d]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d8f1e9] font-bold">
              ✓
            </span>

            <span className="font-medium">
              {message}
            </span>

            <button
              type="button"
              onClick={() => setMessage("")}
              className="ml-auto text-lg text-[#6c9389]"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#f1cccc] bg-[#fff6f6] px-5 py-4 text-sm text-[#a33838]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fbe0e0] font-bold">
              !
            </span>

            <span className="font-medium">
              {error}
            </span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto text-lg text-[#a33838]"
            >
              ×
            </button>
          </div>
        )}

        {/* =================================================
            STATISTICS
        ================================================= */}

        {!loading && (
          <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* TOTAL */}

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f6f2] text-lg text-[#006b55]">
                  📅
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                    Total Appointments
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#102333]">
                    {statistics.total}
                  </p>
                </div>

              </div>
            </div>

            {/* SCHEDULED */}

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4df] text-lg text-[#b87300]">
                  ◷
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                    Scheduled
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#102333]">
                    {statistics.scheduled}
                  </p>
                </div>

              </div>
            </div>

            {/* CONFIRMED */}

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f6f2] text-lg text-[#006b55]">
                  ✓
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                    Confirmed
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#102333]">
                    {statistics.confirmed}
                  </p>
                </div>

              </div>
            </div>

            {/* COMPLETED */}

            <div className="rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_5px_18px_rgba(16,35,51,0.05)]">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f6ef] text-lg text-[#16835f]">
                  ✓
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73818d]">
                    Completed
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#102333]">
                    {statistics.completed}
                  </p>
                </div>

              </div>
            </div>

          </section>
        )}

        {/* =================================================
            ADMIN STATUS FILTER
        ================================================= */}

        {isAdmin && (
          <section className="mb-7 rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_5px_18px_rgba(16,35,51,0.05)] sm:p-6">

            <div className="mb-5">
              <span className="text-[10px] font-bold tracking-[0.16em] text-[#006b55]">
                RECORD FILTER
              </span>

              <h2 className="mt-1 text-xl font-bold text-[#102333]">
                Appointment Status
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">

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
                  className={
                    statusFilter === value
                      ? "h-11 rounded-lg bg-[#006b55] px-7 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(0,107,85,0.18)]"
                      : "h-11 rounded-lg border border-[#dce7e4] bg-white px-7 text-sm font-medium text-[#536474] transition-all hover:border-[#006b55] hover:text-[#006b55]"
                  }
                >
                  {label}
                </button>
              ))}

            </div>
          </section>
        )}

        {/* =================================================
            CREATE / EDIT FORM
        ================================================= */}

        {showForm && (isAdmin || isPatient) && (
          <section className="mb-8 overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.06)]">

            <div className="border-b border-[#e3ecea] bg-[#f8fbfa] px-6 py-6 sm:px-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg text-[#006b55]">
                  📅
                </div>

                <div>
                  <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                    {editingId
                      ? "UPDATE APPOINTMENT"
                      : "NEW APPOINTMENT"}
                  </span>

                  <h2 className="mt-1 text-2xl font-bold text-[#102333]">
                    {isPatient
                      ? "Book an Appointment"
                      : editingId
                        ? "Edit Appointment"
                        : "Create Appointment"}
                  </h2>

                  <p className="mt-1 text-sm text-[#73818d]">
                    Enter the appointment details below.
                  </p>
                </div>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8"
            >

              <div className="grid gap-5 md:grid-cols-2">

                {/* DATE */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#536474]">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-lg border border-[#dce7e4] bg-white px-4 text-sm text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-2 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* TIME */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#536474]">
                    Appointment Time
                  </label>

                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-lg border border-[#dce7e4] bg-white px-4 text-sm text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-2 focus:ring-[#006b55]/10"
                  />
                </div>

                {/* PATIENT - ADMIN */}

                {isAdmin && (
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#536474]">
                      Patient
                    </label>

                    <select
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-lg border border-[#dce7e4] bg-white px-4 text-sm text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-2 focus:ring-[#006b55]/10"
                    >
                      <option value="">
                        Select patient
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
                )}

                {/* DOCTOR */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#536474]">
                    Doctor
                  </label>

                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-lg border border-[#dce7e4] bg-white px-4 text-sm text-[#102333] outline-none transition-all focus:border-[#006b55] focus:ring-2 focus:ring-[#006b55]/10"
                  >
                    <option value="">
                      Select doctor
                    </option>

                    {doctors.map((doctor) => (
                      <option
                        key={doctor.id}
                        value={doctor.id}
                      >
                        {doctor.name}
                        {" — "}
                        {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                {/* REASON */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#536474]">
                    Reason for Visit
                  </label>

                  <textarea
                    name="reason"
                    rows="4"
                    maxLength="500"
                    placeholder="Briefly describe the reason for your appointment..."
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-[#dce7e4] bg-white px-4 py-3 text-sm leading-6 text-[#102333] outline-none transition-all placeholder:text-[#9aa6ae] focus:border-[#006b55] focus:ring-2 focus:ring-[#006b55]/10"
                  />

                  <p className="mt-2 text-[10px] text-[#73818d]">
                    Maximum 500 characters
                  </p>

                </div>

              </div>

              {/* FORM ACTIONS */}

              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#edf2f0] pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="h-11 rounded-lg border border-[#dce7e4] bg-white px-7 text-sm font-semibold text-[#536474] transition-all hover:border-[#9fb5af] hover:bg-[#f8fbfa] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-11 rounded-lg bg-[#006b55] px-8 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(0,107,85,0.18)] transition-all hover:bg-[#004f40] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : isPatient
                      ? "Book Appointment"
                      : editingId
                        ? "Update Appointment"
                        : "Create Appointment"}
                </button>

              </div>

            </form>
          </section>
        )}

        {/* =================================================
            APPOINTMENT RECORDS
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.06)]">

          {/* LIST HEADER */}

          <div className="flex flex-col gap-4 border-b border-[#e3ecea] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <div>
              <span className="text-[9px] font-bold tracking-[0.16em] text-[#006b55]">
                APPOINTMENT RECORDS
              </span>

              <h2 className="mt-1 text-2xl font-bold text-[#102333]">
                {isPatient
                  ? "Your Appointments"
                  : "Appointment List"}
              </h2>

              <p className="mt-1 text-sm text-[#73818d]">
                {appointments.length === 0
                  ? "No appointments available."
                  : `${appointments.length} appointment${
                      appointments.length !== 1
                        ? "s"
                        : ""
                    } found`}
              </p>
            </div>

            <div className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-[#e8f6f2] px-4 text-sm font-bold text-[#006b55]">
              {appointments.length}
            </div>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4">

              <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#dceae7] border-t-[#006b55]" />

              <strong className="text-sm text-[#536474]">
                Loading appointments...
              </strong>

              <span className="text-xs text-[#73818d]">
                Please wait while we fetch your records.
              </span>

            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            filteredAppointments.length === 0 && (
              <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f6f2] text-2xl text-[#006b55]">
                  📅
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#102333]">
                  No appointments found
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#73818d]">
                  {isPatient
                    ? "You don't have any appointments yet."
                    : statusFilter === "INACTIVE"
                      ? "There are no inactive appointments."
                      : statusFilter === "ACTIVE"
                        ? "There are no active appointments."
                        : "There are currently no appointments in the system."}
                </p>

                {(isPatient || isAdmin) && (
                  <button
                    type="button"
                    onClick={openCreateForm}
                    className="mt-6 h-11 rounded-lg bg-[#006b55] px-7 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(0,107,85,0.18)] transition-all hover:bg-[#004f40]"
                  >
                    +
                    {" "}
                    {isPatient
                      ? "Book Appointment"
                      : "Create Appointment"}
                  </button>
                )}

              </div>
            )}

          {/* TABLE */}

          {!loading &&
            filteredAppointments.length > 0 && (
              <div className="overflow-x-auto">

                <table className="min-w-[1150px] w-full border-collapse">

                  <thead>
                    <tr className="border-b border-[#e3ecea] bg-[#f5f9f8]">

                      <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                        ID
                      </th>

                      <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                        Date & Time
                      </th>

                      {isAdmin && (
                        <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                          Patient
                        </th>
                      )}

                      <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                        Doctor
                      </th>

                      <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                        Reason
                      </th>

                      <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                        Status
                      </th>

                      {isAdmin && (
                        <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                          Record Status
                        </th>
                      )}

                      {isAdmin && (
                        <th className="px-5 py-5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#647584]">
                          Actions
                        </th>
                      )}

                    </tr>
                  </thead>

                  <tbody>

                    {filteredAppointments.map(
                      (appointment) => (
                        <tr
                          key={appointment.id}
                          className="border-b border-[#edf2f0] transition-colors last:border-b-0 hover:bg-[#f8fbfa]"
                        >

                          {/* ID */}

                          <td className="px-5 py-5 align-top">
                            <span className="text-sm font-bold text-[#73818d]">
                              #{appointment.id}
                            </span>
                          </td>

                          {/* DATE / TIME */}

                          <td className="px-5 py-5 align-top">

                            <div className="min-w-[125px]">
                              <strong className="block text-sm font-semibold text-[#102333]">
                                {formatDate(
                                  appointment.appointmentDate
                                )}
                              </strong>

                              <span className="mt-1 block text-xs text-[#73818d]">
                                {formatTime(
                                  appointment.appointmentTime
                                )}
                              </span>
                            </div>

                          </td>

                          {/* PATIENT */}

                          {isAdmin && (
                            <td className="px-5 py-5 align-top">

                              <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f6f2] text-xs font-bold text-[#006b55]">
                                  {appointment.patientName
                                    ?.charAt(0)
                                    ?.toUpperCase() || "P"}
                                </div>

                                <span className="text-sm font-semibold text-[#102333]">
                                  {appointment.patientName ||
                                    "-"}
                                </span>

                              </div>

                            </td>
                          )}

                          {/* DOCTOR */}

                          <td className="px-5 py-5 align-top">

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf1fb] text-sm text-[#536ba8]">
                                ⚕
                              </div>

                              <div>
                                <strong className="block text-sm font-semibold text-[#102333]">
                                  {appointment.doctorName ||
                                    "-"}
                                </strong>

                                <span className="mt-1 block text-[11px] text-[#73818d]">
                                  {appointment.specialization ||
                                    "General"}
                                </span>
                              </div>

                            </div>

                          </td>

                          {/* REASON */}

                          <td className="max-w-[220px] px-5 py-5 align-top">

                            <span className="block text-sm leading-5 text-[#536474]">
                              {appointment.reason ||
                                "General consultation"}
                            </span>

                          </td>

                          {/* APPOINTMENT STATUS */}

                          <td className="px-5 py-5 align-top">

                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.06em] ${getStatusStyle(
                                appointment.status
                              )}`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />

                              {appointment.status ||
                                "UNKNOWN"}
                            </span>

                          </td>

                          {/* RECORD STATUS */}

                          {isAdmin && (
                            <td className="px-5 py-5 align-top">

                              <span
                                className={
                                  appointment.active
                                    ? "inline-flex items-center gap-2 rounded-full bg-[#e5f6ef] px-3 py-1.5 text-[9px] font-bold text-[#16835f]"
                                    : "inline-flex items-center gap-2 rounded-full bg-[#fff0f0] px-3 py-1.5 text-[9px] font-bold text-[#c04444]"
                                }
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />

                                {appointment.active
                                  ? "Active"
                                  : "Inactive"}
                              </span>

                            </td>
                          )}

                          {/* ACTIONS */}

                          {isAdmin && (
                            <td className="px-5 py-5 align-top">

                              <div className="flex min-w-[360px] flex-wrap gap-2">

                                {/* EDIT */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEdit(
                                      appointment
                                    )
                                  }
                                  className="rounded-lg border border-[#dce7e4] bg-white px-3.5 py-2 text-xs font-semibold text-[#006b55] transition-all hover:border-[#006b55] hover:bg-[#f2faf7]"
                                >
                                  Edit
                                </button>

                                {/* DEACTIVATE / RESTORE */}

                                {appointment.active ? (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeactivate(
                                        appointment.id
                                      )
                                    }
                                    className="rounded-lg border border-[#efcaca] bg-white px-3.5 py-2 text-xs font-semibold text-[#c04444] transition-all hover:bg-[#fff5f5]"
                                  >
                                    Deactivate
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRestore(
                                        appointment.id
                                      )
                                    }
                                    className="rounded-lg bg-[#006b55] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#004f40]"
                                  >
                                    Restore
                                  </button>
                                )}

                                {/* CONFIRM / CANCEL */}

                                {appointment.status ===
                                  "SCHEDULED" && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleStatusChange(
                                          appointment.id,
                                          "CONFIRMED"
                                        )
                                      }
                                      className="rounded-lg bg-[#006b55] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#004f40]"
                                    >
                                      Confirm
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleStatusChange(
                                          appointment.id,
                                          "CANCELLED"
                                        )
                                      }
                                      className="rounded-lg border border-[#efcaca] bg-white px-3.5 py-2 text-xs font-semibold text-[#c04444] transition-all hover:bg-[#fff5f5]"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}

                                {/* COMPLETE */}

                                {appointment.status ===
                                  "CONFIRMED" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleStatusChange(
                                        appointment.id,
                                        "COMPLETED"
                                      )
                                    }
                                    className="rounded-lg bg-[#16835f] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#116b4e]"
                                  >
                                    Complete
                                  </button>
                                )}

                              </div>

                            </td>
                          )}

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

        </section>

        {/* =================================================
            SECURITY FOOTER
        ================================================= */}

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#dbeae6] bg-[#eef8f5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#006b55] text-lg text-white">
              +
            </div>

            <div>
              <strong className="block text-xs font-bold text-[#102333]">
                MediCare Healthcare Portal
              </strong>

              <p className="mt-1 text-[10px] leading-5 text-[#73818d]">
                Appointment information is protected
                through secure authentication.
              </p>
            </div>

          </div>

          <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#16835f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16835f]" />
            SECURE
          </div>

        </div>

      </div>
    </main>
  );
}

export default Appointments;