const BASE_URL = "http://127.0.0.1:3000";
const token = localStorage.getItem("jwt");
export async function getProfile(profileId) {
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
