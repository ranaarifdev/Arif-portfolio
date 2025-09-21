/* =========================
   script.js — Improved & Fixed
   ========================= */

/* ---------- Buttons (Call & Gmail) ---------- */
const callBtn = document.getElementById('callBtn');
const gmailBtn = document.getElementById('gmailBtn');

if (callBtn) {
  callBtn.addEventListener('click', () => {
    window.location.href = 'tel:+923060830941';
  });
}

if (gmailBtn) {
  gmailBtn.addEventListener('click', () => {
    const to = 'ranaarifnoon66@gmail.com';
    const subject = encodeURIComponent('Hello Rana');
    const body = encodeURIComponent('Hi Rana,\n\n');
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      '_blank'
    );
  });
}

/* ---------- Typing Effect ---------- */
const titles = [
  'BS Cyber Security Student',
  'Android & Web Developer',
  'IT Enthusiast',
  'Problem Solver'
];
const typingEl = document.getElementById('typing');
let ti = 0, ci = 0, deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const current = titles[ti % titles.length];

  if (!deleting) {
    typingEl.textContent = current.slice(0, ci + 1);
    ci++;
    if (ci === current.length) {
      setTimeout(() => { deleting = true; typeLoop(); }, 1000);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      ti++;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 120);
}
typeLoop();

/* ---------- Reveal on Scroll ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- EmailJS Contact Form ---------- */
const PUBLIC_KEY  = 'REPLACE_EMAILJS_PUBLIC_KEY';
const SERVICE_ID  = 'REPLACE_EMAILJS_SERVICE_ID';
const TEMPLATE_ID = 'REPLACE_EMAILJS_TEMPLATE_ID';

if (window.emailjs && typeof window.emailjs.init === 'function') {
  try { emailjs.init(PUBLIC_KEY); } 
  catch (e) { console.warn('EmailJS init failed', e); }
} else {
  console.warn('EmailJS SDK not loaded. Contact form will use mailto fallback.');
}

const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(msg, type = 'success') {
  if (!toast) { alert(msg); return; }
  toast.textContent = msg;
  toast.classList.remove('success', 'error', 'show');
  toast.classList.add('show', type);
  setTimeout(() => toast.classList.remove('show', 'success', 'error'), 3500);
}

function setFormLoading(isLoading) {
  const submitBtn = form?.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.style.opacity = isLoading ? '0.7' : '1';
  submitBtn.innerHTML = isLoading
    ? '<i class="fa fa-spinner fa-spin"></i> Sending...'
    : '<i class="fa-regular fa-paper-plane"></i> Send Message';
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      from_name: formData.get('name')?.toString().trim(),
      from_email: formData.get('email')?.toString().trim(),
      message: formData.get('message')?.toString().trim()
    };

    if (!data.from_name || !data.from_email || !data.message) {
      showToast('⚠️ Please fill in all fields.', 'error');
      return;
    }

    setFormLoading(true);

    if (
      PUBLIC_KEY !== 'REPLACE_EMAILJS_PUBLIC_KEY' &&
      SERVICE_ID !== 'REPLACE_EMAILJS_SERVICE_ID' &&
      TEMPLATE_ID !== 'REPLACE_EMAILJS_TEMPLATE_ID' &&
      window.emailjs && typeof window.emailjs.send === 'function'
    ) {
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, data);
        form.reset();
        showToast('✅ Message sent! I will reply soon.', 'success');
      } catch (err) {
        console.error('EmailJS send error:', err);
        const to = 'ranaarifnoon66@gmail.com';
        const subject = encodeURIComponent(`Portfolio Message from ${data.from_name}`);
        const body = encodeURIComponent(`${data.message}\n\nReply to: ${data.from_email}`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        showToast('⚠️ Could not send via EmailJS. Opened your mail app instead.', 'error');
      } finally {
        setFormLoading(false);
      }
      return;
    }

    const to = 'ranaarifnoon66@gmail.com';
    const subject = encodeURIComponent(`Portfolio Message from ${data.from_name}`);
    const body = encodeURIComponent(`${data.message}\n\nReply to: ${data.from_email}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    showToast('⚠️ EmailJS not configured — opened your mail app.', 'error');
    setFormLoading(false);
  });
} else {
  console.warn('Contact form element (#contactForm) not found in DOM.');
}

// ---------- Certificate Preview ----------
const certImages = document.querySelectorAll('#certifications .card img');
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const closeCert = document.getElementById('closeCert');

certImages.forEach(img => {
  img.addEventListener('click', (e) => {
    e.preventDefault(); // ✅ Stop link from opening new tab
    certModal.style.display = 'block';
    certModalImg.src = img.src;
  });
});

if (closeCert) {
  closeCert.addEventListener('click', () => {
    certModal.style.display = 'none';
  });
}

// Close when clicking outside the image
if (certModal) {
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      certModal.style.display = 'none';
    }
  });
}

