import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  acceptRequest,
  declineRequest,
  followProfile,
  getProfile,
  searchUsers,
} from "../services/profileFunctions";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getFeed } from "../services/postFunctions";

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
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
  });
  return { mutate };
}

export function useDeclineRequest() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (profileId) => declineRequest(profileId),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["profile"]);
      }
    },
  });

  return { mutate };
}

export function useSearchUsers(input) {
  const { data, isLoading } = useQuery(
    {
      queryKey: ["searchResults", input],
      queryFn: () => searchUsers(input),
    },
    { staleTime: Infinity, keepPreviousData: true }
  );

  return { data, isLoading };
}

export function useGetFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  });

  return { data, isLoading };
}
