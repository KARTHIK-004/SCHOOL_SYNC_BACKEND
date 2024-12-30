import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a section name"],
      trim: true,
      maxlength: [10, "Name can not be more than 10 characters"],
    },
    class: {
      type: mongoose.Schema.ObjectId,
      ref: "Class",
      required: true,
    },
    teacher: {
      type: String,
      required: [true, "Please add a teacher name"],
    },
    students: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Section = mongoose.model("Section", SectionSchema);

export default Section;
