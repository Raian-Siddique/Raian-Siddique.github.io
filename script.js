// ===== PROGRESS BAR =====
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
function updateNavbar() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', () => {
  updateProgress();
  updateNavbar();
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline-flex';
  submitBtn.disabled = true;

  const data = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    // Fallback: open mailto
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const message = data.get('message') || '';
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:raian.siddique@gmail.com?subject=${subject}&body=${body}`;

    btnText.style.display = 'inline-flex';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
