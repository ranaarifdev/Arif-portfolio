/* =========================
   script.js — Fixed & Production Ready
   ========================= */

/* Wait for DOM to be fully loaded */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Buttons (Call & Gmail) ---------- */
  const callBtn = document.getElementById('callBtn');
  const gmailBtn = document.getElementById('gmailBtn');

  if (callBtn) {
    callBtn.addEventListener('click', function () {
      window.location.href = 'tel:+923060830941';
    });
  }

  if (gmailBtn) {
    gmailBtn.addEventListener('click', function () {
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
    'Networking & Security Researcher',
    'Ethical Hacker',
    'Cybersecurity Researcher',
  ];
  const typingEl = document.getElementById('typing');
  let ti = 0, ci = 0, deleting = false;
  let typeTimeout = null;

  function typeLoop() {
    if (!typingEl) return;
    if (typeTimeout) clearTimeout(typeTimeout);
    const current = titles[ti % titles.length];

    if (!deleting) {
      typingEl.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        typeTimeout = setTimeout(function () { deleting = true; typeLoop(); }, 1200);
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
    typeTimeout = setTimeout(typeLoop, deleting ? 50 : 100);
  }
  typeLoop();

  /* ---------- Reveal on Scroll ---------- */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- Mobile Menu Toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav .links');

  if (navToggle && navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.checked = false;
      });
    });
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
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
  const PUBLIC_KEY = '';  // Replace with your EmailJS public key
  const SERVICE_ID = '';  // Replace with your EmailJS service ID
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
    setTimeout(function () {
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
    form.addEventListener('submit', async function (e) {
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
        form.reset();
        window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
        showToast('Opening your email client...', 'success');
      }

      setFormLoading(false);
    });
  }

  /* ---------- Certifications Filter & Lightbox ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalCaption = document.getElementById('certModalCaption');
  const closeCert = document.getElementById('closeCert');
  const prevCertBtn = document.getElementById('prevCert');
  const nextCertBtn = document.getElementById('nextCert');

  let activeCerts = Array.from(certCards); // List of currently visible certificates
  let currentCertIndex = 0;

  // Filtering logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Toggle active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      // Update the active list for lightbox slider
      activeCerts = Array.from(certCards).filter(card => !card.classList.contains('hidden'));
    });
  });

  // Modal navigation function
  function updateModalCert(index) {
    if (activeCerts.length === 0) return;
    
    // Circular wrap index bounds
    if (index >= activeCerts.length) index = 0;
    if (index < 0) index = activeCerts.length - 1;
    
    currentCertIndex = index;
    const selectedCard = activeCerts[currentCertIndex];
    const imgEl = selectedCard.querySelector('img');
    const titleEl = selectedCard.querySelector('h3');
    const descEl = selectedCard.querySelector('p');
    
    if (certModalImg && imgEl) {
      certModalImg.src = imgEl.src;
    }
    
    if (certModalCaption) {
      const titleText = titleEl ? titleEl.textContent : '';
      const descText = descEl ? descEl.textContent : '';
      certModalCaption.innerHTML = `<strong>${titleText}</strong><br><span style="font-size:0.85rem;opacity:0.8;">${descText}</span>`;
    }
  }

  // Open modal on image click
  certCards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      img.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        
        // Update visible list before opening (just in case)
        activeCerts = Array.from(certCards).filter(c => !c.classList.contains('hidden'));
        
        const cardIndex = activeCerts.indexOf(card);
        if (cardIndex !== -1) {
          updateModalCert(cardIndex);
          if (certModal) {
            certModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // lock scroll
          }
        }
      });
    }
  });

  // Close modal — restore body scroll
  function closeCertModal() {
    if (certModal) {
      certModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (closeCert) {
    closeCert.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', function (e) {
      if (e.target === certModal || e.target.classList.contains('modal-img-container')) {
        closeCertModal();
      }
    });
  }

  // Next & Prev button actions
  if (prevCertBtn) {
    prevCertBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      updateModalCert(currentCertIndex - 1);
    });
  }

  if (nextCertBtn) {
    nextCertBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      updateModalCert(currentCertIndex + 1);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', function (e) {
    if (certModal && certModal.style.display === 'block') {
      if (e.key === 'ArrowRight') {
        updateModalCert(currentCertIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        updateModalCert(currentCertIndex - 1);
      } else if (e.key === 'Escape') {
        closeCertModal();
      }
    }
    // Close project modal with Escape too
    if (projectModal && projectModal.style.display === 'block' && e.key === 'Escape') {
      projectModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  /* ---------- Project Details Modal ---------- */
  const projectCards = document.querySelectorAll('.project-card.clickable');
  const projectModal = document.getElementById('projectModal');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectDesc = document.getElementById('modalProjectDesc');
  const modalProjectSkills = document.getElementById('modalProjectSkills');

  if (projectModal) {
    projectCards.forEach(card => {
      card.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const desc = this.getAttribute('data-desc');
        const skills = this.getAttribute('data-skills');

        if (modalProjectTitle) modalProjectTitle.textContent = title;
        if (modalProjectDesc) modalProjectDesc.textContent = desc;
        
        if (modalProjectSkills) {
          modalProjectSkills.innerHTML = '';
          if (skills) {
            const skillArray = skills.split(',').map(s => s.trim());
            skillArray.forEach(skill => {
              const span = document.createElement('span');
              span.className = 'skill-chip';
              span.textContent = skill;
              modalProjectSkills.appendChild(span);
            });
          }
        }
        projectModal.style.display = 'block';
      });
    });

    if (closeProjectModal) {
      closeProjectModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    projectModal.addEventListener('click', function(e) {
      if (e.target === projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Auto-update footer year ---------- */
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});