const ADMIN_API_URL = "http://localhost:5000/api";
console.log("admin-users.js loaded");
async function loadUsers() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "Admin") {
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`${ADMIN_API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const users = await res.json();
  const container = document.getElementById("usersList");
  container.innerHTML = "";

  if (!Array.isArray(users)) {
    container.innerHTML = `<p>${users.message || "Could not load users."}</p>`;
    return;
  }

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h4>${user.FullName}</h4>
      <p><strong>User ID:</strong> ${user.UserID}</p>
      <p><strong>Email:</strong> ${user.Email}</p>
      <p><strong>Role:</strong> ${user.Role}</p>
      <p><strong>Created:</strong> ${user.Created_At || "N/A"}</p>
      <button class="btn-danger" onclick="deleteUser(${user.UserID})">
        Delete User
      </button>
    `;

    container.appendChild(div);
  });
}

async function deleteUser(userId) {
  const token = localStorage.getItem("token");

  const ok = confirm("Are you sure you want to delete this user?");
  if (!ok) return;

  const res = await fetch(`${ADMIN_API_URL}/admin/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (res.ok) {
    showToast("User deleted successfully");
    loadUsers();
  } else {
    showToast(data.message || "Failed to delete user", "error");
  }
}

loadUsers();