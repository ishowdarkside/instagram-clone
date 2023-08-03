const path = require("path");
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
    return next(new AppError(400, "Input all fields!"));

  const user = await User.create(req.body);
  const token = await generateToken(user.id);

  res.status(201).json({
    status: "success",
    message: "Successfully signed up",
    token,
  });
});
