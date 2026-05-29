function setupNav() {
  const role = localStorage.getItem("role");

  const appLink = document.getElementById("navApplications");
  const applicantsLink = document.getElementById("navApplicants");

  if (!role) return;

  if (role === "Employer") {
    if (appLink) appLink.style.display = "none";
  }

  if (role === "JobSeeker") {
    if (applicantsLink) applicantsLink.style.display = "none";
  }

  if (role === "Admin") {
    if (appLink) appLink.style.display = "none";
    if (applicantsLink) applicantsLink.style.display = "none";
  }
}