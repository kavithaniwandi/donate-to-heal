import { useState } from 'react';

// Mock patient database
const mockPatients = [
    {
        nic: '123456789V',
        name: 'John Doe',
        birthDate: '1985-05-15',
        gender: 'Male',
        phone: '0771234567',
        address: '123 Main St, Colombo'
    },
    {
        nic: '987654321V',
        name: 'Jane Smith',
        birthDate: '1990-11-22',
        gender: 'Female',
        phone: '0769876543',
        address: '456 Oak Ave, Kandy'
    }
];

export default function PatientCaseForm() {
    const [formData, setFormData] = useState({
        patientNIC: '',
        patientId: '',
        name: '',
        birthDate: '',
        gender: '',
        phone: '',
        address: '',
        caseDescription: '',
        medicalCondition: '',
        gramaSevOfficerName: '',
        gramaSevaDivision: '',
        prescriptions: [{ prescriptionDate: '', doctorName: '' }],
        medicalReports: [{ reportType: '' }],
        gramaSevaCertificate: null,
        priority: 'Medium'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, gramaSevaCertificate: e.target.files[0] }));
    };

    const handlePrescriptionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPrescriptions = [...formData.prescriptions];
        updatedPrescriptions[index][name] = value;
        setFormData(prev => ({ ...prev, prescriptions: updatedPrescriptions }));
    };

    const handleReportChange = (index, e) => {
        const { name, value } = e.target;
        const updatedReports = [...formData.medicalReports];
        updatedReports[index][name] = value;
        setFormData(prev => ({ ...prev, medicalReports: updatedReports }));
    };

    const addPrescription = () => {
        setFormData(prev => ({
            ...prev,
            prescriptions: [...prev.prescriptions, { prescriptionDate: '', doctorName: '' }]
        }));
    };

    const addMedicalReport = () => {
        setFormData(prev => ({
            ...prev,
            medicalReports: [...prev.medicalReports, { reportType: '' }]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const searchByNIC = (e) => {
        e.preventDefault();
        const foundPatient = mockPatients.find(patient => patient.nic === formData.patientNIC);
        
        if (foundPatient) {
            setFormData(prev => ({
                ...prev,
                name: foundPatient.name,
                birthDate: foundPatient.birthDate,
                gender: foundPatient.gender,
                phone: foundPatient.phone,
                address: foundPatient.address
            }));
        } else {
            alert('Patient not found with this NIC');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center text-2xl font-bold mb-8">
                <h1>Create New Patient Case</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {/* Patient Information */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Patient Information</h2>

                    <div className="flex items-end gap-4 mb-6">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2" htmlFor="patientNIC">
                                Search by NIC
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="patientNIC"
                                    name="patientNIC"
                                    value={formData.patientNIC}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter patient NIC"
                                />
                                <button
                                    onClick={searchByNIC}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="birthDate">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="gender">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2" htmlFor="address">
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="2"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Rest of your form remains exactly the same */}
                {/* Case Details */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Case Details</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="caseDescription">
                                Case Description
                            </label>
                            <textarea
                                id="caseDescription"
                                name="caseDescription"
                                value={formData.caseDescription}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="medicalCondition">
                                Medical Condition
                            </label>
                            <input
                                type="text"
                                id="medicalCondition"
                                name="medicalCondition"
                                value={formData.medicalCondition}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="priority">
                                Priority
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grama Seva Verification */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Grama Seva Verification</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="gramaSevOfficerName">
                                Grama Seva Officer Name
                            </label>
                            <input
                                type="text"
                                id="gramaSevOfficerName"
                                name="gramaSevOfficerName"
                                value={formData.gramaSevOfficerName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="gramaSevaDivision">
                                Grama Seva Division
                            </label>
                            <input
                                type="text"
                                id="gramaSevaDivision"
                                name="gramaSevaDivision"
                                value={formData.gramaSevaDivision}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2" htmlFor="gramaSevaCertificate">
                                Grama Seva Certificate
                            </label>
                            <input
                                type="file"
                                id="gramaSevaCertificate"
                                name="gramaSevaCertificate"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Prescriptions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Prescriptions</h2>
                    {formData.prescriptions.map((prescription, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor={`prescriptionDate-${index}`}>
                                        Prescription Date
                                    </label>
                                    <input
                                        type="date"
                                        id={`prescriptionDate-${index}`}
                                        name="prescriptionDate"
                                        value={prescription.prescriptionDate}
                                        onChange={(e) => handlePrescriptionChange(index, e)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor={`doctorName-${index}`}>
                                        Doctor Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`doctorName-${index}`}
                                        name="doctorName"
                                        value={prescription.doctorName}
                                        onChange={(e) => handlePrescriptionChange(index, e)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2" htmlFor={`prescriptionFile-${index}`}>
                                        Prescription File
                                    </label>
                                    <input
                                        type="file"
                                        id={`prescriptionFile-${index}`}
                                        name="prescriptionFile"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addPrescription}
                        className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        + Add Another Prescription
                    </button>
                </div>

                {/* Medical Reports */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Medical Reports</h2>
                    {formData.medicalReports.map((report, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor={`reportType-${index}`}>
                                        Report Type
                                    </label>
                                    <select
                                        id={`reportType-${index}`}
                                        name="reportType"
                                        value={report.reportType}
                                        onChange={(e) => handleReportChange(index, e)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Report Type</option>
                                        <option value="Lab Report">Lab Report</option>
                                        <option value="X-Ray">X-Ray</option>
                                        <option value="Prescription">Prescription</option>
                                        <option value="Medical Certificate">Medical Certificate</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor={`reportFile-${index}`}>
                                        Report File
                                    </label>
                                    <input
                                        type="file"
                                        id={`reportFile-${index}`}
                                        name="reportFile"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addMedicalReport}
                        className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        + Add Another Medical Report
                    </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Case
                    </button>
                </div>
            </form>
        </div>
    );
}