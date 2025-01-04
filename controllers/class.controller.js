import Class from "../models/class.model.js";

export const createClass = async (req, res) => {
  console.log("Create class request received:", req.body);
  try {
    const { className, classCode } = req.body;

    console.log(
      "Checking for existing class with code:",
      classCode,
      "for user:",
      req.user._id
    );
    const existingClass = await Class.findOne({
      classCode,
      createdBy: req.user._id,
    });
    if (existingClass) {
      console.log("Existing class found for this user:", existingClass);
      return res
        .status(400)
        .json({
          message: "You have already created a class with this class code",
        });
    }

    console.log("Creating new class");
    const classData = { ...req.body, createdBy: req.user._id };
    const newClass = await Class.create(classData);
    console.log("New class created:", newClass);
    res.status(201).json(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    if (error.code === 11000) {
      res
        .status(400)
        .json({
          message: "You have already created a class with this class code",
        });
    } else {
      res
        .status(400)
        .json({ message: "Error creating class", error: error.message });
    }
  }
};

export const updateClass = async (req, res) => {
  try {
    const classToUpdate = await Class.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!classToUpdate) {
      return res
        .status(404)
        .json({
          message:
            "Class not found or you do not have permission to update this class",
        });
    }
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedClass);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating class", error: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({ createdBy: req.user._id });
    res.json(classes);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching classes", error: error.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!classItem) {
      return res
        .status(404)
        .json({
          message:
            "Class not found or you do not have permission to view this class",
        });
    }
    res.json(classItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching class", error: error.message });
  }
};

export const updateClassStudentCount = async (req, res) => {
  try {
    const { classId, increment } = req.body;
    const classToUpdate = await Class.findOne({
      _id: classId,
      createdBy: req.user._id,
    });

    if (!classToUpdate) {
      return res
        .status(404)
        .json({
          message:
            "Class not found or you do not have permission to update this class",
        });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $inc: { students: increment ? 1 : -1 } },
      { new: true }
    );

    res.json(updatedClass);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error updating class student count",
        error: error.message,
      });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const classToDelete = await Class.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!classToDelete) {
      return res
        .status(404)
        .json({
          message:
            "Class not found or you do not have permission to delete this class",
        });
    }
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting class", error: error.message });
  }
};
