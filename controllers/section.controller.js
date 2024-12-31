import Section from "../models/section.model.js";
import Class from "../models/class.model.js";

export const createSection = async (req, res) => {
  try {
    const { name, class: classId, teacher } = req.body;

    if (!classId) {
      return res.status(400).json({
        status: "error",
        message: "Class ID is required",
      });
    }

    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({
        status: "error",
        message: "The specified class does not exist.",
      });
    }

    const existingSection = await Section.findOne({ name, class: classId });
    if (existingSection) {
      return res.status(400).json({
        status: "error",
        message: "A section with this name already exists in the class.",
      });
    }

    const newSection = new Section({
      name,
      class: classId,
      teacher,
      createdBy: req.user ? req.user._id : undefined,
    });

    const savedSection = await newSection.save();

    existingClass.sections = (existingClass.sections || 0) + 1;
    await existingClass.save();

    res.status(201).json({
      status: "success",
      data: {
        section: savedSection,
      },
    });
  } catch (error) {
    console.error("Error in createSection:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSectionsByClassId = async (req, res) => {
  try {
    const { classId } = req.params;
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }

    const sections = await Section.find({ class: classId });

    res.status(200).json({
      status: "success",
      results: sections.length,
      data: {
        sections,
      },
    });
  } catch (error) {
    console.error("Error in getSectionsByClassId:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getStudentsBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }

    const students = await Student.find({ section: sectionId });

    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (error) {
    console.error("Error in getStudentsBySection:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find().populate("class", "name");
    res.status(200).json({
      status: "success",
      data: {
        sections,
      },
    });
  } catch (error) {
    console.error("Error in getSections:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate("class", "name")
      .populate("createdBy", "name email");
    if (!section) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        section,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { name, teacher } = req.body;
    const sectionId = req.params.id;

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }
    if (name && name !== section.name) {
      const existingSection = await Section.findOne({
        name,
        class: section.class,
      });
      if (existingSection) {
        return res.status(400).json({
          status: "error",
          message: "A section with this name already exists in the class.",
        });
      }
    }

    section.name = name || section.name;
    section.teacher = teacher || section.teacher;

    const updatedSection = await section.save();

    res.status(200).json({
      status: "success",
      data: {
        section: updatedSection,
      },
    });
  } catch (error) {
    console.error("Error in updateSection:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }

    const classObj = await Class.findById(section.class);
    if (classObj) {
      classObj.sections = Math.max((classObj.sections || 0) - 1, 0);
      await classObj.save();
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error("Error in deleteSection:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
