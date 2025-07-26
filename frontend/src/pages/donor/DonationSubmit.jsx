import { useState } from 'react';

export default function DonationForm() {
    const [donationType, setDonationType] = useState('medicine');
    const [donorId, setDonorId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({
        donorId: '',
        donorName: '',
        donorEmail: '',
        donorPhone: '',
        donationType: 'medicine',
        medicineName: '',
        quantity: '',
        expiryDate: '',
        amount: '',
        message: ''
    });

    // Mock function to simulate fetching donor details
    const fetchDonorDetails = async (id) => {
        setIsSearching(true);
        // In a real app, this would be an API call to your backend
        console.log("Searching for donor with ID:", id);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock response - replace with actual API call
        const mockDonors = {
            'DON123': {
                name: 'John Smith',
                email: 'john.smith@example.com',
                phone: '0771234567'
            },
            'DON456': {
                name: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                phone: '0769876543'
            }
        };
        
        if (mockDonors[id]) {
            setFormData(prev => ({
                ...prev,
                donorName: mockDonors[id].name,
                donorEmail: mockDonors[id].email,
                donorPhone: mockDonors[id].phone
            }));
        } else {
            alert('Donor not found. Please enter details manually.');
            setFormData(prev => ({
                ...prev,
                donorName: '',
                donorEmail: '',
                donorPhone: ''
            }));
        }
        
        setIsSearching(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (donorId.trim()) {
            fetchDonorDetails(donorId);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Donation submitted:', formData);
        alert('Donation submitted successfully!');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Donation Submission</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donor ID Search */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Donor Information</h3>
                    
                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Donor ID</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={donorId}
                                    onChange={(e) => setDonorId(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter donor ID"
                                />
                                <button
                                    onClick={handleSearch}
                                    disabled={isSearching || !donorId.trim()}
                                    className={`px-4 py-2 rounded-r-md ${isSearching || !donorId.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                >
                                    {isSearching ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Auto-filled Donor Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="donorName"
                            value={formData.donorName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="donorEmail"
                            value={formData.donorEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="donorPhone"
                            value={formData.donorPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

               {/* Donation Type */}
<div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Donation Details</h3>
    
    <div className="flex items-center space-x-4 mb-4">
        <label className="inline-flex items-center">
            <input
                type="radio"
                name="donationType"
                value="medicine"
                checked={formData.donationType === 'medicine'}
                onChange={() => setFormData({...formData, donationType: 'medicine'})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Medicine Donation</span>
        </label>
        <label className="inline-flex items-center">
            <input
                type="radio"
                name="donationType"
                value="cash"
                checked={formData.donationType === 'cash'}
                onChange={() => setFormData({...formData, donationType: 'cash'})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Cash Donation</span>
        </label>
    </div>

    {/* Medicine Donation Fields */}
    {formData.donationType === 'medicine' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                <input
                    type="text"
                    name="medicineName"
                    value={formData.medicineName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Paracetamol 500mg"
                    required={formData.donationType === 'medicine'}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 10"
                    required={formData.donationType === 'medicine'}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={formData.donationType === 'medicine'}
                />
            </div>
        </div>
    )}

    {/* Cash Donation Fields */}
    {formData.donationType === 'cash' && (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (LKR)</label>
            <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount in rupees"
                required={formData.donationType === 'cash'}
            />
        </div>
    )}
</div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Any additional information about your donation..."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Submit Donation
                    </button>
                </div>
            </form>
        </div>
    );
}