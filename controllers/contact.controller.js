import Contact from "../models/contact.model.js";

export const submitContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      school,
      country,
      website,
      students,
      role,
      media,
      points,
    } = req.body;

    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({
        status: "error",
        message:
          "This email has already been submitted. Please use a different email address.",
      });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      school,
      country,
      website,
      students,
      role,
      media,
      points,
    });

    const savedContact = await newContact.save();
    res.status(201).json({
      status: "success",
      data: {
        contact: savedContact,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getContactSubmissions = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: "success",
      data: {
        contacts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
