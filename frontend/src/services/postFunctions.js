const BASE_URL = "http://127.0.0.1:3000";

export async function commentPost(postId, comment) {
  const token = localStorage.getItem("jwt");
  console.log(comment);
  try {
    const res = await fetch(`${BASE_URL}/api/posts/comment-post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getPost(postId) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}/api/posts/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
