const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  if (!decrypted) return next(new AppError(400, "Invalid username/password"));

  const token = await generateToken(user.id);
  res.status(200).json({
    status: "success",
    message: "Authorized",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new AppError(401, "Unauthorized, please login!"));

  const decoded = await jwt.decode(
    token,
    process.env.JWT_SECRET,
    (token, err) => {
      if (err) return next(new AppError(401, "Invalid token, please login!"));
      return token;
    }
  );
  const user = await User.findById(decoded.id);
  if (!user)
    return next(new AppError(401, "User deleted profile, please login!"));
  if (!user.checkPasswordChange())
    return next(
      new AppError(401, "Password changed in meantime, please login again!")
    );

  req.user = user;
  next();
});

exports.changeData = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  delete req.body.password;
  Object.entries(req.body).forEach((e) => (user[e[0]] = e[1]));
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Successfully updated account",
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  if (!req.body.oldPassword || !req.body.newPassword)
    return next(new AppError(400, "Provide all fields"));
  const user = await User.findById(req.user.id);
  const compared = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!compared) return next(new AppError(400, "Wrong password"));
  user.password = req.body.newPassword;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Password updated successfully!",
  });
});

exports.verify = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new AppError(401, "Unauthorized, please login!"));

  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
    if (err) return next(new AppError(401, "Invalid token, please login!"));
    return token;
  });

  const user = await User.findById(decoded.id)
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "creator",
        select: "profilePicture username",
      },
      populate: {
        path: "comments.creator",
        select: "username profilePicture",
      },
    })
    .populate({
      path: "posts",
      populate: { path: "comments creator", select: "username profilePicture" },
    });
  if (!user)
    return next(new AppError(401, "User deleted profile, please login!"));
  if (!user.checkPasswordChange())
    return next(
      new AppError(401, "Password changed in meantime, please login again!")
    );

  return res.status(200).json({
    user,
  });
});
