const full = document.querySelector("#full");
    const today = new Date(document.lastModified);
    full.innerHTML = "Last Modified: " + today.toLocaleString();


// Hamburger menu
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('show');
    });