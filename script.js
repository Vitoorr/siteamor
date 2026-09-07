// DATA EM QUE COMEÇAMOS A NAMORAR
const relationshipStartDate = new Date("2026-03-14T00:00:00-03:00");
// LINK DA NOSSA MÚSICA DO SPOTIFY
const spotifyEmbedUrl = "https://open.spotify.com/embed/track/0bOqCHcUOMEDoDqYUL0PLW?utm_source=generator";

const daysCount = document.getElementById("daysCount");
const timerDays = document.getElementById("timerDays");
const timerHours = document.getElementById("timerHours");
const timerMinutes = document.getElementById("timerMinutes");
const spotifyEmbed = document.getElementById("spotifyEmbed");
const photoCards = document.querySelectorAll(".photo-card");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox__close");

function updateRelationshipCounter() {
  if (!daysCount || !timerDays || !timerHours || !timerMinutes) {
    return;
  }

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - relationshipStartDate.getTime());
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  daysCount.textContent = days.toString();
  timerDays.textContent = days.toString();
  timerHours.textContent = hours.toString().padStart(2, "0");
  timerMinutes.textContent = minutes.toString().padStart(2, "0");
}

function setupSpotifyEmbed() {
  if (!spotifyEmbed) {
    return;
  }

  spotifyEmbed.src = spotifyEmbedUrl;
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupLightbox() {
  if (!lightbox || !lightboxImage || !lightboxClose) {
    return;
  }

  photoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const imageSource = card.dataset.image;
      lightboxImage.src = imageSource;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });
}

updateRelationshipCounter();
setupSpotifyEmbed();
setupRevealAnimations();
setupLightbox();

setInterval(updateRelationshipCounter, 60000);
