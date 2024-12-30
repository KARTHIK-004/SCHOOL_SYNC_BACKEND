import bcrypt from "bcryptjs";
import Parent from "../models/parent.model.js";

export const createParent = async (req, res) => {
  try {
    const {
      title,
      firstname,
      lastname,
      email,
      password,
      phone,
      whatsapp,
      address,
      state,
      occupation,
      nationalId,
      gender,
      nationality,
      relationship,
      preferredContact,
      imageUrl,
    } = req.body;

    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({
        status: "error",
        message:
          "This email is already registered. Please use a different email address.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newParent = new Parent({
      title,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      whatsapp,
      address,
      state,
      occupation,
      nationalId,
      gender,
      nationality,
      relationship,
      preferredContact,
      imageUrl,
    });

    const savedParent = await newParent.save();
    res.status(201).json({
      status: "success",
      data: {
        parent: savedParent,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json({
      status: "success",
      data: {
        parents,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getParent = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "No parent found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        parent,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateParent = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "No parent found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        parent,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "No parent found with that ID",
      });
    }
    res.status(204).json({
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
