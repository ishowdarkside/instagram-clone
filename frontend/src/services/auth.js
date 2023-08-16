const BASE_URL = "/";
export async function signup(formData) {
  try {
    const res = await fetch(`${BASE_URL}api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function login(formData) {
  try {
    const res = await fetch(`${BASE_URL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function verify() {
  try {
    const token = localStorage.getItem("jwt");

    if (!token) return null;
    const res = await fetch(`${BASE_URL}api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
