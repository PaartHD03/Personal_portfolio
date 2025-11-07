/* ==============================================
   script.js — FINAL PORTFOLIO LOGIC
   ============================================== */

const GITHUB_USER = 'PaartHD03';
const DEFAULT_PROJECT_THUMB = 'images/default-project.jpg';

/* Custom Project Data */
const CUSTOM_PROJECT_META = {
  "House-Price-Prediction": {
    img: "images/house.png",
    note: "Regression model with feature engineering."
  },
  "Breast-Cancer-Analysis": {
    img: "images/breast.png",
    note: "EDA, model evaluation, and visualization dashboard."
  },
  "The-Tailored": {
    img: "images/tailored.png",
    note: "Full-stack responsive college project."
  },
  "Face-Mask-Prediction": {
    img: "images/facemask.png",
    note: "CNN-based image classification system."
  },
  "College-Admission-Automation": {
    img: "images/selenium.png",
    note: "Selenium + TestNG automation for admission forms."
  },
  "Loan-Dataset-Analysis": {
    img: "images/loan.png",
    note: "Loan default EDA and predictive modeling."
  },
  "HealthCare-SQL-Analytics": {
    img: "images/health-sql.png",
    note: "SQL-driven healthcare analytics project."
  },
  "Pokemon-Game": {
    img: "images/pokemon.png",
    note: "Mini Python Pokémon game built with OOP."
  }
};

/* ---------------------------------------------
   ON PAGE LOAD
--------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* Resume Button */
  document.querySelectorAll('.download-resume').forEach(btn => {
    btn.addEventListener('click', () => window.open('file/resume.pdf', '_blank'));
  });

  /* GSAP Page Animations */
  if (window.gsap) {
    gsap.registerPlugin && gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out" });

    gsap.from(".logo", { y: -20, opacity: 0, duration: 0.7 });
    gsap.from(".nav-links a", { y: -8, opacity: 0, duration: 0.6, stagger: 0.05, delay: 0.1 });
    gsap.from(".eyebrow", { y: 8, opacity: 0, duration: 0.6, delay: 0.2 });
    gsap.from(".hero-title", { y: 18, opacity: 0, duration: 0.8, delay: 0.25 });
    gsap.from(".hero-sub", { y: 16, opacity: 0, duration: 0.8, delay: 0.35 });
    gsap.from(".badge", { y: 8, opacity: 0, duration: 0.6, stagger: 0.06, delay: 0.45 });

    document.querySelectorAll(".section").forEach(sec => {
      gsap.from(sec, { y: 30, opacity: 0, duration: 0.9, scrollTrigger: { trigger: sec, start: "top 85%" } });
    });
  }

  /* Blog Section Injection */
  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid) {
    const posts = [
      { title: "A Hackathon Journey to Remember", date: "Jan 2025", link: "blog.html" },
      { title: "Recruit CRM Video Project", date: "Jan 2025", link: "https://youtu.be/-EjZqjXgFj0" },
      { title: "Data Viz with Power BI", date: "Dec 2024", link: "#" }
    ];
    posts.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'project-card';
      div.innerHTML = `<div class="project-title">${p.title}</div><div class="project-desc">${p.date}</div>`;
      div.addEventListener('click', () => window.open(p.link, '_blank'));
      blogGrid.appendChild(div);
      if (window.gsap) gsap.from(div, { y: 20, opacity: 0, duration: 0.7, delay: 0.1 + i * 0.06 });
    });
  }

  /* Manual Featured Projects (Home) */
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    const manual = [
      { 
    title: "The Tailored", 
    desc: "Developed a responsive website using Bootstrap, emphasizing clean UI/UX design and seamless navigation.", 
    img: "images/project2.jpg", 
    link: "https://tailoredweb.netlify.app/"
  },
      { title: "Breast Cancer Analysis", desc: "EDA & dashboards", img: "images/breast.png" },
      
    ];
    manual.forEach((p, i) => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = "#";
      card.innerHTML = `
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <img class="project-thumb" src="${p.img}" alt="${p.title}">
      `;
      featuredGrid.appendChild(card);
      if (window.gsap) gsap.from(card, { y: 24, opacity: 0, duration: 0.8, delay: 0.12 + i * 0.08 });
    });
  }

  /* GitHub Fetch for Projects Page */
  const projectsGrid = document.getElementById('projects-grid');
  async function loadGitHubRepos() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = `<p style="color:var(--muted)">Fetching repositories...</p>`;
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
      const repos = await res.json();
      projectsGrid.innerHTML = '';
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      repos.forEach((repo, i) => {
        const normalized = repo.name.replace(/\s+/g, '-');
        const meta = CUSTOM_PROJECT_META[repo.name] || CUSTOM_PROJECT_META[normalized];
        const thumb = meta ? meta.img : DEFAULT_PROJECT_THUMB;
        const note = meta ? meta.note : (repo.description || '');
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = repo.html_url;
        card.target = '_blank';
        card.innerHTML = `
  <div class="project-title">${repo.name}</div>
  <div class="project-desc">${note}</div>
  <div class="project-meta" style="margin-top:8px;color:var(--muted);font-size:0.9rem;">
    ${repo.language ? `<span>${repo.language}</span>` : ''}
    ${repo.stargazers_count ? ` • ⭐ ${repo.stargazers_count}` : ''}
  </div>
`;

        projectsGrid.appendChild(card);
        if (window.gsap) gsap.from(card, { y: 30, opacity: 0, duration: 0.8, delay: 0.1 + i * 0.04 });
      });
    } catch (e) {
      console.error("GitHub API Error", e);
      projectsGrid.innerHTML = `<p style="color:var(--muted)">Unable to load repositories right now.</p>`;
    }
  }
  loadGitHubRepos();

// ---------- FILTER BAR FUNCTIONALITY ----------
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('#projects-grid .project-card');
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (lang === 'all' || text.includes(lang.toLowerCase())) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});




  /* Certifications Lift Scroll Animation */
  const certificates = [
    { title: "Business Analytics", desc: "eDiploma", author: "Harvard Business School Online", img: "images/certificate4.jpg" },
    { title: "Data Visualization (Tableau)", desc: "Dashboards & viz", author: "ETLHive", img: "images/certificate1.jpg" },
    { title: "Power BI", desc: "Reporting & DAX", author: "ETLHive", img: "images/certificate1.jpg" },
    { title: "Data Science", desc: "with Python", author: "ETLHive", img: "images/certificate3.jpg" },
    { title: "Java Basics", desc: "Core Java", author: "Cognizant", img: "images/certificate1.jpg" },
    { title: "Selenium Automation", desc: "UI automation", author: "Cognizant", img: "images/certificate1.jpg" },
    { title: "SQL & Databases", desc: "SQL (Intermediate)", author: "Hacker Rank", img: "images/certificate2.jpg" },
    { title: "Web Development", desc: "HTML/CSS/JS", author: "College", img: "images/certificate1.jpg" }
  ];

  const leftList = document.getElementById('cert-left');
  const rightList = document.getElementById('cert-right');

  function buildCertCard(item) {
    const div = document.createElement('div');
    div.className = 'cert-card';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cert-meta">
        <div class="cert-title">${item.title}</div>
        <div class="cert-desc">${item.desc}</div>
        <div class="cert-author">Issued by ${item.author}</div>
      </div>
    `;
    return div;
  }

function initCertLiftScroll() {
  if (!leftList || !rightList) return;

  // base certificates
  const certs = certificates.slice(0, 4);

  // populate both lanes
  certs.forEach(item => leftList.appendChild(buildCertCard(item)));
  certs.forEach(item => rightList.appendChild(buildCertCard(item)));

  // duplicate for seamless loop
  leftList.innerHTML += leftList.innerHTML;
  rightList.innerHTML += rightList.innerHTML;

  // base measurements
  const leftHeight = leftList.scrollHeight / 2;
  const rightHeight = rightList.scrollHeight / 2;

  // motion vars
  let leftY = 0;
  let rightY = 0;
  const leftSpeed = 0.1;
  const rightSpeed = 0.1;

  function animate() {
    // Move both
    leftY -= leftSpeed;  // move up
    rightY += rightSpeed; // move down

    // Loop left (scrolls upward)
    if (Math.abs(leftY) >= leftHeight) {
      leftY = 0;
    }

    // Loop right (scrolls downward)
    if (rightY >= 0) {
      rightY = -rightHeight;
    }

    // Apply transforms
    leftList.style.transform = `translateY(${leftY}px)`;
    rightList.style.transform = `translateY(${rightY}px)`;

    requestAnimationFrame(animate);
  }

  // Initialize right list starting offset at -height so it scrolls downward naturally
  rightList.style.transform = `translateY(${-rightHeight}px)`;
  rightY = -rightHeight;

  animate();
}

window.addEventListener("load", () => setTimeout(initCertLiftScroll, 800));




  // Wait until full load
  window.addEventListener('load', () => setTimeout(initCertLiftScroll, 800));

  /* LinkedIn Float - Animate and auto-resize fix */
  const liFloat = document.querySelector('.linkedin-float');
  if (liFloat) {
    liFloat.style.height = 'auto';
    liFloat.style.minHeight = '170px';
    liFloat.style.width = '140px';
    if (window.gsap) gsap.from(liFloat, { y: 30, opacity: 0, duration: 1, delay: 0.3 });
  }
});
