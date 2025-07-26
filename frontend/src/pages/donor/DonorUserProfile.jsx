import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DonorProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [donationHistory, setDonationHistory] = useState([]);

  // Fetch donor profile and donation history
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/api/donor/profile');
        const donationRes = await axios.get('http://localhost:5000/api/donor/donations');

        setProfile(userRes.data);
        setDonationHistory(donationRes.data);
      } catch (err) {
        console.error('Error fetching donor data:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/donor/profile', profile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Update failed.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Donor Profile</h2>

      {/* Profile Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={profile.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={profile.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Donation History Section */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Donation History</h3>
      <ul className="divide-y border rounded">
        {donationHistory.length === 0 ? (
          <li className="p-4 text-gray-600">No donations found.</li>
        ) : (
          donationHistory.map((donation) => (
            <li key={donation._id} className="p-4">
              <p className="font-medium">
                Type: {donation.type} | Date: {new Date(donation.donationDate).toLocaleDateString()}
              </p>
              {donation.amount && <p>Amount: LKR {donation.amount}</p>}
              {donation.Company && <p>Courier: {donation.Company}</p>}
              {donation.trackingNumber && <p>Tracking #: {donation.trackingNumber}</p>}
              <p>Status: <span className="font-semibold">{donation.Status}</span></p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
