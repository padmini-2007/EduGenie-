export async function getUserDatById(username) {
  const res = await fetch(
    `http://localhost:3000/api/user/getUserData/${username}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiUploadDocument({ username, file }) {
  const formData = new FormData();
  formData.append("pdf", file);
  console.log(formData);

  const res = await fetch(
    `http://localhost:3000/api/PythonScripts/extractData/${username}`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}
