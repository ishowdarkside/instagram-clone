import { useNavigate } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";
import Spinner from "../Spinner/Spinner";

// eslint-disable-next-line react/prop-types
export default function Protect({ children }) {
  const { data, isLoading } = useProtect();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!isLoading && !data.user) return navigate("/login");
  if (data.user && !isLoading) return children;
}
