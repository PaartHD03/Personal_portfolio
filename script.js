// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

// Navigation Menu Toggle
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let body = document.querySelector("body");

menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.display = "none";
  body.style.overflow = "hidden";
};

cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.display = "block";
  body.style.overflow = "auto";
};

// Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});



// Chatbot Interactivity
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbot = document.getElementById("chatbot");
const closeChatbot = document.getElementById("close-chatbot");
const chatbotMessages = document.querySelector(".chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");

// Toggle chatbot visibility on icon click
chatbotIcon.addEventListener("click", () => {
  chatbot.classList.toggle("hidden");
});

// Close chatbot on close button click
closeChatbot.addEventListener("click", () => {
  chatbot.classList.add("hidden");
});

// Handle user input and responses
chatbotInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter" && chatbotInput.value.trim() !== "") {
    const userMessage = chatbotInput.value.trim();
    addMessage(userMessage, "user");
    chatbotInput.value = "";

    const botReply = await getBotReply(userMessage);
    addMessage(botReply, "bot");
  }
});

// Add message to chat
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  // Render HTML for bot messages
  if (sender === "bot") {
    messageDiv.innerHTML = message;
  } else {
    messageDiv.textContent = message;
  }

  chatbotMessages.appendChild(messageDiv);

  // Auto-scroll to the latest message
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate bot reply
async function getBotReply(query) {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("projects")) {
    return await getProjects();
  } else if (lowerQuery.includes("education")) {
    return `
      <strong>Education:</strong><br>
      - B.Tech in Computer Science, Ramrao Adik Institute of Technology (CGPA: 8.2)<br>
      - 12th, PCM, CKT Jr Science College (85.83%)<br>
      - 10th, VPM IAM International School (81%)`;
  } else if (lowerQuery.includes("skills")) {
    return `
      <strong>Skills:</strong><br>
      - Data Science, Web Development<br>
      - Python, SQL, JavaScript, Power BI`;
  } else if (lowerQuery.includes("contact")) {
    return `
      <strong>Contact Me:</strong><br>
      - <a href="mailto:paarth.doshi3@gmail.com">paarth.doshi3@gmail.com</a><br>
      - <a href="https://www.linkedin.com/in/paarth-doshi/" target="_blank">LinkedIn</a>`;
  } else {
    return "I'm not sure about that. Try asking about my projects, education, skills, or contact information!";
  }
}

// Fetch GitHub projects dynamically
async function getProjects() {
  const response = await fetch("https://api.github.com/users/PaartHD03/repos");
  const projects = await response.json();
  if (projects.length === 0) {
    return "I couldn't fetch any projects from GitHub. Please check back later.";
  }

  let projectList = "<strong>My Projects:</strong><ul>";
  projects.forEach((project) => {
    projectList += `
      <li><a href="${project.html_url}" target="_blank">${project.name}</a></li>`;
  });
  projectList += "</ul>";
  return projectList;
}
