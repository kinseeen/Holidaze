API_KEY = "2cce9a49-627c-4905-b533-2c29345300a8";
ROOT_URL = "https://v2.api.noroff.dev";

function noroffFetch() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2luZUFwaUtleSIsImVtYWlsIjoia2luZTEyM0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc1NTYzNTkxN30.OnAo8v5-70HeH8-JmNDoUzPmm79j5--3d3CcUr6Xk3s"
  );

  const raw = JSON.stringify({
    email: "kine123@stud.noroff.no",
    password: "password",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("/auth/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
