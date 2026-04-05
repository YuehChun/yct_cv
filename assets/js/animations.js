document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ── Hero Entrance (on page load) ──
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('#hero-avatar', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
    .to('#hero-name', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.4')
    .to('#hero-title', {
      opacity: 1,
      duration: 0.5,
    }, '-=0.3')
    .to('#hero-links a', {
      opacity: 1,
      stagger: 0.1,
      duration: 0.4,
    }, '-=0.2');

  // ── Navbar show/hide on scroll ──
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  ScrollTrigger.create({
    trigger: heroSection,
    start: 'bottom top',
    onEnterBack: () => gsap.to(navbar, { yPercent: -100, duration: 0.3 }),
    onLeave: () => gsap.to(navbar, { yPercent: 0, duration: 0.3 }),
  });

  // ── Active nav link tracking ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: ({ isActive }) => {
        if (isActive) {
          navLinks.forEach((link) => link.classList.remove('nav-link-active'));
          const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
          if (activeLink) activeLink.classList.add('nav-link-active');
        }
      },
    });
  });

  // ── Section reveal animations ──
  document.querySelectorAll('.section-label').forEach((label) => {
    gsap.from(label, {
      x: -20,
      opacity: 0,
      duration: 0.4,
      scrollTrigger: {
        trigger: label,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    label.style.opacity = '';
  });

  document.querySelectorAll('.section-title').forEach((title) => {
    gsap.from(title, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    title.style.opacity = '';
  });

  document.querySelectorAll('.section-content').forEach((content) => {
    gsap.from(content, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      scrollTrigger: {
        trigger: content,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
    content.style.opacity = '';
  });

  // ── Experience cards stagger ──
  gsap.from('.exp-card', {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5,
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });

  // ── Bento grid cards stagger ──
  gsap.from('.bento-card', {
    scale: 0.9,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    scrollTrigger: {
      trigger: '#work',
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navClose = document.getElementById('nav-close');

  if (navToggle && navMobile && navClose) {
    navToggle.addEventListener('click', () => navMobile.classList.remove('hidden'));
    navClose.addEventListener('click', () => navMobile.classList.add('hidden'));
    navMobile.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => navMobile.classList.add('hidden'));
    });
  }
});
