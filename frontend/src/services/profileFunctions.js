import axios from "axios";
const BASE_URL = "http://127.0.0.1:3000";

export async function getProfile(profileId) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}/api/users/getUser/${profileId}`, {
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

export async function followProfile(profileId) {
  const token = localStorage.getItem("jwt");
  try {
    await fetch(`${BASE_URL}/api/users/followUser/${profileId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function acceptRequest(profileId) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(
      `${BASE_URL}/api/users/acceptRequest/${profileId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function declineRequest(profileId) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(
      `${BASE_URL}/api/users/declineRequest/${profileId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function searchUsers(input) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}/api/users/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        input,
      }),
    });
    const data = await res.json();
    return data.users;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getCEO() {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}/api/users/getCEO`, {
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

export async function changeGeneralData(data) {
  const token = localStorage.getItem("jwt");

  try {
    const res = await axios.patch(`${BASE_URL}/api/auth/changeData`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function changePassword(oldPassword, newPassword) {
  try {
    const token = localStorage.getItem("jwt");
    const res = await fetch(`${BASE_URL}/api/auth/changePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
