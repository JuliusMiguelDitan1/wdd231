function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      navLinks.classList.toggle('show');
    }

    // Footer last modified
    const full = document.querySelector("#full");
    const today = new Date(document.lastModified);
    full.innerHTML = "Last Modified: " + today.toLocaleString();

    const url = 'data/members.json';
let companies = []; // Global so renderCompanies() can access

// Fetch company data
fetch(url)
  .then(response => response.json())
  .then(data => {
    companies = data.company;
    renderCompanies("grid"); // Default view
  })
  .catch(error => console.error("Fetch error:", error));

// View switching
function switchView(view) {
  const container = document.getElementById("company-container");
  container.className = `company-container ${view}`;
  renderCompanies(view);
}

// Render companies
function renderCompanies(view) {
  const container = document.getElementById("company-container");
  container.innerHTML = '';

  companies.forEach(company => {
    const year = new Date(company.joined_date).getFullYear();

    if (view === "grid") {
      container.innerHTML += `
        <div class="company-card">
          <img src="images/${company.image_file}" alt="${company.image_file} Logo">
          <h2>${company.name}</h2>
          <p><strong>Joined:</strong> ${year}</p>
          <button onclick="showDetails('${company.name}', '${company.address}', '${company.phone_number}', '${company.website_url}', '${company.notes}')">See More</button>
        </div>
      `;
    } else {
      container.innerHTML += `
        <div class="company-card">
          <div class="details">
            <h2>${company.name}</h2>
            <p><strong>Joined:</strong> ${year}</p>
          </div>
          <button onclick="showDetails('${company.name}', '${company.address}', '${company.phone_number}', '${company.website_url}', '${company.notes}')">See More</button>
        </div>
      `;
    }
  });
}

// Show company details
function showDetails(name, address, phone, website, notes) {
  alert(`Details for ${name}\n\nAddress: ${address}\nPhone: ${phone}\nWebsite: ${website}\nNotes: ${notes}`);
}