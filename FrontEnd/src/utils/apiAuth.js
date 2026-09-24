export async function authenticateUser({ username, password }) {
  const res = await fetch("http://localhost:3000/api/user/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiRegisterStudent(Userdata) {
  const res = await fetch("http://localhost:3000/api/user/registerStudent", {
    method: "POST",
    body: JSON.stringify(Userdata),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiRegisterTeacher(Userdata) {
  const res = await fetch("http://localhost:3000/api/user/registerTeacher ", {
    method: "POST",
    body: JSON.stringify(Userdata),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function fetchUser() {
  const res = await fetch("http://localhost:3000/api/user/secret", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export async function logOutUser() {
  const res = await fetch("http://localhost:3000/api/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  });

  const data = await res.json();
  return data;
}
