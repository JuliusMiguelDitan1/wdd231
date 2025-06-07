/* ---------- Footer “last modified” ---------- */
const full = document.querySelector('#full');
full.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleString()}`;

/* ---------- Hamburger menu ---------- */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

/* ---------- Build Point-of-Interest cards ---------- */
async function buildCards() {
  const grid = document.querySelector('.poi-grid');
  const template = document.getElementById('card-template');

  try {
    const response  = await fetch('final.json');   // ← path to your JSON
    const pois      = await response.json();

    pois.forEach(poi => {
      const clone = template.content.cloneNode(true);

      /* Title */
      clone.querySelector('.card__title').textContent = poi.name;

      /* Image */
      const img = clone.querySelector('img');
      img.src   = poi.image;
      img.alt   = `${poi.name} photo`;

      /* Caption, address & description */
      clone.querySelector('figcaption').textContent      = poi.name;
      clone.querySelector('.card__address').textContent  = poi.address;
      clone.querySelector('.card__description').textContent = poi.description;

      /* “View on Google Maps” button */
      clone.querySelector('.card__btn').addEventListener('click', () => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(poi.address)}`;
        window.open(mapUrl, '_blank');
      });

      grid.appendChild(clone);
    });
  } catch (err) {
    console.error('Error loading POIs:', err);
    grid.innerHTML = '<p class="error">Sorry, we couldn’t load the points of interest right now.</p>';
  }
}

document.addEventListener('DOMContentLoaded', buildCards);

/* ---------- Personalized “last visit” message ---------- */
function showVisitMessage() {
  const msgEl        = document.getElementById('visit-message');
  const MILLI_PER_DAY = 86_400_000;        // 1000 × 60 × 60 × 24
  const now           = Date.now();
  const lastVisit     = Number(localStorage.getItem('lastVisit')) || 0;

  let message;
  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const diffDays = Math.floor((now - lastVisit) / MILLI_PER_DAY);
    message = diffDays < 1
      ? 'Back so soon! Awesome!'
      : `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
  }

  msgEl.textContent = message;
  localStorage.setItem('lastVisit', now);
}

document.addEventListener('DOMContentLoaded', showVisitMessage);
