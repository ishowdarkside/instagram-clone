import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verify } from "../services/auth";
import { useEffect } from "react";

export function useProtect() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!token) return navigate("/login");
  }, [token, navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => verify(token),
  });

  return { data, isLoading };
}
