export async function getData(username) {
  const res = await fetch(
    `http://localhost:3000/api/data/getDataById/${username}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiUpdateDayStreak(username) {
  const res = await fetch(
    `http://localhost:3000/api/data/updateDayStreak/${username}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}
