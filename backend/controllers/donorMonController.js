const MoneyDonation = require('../models/donorMon'); // Match your folder and file name

// Create a new money donation
exports.createMoneyDonation = async (req, res) => {
  try {
    const { DonationRequestID, CashDonationID, amount, Status } = req.body;

    if (!DonationRequestID || !CashDonationID || !amount || !Status) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newDonation = new MoneyDonation({
      DonationRequestID,
      CashDonationID,
      amount,
      Status,
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error('Error creating money donation:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all money donations
exports.getAllMoneyDonations = async (req, res) => {
  try {
    const donations = await MoneyDonation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations', error });
  }
};

// Get a single money donation by ID
exports.getMoneyDonationById = async (req, res) => {
  try {
    const donation = await MoneyDonation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error });
  }
};

// Update donation status
exports.updateMoneyDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await MoneyDonation.findByIdAndUpdate(
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
