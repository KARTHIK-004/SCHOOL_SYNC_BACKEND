import School from "../models/school.model.js";

export const createSchool = async (req, res) => {
  try {
    const { schoolname, logo } = req.body;
    if (!schoolname) {
      return res.status(400).json({ message: "School name is required" });
    }
    const existingSchool = await School.findOne({ schoolname });
    if (existingSchool) {
      return res
        .status(400)
        .json({ message: "School with this name already exists" });
    }
    const school = new School({
      schoolname,
      logo,
    });
    await school.save();

    res.status(201).json({
      status: "success",
      data: {
        school,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json({
      status: "success",
      data: {
        schools,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
