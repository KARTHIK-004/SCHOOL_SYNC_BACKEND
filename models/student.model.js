import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    admissiondate: {
      type: Date,
      required: true,
    },
    birthcertificateno: {
      type: String,
      required: true,
    },
    regno: {
      type: String,
      required: true,
      unique: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    religion: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    class: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
      },
      name: { type: String, required: true },
    },
    section: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
      },
      name: { type: String, required: true },
    },
    parent: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true,
      },
      name: { type: String, required: true },
    },
    imageUrl: {
      type: String,
      default: "/student.png",
    },
    phoneCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
