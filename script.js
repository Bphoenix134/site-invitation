const weddingDate = new Date("2026-09-12T11:00:00");

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function padNumber(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference <= 0) {
    countdownElements.days.textContent = "00";
    countdownElements.hours.textContent = "00";
    countdownElements.minutes.textContent = "00";
    countdownElements.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdownElements.days.textContent = padNumber(days);
  countdownElements.hours.textContent = padNumber(hours);
  countdownElements.minutes.textContent = padNumber(minutes);
  countdownElements.seconds.textContent = padNumber(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const animatedElements = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add("is-visible"));
}


const form = document.getElementById("rsvp-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (event) => {
  formStatus.textContent = "";

  if (!form.checkValidity()) {
    event.preventDefault();
    formStatus.textContent = "Пожалуйста, заполните обязательные поля перед отправкой.";
    form.reportValidity();
    return;
  }

  formStatus.textContent = "Отправляем ваш ответ...";
});
