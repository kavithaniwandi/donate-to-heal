const express = require('express');
const router = express.Router();

const {
  createMoneyDonation,
  getAllMoneyDonations,
  getMoneyDonationById,
  updateMoneyDonationStatus
} = require('../controllers/donorMonController');

// POST: Create a new money donation
router.post('/', createMoneyDonation);

// GET: Fetch all money donations
router.get('/', getAllMoneyDonations);

// GET: Fetch a single donation by ID
router.get('/:id', getMoneyDonationById);

// PATCH: Update donation status
router.patch('/:id/status', updateMoneyDonationStatus);

module.exports = router;
