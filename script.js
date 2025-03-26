// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });
  
  // Terminal typing effect
  const terminalText = document.getElementById('terminal-text');
  const text = "Exploring the digital realm through code, design, and innovation. Welcome to my cybernetic portfolio.";
  let index = 0;
  
  function typeWriter() {
    if (index < text.length) {
      terminalText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
    }
  }
  
  setTimeout(typeWriter, 1000);
  
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }
  
  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Animate elements when scrolled into view
  function handleScrollAnimations() {
    const aboutSection = document.querySelector('.about-section');
    if (isInViewport(aboutSection)) {
      animateSkillBars();
    }
  }
  
  // Initial check and add scroll listener
  handleScrollAnimations();
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Matrix rain effect with updated color scheme
  const matrixCanvas = document.getElementById('matrixCanvas');
  const matrixCtx = matrixCanvas.getContext('2d');
  
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  
  const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
  const fontSize = 16;
  const columns = matrixCanvas.width / fontSize;
  
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -100);
  }
  
  function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(10, 0, 16, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    matrixCtx.fillStyle = '#ff3385';  // Pink shade for the matrix effect
    matrixCtx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      
      matrixCtx.shadowBlur = 10;
      matrixCtx.shadowColor = '#d5008e'; // Fuchsia shade for shadows
      
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      // Create gradient for each character
      const gradient = matrixCtx.createLinearGradient(x, y, x, y + fontSize);
      gradient.addColorStop(0, '#ff3385');
      gradient.addColorStop(1, '#d5008e');
      matrixCtx.fillStyle = gradient;
      
      matrixCtx.fillText(text, x, y);
      matrixCtx.shadowBlur = 0;
      
      if (y > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }
  
  setInterval(drawMatrix, 33);
  
  // Particles effect with Pink and Black color scheme
  const particlesCanvas = document.getElementById('particlesCanvas');
  const particlesCtx = particlesCanvas.getContext('2d');
  
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 80;
  
  class Particle {
    constructor() {
      this.x = Math.random() * particlesCanvas.width;
      this.y = Math.random() * particlesCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = `rgba(${Math.floor(Math.random() * 50 + 40)}, 0, ${Math.floor(Math.random() * 70 + 60)}, ${Math.random() * 0.5 + 0.3})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > particlesCanvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      
      if (this.y > particlesCanvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }
    
    draw() {
      particlesCtx.fillStyle = this.color;
      particlesCtx.beginPath();
      particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      particlesCtx.fill();
    }
  }
  
  function createParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      // Connect particles with lines
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          particlesCtx.beginPath();
          particlesCtx.strokeStyle = `rgba(58, 0, 96, ${0.3 - distance/500})`; // Adjusted color for connection lines
          particlesCtx.lineWidth = 0.5;
          particlesCtx.moveTo(particles[i].x, particles[i].y);
          particlesCtx.lineTo(particles[j].x, particles[j].y);
          particlesCtx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  createParticles();
  animateParticles();
  
  // Floating icons in contact section
  const floatingIcons = document.getElementById('floatingIcons');
  const iconClasses = [
    'fa-code', 'fa-database', 'fa-globe', 'fa-lock', 
    'fa-bolt', 'fa-microchip', 'fa-cloud', 'fa-server', 
    'fa-wifi', 'fa-desktop'
  ];
  
  function createFloatingIcons() {
    for (let i = 0; i < 20; i++) {
      const icon = document.createElement('i');
      const randomIcon = iconClasses[Math.floor(Math.random() * iconClasses.length)];
      
      icon.className = `fas ${randomIcon} floating-icon`;
      
      const size = Math.random() * 20 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      icon.style.fontSize = `${size}px`;
      icon.style.left = `${left}%`;
      icon.style.top = `${top}%`;
      icon.style.animationDuration = `${duration}s`;
      icon.style.animationDelay = `${delay}s`;
      
      floatingIcons.appendChild(icon);
    }
  }
  
  createFloatingIcons();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    
    // Reset particles
    particles.length = 0;
    createParticles();
  });
});
