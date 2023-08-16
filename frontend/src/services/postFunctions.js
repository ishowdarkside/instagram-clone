import axios from "axios";
const BASE_URL = "/";

export async function commentPost(postId, comment) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/posts/comment-post/${postId}`, {
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
  const token = localStorage.getItem("jwt");
  try {
    await fetch(`${BASE_URL}api/posts/delete-comment/${postId}`, {
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
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/posts/post/${postId}`, {
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
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/posts/like-post/${postId}`, {
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
  const token = localStorage.getItem("jwt");
  try {
    await fetch(`${BASE_URL}api/posts/delete-post/${postId}`, {
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
  const token = localStorage.getItem("jwt");

  try {
    const res = await fetch(`${BASE_URL}api/posts/feed`, {
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

export async function createPost(data) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await axios({
      url: `${BASE_URL}api/posts/create-post`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data,
    });
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
}
