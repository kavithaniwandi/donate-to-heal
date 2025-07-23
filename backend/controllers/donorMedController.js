const MedicineDonation = require('../models/MedicineDonation');
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
      Status
    } = req.body;

    // File comes from multer
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Courier slip file is required' });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'courier_slips'
    });

    // Remove file from local after upload
    fs.unlinkSync(file.path);

    const newDonation = new MedicineDonation({
      DonationRequestID,
      MedicationDonationID,
      courierSlip: uploadResult.secure_url,
      trackingNumber,
      Company,
      Status
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error('Error creating medicine donation:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all medicine donations
exports.getAllMedicineDonations = async (req, res) => {
  try {
    const donations = await MedicineDonation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations', error });
  }
};

// Get a specific donation by ID
exports.getMedicineDonationById = async (req, res) => {
  try {
    const donation = await MedicineDonation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error });
  }
};

// Update status of a donation
exports.updateMedicineDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const donation = await MedicineDonation.findByIdAndUpdate(
      req.params.id,
      { Status: status },
      { new: true }
    );

    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};
