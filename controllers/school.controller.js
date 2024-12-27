import School from "../models/school.model.js";

export const createSchool = async (req, res) => {
  try {
    const { schoolname, logo } = req.body;

    const school = new School({
      schoolname,
      logo: logo || "/School_Sync.png",
    });

    await school.save();

    res.status(201).json({
      status: "success",
      data: {
        school,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "A school with this name already exists",
      });
    }
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
