import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    schoolname: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: "/School_Sync.png",
    },
  },
  {
    timestamps: true,
  }
);

const School = mongoose.model("School", schoolSchema);

export default School;
