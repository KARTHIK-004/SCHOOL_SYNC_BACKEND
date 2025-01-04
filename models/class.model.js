import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    classCode: {
      type: String,
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

classSchema.index(
  {
    classCode: 1,
    createdBy: 1,
  },
  {
    unique: true,
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
