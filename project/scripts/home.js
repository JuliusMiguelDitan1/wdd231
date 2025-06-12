function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      navLinks.classList.toggle('show');
    }

    // Footer last modified
    const full = document.querySelector("#full");
    const today = new Date(document.lastModified);
    full.innerHTML = "Last Modified: " + today.toLocaleString();