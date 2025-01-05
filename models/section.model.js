import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: [true, "Section name is required"],
    },
    sectionCode: {
      type: String,
      required: [true, "Section code is required"],
    },
    class: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: [true, "Class ID is required"],
      },
      name: {
        type: String,
        required: [true, "Class name is required"],
      },
    },
    classTeacher: {
      type: String,
      required: [true, "Class teacher is required"],
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

sectionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

sectionSchema.index(
  {
    sectionCode: 1,
    "class.id": 1,
    createdBy: 1,
  },
  {
    unique: true,
  }
);

const Section = mongoose.model("Section", sectionSchema);

export default Section;

console.log("Section model loaded");
