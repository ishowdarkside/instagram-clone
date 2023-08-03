const path = require("path");
const bcrypt = require("bcrypt");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const User = require(path.join(__dirname, "..", "models", "User"));
const generateToken = require(path.join(
  __dirname,
  "..",
  "utilities",
  "generateToken"
));

exports.signup = catchAsync(async (req, res, next) => {
  if (!User.checkFields(req.body))
    return next(new AppError(400, "Provide all fields"));

  const user = await User.create(req.body);
  const token = await generateToken(user.id);

  res.status(201).json({
    status: "success",
    message: "Successfully signed up",
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.username || !req.body.password)
    return next(new AppError(400, "Provide all fields"));

  const user = await User.findOne({ username: req.body.username });
  if (!user) return next(new AppError(400, "Invalid username/password"));
  const decrypted = await bcrypt.compare(req.body.password, user.password);
  if (decrypted) return next(new AppError(400, "Invalid username/password"));

  const token = await generateToken(user.id);
  res.status(200).json({
    status: "success",
    message: "Authorized",
    token,
  });
});
