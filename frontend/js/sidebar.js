function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.querySelector(".sidebar-toggle");

  sidebar.classList.toggle("closed");
  toggle.classList.toggle("closed");
  document.body.classList.toggle("sidebar-collapsed");

  localStorage.setItem(
    "sidebarClosed",
    sidebar.classList.contains("closed") ? "true" : "false"
  );
}

function loadSidebarState() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.querySelector(".sidebar-toggle");
     
  if (window.innerWidth <= 1200) {
    sidebar.classList.add("closed");
    document.body.classList.add("sidebar-collapsed");
    return;
  }
  
  if (localStorage.getItem("sidebarClosed") === "true") {
    sidebar.classList.add("closed");
    toggle.classList.add("closed");
    document.body.classList.add("sidebar-collapsed");
  }
}