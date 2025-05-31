const full = document.querySelector("#full");
const today = new Date(document.lastModified);
full.innerHTML = "Last Modified: " + today.toLocaleString();

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

  // Set timestamp on load
  document.getElementById("timestamp").value = new Date().toISOString();

  // Modal open handlers
  document.querySelectorAll('.card a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modal = document.querySelector(link.getAttribute('href'));
      if (modal) modal.showModal();
    });
  });