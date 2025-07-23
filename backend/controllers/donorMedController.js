const DonorMed = require('../models/donorMed');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Upload courier slip and create a new medicine donation
exports.createMedicineDonation = async (req, res) => {
  try {
    const {
      DonationRequestID,
      MedicationDonationID,
      trackingNumber,
      Company,
      Status,
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Courier slip image is required' });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'courier_slips',
      use_filename: true,
    });

    // Remove local temp file
    fs.unlinkSync(file.path);

    // Create and save new medicine donation
    const newDonation = new DonorMed({
      DonationRequestID,
      MedicationDonationID,
      courierSlip: result.secure_url,
      trackingNumber,
      Company,
      Status,
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);

  } catch (error) {
    console.error('Error creating medicine donation:', error);
    res.status(500).json({ message: 'Server error occurred', error });
  }
};

// Get all medicine donations
exports.getAllMedicineDonations = async (req, res) => {
  try {
    const donations = await DonorMed.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations', error });
  }
};

// Get a specific donation by ID
exports.getMedicineDonationById = async (req, res) => {
  try {
    const donation = await DonorMed.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error });
  }
};

// Update status of a donation
exports.updateMedicineDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await DonorMed.findByIdAndUpdate(
      req.params.id,
      { Status: status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};
