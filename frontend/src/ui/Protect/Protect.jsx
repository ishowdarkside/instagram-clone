import { useNavigate } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function Protect({ children }) {
  const { data, isLoading } = useProtect();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data.user) navigate("/login");
  }, [isLoading, data, navigate]);

  if (isLoading) return <Spinner />;
  if (data.user && !isLoading) return children;
}
