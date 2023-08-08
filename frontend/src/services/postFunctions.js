const BASE_URL = "http://127.0.0.1:3000";

const token = localStorage.getItem("jwt");
export async function commentPost(postId, comment) {
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

export async function deleteComment(postId, commentId) {
  try {
    await fetch(`${BASE_URL}/api/posts/delete-comment/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentId,
        ja: "jarjearf",
      }),
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function getPost(postId) {
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

export async function likePost(postId) {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/like-post/${postId}`, {
      method: "PATCH",
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

export async function deletePost(postId) {
  try {
    await fetch(`${BASE_URL}/api/posts/delete-post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function getFeed() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/feed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.posts;
  } catch (err) {
    throw new Error(err);
  }
}
