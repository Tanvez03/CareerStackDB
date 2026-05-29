const APPLICATIONS_API_URL = "http://localhost:5000/api";

async function loadApplications() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${APPLICATIONS_API_URL}/applications/my`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const applications = await res.json();
  const container = document.getElementById("applicationsList");

  container.innerHTML = "";

  if (!Array.isArray(applications)) {
    container.innerHTML = `<p>${applications.message || "Could not load applications."}</p>`;
    return;
  }

  if (applications.length === 0) {
    container.innerHTML = "<p>You have not applied to any jobs yet.</p>";
    return;
  }

  applications.forEach(app => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h4>${app.Title}</h4>
      <p><strong>Job ID:</strong> ${app.Job_ID}</p>
      <p><strong>Location:</strong> ${app.Location}</p>
      <p><strong>Type:</strong> ${app.Employment_Type}</p>
      <p><strong>Status:</strong> ${app.Status}</p>
      <p><strong>Submitted:</strong> ${app.Submitted_At}</p>
      <hr>
    `;

    container.appendChild(div);
  });
}