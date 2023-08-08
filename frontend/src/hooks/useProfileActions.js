import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptRequest,
  followProfile,
  getProfile,
} from "../services/profileFunctions";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useGetProfile() {
  const { profileId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", profileId],
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

export function useAcceptRequest() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (profileId) => acceptRequest(profileId),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
  return { mutate };
}
