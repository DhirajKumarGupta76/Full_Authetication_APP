// //create Schema
// import mongoose from "mongoose";
// // import { use } from "react";

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isverified: { type: Boolean, default: false },
//     isLoggedIn: { type: Boolean, default: false },
//     token: { type: String, default: null },
//     otp: { type: String, default: null },
//     otpExpiry: { type: Date, dafault: null }
// }, { timestamps: true })

// export const User = mongoose.model("User", userSchema)


// Create Schema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Password is required only for users who don't use Google login
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },

    // Google OAuth fields
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    isverified: {
      type: Boolean,
      default: false,
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    token: {
      type: String,
      default: null,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null, // Fixed your original "dafault" typo
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);