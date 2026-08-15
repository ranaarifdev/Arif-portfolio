/* Portfolio interactions - GitHub Pages safe */
document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.from((scope || document).querySelectorAll(selector));
  }

  function replaceElementChildren(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
    for (let i = 1; i < arguments.length; i++) element.appendChild(arguments[i]);
  }

  function setBodyModal(open) {
    body.classList.toggle('modal-open', Boolean(open));
  }

  /* Theme */
  const themeToggle = qs('#themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
    });
  }

  /* Buttons (Call & Gmail) */
  const callBtn = qs('#callBtn');
  const gmailBtn = qs('#gmailBtn');

  if (callBtn) {
    callBtn.addEventListener('click', function () {
      window.location.href = 'tel:+923060830941';
    });
  }

  if (gmailBtn) {
    gmailBtn.addEventListener('click', function () {
      const to = 'ranaarifnoon66@gmail.com';
      const subject = encodeURIComponent('Hello Rana');
      const message = encodeURIComponent('Hi Rana,\n\n');
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + subject + '&body=' + message, '_blank', 'noopener');
    });
  }

  /* Typing Effect */
  const titles = [
    'BS Cyber Security Student',
    'Android Developer',
    'Cybersecurity Enthusiast',
    'Network Security Learner',
    'Ethical Hacking Learner'
  ];
  const typingEl = qs('#typing');
  let titleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typingEl) return;
    const current = titles[titleIndex % titles.length];
    typingEl.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      window.setTimeout(typeLoop, prefersReducedMotion ? 120 : 72);
      return;
    }

    if (!deleting && charIndex === current.length) {
      deleting = true;
      window.setTimeout(typeLoop, prefersReducedMotion ? 1100 : 1350);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex--;
      window.setTimeout(typeLoop, prefersReducedMotion ? 80 : 38);
      return;
    }

    deleting = false;
    titleIndex++;
    window.setTimeout(typeLoop, 220);
  }
  typeLoop();

  /* Smooth scroll and mobile menu */
  const navToggle = qs('#nav-toggle');
  const navLinks = qsa('.nav .links a');
  const sideDots = qsa('.side-dots a');

  qsa('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = qs(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      if (navToggle) navToggle.checked = false;
    });
  });

  /* Scroll progress and back-to-top */
  const progress = qs('#scrollProgress');
  const backToTop = qs('#backToTop');
  const nav = qs('.nav');

  function updateScrollUi() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const percent = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
    if (progress) progress.style.width = percent + '%';
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 520);
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }

  updateScrollUi();
  window.addEventListener('scroll', updateScrollUi, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* Reveal animations and active nav */
  const sections = qsa('section[id]');
  const revealElements = qsa('.reveal');
  const staggerItems = qsa('.cards .card, .timeline li, .language-card');

  staggerItems.forEach(function (item, index) {
    item.classList.add('stagger-item');
    item.style.transitionDelay = Math.min(index % 9, 8) * 45 + 'ms';
  });

  function revealAll() {
    revealElements.forEach(function (el) { el.classList.add('revealed'); });
    staggerItems.forEach(function (el) { el.classList.add('revealed'); });
  }

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        qsa('.stagger-item', entry.target).forEach(function (item) {
          item.classList.add('revealed');
        });
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    revealElements.forEach(function (el, index) {
      if (index % 4 === 1) el.classList.add('slide-left');
      if (index % 4 === 2) el.classList.add('slide-right');
      if (index % 4 === 3) el.classList.add('scale-in');
      revealObserver.observe(el);
    });

    window.setTimeout(revealAll, 1600);
  } else {
    revealAll();
  }

  if ('IntersectionObserver' in window && navLinks.length) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
        sideDots.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { threshold: 0.35, rootMargin: '-15% 0px -50% 0px' });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* Desktop cursor glow and card tilt */
  const cursorGlow = qs('#cursorGlow');
  if (precisePointer && cursorGlow && !prefersReducedMotion) {
    window.addEventListener('pointermove', function (event) {
      cursorGlow.style.left = event.clientX + 'px';
      cursorGlow.style.top = event.clientY + 'px';
      cursorGlow.style.opacity = '1';
    }, { passive: true });
  }

  if (precisePointer && !prefersReducedMotion) {
    qsa('.card').forEach(function (card) {
      card.classList.add('tilt-card');
      card.addEventListener('pointermove', function (event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -5;
        const ry = ((x / rect.width) - 0.5) * 5;
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        card.style.setProperty('--lift', '-4px');
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
      });
      card.addEventListener('pointerleave', function () {
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
        card.style.removeProperty('--lift');
      });
    });

    qsa('.btn, .chip, .footer-socials a').forEach(function (element) {
      element.addEventListener('pointermove', function (event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = 'translate(' + (x * 0.08).toFixed(1) + 'px, ' + (y * 0.08).toFixed(1) + 'px)';
      });
      element.addEventListener('pointerleave', function () {
        element.style.transform = '';
      });
    });
  }

  /* Contact Form */
  const form = qs('#contactForm');
  const toast = qs('#toast');
  const PUBLIC_KEY = '';
  const SERVICE_ID = '';
  const TEMPLATE_ID = '';

  if (window.emailjs && typeof window.emailjs.init === 'function' && PUBLIC_KEY) {
    try { window.emailjs.init(PUBLIC_KEY); } catch (error) { console.warn('EmailJS init failed', error); }
  }

  function showToast(message, type) {
    if (!toast) {
      alert(message);
      return;
    }
    toast.textContent = message;
    toast.classList.remove('success', 'error', 'show');
    toast.classList.add(type || 'success', 'show');
    window.setTimeout(function () {
      toast.classList.remove('show', 'success', 'error');
    }, 3600);
  }

  function setFormLoading(isLoading) {
    const submitBtn = form ? qs('button[type="submit"]', form) : null;
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.innerHTML = isLoading
      ? '<i class="fa fa-spinner fa-spin"></i> Sending...'
      : '<i class="fa-regular fa-paper-plane"></i> Send Message';
  }

  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {
        from_name: String(formData.get('name') || '').trim(),
        from_email: String(formData.get('email') || '').trim(),
        message: String(formData.get('message') || '').trim()
      };

      if (!data.from_name || !data.from_email || !data.message) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      setFormLoading(true);
      const hasEmailJS = window.emailjs &&
        typeof window.emailjs.send === 'function' &&
        PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID;

      if (hasEmailJS) {
        try {
          await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, data);
          form.reset();
          showToast('Message sent! I will reply soon.', 'success');
        } catch (error) {
          console.error('EmailJS send error:', error);
          openMailFallback(data);
          showToast('Opened your mail app instead.', 'error');
        }
      } else {
        openMailFallback(data);
        form.reset();
        showToast('Opening your email client...', 'success');
      }
      setFormLoading(false);
    });
  }

  qsa('.copy-btn').forEach(function (button) {
    button.addEventListener('click', async function () {
      const value = button.getAttribute('data-copy') || '';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const input = document.createElement('input');
          input.value = value;
          input.setAttribute('readonly', '');
          input.style.position = 'fixed';
          input.style.opacity = '0';
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        }
        showToast('Copied to clipboard.', 'success');
      } catch (error) {
        showToast('Could not copy automatically.', 'error');
      }
    });
  });

  function openMailFallback(data) {
    const to = 'ranaarifnoon66@gmail.com';
    const subject = encodeURIComponent('Portfolio Message from ' + data.from_name);
    const message = encodeURIComponent(data.message + '\n\nReply to: ' + data.from_email);
    window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + message;
  }

  /* Lightweight icons for existing cards without changing their data */
  const iconMap = {
    'Kotlin & Jetpack Compose': 'fa-brands fa-android',
    'Android Studio': 'fa-brands fa-android',
    'Python (Basic)': 'fa-brands fa-python',
    'HTML, CSS, JavaScript': 'fa-solid fa-code',
    'Computer Networking': 'fa-solid fa-network-wired',
    'Cybersecurity Basics': 'fa-solid fa-shield-halved',
    'Nmap, Metasploit, Linux': 'fa-solid fa-terminal',
    'MS Office': 'fa-solid fa-file-word',
    'Git & GitHub': 'fa-brands fa-github',
    'Cisco Packet Tracer': 'fa-solid fa-diagram-project',
    'Wireshark': 'fa-solid fa-magnifying-glass-chart',
    'Dev++': 'fa-solid fa-code',
    'VirtualBox': 'fa-solid fa-cube',
    'VMware': 'fa-solid fa-server',
    'IntelliJ IDEA Community': 'fa-solid fa-laptop-code',
    'Google APIs': 'fa-brands fa-google',
    'DownloadManager': 'fa-solid fa-download',
    'Nmap': 'fa-solid fa-satellite-dish',
    'Visual Studio': 'fa-solid fa-window-restore',
    'Certified Ethical Hacker (CEH)': 'fa-solid fa-user-shield',
    'Master Cybersecurity Tools': 'fa-solid fa-screwdriver-wrench',
    'Bug Bounty & CTFs': 'fa-solid fa-flag',
    'GitHub Portfolio': 'fa-brands fa-github',
    'Online IT Business': 'fa-solid fa-briefcase'
  };

  qsa('#skills .card, #tools .card, #strengths .card').forEach(function (card) {
    const heading = qs('h3', card);
    if (!heading || qs('.card-icon', card)) return;
    const icon = document.createElement('i');
    icon.className = 'card-icon ' + (iconMap[heading.textContent.trim()] || 'fa-solid fa-shield');
    icon.setAttribute('aria-hidden', 'true');
    card.insertBefore(icon, heading);
  });

  /* Certifications */
  (function renderAddedCerts() {
    const added = window.ADDED_CERTS || [];
    const details = window.ADDED_CERT_DETAILS || {};
    const grid = qs('.cert-grid');
    if (!grid || !added.length) return;

    added.forEach(function (src) {
      const alreadyRendered = qsa('.cert-img-wrapper img').some(function (img) {
        return img.getAttribute('src') === src;
      });
      if (alreadyRendered) return;
      const certInfo = details[src] || {};
      const name = src.replace(/^cert[-_]?/i, '').replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
      const titleText = certInfo.title || name.replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });
      const article = document.createElement('article');
      article.className = 'card cert-card';
      article.setAttribute('data-category', certInfo.category || 'it');

      const title = document.createElement('h3');
      title.textContent = titleText;
      const desc = document.createElement('p');
      desc.textContent = certInfo.description || 'Source: Unknown | Date: Unknown';
      const wrapper = document.createElement('div');
      wrapper.className = 'cert-img-wrapper';
      const img = document.createElement('img');
      img.src = src;
      img.alt = titleText + ' Certificate';
      img.loading = 'lazy';
      img.addEventListener('error', function () {
        if (article.parentNode) article.parentNode.removeChild(article);
        updateCerts();
      });
      wrapper.appendChild(img);
      article.appendChild(title);
      article.appendChild(desc);
      article.appendChild(wrapper);
      grid.appendChild(article);
    });
  })();

  const filterBtns = qsa('.filter-btn');
  const certSearch = qs('#certSearch');
  const certCount = qs('#certCount');
  const certModal = qs('#certModal');
  const certModalImg = qs('#certModalImg');
  const certModalCaption = qs('#certModalCaption');
  const closeCert = qs('#closeCert');
  const prevCertBtn = qs('#prevCert');
  const nextCertBtn = qs('#nextCert');
  let currentFilter = 'all';
  let certCards = [];
  let activeCerts = [];
  let currentCertIndex = 0;

  function getCategoryLabel(value) {
    if (value === 'cybersecurity') return 'Cybersecurity';
    if (value === 'networking') return 'Networking';
    if (value === 'it') return 'IT & Gen Tech';
    return 'All';
  }

  function prepareCertCards() {
    certCards = qsa('.cert-card');
    certCards.forEach(function (card) {
      const category = card.getAttribute('data-category') || 'it';
      const title = qs('h3', card);
      const desc = qs('p', card);
      const img = qs('img', card);
      const text = [
        title ? title.textContent : '',
        desc ? desc.textContent : '',
        category,
        getCategoryLabel(category)
      ].join(' ').toLowerCase();
      card.dataset.search = text;
      card.dataset.categoryLabel = getCategoryLabel(category);

      if (!qs('.cert-actions', card)) {
        const actions = document.createElement('div');
        actions.className = 'cert-actions';
        const viewBtn = document.createElement('button');
        viewBtn.type = 'button';
        viewBtn.className = 'btn ghost cert-view-btn';
        viewBtn.innerHTML = '<i class="fa-regular fa-eye" aria-hidden="true"></i> View Certificate';
        actions.appendChild(viewBtn);

        const verifyUrl = card.getAttribute('data-verify');
        if (verifyUrl) {
          const verify = document.createElement('a');
          verify.className = 'btn ghost';
          verify.href = verifyUrl;
          verify.target = '_blank';
          verify.rel = 'noopener noreferrer';
          verify.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Verify Credential';
          actions.appendChild(verify);
        }
        card.appendChild(actions);
      }

      if (!qs('.category-badge', card)) {
        const badge = document.createElement('span');
        badge.className = 'category-badge';
        badge.textContent = getCategoryLabel(category);
        const desc = qs('p', card);
        if (desc) {
          card.insertBefore(badge, desc);
        } else {
          card.appendChild(badge);
        }
      }

      if (img) img.setAttribute('tabindex', '0');
    });
  }

  function updateCerts() {
    prepareCertCards();
    const query = certSearch ? certSearch.value.trim().toLowerCase() : '';
    activeCerts = [];

    certCards.forEach(function (card) {
      const categoryMatch = currentFilter === 'all' || card.getAttribute('data-category') === currentFilter;
      const searchMatch = !query || (card.dataset.search || '').includes(query);
      const visible = categoryMatch && searchMatch;
      card.classList.toggle('hidden', !visible);
      if (visible) activeCerts.push(card);
    });

    if (certCount) {
      certCount.textContent = 'Showing ' + activeCerts.length + ' of ' + certCards.length + ' certificates';
    }
  }

  function updateModalCert(index) {
    if (!activeCerts.length || !certModalImg) return;
    if (index >= activeCerts.length) index = 0;
    if (index < 0) index = activeCerts.length - 1;
    currentCertIndex = index;

    const selectedCard = activeCerts[currentCertIndex];
    const img = qs('img', selectedCard);
    const title = qs('h3', selectedCard);
    const desc = qs('p', selectedCard);
    if (img) {
      certModalImg.src = img.currentSrc || img.src;
      certModalImg.alt = img.alt || 'Certificate Preview';
    }
    if (certModalCaption) {
      const strong = document.createElement('strong');
      strong.textContent = title ? title.textContent : 'Certificate';
      const small = document.createElement('span');
      small.textContent = desc ? desc.textContent : '';
      replaceElementChildren(certModalCaption, strong, document.createElement('br'), small);
    }
  }

  function openCertModal(card) {
    updateCerts();
    const index = activeCerts.indexOf(card);
    if (index === -1 || !certModal) return;
    updateModalCert(index);
    certModal.classList.add('is-open');
    setBodyModal(true);
    if (closeCert) closeCert.focus();
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('is-open');
    setBodyModal(false);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (item) { item.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      updateCerts();
    });
  });

  if (certSearch) certSearch.addEventListener('input', updateCerts);

  document.addEventListener('click', function (event) {
    const viewButton = event.target.closest('.cert-view-btn');
    if (viewButton) {
      const card = viewButton.closest('.cert-card');
      if (card) openCertModal(card);
      return;
    }

    const certImage = event.target.closest('.cert-card img');
    if (certImage) {
      const card = certImage.closest('.cert-card');
      if (card) openCertModal(card);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.target.matches('.cert-card img')) {
      const card = event.target.closest('.cert-card');
      if (card) openCertModal(card);
    }
  });

  if (closeCert) closeCert.addEventListener('click', closeCertModal);
  if (closeCert) closeCert.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeCertModal();
    }
  });
  if (certModal) {
    certModal.addEventListener('click', function (event) {
      if (event.target === certModal || event.target.classList.contains('modal-img-container')) closeCertModal();
    });
  }
  if (prevCertBtn) prevCertBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    updateModalCert(currentCertIndex - 1);
  });
  if (nextCertBtn) nextCertBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    updateModalCert(currentCertIndex + 1);
  });

  updateCerts();

  /* Dynamic statistics */
  const statMap = {
    certificates: function () { return qsa('.cert-card').length; },
    projects: function () { return qsa('.project-card.clickable, .project-card.active-project.clickable').length; },
    skills: function () { return qsa('#skills .card').length; },
    tools: function () { return qsa('#tools .card').length; }
  };

  function animateNumber(element, target) {
    if (prefersReducedMotion) {
      element.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 900;
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statEls = qsa('[data-stat]');
  function populateStats() {
    statEls.forEach(function (element) {
      const key = element.getAttribute('data-stat');
      const getter = statMap[key];
      animateNumber(element, getter ? getter() : 0);
    });
  }

  const statsSection = qs('.stats-section');
  if ('IntersectionObserver' in window && statsSection) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        populateStats();
        statsObserver.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    statsObserver.observe(statsSection);
  } else {
    populateStats();
  }

  /* Project Details Modal */
  const projectModal = qs('#projectModal');
  const closeProjectModal = qs('#closeProjectModal');
  const modalProjectTitle = qs('#modalProjectTitle');
  const modalProjectDesc = qs('#modalProjectDesc');
  const modalProjectSkills = qs('#modalProjectSkills');

  qsa('.project-card.clickable').forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', function () { openProjectModal(card); });
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  function openProjectModal(card) {
    if (!projectModal) return;
    const title = card.getAttribute('data-title') || 'Project';
    const desc = card.getAttribute('data-desc') || '';
    const skills = card.getAttribute('data-skills') || '';
    if (modalProjectTitle) modalProjectTitle.textContent = title;
    if (modalProjectDesc) modalProjectDesc.textContent = desc;
    if (modalProjectSkills) {
      replaceElementChildren(modalProjectSkills);
      skills.split(',').map(function (skill) { return skill.trim(); }).filter(Boolean).forEach(function (skill) {
        const span = document.createElement('span');
        span.className = 'skill-chip';
        span.textContent = skill;
        modalProjectSkills.appendChild(span);
      });
    }
    projectModal.classList.add('is-open');
    setBodyModal(true);
    if (closeProjectModal) closeProjectModal.focus();
  }

  function closeProject() {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    setBodyModal(false);
  }

  if (closeProjectModal) closeProjectModal.addEventListener('click', closeProject);
  if (closeProjectModal) closeProjectModal.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeProject();
    }
  });
  if (projectModal) {
    projectModal.addEventListener('click', function (event) {
      if (event.target === projectModal) closeProject();
    });
  }

  window.addEventListener('keydown', function (event) {
    if (certModal && certModal.classList.contains('is-open')) {
      if (event.key === 'ArrowRight') updateModalCert(currentCertIndex + 1);
      if (event.key === 'ArrowLeft') updateModalCert(currentCertIndex - 1);
      if (event.key === 'Escape') closeCertModal();
    }
    if (projectModal && projectModal.classList.contains('is-open') && event.key === 'Escape') closeProject();
  });

  const footerYear = qs('#footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
});
