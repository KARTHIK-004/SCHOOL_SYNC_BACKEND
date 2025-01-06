import Student from "../models/student.model.js";
import Section from "../models/section.model.js";
import Class from "../models/class.model.js";

export const createStudent = async (req, res) => {
  try {
    const studentData = req.body;
    studentData.createdBy = req.user._id;

    const newStudent = new Student(studentData);
    await newStudent.save();

    if (studentData.section && studentData.section.id) {
      await Section.findByIdAndUpdate(studentData.section.id, {
        $inc: { students: 1 },
      });
    }

    if (studentData.class && studentData.class.id) {
      await Class.findByIdAndUpdate(studentData.class.id, {
        $inc: { students: 1 },
      });
    }

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res
      .status(500)
      .json({ message: "Error creating student", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const student = await Student.findOne({ _id: id, createdBy: req.user._id });
    if (!student) {
      return res.status(404).json({
        message:
          "Student not found or you do not have permission to update this student",
      });
    }

    if (updateData.section && updateData.section.id !== student.section.id) {
      if (student.section && student.section.id) {
        await Section.findByIdAndUpdate(student.section.id, {
          $inc: { students: -1 },
        });
      }
      await Section.findByIdAndUpdate(updateData.section.id, {
        $inc: { students: 1 },
      });
    }

    if (updateData.class && updateData.class.id !== student.class.id) {
      if (student.class && student.class.id) {
        await Class.findByIdAndUpdate(student.class.id, {
          $inc: { students: -1 },
        });
      }
      await Class.findByIdAndUpdate(updateData.class.id, {
        $inc: { students: 1 },
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.user._id });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id, createdBy: req.user._id });
    if (!student) {
      return res.status(404).json({
        message:
          "Student not found or you do not have permission to view this student",
      });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
};
