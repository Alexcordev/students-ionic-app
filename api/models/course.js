const mongoose = require('mongoose');
const Student = require('./student');

const courseSchema = new mongoose.Schema({
  name: {type: String, required: true },
  start: {type: String, required: true},
  duration: {type: String, required: true },
  registrations: {type: Array},
  createdOn: { type: Date, default: Date.now }
});

let Course = mongoose.model("course", courseSchema);

module.exports = Course;
