// ... imports remain unchanged
import { useState } from 'react';

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
            DonationRequestID: '',
            CashDonationID: '',
            amount: '',
            Status: 'Pending'
        },
        medicineDonation: {
            DonationRequestID: '',
            MedicationDonationID: '',
            courierSlip: '', // Replace with file object on actual upload
            trackingNumber: '',
            Company: '',
            Status: 'Pending'
        }
    });

    const handleFormChange = (type, field, value) => {
        setFormData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));
    };

    const handleDonateClick = (seeker) => {
        setSelectedSeeker(seeker);
        // Auto-fill DonationRequestID when donor clicks "Donate"
        setFormData(prev => ({
            ...prev,
            moneyDonation: { ...prev.moneyDonation, DonationRequestID: `REQ-${seeker.id}` },
            medicineDonation: { ...prev.medicineDonation, DonationRequestID: `REQ-${seeker.id}` }
        }));
        setView('choose');
    };

    const handleDonationType = (type) => {
        // Generate fake Donation IDs for demo purpose
        const id = Date.now().toString();
        if (type === 'money') {
            setFormData(prev => ({
                ...prev,
                moneyDonation: { ...prev.moneyDonation, CashDonationID: `CASH-${id}` }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                medicineDonation: { ...prev.medicineDonation, MedicationDonationID: `MED-${id}` }
            }));
        }
        setView(type);
    };

    const handleMoneyDonationSubmit = (e) => {
        e.preventDefault();
        console.log('Money Donation Submitted:', formData.moneyDonation);
        alert('Money donation submitted successfully!');
        setView('list');
    };

    const handleMedicineDonationSubmit = (e) => {
        e.preventDefault();
        console.log('Medicine Donation Submitted:', formData.medicineDonation);
        alert('Medicine donation submitted successfully!');
        setView('list');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center text-blue-700">Donor Dashboard</h1>

                {/* Seekers list */}
                {view === 'list' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Donation Seekers</h2>
                        <ul className="space-y-4">
                            {[
                                { id: 1, name: 'Amal Perera', need: 'Kidney Treatment' },
                                { id: 2, name: 'Nirmala Fernando', need: 'Heart Surgery' }
                            ].map(seeker => (
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

                {/* Choose donation type */}
                {view === 'choose' && selectedSeeker && (
                    <div className="space-y-4 text-center">
                        <h2 className="text-xl font-semibold">
                            Choose Donation Type for {selectedSeeker.name}
                        </h2>
                        <div className="flex justify-center gap-6">
                            <button className="bg-green-600 text-white px-6 py-2 rounded" onClick={() => handleDonationType('money')}>
                                Donate Money
                            </button>
                            <button className="bg-purple-600 text-white px-6 py-2 rounded" onClick={() => handleDonationType('medicine')}>
                                Donate Medicine
                            </button>
                        </div>
                    </div>
                )}

                {/* Money donation form */}
                {view === 'money' && (
                    <form onSubmit={handleMoneyDonationSubmit} className="bg-white p-6 shadow rounded space-y-4">
                        <h2 className="text-xl font-semibold">Money Donation</h2>
                        <input type="text" className="w-full border p-2 rounded" placeholder="Cash Donation ID"
                            value={formData.moneyDonation.CashDonationID} readOnly />
                        <input type="text" className="w-full border p-2 rounded" placeholder="Donation Request ID"
                            value={formData.moneyDonation.DonationRequestID} readOnly />
                        <input type="number" className="w-full border p-2 rounded" placeholder="Amount (LKR)"
                            value={formData.moneyDonation.amount}
                            onChange={(e) => handleFormChange('moneyDonation', 'amount', e.target.value)} required />
                        <select className="w-full border p-2 rounded"
                            value={formData.moneyDonation.Status}
                            onChange={(e) => handleFormChange('moneyDonation', 'Status', e.target.value)} required>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit Donation</button>
                    </form>
                )}

                {/* Medicine donation form */}
                {view === 'medicine' && (
                    <form onSubmit={handleMedicineDonationSubmit} className="bg-white p-6 shadow rounded space-y-4">
                        <h2 className="text-xl font-semibold">Medicine Donation</h2>
                        <input type="text" className="w-full border p-2 rounded" placeholder="Courier Slip URL (demo)"
                            value={formData.medicineDonation.courierSlip}
                            onChange={(e) => handleFormChange('medicineDonation', 'courierSlip', e.target.value)} required />
                        <input type="text" className="w-full border p-2 rounded" placeholder="Tracking Number"
                            value={formData.medicineDonation.trackingNumber}
                            onChange={(e) => handleFormChange('medicineDonation', 'trackingNumber', e.target.value)} />
                        <input type="text" className="w-full border p-2 rounded" placeholder="Courier Company"
                            value={formData.medicineDonation.Company}
                            onChange={(e) => handleFormChange('medicineDonation', 'Company', e.target.value)} required />
                        <input type="text" className="w-full border p-2 rounded" placeholder="Donation Request ID"
                            value={formData.medicineDonation.DonationRequestID} readOnly />
                        <input type="text" className="w-full border p-2 rounded" placeholder="Medication Donation ID"
                            value={formData.medicineDonation.MedicationDonationID} readOnly />
                        <select className="w-full border p-2 rounded"
                            value={formData.medicineDonation.Status}
                            onChange={(e) => handleFormChange('medicineDonation', 'Status', e.target.value)} required>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">Submit Donation</button>
                    </form>
                )}
            </div>
        </div>
    );
}
