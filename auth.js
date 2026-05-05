function register() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (!username || !email || !password || !confirm) {
    alert("Fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.email === email)) {
    alert("Email already exists");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  window.location.href = "index.html";
}