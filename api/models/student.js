const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {type: String, required: true },
  surname: {type: String, required: true},
  dob: {type: String, required: true },
  createdOn: { type: Date, default: Date.now }
});

let Student = mongoose.model("student", studentSchema);

module.exports = Student;
