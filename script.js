// Toggle Menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = mobileMenu.querySelectorAll("a");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("scale-y-100");
  mobileMenu.classList.toggle("scale-y-0");
  mobileMenu.classList.toggle("opacity-100");
  mobileMenu.classList.toggle("opacity-0");
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("scale-y-100", "opacity-100");
    mobileMenu.classList.add("scale-y-0", "opacity-0");
  });
});

// Vanta.js background
VANTA.NET({
  el: "#hero-canvas",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x00aaff,
  backgroundAlpha: 0.3
});

// ScrollReveal
ScrollReveal().reveal('section', { delay: 200, distance: '50px', origin: 'bottom', interval: 200 });

// Animasi Text Gsap
gsap.registerPlugin(TextPlugin);
gsap.to(".hero-text h1", { duration: 4, delay: 1, text: "Selamat Datang di Maximusnet", ease: "none" });

// Leaflet Map
var map = L.map('map').setView([3.475, 98.689], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);

var locations = [
  { lat: 3.475, lng: 98.689, label: 'Desa Sidomulyo', paket: '50 Mbps' },
  { lat: 3.457, lng: 98.694, label: 'Desa Candi Rejo', paket: '75 Mbps' }
];

locations.forEach(loc => {
  L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(`<b>${loc.label}</b><br>Paket: ${loc.paket}`);
  L.circle([loc.lat, loc.lng], { radius: 1000, color: 'blue', fillOpacity: 0.2 }).addTo(map);
});

// Galeri
const images = [
  "image/galeri/Foto 1.jpg",
  "image/galeri/Foto 2.jpg",
  "image/galeri/Foto 3.jpg",
  "image/galeri/Foto 4.jpg",
  "image/galeri/Foto 5.jpg",
  "image/galeri/Foto 6.jpg"
];

let currentIndex = 0;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.remove("hidden");
  lightboxImg.src = images[currentIndex];
}

function closeLightbox() {
  lightbox.classList.add("hidden");
}

function changeSlide(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  lightboxImg.classList.add("scale-95", "opacity-70");
  setTimeout(() => {
    lightboxImg.src = images[currentIndex];
    lightboxImg.classList.remove("scale-95", "opacity-70");
  }, 150);
}

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("hidden")) {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
    if (e.key === "Escape") closeLightbox();
  }
});

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
}, false);

function handleGesture() {
  if (touchEndX < touchStartX - 50) changeSlide(1);
  if (touchEndX > touchStartX + 50) changeSlide(-1);
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeSlide = changeSlide;


// statistik.js
document.addEventListener("DOMContentLoaded", () => {
  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll(".counter");
  const speed = 2000;

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / speed;

    const updateCount = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target.querySelector(".counter"));
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat-box").forEach(box => observer.observe(box));

  // === VANTA BACKGROUND ===
  if (window.VANTA) {
    VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3b82f6,         // warna garis biru
      backgroundColor: 0x000000, // warna background hitam
      points: 10.00,
      maxDistance: 22.00,
      spacing: 17.00,
    });
  }
});


// Google Sheet + SweetAlert + WhatsApp
const scriptURL = 'https://script.google.com/macros/s/AKfycbx35qw4y9ywrZ9rsNgQtuwwheXzn7EJaFl61aHuG3FGON5W00mMGM-lB_qn4e56slakfQ/exec'
  const form = document.forms['Maximus-Contact-Form']

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = form.email.value.trim();
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|ymail\.com|[a-zA-Z0-9.-]+\.co\.id)$/i;

  if (!regex.test(email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Email Tidak Valid!',
      text: 'Gunakan email @gmail.com, @yahoo.com, @ymail.com, atau domain .co.id',
      confirmButtonColor: '#f59e0b'
    });
    return;
  }

  // 🔹 Tampilkan loading sebelum fetch
  Swal.fire({
    title: 'Mengirim data...',
    text: 'Mohon tunggu sebentar',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      Swal.close(); // 🔹 Tutup loading
      Swal.fire({
        icon: 'success',
        title: 'Pendaftaran Berhasil!',
        text: 'Terima kasih sudah melakukan pendaftaran, Tim kami akan menghubungi anda',
        confirmButtonColor: '#2563eb'
      }).then(() => {
        let nama = form.nama.value;
        let telepon = form.telepon.value;
        let paket = form.paket.value;
        let alamat = form.alamat.value;

        let pesan = `Halo Admin, saya baru saja daftar paket internet.%0A%0A📌 Nama: ${nama}%0A📱 Telepon: ${telepon}%0A📦 Paket: ${paket}%0A🏠 Alamat: ${alamat}`;

        window.open(`https://wa.me/6282275135697?text=${pesan}`, '_blank');
      });

      form.reset();
    })
    .catch(error => {
      Swal.close(); // 🔹 Tutup loading
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim!',
        text: 'Silakan coba lagi. Error: ' + error.message,
        confirmButtonColor: '#dc2626'
      });
    });
});


