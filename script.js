/* =========================================================
   MOBILE HAMBURGER TOGGLE
========================================================= */

const hambBtn = document.getElementById("hambBtn");
const mobileMenu = document.getElementById("mobileMenu");

hambBtn &&
  hambBtn.addEventListener("click", () => {
    mobileMenu.style.display =
      mobileMenu.style.display === "none" ? "block" : "none";
  });

hambBtn.addEventListener("click", () => {
  hambBtn.classList.toggle("open");
});


/* =========================================================
   PROJECT EXPAND / COLLAPSE LOGIC
   - Click card to expand
   - Only one expanded at a time
   - Keyboard accessible (Enter / Space)
========================================================= */

const cards = document.querySelectorAll(".project-card");

function collapseAll() {
  cards.forEach((c) => {
    c.classList.remove("expanded");
    c.setAttribute("aria-pressed", "false");

    const details = c.querySelector(".project-details");
    if (details) details.setAttribute("aria-hidden", "true");
  });
}

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Allow GitHub link clicks without toggling card
    if (e.target.closest(".project-gh")) return;

    const isExpanded = card.classList.contains("expanded");

    // Collapse all cards first
    collapseAll();

    // Expand clicked card if it was not already expanded
    if (!isExpanded) {
      card.classList.add("expanded");
      card.setAttribute("aria-pressed", "true");

      const details = card.querySelector(".project-details");
      if (details) details.setAttribute("aria-hidden", "false");

      // Scroll expanded card into view
      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

  // Keyboard accessibility support
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});


/* =========================================================
   SIMPLE CONTACT HANDLER (CLIENT-SIDE ONLY)
========================================================= */

function handleContact(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return false;
  }

  alert(
    "Thanks, " +
      name +
      "! Your message has been noted (this demo does not send emails)."
  );

  e.target.reset();
  return false;
}


/* =========================================================
   CLOSE EXPANDED PROJECT WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (e) => {
  // Ignore clicks inside project cards
  if (e.target.closest(".project-card")) return;

  // Otherwise collapse all
  collapseAll();
});


/* =========================================================
   SMOOTH SCROLL FOR IN-PAGE ANCHOR LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const id = this.getAttribute("href");

    if (id === "#" || id === "") return;

    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* =========================================================
   MOUSE-FOLLOW GLOW EFFECT FOR PROJECT CARDS
========================================================= */

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});


/* =========================================================
   SECTION HEADING REVEAL ANIMATION
========================================================= */

const headings = document.querySelectorAll("section > h2");

const headingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        headingObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

headings.forEach((h) => headingObserver.observe(h));


/* =========================================================
   DARK MODE TOGGLE (DESKTOP + MOBILE)
========================================================= */

const desktopToggle = document.getElementById("darkToggle");
const mobileToggle = document.getElementById("darkToggleMobile");

function updateIcons(isDark) {
  [desktopToggle, mobileToggle].forEach((btn) => {
    if (!btn) return;

    const icon = btn.querySelector("i");
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  });
}

// Apply saved theme on page load
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  updateIcons(true);
}

// Toggle theme handler
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateIcons(isDark);
}

desktopToggle?.addEventListener("click", toggleTheme);
mobileToggle?.addEventListener("click", toggleTheme);
