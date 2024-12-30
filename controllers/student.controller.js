import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createStudent = async (req, res) => {
  try {
    const { email, password, ...studentData } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      ...studentData,
      email,
      password: hashedPassword,
    });

    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating student", error: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("class", "name")
      .populate("section", "name")
      .populate("parent.id", "firstname lastname");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ email: req.user.email })
      .populate("class", "name")
      .populate("section", "name")
      .select("-password");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET
    );
    res.json({ token, student: { id: student._id, email: student.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const getStudentByEmail = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.user.email })
      .populate("class", "name")
      .populate("section", "name")
      .populate("parent.id", "firstname lastname")
      .select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
};
