import { useState } from "react";
import axios from "axios";

export default function PatientRegistration() {
    const [formData, setFormData] = useState({
        fullname: "",
        dateofbirth: "",
        nic: "",
        medicalofficer: "",
        gender: "",
        phone: "",
        username: "",
        password: "",
        email: "",
        address: ""
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            if (file) {
                data.append("gramaSewakaCertificate", file);
            }

            const res = await axios.post(
                "http://localhost:5500/patient/", // Change if API URL differs 
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setMessage(`Success: ${res.data.message}`);
            setFormData({
                fullname: "",
                dateofbirth: "",
                nic: "",
                medicalofficer: "",
                gender: "",
                phone: "",
                username: "",
                password: "",
                email: "",
                address: ""
            });
            setFile(null);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to register patient"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">
                Patient Registration
            </h1>

            {message && (
                <p
                    className={`text-center mb-4 ${
                        message.startsWith("Success")
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {message}
                </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name + DOB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateofbirth"
                            value={formData.dateofbirth}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* NIC + Medical Officer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            NIC
                        </label>
                        <input
                            type="text"
                            name="nic"
                            value={formData.nic}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medical Officer
                        </label>
                        <input
                            type="text"
                            name="medicalofficer"
                            value={formData.medicalofficer}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Gender + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Username + Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Certificate Upload */}
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Grama Sewaka Certificate
                    </h3>
                    <div className="mt-1 flex items-center border border-gray-300 rounded-md focus:outline-none">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 h-20px hover:text-blue-500 focus-within:outline-none">
                            <span>Upload Certificate</span>
                            <input
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                                accept=".pdf,.jpg,.jpeg,.png"
                                required
                            />
                        </label>
                        <p className="pl-1 text-sm text-gray-500">
                            or drag and drop
                        </p>
                    </div>
                    {file && (
                        <p className="text-gray-600 mt-1 text-sm">
                            Selected file: {file.name}
                        </p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {loading ? "Registering..." : "Register Patient"}
                    </button>
                </div>
            </form>
        </div>
    );
}
