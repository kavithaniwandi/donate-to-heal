const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

const {
  createMedicineDonation,
  getAllMedicineDonations,
  getMedicineDonationById,
  updateMedicineDonationStatus
} = require('../controllers/donorMedController');

// Create a new medicine donation (with courier slip upload)
router.post('/', upload.single('courierSlip'), createMedicineDonation);

// Get all medicine donations
router.get('/', getAllMedicineDonations);

// Get a specific donation by ID
router.get('/:id', getMedicineDonationById);

// Update donation status
router.patch('/:id/status', updateMedicineDonationStatus);

module.exports = router;
