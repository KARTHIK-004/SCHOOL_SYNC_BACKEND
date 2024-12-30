import Student from "../models/student.model.js";

export const createStudent = async (req, res) => {
  try {
    const studentData = { ...req.body, createdBy: req.user._id };
    const student = await Student.create(studentData);
    res.status(201).json(student);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating student", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!student) {
      return res.status(404).json({
        message:
          "Student not found or you do not have permission to update this student",
      });
    }
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating student", error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.user._id });
    res.json(students);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching students", error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!student) {
      return res.status(404).json({
        message:
          "Student not found or you do not have permission to view this student",
      });
    }
    res.json(student);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching student", error: error.message });
  }
};
