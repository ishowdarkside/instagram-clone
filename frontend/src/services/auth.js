export async function signup(formData) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/auth/signup`, {
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
    const res = await fetch("http://127.0.0.1:3000/api/auth/login", {
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

export async function verify(token) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
