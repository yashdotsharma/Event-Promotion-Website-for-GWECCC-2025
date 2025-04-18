let slideIndex = 1;
showSlides(slideIndex);

// Auto slide every 5 seconds
setInterval(() => {
    showSlides(slideIndex += 1);
}, 5000);

// Manual slide navigation
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        let text = slides[i].querySelector(".slide-text p");
        if (text) {
            text.style.animation = "none";
            text.classList.remove("animate__fadeInUp");
        }
        let img = slides[i].querySelector("img");
        if (img) {
            img.classList.remove("animate__zoomIn");
        }
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");

    // Trigger text and image animations
    let activeText = slides[slideIndex - 1].querySelector(".slide-text p");
    if (activeText) {
        activeText.style.animation = "textSlideUp 0.5s ease-in-out forwards";
        activeText.classList.add("animate__animated", "animate__fadeInUp");
    }
    let activeImg = slides[slideIndex - 1].querySelector("img");
    if (activeImg) {
        activeImg.classList.add("animate__animated", "animate__zoomIn");
    }
}

// Countdown Timer
function startCountdown() {
    const eventDate = new Date("2025-09-09T00:00:00").getTime();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const statusEl = document.getElementById("event-status");

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            statusEl.textContent = "Event Started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }, 1000);
}

// Scroll-triggered animations
document.addEventListener("DOMContentLoaded", () => {
    startCountdown();

    const elements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute("data-animate");
                entry.target.classList.add("animate__animated", `animate__${animation}`);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});