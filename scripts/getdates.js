document.addEventListener("DOMContentLoaded", () => {
  // Update last modified date
  const full = document.querySelector("#full");
  const today = new Date(document.lastModified);
  full.innerHTML = "Last Modified: " + today.toLocaleString();

  const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, certificate: 'Web and Computer Programming', technology: ['Python'], completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', technology: ['HTML', 'CSS'], completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', technology: ['Python'], completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', technology: ['C#'], completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', technology: ['HTML', 'CSS', 'JavaScript'], completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', technology: ['HTML', 'CSS', 'JavaScript'], completed: false },
  ];

  const subjectButtons = document.getElementById('subjectButtons');
  const coursesContainer = document.getElementById('coursesContainer');
  const courseDetails = document.getElementById('course-details');

  function createFilterButtons() {
    const subjects = [...new Set(courses.map(course => course.subject))];
    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';
    allBtn.dataset.subject = 'all';
    allBtn.classList.add('active');
    subjectButtons.appendChild(allBtn);

    subjects.forEach(subject => {
      const btn = document.createElement('button');
      btn.textContent = subject;
      btn.dataset.subject = subject;
      subjectButtons.appendChild(btn);
    });

    subjectButtons.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const selected = e.target.dataset.subject;
        document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        displayCourses(selected);
      }
    });
  }

  function displayCourseDetails(course) {
    courseDetails.innerHTML = `
      <button id="closeModal">X</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    document.getElementById("closeModal").addEventListener("click", () => {
      courseDetails.close();
    });
  }

  function displayCourses(subjectFilter = 'all') {
    coursesContainer.innerHTML = '';
    const filtered = subjectFilter === 'all' ? courses : courses.filter(c => c.subject === subjectFilter);

    filtered.forEach(course => {
      const btn = document.createElement('button');
      btn.className = `course-button ${course.completed ? 'completed' : 'not-completed'}`;
      btn.textContent = `${course.title} (${course.number})`;
      btn.addEventListener('click', () => displayCourseDetails(course));
      coursesContainer.appendChild(btn);
    });
  }

  // Initialize
  createFilterButtons();
  displayCourses();

  // Hamburger menu
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('show');
  });
});
