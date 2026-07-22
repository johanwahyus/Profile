// =========================================================
// AMBIL DATA DARI content/data.json LALU TAMPILKAN KE HALAMAN
// =========================================================

async function loadContent() {
  try {
    const res = await fetch("content/data.json", { cache: "no-store" });
    const data = await res.json();
    renderHero(data.hero);
    renderAbout(data.about);
    renderCV(data.cv);
    renderSkills(data.skills);
    renderGallery("galleryGrid", data.portfolio, "Belum ada karya editing.");
    renderGallery("rajutanGrid", data.rajutan, "Belum ada karya rajutan.");
    renderTestimonials(data.testimonials);
    renderBooks(data.books);
    renderBlog(data.blog);
    renderContact(data.contact);
    setupLightbox();
  } catch (err) {
    console.error("Gagal memuat content/data.json:", err);
  }
}

function renderHero(hero) {
  if (!hero) return;
  document.getElementById("heroEyebrow").textContent = hero.eyebrow || "";
  document.getElementById("heroTitle").innerHTML =
    `${hero.name_line1 || ""}<br>${hero.name_line2 || ""}`;
  document.getElementById("heroTagline").textContent = hero.tagline || "";
  document.getElementById("heroPhoto").src = (hero.photo) || "";
}

function renderAbout(about) {
  if (!about) return;
  document.getElementById("aboutPhoto").src = about.photo || "";
  document.getElementById("aboutText1").textContent = about.text1 || "";
  document.getElementById("aboutText2").textContent = about.text2 || "";
}

function timelineItem(item) {
  return `
    <li class="timeline__item">
      <span class="timeline__date">${item.date || ""}</span>
      <h3 class="timeline__title">${item.title || ""}</h3>
      <p class="timeline__desc">${item.desc || ""}</p>
    </li>`;
}

function renderCV(cv) {
  if (!cv) return;
  document.getElementById("cvExperience").innerHTML = (cv.experience || []).map(timelineItem).join("");
  document.getElementById("cvEducation").innerHTML = (cv.education || []).map(timelineItem).join("");
  document.getElementById("certNote").textContent = "🏅 " + (cv.cert_note || "");
}

function renderSkills(skills) {
  if (!skills) return;
  document.getElementById("skillsTools").innerHTML = (skills.tools || []).map(s => `<span class="pill">${s}</span>`).join("");
  document.getElementById("skillsLanguages").innerHTML = (skills.languages || []).map(s => `<span class="pill">${s}</span>`).join("");
}

// Dipakai untuk Portfolio Editing & Karya Rajutan (struktur data sama)
function renderGallery(elementId, items, emptyText) {
  const grid = document.getElementById(elementId);
  if (!items || items.length === 0) {
    grid.innerHTML = `<div class="card card--empty"><div class="card--empty__icon">＋</div><p>${emptyText}</p></div>`;
    return;
  }
  grid.innerHTML = items.map(item => `
    <figure class="gallery__item">
      <img src="${item.image}" alt="${item.caption || ""}" loading="lazy">
      <figcaption>${item.caption || ""}</figcaption>
    </figure>`).join("");
}

function renderTestimonials(testimonials) {
  const quoteEl = document.getElementById("quoteFeatured");
  const attrEl = document.getElementById("quoteFeaturedAttr");
  const extraGrid = document.getElementById("testimonialGrid");

  if (!testimonials || testimonials.length === 0) {
    quoteEl.textContent = "Belum ada testimoni.";
    attrEl.textContent = "";
    extraGrid.innerHTML = "";
    return;
  }

  const [featured, ...rest] = testimonials;
  quoteEl.textContent = featured.quote || "";
  attrEl.textContent = [featured.name, featured.role].filter(Boolean).join(" — ");

  extraGrid.innerHTML = rest.map(t => `
    <div class="testimonial-card">
      <p class="testimonial-card__quote">"${t.quote || ""}"</p>
      <p class="testimonial-card__name">${t.name || ""}</p>
      <p class="testimonial-card__role">${t.role || ""}</p>
    </div>`).join("");
}

function renderBooks(books) {
  const grid = document.getElementById("bookGrid");
  if (!books || books.length === 0) {
    grid.innerHTML = `<div class="card card--empty"><div class="card--empty__icon">📖</div><p>Belum ada buku yang dicatat.</p></div>`;
    return;
  }
  grid.innerHTML = books.map(b => `
    <div class="book-card">
      <div class="book-card__cover"><img src="${b.cover}" alt="Sampul buku ${b.title || ""}" loading="lazy"></div>
      <p class="book-card__title">${b.title || ""}</p>
      <p class="book-card__author">${b.author || ""}</p>
    </div>`).join("");
}

function renderBlog(blog) {
  if (!blog) return;
  document.getElementById("blogTags").innerHTML = (blog.tags || []).map(t => `<span class="pill pill--tag">${t}</span>`).join("");
  document.getElementById("blogGrid").innerHTML = (blog.posts || []).map(post => `
    <div class="card card--empty">
      <div class="card--empty__icon">✎</div>
      <p>${post.caption || ""}</p>
    </div>`).join("");
}

function renderContact(contact) {
  if (!contact) return;
  const wrap = document.getElementById("kontakLinks");
  const links = [];

  if (contact.email) links.push({ href: `mailto:${contact.email}`, label: "Email", value: contact.email, external: false });
  if (contact.github) links.push({ href: contact.github, label: "GitHub", value: contact.github_label || contact.github, external: true });
  if (contact.instagram) links.push({ href: contact.instagram, label: "Instagram", value: contact.instagram_label || contact.instagram, external: true });
  if (contact.linkedin) links.push({ href: contact.linkedin, label: "LinkedIn", value: contact.linkedin_label || contact.linkedin, external: true });

  wrap.innerHTML = links.map(l => `
    <a href="${l.href}" class="kontak__link" ${l.external ? 'target="_blank" rel="noopener"' : ""}>
      <span class="kontak__link-label">${l.label}</span>
      <span class="kontak__link-value">${l.value}</span>
    </a>`).join("");
}

// =========================================================
// TOGGLE MENU MOBILE
// =========================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// =========================================================
// LIGHTBOX GALERI (dipakai Portfolio & Rajutan)
// =========================================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
}

function setupLightbox() {
  document.querySelectorAll(".gallery__item img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

// =========================================================
// TAHUN OTOMATIS DI FOOTER
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================================================
// MULAI
// =========================================================
loadContent();
