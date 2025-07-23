// src/components/HospitalDashboard.jsx
import React from "react";
import HospitalUserProfile from "./HospitalUserProfile";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const staffOfficers = [
  {
    id: 1,
    name: "Kamal Athapaththu",
    patients: 20,
    email: "kamalathapaththu@gmail.com",
    contact: "0761212121",
  },
  {
    id: 2,
    name: "Nimal Perera",
    patients: 35,
    email: "nimalperera@gmail.com",
    contact: "0763939393",
  },
  {
    id: 3,
    name: "Anjali Silva",
    patients: 15,
    email: "anjalisilva@gmail.com",
    contact: "0764567890",
  },
  {
    id: 4,
    name: "Sameera Fernando",
    patients: 25,
    email: "sameerafernando@gmail.com",
    contact: "0769876543",
  },
];

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f472b6"];

export default function HospitalDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Main Header */}
      <div className="text-center text-4xl font-extrabold text-gray-800">
        <h1>Hospital Dashboard</h1>
      </div>

      {/* Subheader */}
      <div className="text-center text-2xl font-bold text-green-700">
        <h2>Colombo General Hospital Dashboard</h2>
        <p className="text-sm text-gray-600">
          {staffOfficers.length} Registered Medical Officer
          {staffOfficers.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Medical Officers</h2>
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Patients Registered</th>
              <th className="p-3">Email</th>
              <th className="p-3">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {staffOfficers.map((officer) => (
              <tr key={officer.id} className="border-b hover:bg-green-50">
                <td className="p-3">{officer.id}</td>
                <td className="p-3">{officer.name}</td>
                <td className="p-3">{officer.patients}</td>
                <td className="p-3">{officer.email}</td>
                <td className="p-3">{officer.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Patients Registered Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={staffOfficers}
              dataKey="patients"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {staffOfficers.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
