import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followProfile, getProfile } from "../services/profileFunctions";
import { toast } from "react-hot-toast";

export function useGetProfile(profileId) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(profileId),
  });
  return { data, isLoading };
}

export function useFollowProfile() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (profileId) => followProfile(profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate };
}
