import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../services/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => signup(formData),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        localStorage.setItem("jwt", res.token);
        return navigate("/app");
      }

      return toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
}

export function useLogin() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        //store-aj token u localStorage
        localStorage.setItem("jwt", res.token);
        return navigate("/app");
      }
      toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
