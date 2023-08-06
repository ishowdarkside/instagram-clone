import { useQuery } from "@tanstack/react-query";
import { verify } from "../services/auth";

export function useProtect() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: verify,
  });

  return { data, isLoading };
}
