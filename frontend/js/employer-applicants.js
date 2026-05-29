console.log("Employer token:", localStorage.getItem("token"));

const EMPLOYER_API_URL = "http://localhost:5000/api";

async function loadEmployerJobs() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${EMPLOYER_API_URL}/jobs/my-jobs`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const jobs = await res.json();
  const container = document.getElementById("employerJobsList");
  container.innerHTML = "";

  if (!Array.isArray(jobs)) {
    container.innerHTML = `<p>${jobs.message || "Could not load jobs."}</p>`;
    return;
  }

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h4>${job.Title}</h4>
      <p><strong>Job ID:</strong> ${job.Job_ID}</p>
      <p><strong>Location:</strong> ${job.Location}</p>
      <button onclick="loadApplicants(${job.Job_ID})">View Applicants</button>
      <hr>
    `;

    container.appendChild(div);
  });
}

async function loadApplicants(jobId) {
  console.log("CLICKED JOB ID:", jobId);
  const res = await fetch(`${EMPLOYER_API_URL}/applications/job/${jobId}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const data = await res.json();

console.log("API RESPONSE:", data);
console.log("STATUS:", res.status);

  const token = localStorage.getItem("token");
  const container = document.getElementById("applicantsList");

  container.innerHTML = `<h3>Applicants for Job ID: ${jobId}</h3>`;

  try {
    const res = await fetch(`${EMPLOYER_API_URL}/applications/job/${jobId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const applicants = await res.json();

    console.log("Applicants response:", applicants);

    if (!res.ok) {
      container.innerHTML += `<p>${applicants.message || "Could not load applicants."}</p>`;
      return;
    }

    if (!Array.isArray(applicants) || applicants.length === 0) {
      container.innerHTML += "<p>No applicants yet.</p>";
      return;
    }

    applicants.forEach(app => {
      const div = document.createElement("div");
      div.className = "job-card";

      div.innerHTML = `
  <h4>${app.FullName}</h4>

  <p><strong>Application ID:</strong> ${app.ApplicationID}</p>
  <p><strong>Email:</strong> ${app.Email}</p>
  <p><strong>Phone:</strong> ${app.Phone || "N/A"}</p>
  <p><strong>Location:</strong> ${app.Location || "N/A"}</p>
  <p><strong>Status:</strong> ${app.Status}</p>
  <p><strong>Applied On:</strong> ${app.Submitted_At}</p>

  ${
    app.Resume_File
      ? `<p><strong>Resume:</strong> 
          <a href="http://localhost:5000/${app.Resume_File}" target="_blank">
            View Resume PDF
          </a>
        </p>`
      : `<p><strong>Resume:</strong> Not uploaded</p>`
  }

  <label><strong>Update Status:</strong></label>
  <select id="status-${app.ApplicationID}">
    <option value="Pending" ${app.Status === "Pending" ? "selected" : ""}>Pending</option>
    <option value="Reviewed" ${app.Status === "Reviewed" ? "selected" : ""}>Reviewed</option>
    <option value="Accepted" ${app.Status === "Accepted" ? "selected" : ""}>Accepted</option>
    <option value="Rejected" ${app.Status === "Rejected" ? "selected" : ""}>Rejected</option>
  </select>

  <button onclick="updateStatus(${app.ApplicationID})">Update Status</button>
  <hr>
`;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Load applicants error:", error);
    container.innerHTML += "<p>Error loading applicants.</p>";
  }
}

async function updateStatus(applicationId) {
  const token = localStorage.getItem("token");
  const status = document.getElementById(`status-${applicationId}`).value;

  const res = await fetch(`${EMPLOYER_API_URL}/applications/${applicationId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  const data = await res.json();
  alert(data.message || "Status updated");
}