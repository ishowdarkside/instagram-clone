import { Link } from "react-router-dom";

export default function Request(request) {
  const { request: req } = request;
  return (
    <Link to={`/app/profile/${req._id}`}>
      <img src={`/${req.profilePicture}`} alt="avatar" />
      <span>{req.username}</span>
    </Link>
  );
}
