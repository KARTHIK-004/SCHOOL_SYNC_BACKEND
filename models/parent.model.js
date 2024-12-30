import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
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
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    preferredContact: {
      type: String,
      required: true,
      enum: ["email", "phone", "whatsapp"],
    },
    imageUrl: {
      type: String,
      default: "/parent.png",
    },
  },
  {
    timestamps: true,
  }
);

const Parent = mongoose.model("Parent", parentSchema);

export default Parent;
