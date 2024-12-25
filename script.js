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
