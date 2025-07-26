const mongoose = require('mongoose');

const medicineDonationSchema = new mongoose.Schema({
  DonationRequestID: {
    type: String,
    required: true,
  },
  MedicationDonationID: {
    type: String,
    required: true
  },
  courierSlip: {
      type: String, // Cloudinary URL
      required: true,
  },
  trackingNumber: {
    type: String,
    required: false,
  },
  Company: {
    type: String,
    required: true,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
    Status: {
        type: String,
        required: true,
        enum: {
        values: ["Pending", "Completed", "Cancelled"],
        message: "{VALUE} is not a valid status",
        },
    },
});

module.exports = mongoose.model('MedicineDonation', medicineDonationSchema);
