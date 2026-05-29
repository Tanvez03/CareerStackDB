function loadDashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("roleText").innerText = `Logged in as: ${role}`;

  if (role === "Employer") {
    document.getElementById("employerActions").style.display = "block";
  }

  if (role === "JobSeeker") {
    document.getElementById("jobSeekerActions").style.display = "block";
  }

  if (role === "Admin") {
    document.getElementById("adminActions").style.display = "block";
  }
}