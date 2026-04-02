/* ============================
   LENIS SMOOTH SCROLL
   ============================ */
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 2,
  wheelMultiplier: 1.5,
  easing: (t) => {
    // Exponential out easing for momentum effect
    return 1 - Math.pow(1 - t, 3);
  }
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ============================
   CURSOR
   ============================ */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  if (follower) {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

if ('ontouchstart' in window) {
  if (cursor) cursor.style.display = 'none';
  if (follower) follower.style.display = 'none';
}

/* ============================
   NAVBAR
   ============================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const navLinkItems = document.querySelectorAll('.nav-link');


function handleNavbarState() {
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateActiveNavLink();
}

window.addEventListener('scroll', handleNavbarState);

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinkItems.forEach((link) => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

/* ============================
   TYPING ANIMATION
   ============================ */
const roles = [
  'IT Undergraduate',
  'Web Developer',
  'Frontend Developer',
  'UI/UX Enthusiast',
  'Graphic Designer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  if (!typedEl) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1600);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(typeEffect, speed);
}
typeEffect();

/* ============================
   DESIGNER BACKGROUND ANIMATION
   ============================ */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let designerShapes = [];
let designerAnimId = null;
let mouseGlow = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', (e) => {
  mouseGlow.x = e.clientX;
  mouseGlow.y = e.clientY;
});

if (canvas && ctx) {
  resizeCanvas();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initDesignerShapes();
  });

  class DesignerShape {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.size = Math.random() * 16 + 6;
      this.speed = Math.random() * 0.004 + 0.0015;
      this.angle = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      this.type = Math.random() > 0.4 ? 'designCircle' : 'designElement';
      this.opacity = Math.random() * 0.22 + 0.08;
      this.offset = Math.random() * 100;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.angle += this.speed;
      this.x = this.baseX + Math.sin(this.angle + this.offset) * 25;
      this.y = this.baseY + Math.cos(this.angle + this.offset) * 25;
      this.rotation += this.rotationSpeed;
      this.pulsePhase += 0.02;

      const dx = mouseGlow.x - this.x;
      const dy = mouseGlow.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
        this.x -= dx * 0.0025;
        this.y -= dy * 0.0025;
      }
    }

    drawDesignCircle() {
      // Main circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34, 197, 94, ${this.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner pulsing circle
      const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * pulse * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34, 197, 94, ${this.opacity * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    drawDesignElement() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Design frame/grid element
      const frameSize = this.size * 1.2;
      
      // Outer frame
      ctx.strokeStyle = `rgba(34, 197, 94, ${this.opacity})`;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(-frameSize / 2, -frameSize / 2, frameSize, frameSize);

      // Inner crosshairs
      ctx.strokeStyle = `rgba(34, 197, 94, ${this.opacity * 0.5})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-frameSize / 2, 0);
      ctx.lineTo(frameSize / 2, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -frameSize / 2);
      ctx.lineTo(0, frameSize / 2);
      ctx.stroke();

      // Corner dots
      const dotSize = 1.5;
      ctx.fillStyle = `rgba(34, 197, 94, ${this.opacity})`;
      ctx.fillRect(-frameSize / 2 - dotSize, -frameSize / 2 - dotSize, 2 * dotSize, 2 * dotSize);
      ctx.fillRect(frameSize / 2 - dotSize, -frameSize / 2 - dotSize, 2 * dotSize, 2 * dotSize);
      ctx.fillRect(-frameSize / 2 - dotSize, frameSize / 2 - dotSize, 2 * dotSize, 2 * dotSize);
      ctx.fillRect(frameSize / 2 - dotSize, frameSize / 2 - dotSize, 2 * dotSize, 2 * dotSize);

      ctx.restore();
    }

    draw() {
      if (this.type === 'designCircle') this.drawDesignCircle();
      if (this.type === 'designElement') this.drawDesignElement();
    }
  }

  function initDesignerShapes() {
    designerShapes = [];
    const count = Math.min(35, Math.floor((canvas.width * canvas.height) / 40000));

    for (let i = 0; i < count; i++) {
      designerShapes.push(new DesignerShape());
    }
  }

  function drawSoftGradient() {
    // Primary gradient - centered on design area
    const gradient1 = ctx.createRadialGradient(
      canvas.width * 0.65,
      canvas.height * 0.35,
      50,
      canvas.width * 0.65,
      canvas.height * 0.35,
      500
    );

    gradient1.addColorStop(0, 'rgba(34, 197, 94, 0.08)');
    gradient1.addColorStop(0.5, 'rgba(34, 197, 94, 0.03)');
    gradient1.addColorStop(1, 'rgba(34, 197, 94, 0)');

    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.arc(canvas.width * 0.65, canvas.height * 0.35, 500, 0, Math.PI * 2);
    ctx.fill();

    // Secondary subtle gradient
    const gradient2 = ctx.createRadialGradient(
      canvas.width * 0.35,
      canvas.height * 0.65,
      100,
      canvas.width * 0.35,
      canvas.height * 0.65,
      400
    );

    gradient2.addColorStop(0, 'rgba(34, 197, 94, 0.04)');
    gradient2.addColorStop(1, 'rgba(34, 197, 94, 0)');

    ctx.fillStyle = gradient2;
    ctx.beginPath();
    ctx.arc(canvas.width * 0.35, canvas.height * 0.65, 400, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawMouseGlow() {
    const gradient = ctx.createRadialGradient(
      mouseGlow.x, mouseGlow.y, 0, 
      mouseGlow.x, mouseGlow.y, 180
    );
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.12)');
    gradient.addColorStop(0.6, 'rgba(34, 197, 94, 0.04)');
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouseGlow.x, mouseGlow.y, 180, 0, Math.PI * 2);
    ctx.fill();
  }

  function animateDesignerBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSoftGradient();
    drawMouseGlow();

    designerShapes.forEach((shape) => {
      shape.update();
      shape.draw();
    });

    designerAnimId = requestAnimationFrame(animateDesignerBackground);
  }

  initDesignerShapes();
  animateDesignerBackground();

  const heroSection = document.getElementById('home');

  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!designerAnimId) animateDesignerBackground();
      } else {
        cancelAnimationFrame(designerAnimId);
        designerAnimId = null;
      }
    }, { threshold: 0 });

    heroObserver.observe(heroSection);
  }
}

/* ============================
   SCROLL REVEAL
   ============================ */
const revealEls = document.querySelectorAll('.reveal, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100 * (i % 3));

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

/* ============================
   SKILL CARDS + PROGRESS ANIMATION
   ============================ */
const skillsSection = document.getElementById('skills');
const skillCards = document.querySelectorAll('.skill-card-tool');

if (skillsSection && skillCards.length) {
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      skillCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show');

          const progressBar = card.querySelector('.progress-bar');
          if (progressBar) {
            const targetWidth = progressBar.getAttribute('data-width') || progressBar.style.width;
            progressBar.style.width = targetWidth;
          }
        }, index * 250);
      });

      skillsObserver.unobserve(skillsSection);
    }
  }, { threshold: 0.25 });

  skillsObserver.observe(skillsSection);
}

/* ============================
   CONTACT FORM
   ============================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      contactForm.reset();
      formSuccess.classList.add('show');

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1600);
  });
}

/* ============================
   LENIS + ANCHOR LINKS
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      lenis.scrollTo(target, {
        offset: -70,
        duration: 0.7
      });
    }
  });
});

/* ============================
   INITIAL CALLS
   ============================ */
handleNavbarState();
updateActiveNavLink();

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".nav-container");

  if (window.scrollY > 50) {
    navbar.style.backdropFilter = "blur(18px)";
    navbar.style.background = "rgba(255,255,255,0.7)";
  } else {
    navbar.style.backdropFilter = "blur(12px)";
    navbar.style.background = "rgba(255,255,255,0.55)";
  }
});