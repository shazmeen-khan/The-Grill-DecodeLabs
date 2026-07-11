/*=========================
      MOBILE MENU
=========================*/

const menu    = document.querySelector("nav");
const menuBtn = document.querySelector(".menu-toggle");
const menuIcon = menuBtn.querySelector("i");
const menuLinks = document.querySelectorAll("nav a");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");

    // Toggle icon between bars and xmark
    if (menu.classList.contains("active")) {
        menuIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    }
});

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    });
});


/*=========================
      STICKY HEADER
=========================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 80);
});


/*=========================
      DARK MODE
=========================*/

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeBtn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
});

// Restore saved theme on load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}


/*=========================
      MENU FILTER
=========================*/

const filterBtns = document.querySelectorAll(".filter-btn");
const menuCards  = document.querySelectorAll(".menu-card");

filterBtns.forEach(button => {
    button.addEventListener("click", () => {
        filterBtns.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const value = button.dataset.filter;

        menuCards.forEach(card => {
            if (value === "all" || card.classList.contains(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/*=========================
      FAQ ACCORDION
=========================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        // Close all other open items
        faqItems.forEach(faq => {
            if (faq !== item) faq.classList.remove("active");
        });

        item.classList.toggle("active");
    });
});


/*=========================
    TESTIMONIAL SLIDER
=========================*/

const slides = document.querySelectorAll(".testimonial-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let current = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
});

prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
});

// Auto-advance every 5 seconds
setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
}, 5000);


/*=========================
    ANIMATED COUNTER
=========================*/

const counters = document.querySelectorAll(".counter");
const speed    = 120;
let counterStarted = false;

function startCounter() {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;

        const update = () => {
            const increment = Math.ceil(target / speed);
            count += increment;

            if (count >= target) {
                counter.textContent = target.toLocaleString();
            } else {
                counter.textContent = count.toLocaleString();
                requestAnimationFrame(update);
            }
        };

        update();
    });
}

const statsSection = document.querySelector(".stats");

window.addEventListener("scroll", () => {
    if (statsSection && !counterStarted &&
        window.scrollY > statsSection.offsetTop - 500) {
        startCounter();
        counterStarted = true;
    }
});


/*=========================
      SCROLL REVEAL
=========================*/

const reveals = document.querySelectorAll(".reveal");

function revealSection() {
    reveals.forEach(section => {
        const top     = section.getBoundingClientRect().top;
        const visible = window.innerHeight - 120;

        if (top < visible) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSection);
revealSection(); // run on load


/*=========================
      BACK TO TOP
=========================*/

const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 500);
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/*=========================
      SMOOTH SCROLL
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


/*=========================
 CONTACT FORM
=========================*/

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        showAlert("Please fill in all fields before sending.", "warning");
        return;
    }

    // Success feedback
    showAlert(
        "Message Sent Successfully!\nThank you for contacting The Grill.",
        "success"
    );
    contactForm.reset();
});


/*=========================
 RESERVATION FORM
=========================*/

const reserveForm = document.querySelector(".reservation-form");

reserveForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = reserveForm.querySelectorAll("input");
    let valid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") valid = false;
    });

    if (!valid) {
        showAlert("Please complete all reservation details.", "warning");
        return;
    }

    showAlert(
        "Reservation Submitted Successfully!\nThank you for choosing The Grill.",
        "success"
    );
    reserveForm.reset();
});


/*=========================
 CUSTOM ALERT HELPER
=========================*/

function showAlert(text, type = "success") {
    // Remove any existing alert
    const existing = document.querySelector(".grill-alert");
    if (existing) existing.remove();

    const alert = document.createElement("div");
    alert.className = "grill-alert";

    const icon = type === "success"
        ? '<i class="fa-solid fa-circle-check"></i>'
        : '<i class="fa-solid fa-triangle-exclamation"></i>';

    const color = type === "success" ? "#FCB88B" : "#e07b2a";

    alert.innerHTML = `${icon} <span>${text.replace(/\n/g, "<br>")}</span>`;

    Object.assign(alert.style, {
        position:        "fixed",
        top:             "110px",
        right:           "25px",
        background:      "#fff",
        color:           "#222",
        padding:         "20px 28px",
        borderRadius:    "16px",
        boxShadow:       "0 20px 50px rgba(0,0,0,0.15)",
        zIndex:          "9999",
        display:         "flex",
        alignItems:      "center",
        gap:             "14px",
        fontSize:        "15px",
        fontFamily:      "Manrope, sans-serif",
        fontWeight:      "500",
        lineHeight:      "1.6",
        maxWidth:        "360px",
        borderLeft:      `4px solid ${color}`,
        animation:       "alertSlide 0.4s ease",
    });

    // Icon color
    const iconEl = alert.querySelector("i");
    if (iconEl) iconEl.style.color = color;

    // Inject keyframe if not present
    if (!document.getElementById("grill-alert-style")) {
        const style = document.createElement("style");
        style.id = "grill-alert-style";
        style.textContent = `
            @keyframes alertSlide {
                from { opacity: 0; transform: translateX(40px); }
                to   { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(alert);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        alert.style.transition = "opacity 0.4s, transform 0.4s";
        alert.style.opacity = "0";
        alert.style.transform = "translateX(40px)";
        setTimeout(() => alert.remove(), 400);
    }, 4000);
}


/*=========================
 ACTIVE NAV LINK
=========================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/*=========================
      PRELOADER
=========================*/

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.style.opacity    = "0";
        loader.style.visibility = "hidden";
    }
});


/*=========================
      CURRENT YEAR
=========================*/

const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
