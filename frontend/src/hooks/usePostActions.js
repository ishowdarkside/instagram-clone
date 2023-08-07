import { commentPost, deleteComment, getPost } from "../services/postFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export function useCommentPost() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ postId, comment }) => commentPost(postId, comment),
    onSuccess: (res) => {
      if (res.status === "success")
        queryClient.invalidateQueries({ queryKey: ["post"] });
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
