// src/components/HospitalUserProfile.jsx
import React from "react";

export default function HospitalUserProfile({ officer }) {
  return (
    <tr className="hover:bg-gray-100 transition">
      <td className="p-3 border-t">{officer.id}</td>
      <td className="p-3 border-t">{officer.name}</td>
      <td className="p-3 border-t">{officer.patients}</td>
    </tr>
  );
}
