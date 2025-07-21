import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

import Home from "./pages/guest/Home";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DonorDashboard from "./pages/donor/DonorDashboard";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/donor-dashboard" element={<DonorDashboard />} />
                <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;