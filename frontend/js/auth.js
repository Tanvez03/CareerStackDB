const API_URL = "http://localhost:5000/api";

async function register() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fullName, email, password, role })
  });

  const data = await res.json();

  if (res.ok) {
    showToast("Registration successful");
    localStorage.setItem("token", data.token);

    const savedRole = data.user.Role || data.user.role;
    localStorage.setItem("role", savedRole);

    window.location.href = "dashboard.html";
  } else {
    showToast(data.message || "Registration failed", "error");
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    showToast("Login successful", "success");

    localStorage.setItem("token", data.token);

    const savedRole = data.user.Role || data.user.role;
    localStorage.setItem("role", savedRole);

    window.location.href = "dashboard.html";
  } else {
    showToast(data.message || "Login failed", "error");
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}