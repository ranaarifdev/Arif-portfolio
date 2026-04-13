/* =========================
   script.js — Fixed & Production Ready
   ========================= */

/* Wait for DOM to be fully loaded */
document.addEventListener('DOMContentLoaded', function() {

  /* ---------- Buttons (Call & Gmail) ---------- */
  const callBtn = document.getElementById('callBtn');
  const gmailBtn = document.getElementById('gmailBtn');

  if (callBtn) {
    callBtn.addEventListener('click', function() {
      window.location.href = 'tel:+923060830941';
    });
  }

  if (gmailBtn) {
    gmailBtn.addEventListener('click', function() {
      const to = 'ranaarifnoon66@gmail.com';
      const subject = encodeURIComponent('Hello Rana');
      const body = encodeURIComponent('Hi Rana,\n\n');
      window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + subject + '&body=' + body,
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
  let typeTimeout = null;

  function typeLoop() {
    if (!typingEl) return;
    const current = titles[ti % titles.length];

    if (!deleting) {
      typingEl.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        typeTimeout = setTimeout(function() { deleting = true; typeLoop(); }, 1000);
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
    typeTimeout = setTimeout(typeLoop, deleting ? 60 : 120);
  }
  typeLoop();

  /* ---------- Reveal on Scroll ---------- */
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });

  /* ---------- Mobile Menu Toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav .links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('change', function(e) {
      navLinks.style.display = e.target.checked ? 'flex' : '';
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.checked = false;
        if (window.innerWidth <= 900) {
          navLinks.style.display = '';
        }
      });
    });
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ---------- EmailJS Contact Form ---------- */
  // Leave these empty to use mailto fallback
  // To enable EmailJS, replace with your actual credentials from https://www.emailjs.com
  const PUBLIC_KEY  = '';  // Replace with your EmailJS public key
  const SERVICE_ID  = '';  // Replace with your EmailJS service ID
  const TEMPLATE_ID = '';  // Replace with your EmailJS template ID

  // Only initialize EmailJS if SDK is loaded and keys are provided
  if (window.emailjs && typeof window.emailjs.init === 'function' && PUBLIC_KEY && PUBLIC_KEY !== '') {
    try {
      emailjs.init(PUBLIC_KEY);
      console.log('EmailJS initialized');
    } catch (e) {
      console.warn('EmailJS init failed', e);
    }
  }

  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  function showToast(msg, type) {
    type = type || 'success';
    if (!toast) {
      alert(msg);
      return;
    }
    toast.textContent = msg;
    toast.classList.remove('success', 'error', 'show');
    toast.classList.add('show', type);
    setTimeout(function() {
      toast.classList.remove('show', 'success', 'error');
    }, 3500);
  }

  function setFormLoading(isLoading) {
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.style.opacity = isLoading ? '0.7' : '1';
    submitBtn.innerHTML = isLoading
      ? '<i class="fa fa-spinner fa-spin"></i> Sending...'
      : '<i class="fa-regular fa-paper-plane"></i> Send Message';
  }

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = {
        from_name: formData.get('name') ? formData.get('name').toString().trim() : '',
        from_email: formData.get('email') ? formData.get('email').toString().trim() : '',
        message: formData.get('message') ? formData.get('message').toString().trim() : ''
      };

      if (!data.from_name || !data.from_email || !data.message) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      setFormLoading(true);

      // Check if EmailJS is configured and available
      const hasEmailJS = window.emailjs && 
                         typeof window.emailjs.send === 'function' &&
                         PUBLIC_KEY && PUBLIC_KEY !== '' &&
                         SERVICE_ID && SERVICE_ID !== '' &&
                         TEMPLATE_ID && TEMPLATE_ID !== '';

      if (hasEmailJS) {
        try {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, data);
          form.reset();
          showToast('Message sent! I will reply soon.', 'success');
        } catch (err) {
          console.error('EmailJS send error:', err);
          // Fallback to mailto
          const to = 'ranaarifnoon66@gmail.com';
          const subject = encodeURIComponent('Portfolio Message from ' + data.from_name);
          const body = encodeURIComponent(data.message + '\n\nReply to: ' + data.from_email);
          window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
          showToast('Opened your mail app instead.', 'error');
        }
      } else {
        // Fallback to mailto
        const to = 'ranaarifnoon66@gmail.com';
        const subject = encodeURIComponent('Portfolio Message from ' + data.from_name);
        const body = encodeURIComponent(data.message + '\n\nReply to: ' + data.from_email);
        window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
        showToast('Opening your email client...', 'success');
      }

      setFormLoading(false);
    });
  }

  /* ---------- Certificate Preview Modal ---------- */
  const certImages = document.querySelectorAll('#certifications .card img');
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const closeCert = document.getElementById('closeCert');

  if (certModal && certModalImg) {
    certImages.forEach(function(img) {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        certModal.style.display = 'block';
        certModalImg.src = img.src;
      });
    });

    if (closeCert) {
      closeCert.addEventListener('click', function() {
        certModal.style.display = 'none';
      });
    }

    // Close when clicking outside the image
    certModal.addEventListener('click', function(e) {
      if (e.target === certModal) {
        certModal.style.display = 'none';
      }
    });
  }

});
