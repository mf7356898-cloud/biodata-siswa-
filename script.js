/**
 * MUHAMMAD FIRDAUS - PERSONAL PROFILE & PORTFOLIO LOGIC
 * Architecture: Vanilla JavaScript (ES6+), Clean Modular Structure
 * Features: LocalStorage Synchronization, Live Digital Clock, Web Audio API Synth BGM,
 *           Scroll Reveal, Lightbox Gallery, Dashboard Admin, WhatsApp Direct Chat.
 */

// ==========================================
// 1. DEFAULT DATA MODEL & STATE MANAGEMENT
// ==========================================
const DEFAULT_BIODATA = {
  namaLengkap: "MUHAMMAD FIRDAUS",
  namaPanggilan: "DAUS",
  namaSamaran: "DANZ, ZARR, DITZ",
  ttl: "PALEMBANG 2 JULY 2010",
  jenisKelamin: "LAKI - LAKI",
  alamat: "KOMPLEK BNI NOMOR 50 KEL KEBUN BUNGA KEC SUKARAMI",
  agama: "ISLAM",
  hobi: "LARI",
  citaCita: "TRILIUNER",
  keahlian: "CODING, PELATIH ESPORT, DI KOMPUTER",
  gameFavorit: "MINECRAFT, FF, ML",
  motto: "Jangan berhenti ketika lelah. Berhentilah ketika selesai.",
  intro: "Pelajar berdedikasi tinggi di SMK Muhammadiyah 1 Palembang Jurusan TJKT (Teknik Jaringan Komputer & Telekomunikasi). Menggabungkan semangat kepemimpinan, keahlian networking, coding, serta ketajaman strategi sebagai pelatih esport untuk melangkah menjadi seorang triliuner masa depan.",
  avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=700&q=80",
  adminPin: "1234",
  sosmed: {
    igHandle: "@muhammad.firdaus",
    igUrl: "https://instagram.com",
    waHandle: "+62 812-3456-7890",
    waNumber: "6281234567890",
    ttHandle: "@daus.zarr",
    ttUrl: "https://tiktok.com",
    fbHandle: "Muhammad Firdaus",
    fbUrl: "https://facebook.com",
    ytHandle: "Danz Esport Official",
    ytUrl: "https://youtube.com"
  }
};

const STORAGE_KEY = "FIRDAUS_BIODATA_DATA_V1";
let appData = {};

// Load data from LocalStorage or fallback to defaults
function loadBiodataState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      appData = JSON.parse(stored);
      // Ensure nested properties exist
      if (!appData.sosmed) appData.sosmed = { ...DEFAULT_BIODATA.sosmed };
      if (!appData.adminPin) appData.adminPin = DEFAULT_BIODATA.adminPin;
    } else {
      appData = JSON.parse(JSON.stringify(DEFAULT_BIODATA));
    }
  } catch (e) {
    console.error("Gagal membaca LocalStorage, memuat default:", e);
    appData = JSON.parse(JSON.stringify(DEFAULT_BIODATA));
  }
  renderBiodataToDOM();
}

function saveBiodataState(newData) {
  try {
    appData = { ...appData, ...newData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    renderBiodataToDOM();
    showToast("Data biodata berhasil disimpan secara realtime!", "success");
    return true;
  } catch (e) {
    console.error("Gagal menyimpan ke LocalStorage:", e);
    showToast("Gagal menyimpan perubahan ke LocalStorage", "error");
    return false;
  }
}

// Render data throughout all HTML elements
function renderBiodataToDOM() {
  // Hero Section
  safeSetText("display-hero-name", appData.namaLengkap);
  safeSetText("display-hero-intro", appData.intro);
  safeSetText("display-hero-motto", `"${appData.motto}"`);

  // Avatar Image in Hero & ID Card
  const heroAvatar = document.getElementById("display-hero-avatar");
  if (heroAvatar && appData.avatarUrl) heroAvatar.src = appData.avatarUrl;
  const cardAvatar = document.getElementById("display-card-avatar");
  if (cardAvatar && appData.avatarUrl) cardAvatar.src = appData.avatarUrl;

  // ID Card
  safeSetText("display-card-name", appData.namaLengkap);
  safeSetText("display-card-nicknames", appData.namaSamaran.replace(/,/g, " • "));

  // Biodata Table
  safeSetText("display-nama-lengkap", appData.namaLengkap);
  safeSetText("display-nama-panggilan", appData.namaPanggilan);
  safeSetText("display-nama-samaran", appData.namaSamaran);
  safeSetText("display-ttl", appData.ttl);
  safeSetText("display-gender", appData.jenisKelamin);
  safeSetText("display-agama", appData.agama);
  safeSetText("display-alamat", appData.alamat);
  safeSetText("display-hobi", appData.hobi);
  safeSetText("display-cita-cita", `${appData.citaCita} 🚀`);
  safeSetText("display-keahlian", appData.keahlian);
  safeSetText("display-game-favorit", appData.gameFavorit);
  safeSetText("display-motto-panjang", `"${appData.motto}"`);

  // Social Links
  updateSocialLink("link-instagram", "handle-instagram", appData.sosmed.igUrl, appData.sosmed.igHandle);
  updateSocialLink("link-tiktok", "handle-tiktok", appData.sosmed.ttUrl, appData.sosmed.ttHandle);
  updateSocialLink("link-facebook", "handle-facebook", appData.sosmed.fbUrl, appData.sosmed.fbHandle);
  updateSocialLink("link-youtube", "handle-youtube", appData.sosmed.ytUrl, appData.sosmed.ytHandle);

  const waLink = document.getElementById("link-whatsapp");
  const waHandle = document.getElementById("handle-whatsapp");
  if (waLink) waLink.href = `https://wa.me/${appData.sosmed.waNumber.replace(/[^0-9]/g, '')}`;
  if (waHandle) waHandle.textContent = appData.sosmed.waHandle;
}

function safeSetText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = text;
}

function updateSocialLink(linkId, handleId, url, handleText) {
  const linkEl = document.getElementById(linkId);
  const handleEl = document.getElementById(handleId);
  if (linkEl && url) linkEl.href = url;
  if (handleEl && handleText) handleEl.textContent = handleText;
}

// ==========================================
// 2. REALTIME DIGITAL CLOCK (INDONESIAN WIB)
// ==========================================
function initDigitalClock() {
  const clockEl = document.getElementById("digital-clock");
  const dateEl = document.getElementById("digital-date");

  const hariArray = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulanArray = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", 
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];

  function updateClock() {
    const now = new Date();

    const hari = hariArray[now.getDay()];
    const tgl = String(now.getDate()).padStart(2, "0");
    const bln = bulanArray[now.getMonth()];
    const thn = now.getFullYear();

    const jam = String(now.getHours()).padStart(2, "0");
    const mnt = String(now.getMinutes()).padStart(2, "0");
    const dtk = String(now.getSeconds()).padStart(2, "0");

    if (dateEl) dateEl.textContent = `${hari}, ${tgl} ${bln} ${thn}`;
    if (clockEl) clockEl.textContent = `${jam}:${mnt}:${dtk} WIB`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Update footer year dynamically
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ==========================================
// 3. BACKGROUND AMBIENT PARTICLES CANVAS
// ==========================================
function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];
  const particleCount = 65;

  let mouse = { x: null, y: null, radius: 140 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 0.8;
      this.baseColor = Math.random() > 0.3 ? "168, 85, 247" : "56, 189, 248";
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.baseColor}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 * (1 - dist / 115)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 4. PROCEDURAL WEB AUDIO SYNTHESIZER (BGM)
// ==========================================
class CyberSoundtrack {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.gainNode = null;
    this.chordStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
  }

  playChord() {
    if (!this.isPlaying || !this.ctx) return;

    // Peaceful futuristic ambient chords (Eb Minor chord progression)
    const chords = [
      [155.56, 185.00, 233.08, 311.13], // Eb minor 7
      [138.59, 174.61, 207.65, 277.18], // Db major
      [123.47, 155.56, 185.00, 246.94], // B major 7
      [164.81, 196.00, 246.94, 329.63]  // E major
    ];

    const currentChord = chords[this.chordStep % chords.length];
    const now = this.ctx.currentTime;
    const chordDuration = 3.8;

    currentChord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = idx === 0 ? "sawtooth" : "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for soft futuristic tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(550 + idx * 200, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), now + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + chordDuration);
    });

    this.chordStep++;
    this.timer = setTimeout(() => this.playChord(), (chordDuration - 0.4) * 1000);
  }

  toggle() {
    this.init();
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.playChord();
    } else {
      if (this.timer) clearTimeout(this.timer);
    }
    return this.isPlaying;
  }
}

const bgmPlayer = new CyberSoundtrack();

function setupAudioToggle() {
  const toggleBtn = document.getElementById("audio-toggle-btn");
  const audioLabel = document.getElementById("audio-label");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isPlaying = bgmPlayer.toggle();
    if (isPlaying) {
      toggleBtn.classList.add("playing");
      if (audioLabel) audioLabel.textContent = "BGM: ON (CYBER CHILL)";
      showToast("Musik Latar Aktif 🎵 (Web Audio Synth)", "success");
    } else {
      toggleBtn.classList.remove("playing");
      if (audioLabel) audioLabel.textContent = "BGM: OFF";
      showToast("Musik Latar Dimatikan 🔇", "info");
    }
  });
}

// ==========================================
// 5. TYPEWRITER EFFECT
// ==========================================
function initTypewriter() {
  const typewriterEl = document.getElementById("typewriter-text");
  if (!typewriterEl) return;

  const roles = [
    "DANZ",
    "ZARR",
    "DITZ",
    "SISWA JURUSAN TJKT",
    "PELATIH TIM ESPORT",
    "CALON TRILIUNER 🚀",
    "WEB DEVELOPER MUDA"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 1800; // Pause at completion
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ==========================================
// 6. PRELOADER ANIMATION
// ==========================================
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const progressBar = document.getElementById("preloader-progress");
  const percentageEl = document.getElementById("loader-percentage");
  const consoleEl = document.getElementById("loader-console");

  if (!preloader) return;

  const logs = [
    "> Booting FIRDAUS_CORE_v2.6 ...",
    "> Checking TJKT Network Infrastructure ...",
    "> Synchronizing Esport Tactical Engine ...",
    "> Injecting Neon Purple UI Theme ...",
    "> System Ready: Welcome to Firdaus Profile!"
  ];

  let progress = 0;
  let logIdx = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      if (progressBar) progressBar.style.width = "100%";
      if (percentageEl) percentageEl.textContent = "100%";
      if (consoleEl) consoleEl.textContent = logs[logs.length - 1];

      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 600);
      }, 400);
    } else {
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (percentageEl) percentageEl.textContent = `${progress}%`;

      if (progress > logIdx * 25 && logIdx < logs.length) {
        if (consoleEl) consoleEl.textContent = logs[logIdx];
        logIdx++;
      }
    }
  }, 90);
}

// ==========================================
// 7. NAVIGATION & SCROLLSPY
// ==========================================
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // ScrollSpy Active Link
    let currentId = "";
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close on click link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
}

// ==========================================
// 8. SCROLL REVEAL & SKILL PROGRESS BARS
// ==========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-item");
  const skillBars = document.querySelectorAll(".progress-fill");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));

  // Animate skill bars when visible
  const skillSection = document.getElementById("keahlian");
  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const target = bar.getAttribute("data-target");
            bar.style.width = `${target}%`;

            const item = bar.closest(".skill-item");
            if (item) {
              const percentEl = item.querySelector(".skill-percent");
              if (percentEl) {
                animateNumberCounter(percentEl, 0, parseInt(target), 1200);
              }
            }
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillObserver.observe(skillSection);
  }
}

function animateNumberCounter(el, start, end, duration) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    el.textContent = `${value}%`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

// ==========================================
// 9. SKILLS FILTER TABS
// ==========================================
function initSkillFilterTabs() {
  const filterBtns = document.querySelectorAll(".skill-tab-btn");
  const skillGroups = document.querySelectorAll(".skills-group");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      skillGroups.forEach((group) => {
        const groupType = group.getAttribute("data-group");
        if (filter === "all" || filter === groupType) {
          group.style.display = "block";
        } else {
          group.style.display = "none";
        }
      });
    });
  });
}

// ==========================================
// 10. GALLERY FILTER & LIGHTBOX MODAL
// ==========================================
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll(".gal-filter-btn");
  const galleryCards = document.querySelectorAll(".gallery-card");

  // Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      galleryCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || category === cardCat) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Lightbox
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxBadge = document.getElementById("lightbox-badge");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.getElementById("lightbox-close");
  const backdrop = document.querySelector(".lightbox-backdrop");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let currentGalleryIndex = 0;
  const galleryItemsData = [];

  galleryCards.forEach((card, idx) => {
    const img = card.querySelector(".gal-img");
    const title = card.querySelector(".gal-title");
    const desc = card.querySelector(".gal-desc");
    const tag = card.querySelector(".gal-tag");

    const itemData = {
      src: img ? img.src : "",
      title: title ? title.textContent : "",
      desc: desc ? desc.textContent : "",
      badge: tag ? tag.textContent : ""
    };
    galleryItemsData.push(itemData);

    card.addEventListener("click", () => {
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    currentGalleryIndex = index;
    const data = galleryItemsData[currentGalleryIndex];
    if (!data) return;

    lightboxImg.src = data.src;
    lightboxTitle.textContent = data.title;
    lightboxDesc.textContent = data.desc;
    lightboxBadge.textContent = data.badge;

    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItemsData.length;
    openLightbox(currentGalleryIndex);
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItemsData.length) % galleryItemsData.length;
    openLightbox(currentGalleryIndex);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });
  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrevImage(); });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
  });
}

// ==========================================
// 11. CONTACT FORM & DIRECT WHATSAPP CHAT
// ==========================================
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const waDirectBtn = document.getElementById("btn-wa-direct");
  const formAlert = document.getElementById("form-alert");

  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !subject || !message) {
      showFormAlert("Harap isi seluruh formulir dengan lengkap.", "error");
      return;
    }

    // Success response
    showFormAlert(`Terima kasih ${name}! Pesan mengenai "${subject}" berhasil diterima di sistem kami.`, "success");
    showToast("Pesan Anda telah berhasil dikirimkan!", "success");
    contactForm.reset();
  });

  if (waDirectBtn) {
    waDirectBtn.addEventListener("click", () => {
      const name = document.getElementById("contact-name").value.trim() || "Teman Baru";
      const subject = document.getElementById("contact-subject").value || "Diskusi Esport / Proyek IT";
      const message = document.getElementById("contact-message").value.trim() || "Halo Firdaus, saya melihat website biodata kamu dan ingin terhubung!";

      const cleanWa = appData.sosmed.waNumber.replace(/[^0-9]/g, '');
      const text = encodeURIComponent(
        `Halo Muhammad Firdaus (Danz/Zarr)!\n\n` +
        `Nama: ${name}\n` +
        `Topik: ${subject}\n` +
        `Pesan:\n${message}\n\n` +
        `-- Dikirim melalui Website Biodata Firdaus`
      );

      const waUrl = `https://wa.me/${cleanWa}?text=${text}`;
      window.open(waUrl, "_blank");
      showToast("Membuka chat WhatsApp...", "info");
    });
  }

  function showFormAlert(text, type) {
    if (!formAlert) return;
    formAlert.textContent = text;
    formAlert.className = `form-alert ${type}`;
    setTimeout(() => {
      formAlert.style.display = "none";
    }, 6000);
  }
}

// ==========================================
// 12. COPY BIODATA SUMMARY & PRINT
// ==========================================
function initBioActions() {
  const copyBtn = document.getElementById("btn-copy-biodata");
  const printBtn = document.getElementById("btn-print-bio");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const summary = `
=== BIODATA PRIBADI MUHAMMAD FIRDAUS ===
Nama Lengkap : ${appData.namaLengkap}
Nama Panggilan : ${appData.namaPanggilan}
Nama Samaran / IGN : ${appData.namaSamaran}
Tempat, Tgl Lahir : ${appData.ttl}
Jenis Kelamin : ${appData.jenisKelamin}
Alamat : ${appData.alamat}
Agama : ${appData.agama}
Hobi : ${appData.hobi}
Cita-cita : ${appData.citaCita}
Keahlian : ${appData.keahlian}
Game Favorit : ${appData.gameFavorit}
Motto Hidup : "${appData.motto}"
Pendidikan : SD N 133 Palembang, SMP N 40 Palembang, SMK Muhammadiyah 1 Palembang (TJKT)
========================================
      `.trim();

      navigator.clipboard.writeText(summary).then(() => {
        showToast("Ringkasan Biodata disalin ke Clipboard!", "success");
      }).catch(() => {
        showToast("Gagal menyalin teks ke clipboard.", "error");
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

// ==========================================
// 13. DASHBOARD ADMIN (EDIT BIODATA & PIN)
// ==========================================
function initAdminDashboard() {
  const adminModal = document.getElementById("admin-modal");
  const openAdminBtn = document.getElementById("open-admin-btn");
  const heroQuickEditBtn = document.getElementById("hero-quick-edit-btn");
  const floatingAdminBtn = document.getElementById("floating-admin-btn");
  const footerAdminBtn = document.getElementById("footer-admin-btn");
  const closeAdminBtn = document.getElementById("admin-close-btn");
  const cancelBtn = document.getElementById("btn-cancel-admin");
  const backdrop = document.getElementById("admin-backdrop");

  const authView = document.getElementById("admin-auth-view");
  const formView = document.getElementById("admin-form-view");
  const pinInput = document.getElementById("admin-pin-input");
  const verifyPinBtn = document.getElementById("btn-verify-pin");
  const authHint = document.getElementById("auth-hint");

  const editForm = document.getElementById("admin-edit-form");
  const adminTabs = document.querySelectorAll(".admin-tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  let isAuthenticated = false;

  function openDashboard() {
    adminModal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (isAuthenticated) {
      showFormView();
    } else {
      showAuthView();
    }
  }

  function closeDashboard() {
    adminModal.classList.remove("active");
    document.body.style.overflow = "";
    if (authHint) authHint.textContent = "";
    if (pinInput) pinInput.value = "";
  }

  function showAuthView() {
    if (authView) authView.style.display = "block";
    if (formView) formView.style.display = "none";
    if (pinInput) {
      pinInput.value = "";
      setTimeout(() => pinInput.focus(), 200);
    }
  }

  function showFormView() {
    if (authView) authView.style.display = "none";
    if (formView) formView.style.display = "block";
    populateAdminForm();
  }

  function verifyPIN() {
    const entered = pinInput.value.trim();
    const correctPin = appData.adminPin || "1234";

    if (entered === correctPin) {
      isAuthenticated = true;
      showFormView();
      showToast("Akses Admin Terbuka!", "success");
    } else {
      if (authHint) authHint.textContent = "PIN salah! Silakan coba lagi (Default: 1234)";
      pinInput.classList.add("shake");
      setTimeout(() => pinInput.classList.remove("shake"), 400);
    }
  }

  if (openAdminBtn) openAdminBtn.addEventListener("click", openDashboard);
  if (heroQuickEditBtn) heroQuickEditBtn.addEventListener("click", openDashboard);
  if (floatingAdminBtn) floatingAdminBtn.addEventListener("click", openDashboard);
  if (footerAdminBtn) footerAdminBtn.addEventListener("click", openDashboard);
  if (closeAdminBtn) closeAdminBtn.addEventListener("click", closeDashboard);
  if (cancelBtn) cancelBtn.addEventListener("click", closeDashboard);
  if (backdrop) backdrop.addEventListener("click", closeDashboard);

  if (verifyPinBtn) verifyPinBtn.addEventListener("click", verifyPIN);
  if (pinInput) {
    pinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") verifyPIN();
    });
  }

  // Admin Tab Navigation
  adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      adminTabs.forEach((t) => t.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPane = document.getElementById(tab.getAttribute("data-tab"));
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Populate form with current appData
  function populateAdminForm() {
    setValue("edit-nama-lengkap", appData.namaLengkap);
    setValue("edit-nama-panggilan", appData.namaPanggilan);
    setValue("edit-nama-samaran", appData.namaSamaran);
    setValue("edit-ttl", appData.ttl);
    setValue("edit-gender", appData.jenisKelamin);
    setValue("edit-agama", appData.agama);
    setValue("edit-hobi", appData.hobi);
    setValue("edit-cita-cita", appData.citaCita);
    setValue("edit-alamat", appData.alamat);
    setValue("edit-keahlian", appData.keahlian);
    setValue("edit-game-favorit", appData.gameFavorit);
    setValue("edit-motto", appData.motto);
    setValue("edit-intro", appData.intro);

    // Sosmed
    setValue("edit-ig-handle", appData.sosmed.igHandle);
    setValue("edit-ig-url", appData.sosmed.igUrl);
    setValue("edit-wa-handle", appData.sosmed.waHandle);
    setValue("edit-wa-number", appData.sosmed.waNumber);
    setValue("edit-tt-handle", appData.sosmed.ttHandle);
    setValue("edit-tt-url", appData.sosmed.ttUrl);
    setValue("edit-fb-handle", appData.sosmed.fbHandle);
    setValue("edit-fb-url", appData.sosmed.fbUrl);
    setValue("edit-yt-handle", appData.sosmed.ytHandle);
    setValue("edit-yt-url", appData.sosmed.ytUrl);

    // Foto
    setValue("edit-avatar-url", appData.avatarUrl);
    const avatarPreview = document.getElementById("admin-avatar-preview");
    if (avatarPreview && appData.avatarUrl) avatarPreview.src = appData.avatarUrl;
  }

  function setValue(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  }

  // Handle Form Submission
  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const updated = {
        namaLengkap: document.getElementById("edit-nama-lengkap").value.trim(),
        namaPanggilan: document.getElementById("edit-nama-panggilan").value.trim(),
        namaSamaran: document.getElementById("edit-nama-samaran").value.trim(),
        ttl: document.getElementById("edit-ttl").value.trim(),
        jenisKelamin: document.getElementById("edit-gender").value,
        agama: document.getElementById("edit-agama").value.trim(),
        hobi: document.getElementById("edit-hobi").value.trim(),
        citaCita: document.getElementById("edit-cita-cita").value.trim(),
        alamat: document.getElementById("edit-alamat").value.trim(),
        keahlian: document.getElementById("edit-keahlian").value.trim(),
        gameFavorit: document.getElementById("edit-game-favorit").value.trim(),
        motto: document.getElementById("edit-motto").value.trim(),
        intro: document.getElementById("edit-intro").value.trim(),
        avatarUrl: document.getElementById("edit-avatar-url").value.trim() || appData.avatarUrl,
        sosmed: {
          igHandle: document.getElementById("edit-ig-handle").value.trim(),
          igUrl: document.getElementById("edit-ig-url").value.trim(),
          waHandle: document.getElementById("edit-wa-handle").value.trim(),
          waNumber: document.getElementById("edit-wa-number").value.trim(),
          ttHandle: document.getElementById("edit-tt-handle").value.trim(),
          ttUrl: document.getElementById("edit-tt-url").value.trim(),
          fbHandle: document.getElementById("edit-fb-handle").value.trim(),
          fbUrl: document.getElementById("edit-fb-url").value.trim(),
          ytHandle: document.getElementById("edit-yt-handle").value.trim(),
          ytUrl: document.getElementById("edit-yt-url").value.trim()
        }
      };

      saveBiodataState(updated);
      closeDashboard();
    });
  }

  // Preset Avatars
  const presetBtns = document.querySelectorAll(".preset-btn");
  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      setValue("edit-avatar-url", url);
      const preview = document.getElementById("admin-avatar-preview");
      if (preview) preview.src = url;
    });
  });

  // Local Image Upload (FileReader -> DataURL)
  const fileUploadInput = document.getElementById("upload-avatar-file");
  if (fileUploadInput) {
    fileUploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const dataUrl = evt.target.result;
          setValue("edit-avatar-url", dataUrl);
          const preview = document.getElementById("admin-avatar-preview");
          if (preview) preview.src = dataUrl;
          showToast("Foto berhasil dimuat dari perangkat!", "success");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Avatar URL Live Input Preview
  const avatarUrlInput = document.getElementById("edit-avatar-url");
  if (avatarUrlInput) {
    avatarUrlInput.addEventListener("input", (e) => {
      const preview = document.getElementById("admin-avatar-preview");
      if (preview) preview.src = e.target.value;
    });
  }

  // Backup & Export JSON
  const exportBtn = document.getElementById("btn-export-json");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `biodata-firdaus-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("File cadangan JSON berhasil diunduh!", "success");
    });
  }

  // Import JSON
  const importInput = document.getElementById("btn-import-json");
  if (importInput) {
    importInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          try {
            const imported = JSON.parse(evt.target.result);
            if (imported.namaLengkap) {
              saveBiodataState(imported);
              populateAdminForm();
              showToast("Data biodata berhasil dipulihkan dari file JSON!", "success");
            } else {
              showToast("Format file JSON tidak sesuai.", "error");
            }
          } catch (err) {
            showToast("Gagal membaca file JSON.", "error");
          }
        };
        reader.readAsText(file);
      }
    });
  }

  // Reset to Default
  const resetBtn = document.getElementById("btn-reset-default");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin mengembalikan seluruh biodata ke data awal (Muhammad Firdaus)?")) {
        localStorage.removeItem(STORAGE_KEY);
        appData = JSON.parse(JSON.stringify(DEFAULT_BIODATA));
        renderBiodataToDOM();
        populateAdminForm();
        showToast("Data telah di-reset ke nilai default!", "info");
      }
    });
  }

  // PIN Change
  const savePinBtn = document.getElementById("btn-save-pin");
  const newPinInput = document.getElementById("edit-admin-pin");
  if (savePinBtn && newPinInput) {
    savePinBtn.addEventListener("click", () => {
      const newPin = newPinInput.value.trim();
      if (newPin.length >= 4) {
        appData.adminPin = newPin;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        newPinInput.value = "";
        showToast(`PIN keamanan baru (${newPin}) berhasil disimpan!`, "success");
      } else {
        showToast("PIN minimal harus 4 karakter.", "error");
      }
    });
  }
}

// ==========================================
// 14. THEME TOGGLER (DARK / LIGHT / CYBER)
// ==========================================
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const savedTheme = localStorage.getItem("FIRDAUS_THEME") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("theme-light");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("theme-light");
      const isLight = document.body.classList.contains("theme-light");

      if (isLight) {
        localStorage.setItem("FIRDAUS_THEME", "light");
        if (themeIcon) {
          themeIcon.classList.remove("fa-moon");
          themeIcon.classList.add("fa-sun");
        }
        showToast("Mode Terang Diaktifkan", "info");
      } else {
        localStorage.setItem("FIRDAUS_THEME", "dark");
        if (themeIcon) {
          themeIcon.classList.remove("fa-sun");
          themeIcon.classList.add("fa-moon");
        }
        showToast("Mode Cyber Neon Diaktifkan", "info");
      }
    });
  }
}

// ==========================================
// 15. BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ==========================================
// 16. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toast-out 0.3s ease-in forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// ==========================================
// 17. APPLICATION INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadBiodataState();
  initDigitalClock();
  initAmbientCanvas();
  setupAudioToggle();
  initTypewriter();
  initPreloader();
  initNavigation();
  initScrollReveal();
  initSkillFilterTabs();
  initGalleryAndLightbox();
  initContactForm();
  initBioActions();
  initAdminDashboard();
  initThemeToggle();
  initBackToTop();
});
