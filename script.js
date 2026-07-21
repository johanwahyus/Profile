// =========================================================
// AMBIL DATA DARI content/data.json LALU TAMPILKAN KE HALAMAN
// Semua teks/gambar di website ini sumbernya dari file itu,
// jadi kalau diedit lewat CMS (/admin), tampilan ini otomatis berubah.
// =========================================================

async function loadContent() {
  try {
    const res = await fetch("content/data.json", { cache: "no-store" });
    const data = await res.json();
    renderHero(data.hero);
    renderAbout(data.about);
    renderCV(data.cv);
    renderSkills(data.skills);
    renderPortfolio(data.portfolio);
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
  const exp = document.getElementById("cvExperience");
  const edu = document.getElementById("cvEducation");
  exp.innerHTML = (cv.experience || []).map(timelineItem).join("");
  edu.innerHTML = (cv.education || []).map(timelineItem).join("");
  document.getElementById("certNote").textContent = "🏅 " + (cv.cert_note || "");
}

function renderSkills(skills) {
  if (!skills) return;
  const tools = document.getElementById("skillsTools");
  const langs = document.getElementById("skillsLanguages");
  tools.innerHTML = (skills.tools || []).map(s => `<span class="pill">${s}</span>`).join("");
  langs.innerHTML = (skills.languages || []).map(s => `<span class="pill">${s}</span>`).join("");
}

function renderPortfolio(portfolio) {
  const grid = document.getElementById("galleryGrid");
  if (!portfolio || portfolio.length === 0) {
    grid.innerHTML = `<div class="card card--empty"><div class="card--empty__icon">＋</div><p>Belum ada karya. Tambahkan lewat halaman admin.</p></div>`;
    return;
  }
  grid.innerHTML = portfolio.map(item => `
    <figure class="gallery__item">
      <img src="${item.image}" alt="${item.caption || "Karya editing foto"}" loading="lazy">
      <figcaption>${item.caption || ""}</figcaption>
    </figure>`).join("");
}

function renderBlog(blog) {
  if (!blog) return;
  const tagsWrap = document.getElementById("blogTags");
  tagsWrap.innerHTML = (blog.tags || []).map(t => `<span class="pill pill--tag">${t}</span>`).join("");

  const grid = document.getElementById("blogGrid");
  grid.innerHTML = (blog.posts || []).map(post => `
    <div class="card card--empty">
      <div class="card--empty__icon">✎</div>
      <p>${post.caption || ""}</p>
    </div>`).join("");
}

function renderContact(contact) {
  if (!contact) return;
  const wrap = document.getElementById("kontakLinks");
  const links = [];

  if (contact.email) {
    links.push({ href: `mailto:${contact.email}`, label: "Email", value: contact.email, external: false });
  }
  if (contact.github) {
    links.push({ href: contact.github, label: "GitHub", value: contact.github_label || contact.github, external: true });
  }
  if (contact.instagram) {
    links.push({ href: contact.instagram, label: "Instagram", value: contact.instagram_label || contact.instagram, external: true });
  }
  if (contact.linkedin) {
    links.push({ href: contact.linkedin, label: "LinkedIn", value: contact.linkedin_label || contact.linkedin, external: true });
  }

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
// LIGHTBOX GALERI PORTFOLIO
// Dipanggil ulang tiap kali galeri baru dirender (setupLightbox)
// karena gambar-gambarnya dibuat dinamis lewat JavaScript.
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
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// =========================================================
// TAHUN OTOMATIS DI FOOTER
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================================================
// MULAI
// =========================================================
loadContent();
