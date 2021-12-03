const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Student = require("../models/student");
const Course = require("../models/course");

router.post("/add-student", (req, res) => {
  console.log("req.body", req.body);
  const student = new Student({
    ...req.body,
  });
  student.save((err, student) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).json(student);
  });
});

router.get("/students", (req, res) => {
  console.log("req.student", req.student);
  Student.find()
    .sort({ createdOn: -1 })
    .exec()
    .then((students) => res.status(200).json(students))
    .catch((err) =>
      res.status(500).json({
        message: "no students found in database",
        error: err,
      })
    );
});

router.get("/student/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Student.findById(id)
    .then((student) => res.status(200).json(student))
    .catch((err) =>
      res.status(500).json({
        message: "student not found",
        error: err,
      })
    );
});

router.put("/update-student/:id", (req, res) => {
  const id = req.params.id;
  const conditions = { _id: id };
  const student = { ...req.body };
  const update = { $set: student };
  const options = {
    upsert: true,
    new: true,
  };

  Student.findOneAndUpdate(conditions, update, options, (err, response) => {
    if (err) return res.status(500).json({ msg: "update failed", error: err });
    res
      .status(200)
      .json({ msg: `document with id ${id} updated`, response: response });
  });
});

router.get("/delete-student/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Student.findByIdAndDelete(id)
    .then((student) =>
      res
        .status(204)
        .send(
          `Student ${student.name} with id ${student.id} successfully deleted from database`
        )
    )
    .catch((err) =>
      res.status(500).json({
        message: "student not found",
        error: err,
      })
    );
});

router.post("/add-course", (req, res) => {
  console.log("req.body", req.body);
  const course = new Course({
    ...req.body,
  });
  course.save((err, course) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).json({ msg: "Course added successfully", course: course });
  });
});

router.get("/courses", (req, res) => {
  console.log("req.course", req.course);
  Course.find()
    .sort({ createdOn: -1 })
    .exec()
    .then((courses) => res.status(200).json(courses))
    .catch((err) =>
      res.status(500).json({
        message: "no courses found in database",
        error: err,
      })
    );
});

router.get("/course/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Course.findById(id)
    .then((course) => res.status(200).json(course))
    .catch((err) =>
      res.status(500).json({
        message: "course not found",
        error: err,
      })
    );
});

router.put("/update-course/:id", (req, res) => {
  const id = req.params.id;
  const conditions = { _id: id };
  const course = { ...req.body };
  const update = { $set: course };
  const options = {
    upsert: true,
    new: true,
  };

  Course.findOneAndUpdate(conditions, update, options, (err, response) => {
    if (err) return res.status(500).json({ msg: "update failed", error: err });
    res
      .status(200)
      .json({ msg: `document with id ${id} updated`, response: response });
  });
});

router.get("/delete-course/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Course.findByIdAndDelete(id)
    .then((course) =>
      res
        .status(200)
        .json({ msg: `Course with id ${id} successfully deleted from database` })
    .catch((err) =>
      res.status(500).json({
        message: "course not found",
        error: err,
      })
    )
);
});
module.exports = router;
