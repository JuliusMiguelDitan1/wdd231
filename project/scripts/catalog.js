function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      navLinks.classList.toggle('show');
    }

    // Footer last modified
    const full = document.querySelector("#full");
    const today = new Date(document.lastModified);
    full.innerHTML = "Last Modified: " + today.toLocaleString();

    /* ---------- Build Point-of-Interest cards ---------- */
async function buildCards() {
  const grid = document.querySelector('.poi-grid');
  const template = document.getElementById('card-template');

  try {
    const response = await fetch('data/final.json');
    const pois = await response.json();

    pois.forEach(poi => {
      const clone = template.content.cloneNode(true);

      clone.querySelector('.card__title').textContent = poi.name;

      const img = clone.querySelector('img');
      img.dataset.src = poi.image; // Use data-src instead of src
      img.alt = `${poi.name} photo`;
      img.classList.add('lazy');

      clone.querySelector('figcaption').textContent = poi.name;
      clone.querySelector('.card__address').textContent = poi.address;
      clone.querySelector('.card__description').textContent = poi.description;

      clone.querySelector('.card__btn').addEventListener('click', () => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(poi.address)}`;
        window.open(mapUrl, '_blank');
      });

      grid.appendChild(clone);
    });

    lazyLoadImages(); // 👈 Call after appending all cards
  } catch (err) {
    console.error('Error loading POIs:', err);
    grid.innerHTML = '<p class="error">Sorry, we couldn’t load the points of interest right now.</p>';
  }
}

function lazyLoadImages() {
  const images = document.querySelectorAll('img.lazy');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      observer.observe(img);
    });
  } else {
    // Fallback for unsupported browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}


document.addEventListener('DOMContentLoaded', buildCards);
