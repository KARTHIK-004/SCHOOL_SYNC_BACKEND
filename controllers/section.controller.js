import Class from "../models/class.model.js";
import Section from "../models/section.model.js";
import Student from "../models/student.model.js";

export const createSection = async (req, res) => {
  try {
    const {
      sectionName,
      sectionCode,
      class: classInfo,
      classTeacher,
    } = req.body;
    const createdBy = req.user._id;

    if (!classInfo || !classInfo.id) {
      return res
        .status(400)
        .json({ message: "Class information is missing or invalid" });
    }

    const classExists = await Class.findById(classInfo.id);
    if (!classExists) {
      return res.status(404).json({ message: "Class not found" });
    }

    const newSection = new Section({
      sectionName,
      sectionCode,
      class: {
        id: classInfo.id,
        name: classExists.className,
      },
      classTeacher,
      createdBy,
    });

    const savedSection = await newSection.save();
    await Class.findByIdAndUpdate(classInfo.id, {
      $inc: { sections: 1 },
    });
    res.status(201).json(savedSection);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res
        .status(400)
        .json({ message: "Validation error", errors: validationErrors });
    }
    res
      .status(500)
      .json({ message: "Error creating section", error: error.message });
  }
};

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sections", error: error.message });
  }
};

export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching section", error: error.message });
  }
};

export const getSectionsByClassId = async (req, res) => {
  try {
    const { classId } = req.params;
    const sections = await Section.find({ "class.id": classId });
    res.json({ data: { sections } });
  } catch (error) {
    console.error("Error in getSectionsByClassId:", error);
    res
      .status(500)
      .json({ message: "Error fetching sections", error: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.class) {
      delete updateData.class;
    }

    const updatedSection = await Section.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedSection) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(updatedSection);
  } catch (error) {
    console.error("Error in updateSection:", error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res
        .status(400)
        .json({ message: "Validation error", errors: validationErrors });
    }
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate section code within the class" });
    }
    res
      .status(500)
      .json({ message: "Error updating section", error: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSection = await Section.findByIdAndDelete(id);
    if (!deletedSection) {
      return res.status(404).json({ message: "Section not found" });
    }

    await Class.findByIdAndUpdate(deletedSection.class.id, {
      $inc: { sections: -1 },
    });

    res.json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSection:", error);
    res
      .status(500)
      .json({ message: "Error deleting section", error: error.message });
  }
};

export const getStudentsBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const students = await Student.find({ section: sectionId });

    if (students.length === 0) {
      return res.status(404).json({
        message: "No students found in this section",
        data: { students: [] },
      });
    }

    res.json({ data: { students } });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students by section",
      error: error.message,
    });
  }
};
