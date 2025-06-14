function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      navLinks.classList.toggle('show');
    }

    // Footer last modified
    const full = document.querySelector("#full");
    const today = new Date(document.lastModified);
    full.innerHTML = "Last Modified: " + today.toLocaleString();

    // Spotlight logic
fetch('data/final.json')
  .then(response => response.json())
  .then(data => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const place = data[randomIndex];

    const spotlight = document.getElementById('spotlight');
    spotlight.innerHTML = `
      <h3>Place Spotlight</h3>
      <img src="${place.image}" alt="${place.name}" style="width:100%; border-radius: 6px; margin-bottom: 0.5rem;">
      <h4>${place.name}</h4>
      <p><strong>Location:</strong> ${place.address}</p>
      <p>${place.description}</p>
    `;
  })
  .catch(err => {
    console.error('Error loading spotlight:', err);
    document.getElementById('spotlight').innerHTML = '<p>Spotlight data could not be loaded.</p>';
  });
