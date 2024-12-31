import Parent from "../models/parent.model.js";

export const createParent = async (req, res) => {
  try {
    const parentData = { ...req.body, createdBy: req.user._id };
    const parent = await Parent.create(parentData);
    res.status(201).json(parent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating parent", error: error.message });
  }
};

export const updateParent = async (req, res) => {
  try {
    const parent = await Parent.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!parent) {
      return res.status(404).json({
        message:
          "Parent not found or you do not have permission to update this parent",
      });
    }
    const updatedParent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedParent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating parent", error: error.message });
  }
};

export const getParents = async (req, res) => {
  try {
    const parents = await Parent.find({ createdBy: req.user._id });
    res.json(parents);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching parents", error: error.message });
  }
};

export const getParentById = async (req, res) => {
  try {
    const parent = await Parent.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!parent) {
      return res.status(404).json({
        message:
          "Parent not found or you do not have permission to view this parent",
      });
    }
    res.json(parent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching parent", error: error.message });
  }
};

export const deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!parent) {
      return res.status(404).json({
        message:
          "Parent not found or you do not have permission to delete this parent",
      });
    }
    await Parent.findByIdAndDelete(req.params.id);
    res.json({ message: "Parent deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting parent", error: error.message });
  }
};
