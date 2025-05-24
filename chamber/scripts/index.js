const full = document.querySelector("#full");
const today = new Date(document.lastModified);
full.innerHTML = "Last Modified: " + today.toLocaleString();

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

const weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=14.278647&lon=120.888033&units=metric&appid=52d9f9897dd856eba21114bfee2bb1e5';
const membersUrl = 'members.json';

// ---------- WEATHER ----------
fetch(weatherUrl)
  .then(res => res.json())
  .then(data => {
    const currentTemp = data.list[0].main.temp;
    const weatherDesc = data.list[0].weather[0].description;

    const currentWeather = document.getElementById('currentWeather');
    currentWeather.innerHTML += `
  <p><strong>Temperature:</strong> ${currentTemp.toFixed(1)}°C</p>
  <p><strong>Condition:</strong> ${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</p>
`;

    // Forecast for next 3 days (every 24h = every 8th record in 3-hour step)
    const forecast = document.getElementById('weatherForecast');
    for (let i = 8; i <= 24; i += 8) {
      const dayData = data.list[i];
      const date = new Date(dayData.dt_txt).toLocaleDateString(undefined, { weekday: 'long' });
      const temp = dayData.main.temp.toFixed(1);
      forecast.innerHTML += `<p>${date}: <strong>${temp}°C</strong></p>`;
    }
  })
  .catch(err => console.error('Weather load error:', err));

// ---------- SPOTLIGHTS ----------
fetch(membersUrl)
  .then(res => res.json())
  .then(data => {
    const companies = data.company;

    // Filter: active gold (3) or silver (2)
    const filtered = companies.filter(c =>
      c.status === 'active' && (c.membership_level === 2 || c.membership_level === 3)
    );

    // Shuffle + take 2–3 members
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
    const container = document.querySelector('.spotlights-container');

    shuffled.forEach(c => {
      const div = document.createElement('div');
      div.className = 'spotlight';
      div.innerHTML = `
        <img src="images/${c.image_file}" alt="${c.name} logo" style="max-width: 100px;" />
        <h3>${c.name}</h3>
        <p><strong>Membership:</strong> ${c.membership_level === 3 ? 'Gold' : 'Silver'}</p>
        <p>${c.address}</p>
        <p>${c.phone_number}</p>
        <a href="${c.website_url}" target="_blank">Visit Website</a>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error('Spotlight load error:', err));
