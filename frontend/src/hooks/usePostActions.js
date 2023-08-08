import {
  commentPost,
  deleteComment,
  deletePost,
  getPost,
  likePost,
} from "../services/postFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export function useCommentPost() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ postId, comment }) => commentPost(postId, comment),
    onSuccess: (res) => {
      if (res.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["post"] });
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      }
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate };
}

export function useGetPost(postId) {
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(postId),
  });

  return { data, isLoading };
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ postId, commentId }) => deleteComment(postId, commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["post"] }),
    onError: (err) => toast.error(err.message),
  });

  return { mutate };
}

export function useLikePost() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (postId) => likePost(postId),
    onSuccess: (res) => {
      if (res.status === "success") {
        queryClient.invalidateQueries(["post"]);
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      }
    },
  });

  return { mutate };
}

export function useDeletePost() {
  const { mutate } = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      //ne mogu invalidate-at post u ovom trenutku jer kad invalidate-ujem onda bude null
      //sto znaci da nakon birsanja posta, ak udjem u drugi post, onda ce da post bude null, nece opet fetchovat jer vec ima cachovano null
      //zato treba bez invalidacije
      // queryClient.invalidateQueries(["post"]);
    },
  });
  return { mutate };
}
