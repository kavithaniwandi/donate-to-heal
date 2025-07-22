import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

import Home from "./pages/guest/Home";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";

import MedicalOfficerDashboard from "./pages/medicalOfficer/MedicalOfficerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DonorDashboard from "./pages/donor/DonorDashboard";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientRegister from "./pages/patient/patientRegister";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/medical-officer-dashboard" element={<MedicalOfficerDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/donor-dashboard" element={<DonorDashboard />} />
                <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                
                <Route path="/register/patient" element={<PatientRegister />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;