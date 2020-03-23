const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email not valid!!!");
      }
    },
    password: {
      type: String,
      trim: true,
      minlength: 4
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);

  next();
});

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid Login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid Lofin");

  return user;
};

UserSchema.methods.generateWebToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.KEY);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
