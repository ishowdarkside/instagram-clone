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

  //AKO JE PROFILE PRIVATE I AKO JE ULOGOVANI USER U REQUESTOVIMA ILI VEC PRATI FPROIL, SKINI GA SA SVEGA
  // ELSE DODAJ GA U REQUESTS
  if (user.isPrivate) {
    if (
      user.requests.includes(req.user.id) ||
      user.followers.includes(req.user.id)
    ) {
      user.requests = user.requests.filter((r) => !r.equals(req.user.id));
      me.madeRequests = me.madeRequests.filter((r) => !r.equals(user.id));
      me.following = me.following.filter((r) => !r.equals(user.id));
      user.followers = user.followers.filter((r) => !r.equals(req.user.id));
    } else {
      user.requests.push(req.user.id);
      me.madeRequests.push(user.id);
    }
  }
  //A AKO NIJE PRIVATE PROVJERI DA LI PROFIL CURR ULOGOVANI USER VEC PRATI, AKO DA,SKINI GA, AKO NE STAVI GA U ARRAYS
  else if (!user.isPrivate) {
    if (user.followers.includes(req.user.id)) {
      me.following = me.following.filter((f) => !f.equals(user.id));
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

exports.getSpecificUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate({
      path: "posts",
      populate: { path: "creator", select: "profilePicture username" },
    })
    .populate({ path: "followers", select: "username profilePicture" })
    .populate({ path: "following", select: "username profilePicture" })
    .select("-password -passwordChangedAt");

  if (user.isPrivate && !user.followers.some((f) => f.equals(req.user.id)))
    return res.status(200).json({
      status: "success",
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.description,
        isPrivate: true,
        profilePicture: user.profilePicture,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        postCount: user.posts.length,
        _id: user.id,
        isRequested: user.requests.some((el) => el.equals(req.user.id)),
      },
    });

  return res.status(200).json({
    status: "success",
    user,
  });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.profileId);
  const me = await User.findById(req.user.id);

  if (!me.requests.some((el) => el.equals(user.id)))
    return next(new AppError(400, "User didn't request to follow you"));
  me.requests = me.requests.filter((e) => !e.equals(user.id));
  me.followers.push(user.id);
  user.madeRequests = user.madeRequests.filter((e) => !e.equals(me.id));
  user.following.push(me.id);
  await user.save({ validateBeforeSave: false });
  await me.save({ validateBeforeSave: false });
  return res.status(200).json({
    status: "success",
    message: "Accepted request!",
  });
});

exports.declineRequest = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.profileId);
  const me = await User.findById(req.user.id);
  me.requests = me.requests.filter((e) => !e.equals(user.id));
  user.madeRequests = user.madeRequests.filter((e) => !e.equals(me.id));
  await me.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });
  return res.status(200).json({
    status: "success",
    message: "Request declined",
  });
});

exports.searchUsers = catchAsync(async (req, res, next) => {
  const { input } = req.body;
  if (input === "")
    return res.status(200).json({
      status: "success",
      users: [],
    });
  const users = await User.find({
    $or: [
      { username: { $regex: input, $options: "i" } },
      { fisrtName: { $regex: input, $options: "i" } },
      { lastName: { $regex: input, $options: "i" } },
    ],
  }).select("username profilePicture firstName lastName");

  return res.status(200).json({
    status: "success",
    users,
  });
});

exports.getCEO = catchAsync(async (req, res, next) => {
  const CEO = await User.findById("64cee56c455f180d921b3aa7").select(
    "username profilePicture firstName lastName"
  );
  res.status(200).json({
    CEO,
  });
});
