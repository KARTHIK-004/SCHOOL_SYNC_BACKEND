import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a class name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    sections: {
      type: Number,
      default: 0,
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

const Class = mongoose.model("Class", ClassSchema);

export default Class;
