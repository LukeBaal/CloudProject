const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
