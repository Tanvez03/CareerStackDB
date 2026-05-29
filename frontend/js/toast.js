function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.innerText = message;
  toast.className = "";
  toast.classList.add("show", type);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}