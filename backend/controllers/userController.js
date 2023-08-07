const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "CatchAsync"
));

const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const User = require(path.join(__dirname, "..", "models", "User"));

exports.followUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  const me = await User.findById(req.user.id);
  if (user.isPrivate) {
    if (user.requests.includes(req.user.id))
      user.requests = user.requests.filter((r) => !r.equals(req.user.id));
    else user.requests.push(req.user.id);
  } else if (!user.isPrivate) {
    if (user.followers.includes(req.user.id)) {
      me.followings = me.followings.filter((f) => !f.equals(user.id));
      user.followers = user.followers.filter((r) => !r.equals(req.user.id));
    } else {
      me.following.push(user.id);
      user.followers.push(req.user.id);
    }
  }
  await me.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });
  return res.status(200).json({
    status: "success",
  });
});
