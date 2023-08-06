const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      validate: {
        validator: function (val) {
          return val.match(
            /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
          );
        },
        message: "Invalid username",
      },
    },
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      validate: {
        validator: function (val) {
          return val.match(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/);
        },
        message: "Invalid First Name",
      },
    },
    lastName: {
      type: String,
      required: ["true", "Please provide last name"],
      validate: {
        validator: function (val) {
          return val.match(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/);
        },
        message: "Invalid Last Name",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password must contain at least 6 characters"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Provide password confirm"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not matching",
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    profilePicture: {
      type: String,
      default: "default_pic.png",
    },
    description: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.statics.checkFields = function (body) {
  if (
    !body.username ||
    !body.firstName ||
    !body.lastName ||
    !body.password ||
    !body.passwordConfirm
  )
    return false;

  return true;
};

userSchema.methods.checkPasswordChange = function () {
  if (!this.passwordChangedAt) return true;
  if (this.passwordChangedAt.getTime() > new Date().getTime()) return false;

  return true;
};
//pre-save middleware for hashing password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.passwordConfirm = undefined;
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
