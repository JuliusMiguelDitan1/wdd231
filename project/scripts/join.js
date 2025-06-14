function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      navLinks.classList.toggle('show');
    }

    // Footer last modified
    const full = document.querySelector("#full");
    const today = new Date(document.lastModified);
    full.innerHTML = "Last Modified: " + today.toLocaleString();

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