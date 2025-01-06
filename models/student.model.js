import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: [true, "Blood group is required"],
    },
    phoneCode: {
      type: String,
      required: [true, "Phone code is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    religion: {
      type: String,
      required: [true, "Religion is required"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    imageUrl: {
      type: String,
      default: "/student.png",
    },
    admissiondate: {
      type: Date,
      required: [true, "Admission date is required"],
    },
    birthcertificateno: {
      type: String,
      required: [true, "Birth certificate number is required"],
    },
    regno: {
      type: String,
      required: [true, "Register number is required"],
      unique: true,
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
    section: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: [true, "Section ID is required"],
      },
      name: {
        type: String,
        required: [true, "Section name is required"],
      },
    },
    parent: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: [true, "Parent ID is required"],
      },
      name: {
        type: String,
        required: [true, "Parent name is required"],
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

studentSchema.index(
  {
    email: 1,
    createdBy: 1,
  },
  {
    unique: true,
  }
);
studentSchema.index(
  {
    regno: 1,
    createdBy: 1,
  },
  {
    unique: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
