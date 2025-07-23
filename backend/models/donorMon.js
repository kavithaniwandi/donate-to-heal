const mongoose = require('mongoose');

const moneyDonationSchema = new mongoose.Schema({

  DonationRequestID: {
    type: String,
    required: true,
  },
  CashDonationID: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  Status:{
    type: String,
    required: true,
    enum: {
      values: ["Pending", "Completed", "Cancelled"],
      message: "{VALUE} is not a valid status",
    },
  }
});

module.exports = mongoose.model('MoneyDonation', moneyDonationSchema);
