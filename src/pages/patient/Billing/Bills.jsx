import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/useAuth";

function Bills() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [bills, setBills] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [formData, setFormData] = useState({
    amount: "",
    appointmentId: "",
  });

  // =========================
  // FETCH BILLS
  // =========================

  const fetchBills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        isAdmin ? "/api/bills/all" : "/api/bills"
      );

      setBills(response.data);
    } catch (error) {
      console.error("Bills Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load bills"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH APPOINTMENTS
  // =========================

  const fetchAppointments = async () => {
    try {
      const response =
        await api.get("/api/appointments");

      setAppointments(response.data);
    } catch (error) {
      console.error(
        "Appointments Error:",
        error
      );
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchBills();
    fetchAppointments();
  }, [isAdmin]);

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
      amount: "",
      appointmentId: "",
    });

    setEditingId(null);
  };

  // =========================
  // CREATE / UPDATE BILL
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const requestData = {
        amount: Number(formData.amount),
        appointmentId:
          Number(formData.appointmentId),
      };

      if (editingId) {
        await api.put(
          `/api/bills/${editingId}`,
          requestData
        );

        setMessage(
          "Bill updated successfully!"
        );
      } else {
        await api.post(
          "/api/bills",
          requestData
        );

        setMessage(
          "Bill created successfully!"
        );
      }

      resetForm();
      setShowForm(false);

      await fetchBills();
    } catch (error) {
      console.error(
        "Save Bill Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to save bill"
      );
    }
  };

  // =========================
  // EDIT BILL
  // =========================

  const handleEdit = (bill) => {
    setEditingId(bill.id);

    setFormData({
      amount: bill.amount,
      appointmentId: bill.appointmentId,
    });

    setShowForm(true);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DEACTIVATE BILL
  // =========================

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this bill?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await api.delete(`/api/bills/${id}`);

      setMessage(
        "Bill deactivated successfully."
      );

      await fetchBills();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to deactivate bill"
      );
    }
  };

  // =========================
  // RESTORE BILL
  // =========================

  const handleRestore = async (id) => {
    try {
      setError("");
      setMessage("");

      await api.patch(
        `/api/bills/${id}/restore`
      );

      setMessage(
        "Bill restored successfully."
      );

      await fetchBills();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to restore bill"
      );
    }
  };

  // =========================
  // UPDATE PAYMENT STATUS
  // =========================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      setError("");
      setMessage("");

      await api.patch(
        `/api/bills/${id}/status`,
        {
          status,
        }
      );

      setMessage(
        `Payment status changed to ${status}`
      );

      await fetchBills();
    } catch (error) {
      console.error(
        "Payment Status Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update payment status"
      );
    }
  };

  // =========================
  // FILTER
  // =========================

  const filteredBills = bills.filter((bill) => {
    if (statusFilter === "ACTIVE") {
      return bill.active;
    }

    if (statusFilter === "INACTIVE") {
      return !bill.active;
    }

    return true;
  });

  const activeBills = bills.filter(
    (bill) => bill.active
  );

  const inactiveBills = bills.filter(
    (bill) => !bill.active
  );

  const pendingBills = bills.filter(
    (bill) =>
      bill.paymentStatus === "PENDING"
  );

  const paidBills = bills.filter(
    (bill) =>
      bill.paymentStatus === "PAID"
  );

  const totalAmount = bills.reduce(
    (sum, bill) =>
      sum + Number(bill.amount || 0),
    0
  );

  // =========================
  // PAYMENT BADGE
  // =========================

  const getPaymentClasses = (status) => {
    if (status === "PAID") {
      return "bg-[#e8f6f2] text-[#16835f]";
    }

    if (status === "PENDING") {
      return "bg-[#fff5d9] text-[#a36b00]";
    }

    return "bg-red-50 text-[#d64545]";
  };

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
                Billing
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#73818d] sm:text-base">
                Manage patient bills, appointment charges
                and payment status securely.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (showForm) {
                  resetForm();
                  setShowForm(false);
                } else {
                  resetForm();
                  setShowForm(true);
                }

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
                : "Create Bill"}
            </button>

          </div>
        </section>

        {/* =========================
            ALERTS
        ========================= */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#b9e5d9] bg-[#e8f6f2] px-4 py-3 text-sm text-[#005b49]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16835f] text-xs font-bold text-white">
              ✓
            </span>

            <p>{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              !
            </span>

            <p>{error}</p>
          </div>
        )}

        {/* =========================
            STAT CARDS
        ========================= */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#73818d]">
                  Total Bills
                </p>

                <p className="mt-2 text-3xl font-bold text-[#102333]">
                  {bills.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                ₹
              </div>

            </div>
          </div>

          {/* TOTAL AMOUNT */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#73818d]">
                  Total Amount
                </p>

                <p className="mt-2 text-2xl font-bold text-[#102333]">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-xl font-bold text-[#006b55]">
                ₹
              </div>

            </div>
          </div>

          {/* PAID */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#73818d]">
                  Paid Bills
                </p>

                <p className="mt-2 text-3xl font-bold text-[#16835f]">
                  {paidBills.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f2] text-lg text-[#16835f]">
                ✓
              </div>

            </div>
          </div>

          {/* PENDING */}

          <div className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_4px_14px_rgba(16,35,51,0.06)]">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#73818d]">
                  Pending Payments
                </p>

                <p className="mt-2 text-3xl font-bold text-[#a36b00]">
                  {pendingBills.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff5d9] text-lg text-[#a36b00]">
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
                MediCare · Billing
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {editingId
                  ? "Edit Bill"
                  : "Create New Bill"}
              </h2>

              <p className="mt-1 text-sm text-white/75">
                Enter the appointment and billing amount.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-7"
            >

              <div className="grid gap-5 md:grid-cols-2">

                {/* AMOUNT */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Amount
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#73818d]">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      min="0.01"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#d7e5e2] bg-white py-3 pl-9 pr-4 text-sm text-[#102333] outline-none transition focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                    />

                  </div>
                </div>

                {/* APPOINTMENT */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#102333]">
                    Appointment
                  </label>

                  <select
                    name="appointmentId"
                    value={formData.appointmentId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#d7e5e2] bg-white px-4 py-3 text-sm text-[#102333] outline-none transition focus:border-[#006b55] focus:ring-4 focus:ring-[#006b55]/10"
                  >
                    <option value="">
                      Select Appointment
                    </option>

                    {appointments.map(
                      (appointment) => (
                        <option
                          key={appointment.id}
                          value={appointment.id}
                        >
                          #{appointment.id} -{" "}
                          {appointment.patientName} -{" "}
                          Dr.{" "}
                          {appointment.doctorName} -{" "}
                          {appointment.appointmentDate}
                        </option>
                      )
                    )}

                  </select>
                </div>

              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#e8efed] pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                    setMessage("");
                    setError("");
                  }}
                  className="rounded-xl border border-[#d5e2df] bg-white px-5 py-3 text-sm font-semibold text-[#455565] transition hover:bg-[#f7fafb]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#006b55] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004f40]"
                >
                  {editingId
                    ? "Update Bill"
                    : "Create Bill"}
                </button>

              </div>

            </form>
          </section>
        )}

        {/* =========================
            BILL LIST
        ========================= */}

        <section className="overflow-hidden rounded-2xl border border-[#e3ecea] bg-white shadow-[0_8px_25px_rgba(16,35,51,0.07)]">

          {/* HEADER */}

          <div className="border-b border-[#e3ecea] px-5 py-5 sm:px-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-xl font-bold text-[#102333]">
                    Bill List
                  </h2>

                  <span className="rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-bold text-[#006b55]">
                    {filteredBills.length} bills
                  </span>

                </div>

                <p className="mt-1 text-sm text-[#73818d]">
                  View billing information and payment status.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("ALL");
                  fetchBills();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d5e2df] bg-white px-4 py-2.5 text-sm font-semibold text-[#455565] transition hover:border-[#006b55] hover:text-[#006b55]"
              >
                ↻
                Refresh
              </button>

            </div>

            {/* ADMIN FILTER */}

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

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 py-16">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#d9ebe7] border-t-[#006b55]" />

              <p className="mt-4 text-sm font-medium text-[#73818d]">
                Loading bills...
              </p>

            </div>
          ) : filteredBills.length === 0 ? (

            /* EMPTY */

            <div className="px-5 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f2] text-2xl font-bold text-[#006b55]">
                ₹
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#102333]">
                No bills found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#73818d]">
                There are no bills matching the current
                status filter.
              </p>

            </div>
          ) : (

            /* TABLE */

            <div className="overflow-x-auto">

              <table className="min-w-[1200px] w-full border-collapse">

                <thead>
                  <tr className="bg-[#f5f9f8] text-left">

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      ID
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Bill Date
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Amount
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Appointment
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Patient
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Doctor
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Payment Status
                    </th>

                    {isAdmin && (
                      <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                        Record Status
                      </th>
                    )}

                    <th className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#73818d]">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-[#edf2f1]">

                  {filteredBills.map((bill) => (

                    <tr
                      key={bill.id}
                      className="transition hover:bg-[#f9fcfb]"
                    >

                      <td className="px-5 py-4 text-sm font-bold text-[#102333]">
                        #{bill.id}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-[#455565]">
                        {bill.billDate}
                      </td>

                      <td className="px-5 py-4">

                        <span className="font-bold text-[#102333]">
                          ₹
                          {Number(
                            bill.amount || 0
                          ).toLocaleString("en-IN")}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <span className="rounded-lg bg-[#f1f6f5] px-2.5 py-1.5 text-xs font-bold text-[#006b55]">
                          #{bill.appointmentId}
                        </span>

                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#102333]">
                          {bill.patientName || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#102333]">
                          {bill.doctorName || "—"}
                        </p>
                      </td>

                      {/* PAYMENT STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${getPaymentClasses(
                            bill.paymentStatus
                          )}`}
                        >

                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              bill.paymentStatus ===
                              "PAID"
                                ? "bg-[#16835f]"
                                : bill.paymentStatus ===
                                  "PENDING"
                                ? "bg-[#a36b00]"
                                : "bg-[#d64545]"
                            }`}
                          />

                          {bill.paymentStatus}

                        </span>

                      </td>

                      {/* RECORD STATUS */}

                      {isAdmin && (
                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                              bill.active
                                ? "bg-[#e8f6f2] text-[#16835f]"
                                : "bg-red-50 text-[#d64545]"
                            }`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                bill.active
                                  ? "bg-[#16835f]"
                                  : "bg-[#d64545]"
                              }`}
                            />

                            {bill.active
                              ? "Active"
                              : "Inactive"}

                          </span>

                        </td>
                      )}

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        {isAdmin ? (

                          <div className="flex min-w-[280px] flex-wrap gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(bill)
                              }
                              className="rounded-lg border border-[#cfe0dc] bg-white px-3 py-2 text-xs font-bold text-[#006b55] transition hover:bg-[#e8f6f2]"
                            >
                              Edit
                            </button>

                            {bill.paymentStatus ===
                              "PENDING" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    bill.id,
                                    "PAID"
                                  )
                                }
                                className="rounded-lg bg-[#16835f] px-3 py-2 text-xs font-bold text-white transition hover:opacity-90"
                              >
                                Mark Paid
                              </button>
                            )}

                            {bill.active ? (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeactivate(
                                    bill.id
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
                                    bill.id
                                  )
                                }
                                className="rounded-lg border border-[#b9e5d9] bg-white px-3 py-2 text-xs font-bold text-[#16835f] transition hover:bg-[#e8f6f2]"
                              >
                                Restore
                              </button>
                            )}

                          </div>

                        ) : (

                          bill.paymentStatus ===
                            "PENDING" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  bill.id,
                                  "PAID"
                                )
                              }
                              className="rounded-lg bg-[#16835f] px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
                            >
                              Mark Paid
                            </button>
                          )

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
            FOOTER
        ========================= */}

        <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-[#dce9e6] bg-white px-5 py-4 text-xs text-[#73818d] sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8f6f2] text-[#006b55]">
              ✓
            </span>

            <span>
              Billing information is protected within
              the MediCare healthcare portal.
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

export default Bills;