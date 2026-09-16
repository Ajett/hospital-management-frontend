import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Home from "./pages/public/Home/Home";
import About from "./pages/public/About/About";
import Help from "./pages/public/Help/Help";
import Contact from "./pages/public/Contact/Contact";
import PrivacyPolicy from "./pages/public/Legal/PrivacyPolicy";
import Terms from "./pages/public/Legal/Terms";
import FindDoctor from "./pages/public/Doctors/FindDoctor";
import DoctorProfile from "./pages/public/Doctors/DoctorProfile";
import Hospitals from "./pages/public/Hospitals/Hospitals";
import HospitalProfile from "./pages/public/Hospitals/HospitalProfile";
import Specialities from "./pages/public/Specialities/Specialities";
import Services from "./pages/public/Services/Services";
import HealthLibrary from "./pages/public/HealthLibrary/HealthLibrary";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import OAuth2Callback from "./pages/auth/OAuth2Callback/OAuth2Callback";

import Dashboard from "./pages/patient/Dashboard/Dashboard";
import Patients from "./pages/admin/Patients/Patients";
import Doctors from "./pages/admin/Doctors/Doctors";
import Departments from "./pages/admin/Departments/Departments";
import Appointments from "./pages/patient/Appointments/Appointments";
import MedicalRecords from "./pages/patient/MedicalRecords/MedicalRecords";
import Bills from "./pages/patient/Billing/Bills";
import MyProfile from "./pages/patient/MyProfile/MyProfile";
import HospitalManagement from "./pages/admin/Hospitals/HospitalManagement";
import UserManagement from "./pages/admin/Users/UserManagement";
import NotFound from "./pages/public/System/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import PublicNavbar from "./components/public/PublicNavbar";
import PublicFooter from "./components/public/PublicFooter";

function AppContent() {
  const { pathname } = useLocation();
  const publicPage = pathname === "/" || ["/about","/help","/contact","/privacy","/terms","/find-doctor","/hospitals","/specialities","/services","/health-library"].includes(pathname) || pathname.startsWith("/doctors/") || pathname.startsWith("/hospitals/");
  const authPage = ["/login","/register","/forgot-password","/reset-password","/oauth2/callback"].includes(pathname);

  return (
    <>
      {publicPage && <PublicNavbar />}
      {!publicPage && !authPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospitals/:id" element={<HospitalProfile />} />
        <Route path="/specialities" element={<Specialities />} />
        <Route path="/services" element={<Services />} />
        <Route path="/health-library" element={<HealthLibrary />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path="/medical-records" element={<ProtectedRoute><MedicalRecords /></ProtectedRoute>} />
        <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
        <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/hospital-management" element={<ProtectedRoute allowedRoles={["ADMIN"]}><HospitalManagement /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allowedRoles={["ADMIN"]}><UserManagement /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {publicPage && <PublicFooter />}
    </>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
