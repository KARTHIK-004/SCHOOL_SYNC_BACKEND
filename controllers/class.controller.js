import Class from "../models/class.model.js";

export const createClass = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Class name is required",
      });
    }

    const existingClass = await Class.findOne({ name });
    if (existingClass) {
      return res.status(400).json({
        status: "error",
        message:
          "A class with this name already exists. Please use a different name.",
      });
    }

    const newClass = new Class({
      name,
      createdBy: req.user ? req.user._id : undefined,
    });

    const savedClass = await newClass.save();

    res.status(201).json({
      status: "success",
      data: {
        class: savedClass,
      },
    });
  } catch (error) {
    console.error("Error in createClass:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({})
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: classes.length,
      data: {
        classes,
      },
    });
  } catch (error) {
    console.error("Error in getClasses:", error);
    res.status(500).json({
      status: "error",
      message: "Error retrieving classes",
    });
  }
};

export const getClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!classItem) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        class: classItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!classItem) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        class: classItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
