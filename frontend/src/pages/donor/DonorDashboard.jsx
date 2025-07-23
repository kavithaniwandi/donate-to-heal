import { useState } from 'react';

// Inline Navbar component
function Navbar() {
    return (
        <nav className="bg-blue-700 text-white px-6 py-3 shadow">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-lg font-semibold">Donate-to-Heal</h1>
                <div className="space-x-4">
                    <button className="hover:underline">Home</button>
                    <button className="hover:underline">Dashboard</button>
                    <button className="hover:underline">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default function DonorDashboard() {
    const [view, setView] = useState('list');
    const [selectedSeeker, setSelectedSeeker] = useState(null);
    const [formData, setFormData] = useState({
        moneyDonation: {
            patientNIC: '',
            hospitalName: '',
            wardNumber: '',
            amount: '',
            paymentMethod: 'card',
            description: ''
        },
        medicineDonation: {
            courierSlipNumber: '',
            medicineDetails: '',
            quantity: '',
            expiryDate: '',
            courierService: '',
            trackingNumber: '',
            additionalNotes: ''
        }
    });

    const donationSeekers = [
        { id: 1, name: 'Amal Perera', need: 'Kidney Treatment' },
        { id: 2, name: 'Nirmala Fernando', need: 'Heart Surgery' },
        { id: 3, name: 'Ruwan Jayasuriya', need: 'Cancer Medication' },
    ];

    const donationHistory = [
        { id: 1, type: 'Money', amount: 'LKR 5000', seeker: 'Amal Perera', date: '2025-07-15' },
        { id: 2, type: 'Medicine', seeker: 'Nirmala Fernando', courier: 'DHL-001122', date: '2025-07-10' },
    ];

    const handleDonateClick = (seeker) => {
        setSelectedSeeker(seeker);
        setView('choose');
    };

    const handleDonationType = (type) => {
        setView(type);
    };

    const handleFormChange = (type, field, value) => {
        setFormData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));
    };

    const handleMoneyDonationSubmit = (e) => {
        e.preventDefault();
        console.log('Money donation:', formData.moneyDonation);
        alert('Money donation submitted successfully!');
        setView('list');
    };

    const handleMedicineDonationSubmit = (e) => {
        e.preventDefault();
        console.log('Medicine donation:', formData.medicineDonation);
        alert('Medicine donation submitted successfully!');
        setView('list');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center text-blue-700">Donor Dashboard</h1>

                {view === 'list' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Donation Seekers</h2>
                        <ul className="space-y-4">
                            {donationSeekers.map((seeker) => (
                                <li key={seeker.id} className="p-4 border rounded shadow flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{seeker.name}</p>
                                        <p className="text-sm text-gray-600">{seeker.need}</p>
                                    </div>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        onClick={() => handleDonateClick(seeker)}
                                    >
                                        Donate
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {view === 'choose' && selectedSeeker && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-center">
                            Choose Donation Type for {selectedSeeker.name}
                        </h2>
                        <div className="flex justify-center gap-6">
                            <button
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                                onClick={() => handleDonationType('money')}
                            >
                                Donate Money
                            </button>
                            <button
                                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                                onClick={() => handleDonationType('medicine')}
                            >
                                Donate Medicine
                            </button>
                        </div>
                    </div>
                )}

                {view === 'money' && selectedSeeker && (
                    <div className="bg-white p-6 border rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Money Donation for {selectedSeeker.name}
                        </h2>
                        <form onSubmit={handleMoneyDonationSubmit} className="space-y-4">
                            <input
                                className="w-full border p-2 rounded"
                                type="text"
                                placeholder="Patient NIC"
                                value={formData.moneyDonation.patientNIC}
                                onChange={(e) => handleFormChange('moneyDonation', 'patientNIC', e.target.value)}
                                required
                            />
                            <input
                                className="w-full border p-2 rounded"
                                type="text"
                                placeholder="Hospital Name"
                                value={formData.moneyDonation.hospitalName}
                                onChange={(e) => handleFormChange('moneyDonation', 'hospitalName', e.target.value)}
                                required
                            />
                            <input
                                className="w-full border p-2 rounded"
                                type="text"
                                placeholder="Ward Number"
                                value={formData.moneyDonation.wardNumber}
                                onChange={(e) => handleFormChange('moneyDonation', 'wardNumber', e.target.value)}
                            />
                            <input
                                className="w-full border p-2 rounded"
                                type="number"
                                placeholder="Amount (LKR)"
                                value={formData.moneyDonation.amount}
                                onChange={(e) => handleFormChange('moneyDonation', 'amount', e.target.value)}
                                required
                            />
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.moneyDonation.paymentMethod}
                                onChange={(e) => handleFormChange('moneyDonation', 'paymentMethod', e.target.value)}
                            >
                                <option value="card">Credit/Debit Card</option>
                                <option value="bank">Bank Transfer</option>
                            </select>
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Additional Notes"
                                rows="3"
                                value={formData.moneyDonation.description}
                                onChange={(e) => handleFormChange('moneyDonation', 'description', e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Proceed to Payment
                            </button>
                        </form>
                    </div>
                )}

                {view === 'medicine' && selectedSeeker && (
                    <div className="bg-white p-6 border rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Medicine Donation for {selectedSeeker.name}
                        </h2>
                        <form onSubmit={handleMedicineDonationSubmit} className="space-y-4">
                            <input
                                className="w-full border p-2 rounded"
                                type="text"
                                placeholder="Courier Slip Number"
                                value={formData.medicineDonation.courierSlipNumber}
                                onChange={(e) => handleFormChange('medicineDonation', 'courierSlipNumber', e.target.value)}
                                required
                            />
                            <input
                                className="w-full border p-2 rounded"
                                type="text"
                                placeholder="Medicine Details"
                                value={formData.medicineDonation.medicineDetails}
                                onChange={(e) => handleFormChange('medicineDonation', 'medicineDetails', e.target.value)}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="border p-2 rounded"
                                    type="number"
                                    placeholder="Quantity"
                                    value={formData.medicineDonation.quantity}
                                    onChange={(e) => handleFormChange('medicineDonation', 'quantity', e.target.value)}
                                    required
                                />
                                <input
                                    className="border p-2 rounded"
                                    type="date"
                                    placeholder="Expiry Date"
                                    value={formData.medicineDonation.expiryDate}
                                    onChange={(e) => handleFormChange('medicineDonation', 'expiryDate', e.target.value)}
                                    required
                                />
                            </div>
                            <input
                                className="w-full border p-2 rounded"
                                type="text"
                                placeholder="Courier Service"
                                value={formData.medicineDonation.courierService}
                                onChange={(e) => handleFormChange('medicineDonation', 'courierService', e.target.value)}
                                required
                            />
                            <input
                                className="w-full border p-2 rounded"
                                type="text"
                                placeholder="Tracking Number"
                                value={formData.medicineDonation.trackingNumber}
                                onChange={(e) => handleFormChange('medicineDonation', 'trackingNumber', e.target.value)}
                                required
                            />
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Additional Notes"
                                rows="3"
                                value={formData.medicineDonation.additionalNotes}
                                onChange={(e) => handleFormChange('medicineDonation', 'additionalNotes', e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                            >
                                Submit Donation
                            </button>
                        </form>
                    </div>
                )}

                <div className="pt-8">
                    <h2 className="text-xl font-semibold mb-4">Donation History</h2>
                    <ul className="space-y-3">
                        {donationHistory.map((donation) => (
                            <li key={donation.id} className="p-4 border rounded bg-gray-50">
                                <p className="font-medium">Type: {donation.type}</p>
                                <p>Recipient: {donation.seeker}</p>
                                {donation.amount && <p>Amount: {donation.amount}</p>}
                                {donation.courier && <p>Courier: {donation.courier}</p>}
                                <p>Date: {donation.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
