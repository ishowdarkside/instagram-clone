import { commentPost, getPost } from "../services/postFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export function useCommentPost() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ postId, comment }) => commentPost(postId, comment),
    onSuccess: (res) => {
      if (res.status === "success")
        queryClient.invalidateQueries({ queryKey: ["post"] });
    },
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
