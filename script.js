/* ======= Mobile hamburger toggle ======= */
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


/* ======= Project expand/collapse logic =======
       - clicking a card toggles "expanded" class
       - only one project expanded at a time (optional)
       - accessible via keyboard (Enter/Space)
    */
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
    // allow clicking the card or the GitHub link (gh is a link and should not toggle)
    if (e.target.closest(".project-gh")) return;
    const isExpanded = card.classList.contains("expanded");
    // collapse others
    collapseAll();
    if (!isExpanded) {
      card.classList.add("expanded");
      card.setAttribute("aria-pressed", "true");
      const details = card.querySelector(".project-details");
      if (details) details.setAttribute("aria-hidden", "false");
      // scroll expanded card into view a bit
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // keyboard support
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

/* ======= Simple contact handler (client-side only) ======= */
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return false;
  }
  // For now we just show a friendly confirmation.
  alert(
    "Thanks, " +
      name +
      "! Your message has been noted (this demo does not send emails)."
  );
  e.target.reset();
  return false;
}

/* ======= Close expanded project if user clicks outside ======= */
document.addEventListener("click", (e) => {
  // if click is inside any card, do nothing
  if (e.target.closest(".project-card")) return;
  // else collapse all
  collapseAll();
});

/* ======= Optional: smooth scroll for anchor links in-page ======= */
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

/* ======= Mouse-follow glow for project cards ======= */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

/* ======= Section Heading Reveal Animation ======= */
const headings = document.querySelectorAll("section > h2");

const headingObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        headingObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

headings.forEach(h => headingObserver.observe(h));


/* ======= Dark Mode Toggle (Desktop + Mobile) ======= */
const desktopToggle = document.getElementById("darkToggle");
const mobileToggle = document.getElementById("darkToggleMobile");

function updateIcons(isDark) {
  [desktopToggle, mobileToggle].forEach(btn => {
    if (!btn) return;
    const icon = btn.querySelector("i");
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  });
}

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  updateIcons(true);
}

// Toggle handler
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateIcons(isDark);
}

desktopToggle?.addEventListener("click", toggleTheme);
mobileToggle?.addEventListener("click", toggleTheme);



