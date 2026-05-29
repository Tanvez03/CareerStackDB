
console.log("ROLE ON JOBS PAGE:", localStorage.getItem("role"));
console.log("jobs.js loaded");
const JOBS_API_URL = "http://localhost:5000/api";

async function loadJobs() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  document.getElementById("roleLabel").innerText = `Logged in as: ${role || "Guest"}`;

  const createSection = document.getElementById("createJobSection");

  if (role === "Employer") {
    createSection.style.display = "block";
  } else {
    createSection.style.display = "none";
  }

  const res = await fetch(`${JOBS_API_URL}/jobs`);
  const jobs = await res.json();

  const container = document.getElementById("jobsList");
  container.innerHTML = "";

  if (!Array.isArray(jobs)) {
    container.innerHTML = `<p>${jobs.message || "Unable to load jobs."}</p>`;
    return;
  }

  if (jobs.length === 0) {
    container.innerHTML = "<p>No jobs available yet.</p>";
    return;
  }

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h4>${job.Title}</h4>
      <p><strong>Description:</strong> ${job.Job_Description}</p>
      <p><strong>Location:</strong> ${job.Location}</p>
      <p><strong>Salary:</strong> $${job.Salary_Min} - $${job.Salary_Max}</p>
      <p><strong>Type:</strong> ${job.Employment_Type}</p>
      <p><strong>Status:</strong> ${job.Status}</p>
      <p><strong>Deadline:</strong> ${job.Deadline ? job.Deadline.substring(0, 10) : "N/A"}</p>
    `;

    if (role === "JobSeeker") {
      const btn = document.createElement("button");
      btn.innerText = "Apply with Resume PDF";
      btn.onclick = () => applyJob(job.Job_ID);
      div.appendChild(btn);
    }
    if (role === "Employer" || role === "Admin") {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete Job";
    deleteBtn.onclick = () => deleteJob(job.Job_ID);
    div.appendChild(deleteBtn);
    }

    if (role === "Employer" || role === "Admin") {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit Job";
      editBtn.onclick = () => showEditForm(job);
      div.appendChild(editBtn);
    }
    container.appendChild(div);
  });
}

async function createJob() {
  const token = localStorage.getItem("token");

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const location = document.getElementById("location").value.trim();
  const salaryMin = document.getElementById("salary_min").value;
  const salaryMax = document.getElementById("salary_max").value;
  const type = document.getElementById("type").value;
  const deadline = document.getElementById("deadline").value;

  // ✅ VALIDATION
  if (!title || !description || !location || !salaryMin || !salaryMax || !type || !deadline) {
    alert("Please fill in all fields");
    return;
  }

  if (Number(salaryMin) > Number(salaryMax)) {
    alert("Minimum salary cannot be greater than maximum salary");
    return;
  }

  const body = {
    title,
    job_description: description,
    location,
    salary_min: Number(salaryMin),
    salary_max: Number(salaryMax),
    employment_type: type,
    deadline
  };

  const res = await fetch(`${JOBS_API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (res.ok) {
    alert("Job created successfully");

    // clear form
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
    document.getElementById("salary_min").value = "";
    document.getElementById("salary_max").value = "";
    document.getElementById("deadline").value = "";

    loadJobs();
  } else {
    alert(data.message || "Failed to create job");
  }
}

async function applyJob(jobId) {
  const token = localStorage.getItem("token");

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/pdf";

  input.onchange = async () => {
    const file = input.files[0];

    if (!file) {
      alert("Please select a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", file);

    const res = await fetch(`${JOBS_API_URL}/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      alert("Application submitted successfully");
    } else {
      alert(data.message || "Failed to apply");
    }
  };

  input.click();
}


async function deleteJob(jobId) {
  const token = localStorage.getItem("token");

  const confirmDelete = confirm("Are you sure you want to delete this job?");
  if (!confirmDelete) return;

  const res = await fetch(`${JOBS_API_URL}/jobs/${jobId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (res.ok) {
    alert("Job deleted successfully");
    loadJobs();
  } else {
    alert(data.message || "Failed to delete job");
  }
}

function showEditForm(job) {
  document.getElementById("title").value = job.Title;
  document.getElementById("description").value = job.Job_Description;
  document.getElementById("location").value = job.Location;
  document.getElementById("salary_min").value = job.Salary_Min;
  document.getElementById("salary_max").value = job.Salary_Max;
  document.getElementById("type").value = job.Employment_Type;
  document.getElementById("deadline").value = job.Deadline
    ? job.Deadline.substring(0, 10)
    : "";

  localStorage.setItem("editingJobId", job.Job_ID);

  const createBtn = document.getElementById("createJobBtn");
  createBtn.innerText = "Update Job";
  createBtn.onclick = updateJob;
}

async function updateJob() {
  const token = localStorage.getItem("token");
  const jobId = localStorage.getItem("editingJobId");

  const body = {
    title: document.getElementById("title").value.trim(),
    job_description: document.getElementById("description").value.trim(),
    location: document.getElementById("location").value.trim(),
    salary_min: Number(document.getElementById("salary_min").value),
    salary_max: Number(document.getElementById("salary_max").value),
    employment_type: document.getElementById("type").value,
    status: "Open",
    deadline: document.getElementById("deadline").value
  };

  const res = await fetch(`${JOBS_API_URL}/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (res.ok) {
    alert("Job updated successfully");
    localStorage.removeItem("editingJobId");

    const createBtn = document.getElementById("createJobBtn");
    createBtn.innerText = "Create Job";
    createBtn.onclick = createJob;

    clearJobForm();
    loadJobs();
  } else {
    alert(data.message || "Failed to update job");
  }
}