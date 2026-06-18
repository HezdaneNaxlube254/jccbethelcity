/* ============================================
   JCC BETHEL CITY - JAVASCRIPT
   Premium Church Website Interactivity
   ============================================ */

// ============================================
// NAVBAR & MOBILE MENU - WITH PROPER TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const navLinks = document.querySelectorAll('.navbar-links a, .navbar-mobile-menu a');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const closeIcon = document.querySelector('.close-icon');

  // Sticky navbar on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Function to open menu
  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('active');
    }
    if (hamburgerIcon) hamburgerIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'inline';
    if (navbarToggle) navbarToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  // Function to close menu
  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
    }
    if (hamburgerIcon) hamburgerIcon.style.display = 'inline';
    if (closeIcon) closeIcon.style.display = 'none';
    if (navbarToggle) navbarToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Toggle menu on hamburger click
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu on X button click inside mobile menu
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function() {
      closeMenu();
    });
  }

  // Close menu when link clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Close menu when clicking outside (on backdrop)
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === this) {
        closeMenu();
      }
    });
  }

  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'home.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// ============================================
// SCROLL REVEAL
// ============================================

const revealElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.card, .section, .two-col, .ministry-row, .profile-card, .stat-block, .timeline-item').forEach(el => {
    observer.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', revealElements);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// COUNT-UP ANIMATION FOR STATS
// ============================================

const countUp = (element, target, duration = 2000) => {
  let current = 0;
  const increment = target / (duration / 16);
  
  const updateCount = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '');
    }
  };
  
  updateCount();
};

const observeStats = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const targetText = entry.target.textContent.trim();
        const targetNumber = parseInt(targetText.replace(/\D/g, ''));
        const hasPlus = targetText.includes('+');
        
        if (!isNaN(targetNumber)) {
          entry.target.classList.add('counted');
          countUp(entry.target, targetNumber);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', observeStats);

// ============================================
// FORM SUBMISSION HANDLER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  const prayerForm = document.querySelector('.prayer-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      console.log('Contact form submitted:', data);
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = '#4CAF50';
      
      this.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  }

  if (prayerForm) {
    prayerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      console.log('Prayer request submitted:', data);
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Prayer Received! ✓';
      submitBtn.style.background = '#4CAF50';
      
      this.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  }
});

// ============================================
// AUDIO PLAYER SIMULATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const playPauseBtns = document.querySelectorAll('.play-pause-btn');
  const playButtons = document.querySelectorAll('.play-button');

  playPauseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const currentText = this.textContent;
      this.textContent = currentText === '▶' ? '⏸' : '▶';
    });
  });

  playButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const player = this.closest('.sermon-card')?.querySelector('.audio-player');
      if (player) {
        player.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ============================================
// FILTER FUNCTIONALITY (SERMONS)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sermonCards = document.querySelectorAll('.sermon-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        
        sermonCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('fade-in'), 10);
          } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
          }
        });
      });
    });
  }
});

// ============================================
// MODAL/LIGHTBOX FOR SERMONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const playButtons = document.querySelectorAll('.play-button');

  playButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.sermon-card');
      const title = card.querySelector('.sermon-title')?.textContent || 'Sermon';
      
      console.log('Playing sermon: ' + title);
      alert('Now playing: ' + title + '\n\n(This is a demonstration. In production, this would embed an audio or video player.)');
    });
  });
});

// ============================================
// EVENT RSVP
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const rsvpBtns = document.querySelectorAll('.rsvp-btn, .event-rsvp');

  rsvpBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const eventName = this.closest('.card, .event-card')?.querySelector('h3, .event-name')?.textContent || 'Event';
      const isRegistered = this.textContent.includes('✓');
      
      if (!isRegistered) {
        this.textContent = 'Registered ✓';
        this.style.background = '#4CAF50';
        alert('You have been registered for: ' + eventName);
      } else {
        this.textContent = 'Register Now →';
        this.style.background = '';
        alert('Registration cancelled for: ' + eventName);
      }
    });
  });
});

// ============================================
// MINISTRY JOIN BUTTONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const joinBtns = document.querySelectorAll('.join-ministry, .ministry-join');

  joinBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const ministryName = this.closest('.ministry-row, .card')?.querySelector('h3')?.textContent || 'Ministry';
      const isJoined = this.textContent.includes('✓');
      
      if (!isJoined) {
        this.textContent = 'Joined ✓';
        this.style.background = '#4CAF50';
        alert('You have joined the ' + ministryName + '!\n\nWe will contact you with meeting details.');
      } else {
        this.textContent = 'Join This Ministry →';
        this.style.background = '';
      }
    });
  });
});

// ============================================
// GIVE BUTTON HANDLERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const giveBtns = document.querySelectorAll('.give-btn, .btn-give');

  giveBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('To give via M-Pesa:\n\nPaybill: 123456\nAccount: TITHE\n\nFor other giving options, please contact us at +254 796 316 316');
    });
  });
});

// ============================================
// SMOOTH TRANSITIONS
// ============================================

window.addEventListener('load', function() {
  document.body.style.opacity = '1';
});

// ============================================
// ACCESSIBILITY - SKIP TO MAIN CONTENT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--electric-gold);
    color: var(--deep-navy);
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  `;
  skipLink.addEventListener('focus', function() {
    this.style.top = '0';
  });
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  document.body.insertBefore(skipLink, document.body.firstChild);
});

// ============================================
// LAZY LOAD IMAGES (Future use)
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const heroContent = document.querySelector('.hero .container, .section-hero .container');
  if (heroContent) {
    heroContent.style.animation = 'fade-in-up 0.8s ease-out';
  }
});

// ============================================
// COPY TO CLIPBOARD
// ============================================

function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = element.textContent;
    element.textContent = 'Copied! ✓';
    setTimeout(() => {
      element.textContent = originalText;
    }, 2000);
  });
}

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const yearElements = document.querySelectorAll('.current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

// ============================================
// ROTATING HERO SECTION (2-second interval)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.getElementById('heroRotating');
  if (!heroSection) return;

  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentHeroSlide = 0;
  const totalHeroSlides = heroSlides.length;
  let heroInterval;

  function showHeroSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentHeroSlide = index;
  }

  function nextHeroSlide() {
    let nextIndex = currentHeroSlide + 1;
    if (nextIndex >= totalHeroSlides) {
      nextIndex = 0;
    }
    showHeroSlide(nextIndex);
  }

  function startHeroRotation() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(nextHeroSlide, 2000);
  }

  function stopHeroRotation() {
    if (heroInterval) {
      clearInterval(heroInterval);
      heroInterval = null;
    }
  }

  showHeroSlide(0);

  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      stopHeroRotation();
      showHeroSlide(index);
      startHeroRotation();
    });
  });

  heroSection.addEventListener('mouseenter', stopHeroRotation);
  heroSection.addEventListener('mouseleave', startHeroRotation);

  startHeroRotation();
});

// ============================================
// STACKED/SLIDING FAMILY IMAGES (2-second interval)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const familySection = document.getElementById('familyRotating');
  if (!familySection) return;

  const stackedSlides = document.querySelectorAll('.stacked-slide');
  const stackedDots = document.querySelectorAll('.stacked-dot');
  let currentStackedSlide = 0;
  const totalStackedSlides = stackedSlides.length;
  let stackedInterval;

  function showStackedSlide(index) {
    stackedSlides.forEach(slide => {
      slide.classList.remove('active');
      slide.classList.remove('prev');
    });
    stackedDots.forEach(dot => dot.classList.remove('active'));
    
    stackedSlides[index].classList.add('active');
    stackedDots[index].classList.add('active');
    
    const prevIndex = currentStackedSlide;
    if (prevIndex !== index && stackedSlides[prevIndex]) {
      stackedSlides[prevIndex].classList.add('prev');
    }
    
    currentStackedSlide = index;
  }

  function nextStackedSlide() {
    let nextIndex = currentStackedSlide + 1;
    if (nextIndex >= totalStackedSlides) {
      nextIndex = 0;
    }
    showStackedSlide(nextIndex);
  }

  function startStackedRotation() {
    if (stackedInterval) clearInterval(stackedInterval);
    stackedInterval = setInterval(nextStackedSlide, 2000);
  }

  function stopStackedRotation() {
    if (stackedInterval) {
      clearInterval(stackedInterval);
      stackedInterval = null;
    }
  }

  showStackedSlide(0);

  stackedDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      stopStackedRotation();
      showStackedSlide(index);
      startStackedRotation();
    });
  });

  familySection.addEventListener('mouseenter', stopStackedRotation);
  familySection.addEventListener('mouseleave', startStackedRotation);

  startStackedRotation();
});

// ============================================
// WELCOME PAGE REDIRECT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const isWelcomePage = document.body.classList.contains('welcome-page');
  
  if (isWelcomePage) {
    let redirectTimer = setTimeout(function() {
      window.location.href = 'home.html';
    }, 10000);

    const skipBtn = document.getElementById('welcomeSkipBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', function(e) {
        e.preventDefault();
        clearTimeout(redirectTimer);
        window.location.href = 'home.html';
      });
    }
  }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// ============================================
// STICKY GIVE BUTTON - SCROLL EFFECT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const giveBtn = document.querySelector('.sticky-give-btn');
  
  if (giveBtn) {
    let heroSection = document.querySelector('.hero-rotating');
    if (heroSection) {
      window.addEventListener('scroll', function() {
        const heroHeight = heroSection.offsetHeight;
        if (window.scrollY > heroHeight - 200) {
          giveBtn.style.opacity = '1';
          giveBtn.style.transform = 'translateY(0)';
        } else {
          giveBtn.style.opacity = '0.5';
          giveBtn.style.transform = 'translateY(20px)';
        }
      });
    }
  }
});

// ============================================
// SMOOTH SCROLL FOR SCROLL INDICATOR
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const nextSection = document.querySelector('.section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
// ============================================
// BIO READ MORE TOGGLE
// ============================================

function toggleBio(btn) {
  const wrapper = btn.closest('.profile-bio-wrapper');
  const shortBio = wrapper.querySelector('.profile-bio-short');
  const fullBio = wrapper.querySelector('.profile-bio-full');
  
  if (fullBio.style.display === 'none') {
    shortBio.style.display = 'none';
    fullBio.style.display = 'block';
    btn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
    btn.classList.add('active');
  } else {
    shortBio.style.display = 'block';
    fullBio.style.display = 'none';
    btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
    btn.classList.remove('active');
  }
}

// ============================================
// SHARE PAGE FUNCTION
// ============================================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'JCC Bethel City - About Us',
      text: 'Learn about JCC Bethel City\'s story, mission, and vision in Athi River, Kenya.',
      url: window.location.href
    }).catch(() => {});
  } else {
    // Fallback - copy link to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      prompt('Copy this link to share:', url);
    });
  }
}
// ============================================
// JOIN MINISTRY FUNCTION
// ============================================

function joinMinistry(ministryName) {
  const btn = event.target;
  if (btn.textContent.includes('✓')) {
    btn.textContent = 'Join This Ministry →';
    btn.style.background = '';
    btn.style.transform = '';
    alert('You have been removed from ' + ministryName);
  } else {
    btn.textContent = 'Joined ✓';
    btn.style.background = '#4CAF50';
    btn.style.transform = 'scale(0.98)';
    alert('You have joined the ' + ministryName + '!\n\nWe will contact you with meeting details.');
    setTimeout(() => {
      btn.style.transform = '';
    }, 200);
  }
}
// ============================================
// JOIN MINISTRY FUNCTION
// ============================================

function joinMinistry(ministryName) {
  const btns = document.querySelectorAll('.join-ministry');
  let targetBtn = null;
  
  btns.forEach(btn => {
    if (btn.textContent.includes('Join This Ministry') || btn.textContent.includes('Joined ✓')) {
      const parent = btn.closest('.ministry-content');
      if (parent && parent.querySelector('h3')?.textContent.includes(ministryName)) {
        targetBtn = btn;
      }
    }
  });
  
  if (!targetBtn) {
    // Fallback - find by onclick attribute
    btns.forEach(btn => {
      if (btn.getAttribute('onclick')?.includes(ministryName)) {
        targetBtn = btn;
      }
    });
  }
  
  if (targetBtn) {
    if (targetBtn.textContent.includes('✓')) {
      targetBtn.textContent = 'Join This Ministry →';
      targetBtn.style.background = '';
      targetBtn.style.transform = '';
      alert('You have been removed from ' + ministryName);
    } else {
      targetBtn.textContent = 'Joined ✓';
      targetBtn.style.background = '#4CAF50';
      targetBtn.style.transform = 'scale(0.98)';
      alert('You have joined the ' + ministryName + '!\n\nWe will contact you with meeting details.');
      setTimeout(() => {
        targetBtn.style.transform = '';
      }, 200);
    }
  } else {
    // Fallback alert
    alert('Thank you for your interest in ' + ministryName + '!\n\nWe will contact you with more information.');
  }
}

// ============================================
// VOLUNTEER MINISTRY FUNCTION
// ============================================

function volunteerMinistry(ministryName) {
  alert('Thank you for offering to volunteer with ' + ministryName + '!\n\nPlease fill out the contact form and we will reach out to you with volunteer opportunities.');
  window.location.href = 'contact.html';
}

// ============================================
// CONTACT LEADER FUNCTION
// ============================================

function contactLeader(ministryName) {
  alert('You are about to contact the leader of ' + ministryName + '.\n\nPlease fill out the contact form and we will connect you with the ministry leader.');
  window.location.href = 'contact.html';
}

// ============================================
// SHARE PAGE FUNCTION
// ============================================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'JCC Bethel City - Ministries',
      text: 'Explore the ministries at JCC Bethel City. There\'s a place for you to serve!',
      url: window.location.href
    }).catch(() => {});
  } else {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      prompt('Copy this link to share:', url);
    });
  }
}

// ============================================
// SMOOTH SCROLL FOR MINISTRY LINKS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const quickLinks = document.querySelectorAll('.ministry-quick-card');
  
  quickLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
// ============================================
// SERMON FILTER FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sermonCards = document.querySelectorAll('.sermon-card[data-category]');

  if (filterBtns.length > 0 && sermonCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        
        sermonCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('fade-in'), 10);
          } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
          }
        });
      });
    });
  }
});

// ============================================
// SHARE PAGE FUNCTION
// ============================================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'JCC Bethel City - Sermons',
      text: 'Listen to powerful sermons and messages from JCC Bethel City.',
      url: window.location.href
    }).catch(() => {});
  } else {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      prompt('Copy this link to share:', url);
    });
  }
}
// ============================================
// RSVP FUNCTION
// ============================================

function rsvpEvent(eventName) {
  const btn = event.target;
  const isRegistered = btn.textContent.includes('✓');
  
  if (!isRegistered) {
    btn.textContent = 'Registered ✓';
    btn.style.background = '#4CAF50';
    btn.style.borderColor = '#4CAF50';
    btn.style.color = 'white';
    btn.style.transform = 'scale(0.98)';
    alert('You have been registered for: ' + eventName + '!\n\nWe look forward to seeing you there!');
    setTimeout(() => {
      btn.style.transform = '';
    }, 200);
  } else {
    btn.textContent = 'Register →';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
    alert('Registration cancelled for: ' + eventName);
  }
}

// ============================================
// SHARE PAGE FUNCTION
// ============================================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'JCC Bethel City - Events',
      text: 'Check out upcoming events at JCC Bethel City. Don\'t miss what God is doing!',
      url: window.location.href
    }).catch(() => {});
  } else {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      prompt('Copy this link to share:', url);
    });
  }
}

// ============================================
// CALENDAR DAY CLICK
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const calendarDays = document.querySelectorAll('.calendar-day');
  
  calendarDays.forEach(day => {
    day.addEventListener('click', function() {
      const dayNum = this.querySelector('.calendar-day-num')?.textContent;
      const dayName = this.querySelector('.calendar-day-name')?.textContent;
      
      if (dayNum && dayName) {
        // Scroll to events section
        const eventsSection = document.querySelector('.grid-3');
        if (eventsSection) {
          eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Highlight effect
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = '';
        }, 300);
      }
    });
  });
});

// ============================================
// SMOOTH SCROLL FOR SCROLL INDICATOR
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const nextSection = document.querySelector('.section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
// ============================================
// CONTACT FORM SUBMISSION
// ============================================

function submitContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log('Contact form submitted:', data);
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent! ✓';
  submitBtn.style.background = '#4CAF50';
  submitBtn.style.borderColor = '#4CAF50';
  
  form.reset();
  
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
    submitBtn.style.borderColor = '';
  }, 3000);
}

// ============================================
// PRAYER REQUEST SUBMISSION
// ============================================

function submitPrayerRequest(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log('Prayer request submitted:', data);
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Prayer Received! ✓';
  submitBtn.style.background = '#4CAF50';
  submitBtn.style.borderColor = '#4CAF50';
  
  form.reset();
  
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
    submitBtn.style.borderColor = '';
  }, 3000);
}

// ============================================
// SHARE PAGE FUNCTION
// ============================================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'JCC Bethel City - Contact Us',
      text: 'Contact JCC Bethel City in Athi River, Kenya. We\'d love to hear from you!',
      url: window.location.href
    }).catch(() => {});
  } else {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      prompt('Copy this link to share:', url);
    });
  }
}
// ============================================
// FAQ ACCORDION TOGGLE
// ============================================

function toggleFAQ(element) {
  const item = element.closest('.faq-item');
  const isActive = item.classList.contains('active');
  
  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(other => {
    if (other !== item) {
      other.classList.remove('active');
    }
  });
  
  if (isActive) {
    item.classList.remove('active');
  } else {
    item.classList.add('active');
  }
}

// ============================================
// FAQ SEARCH
// ============================================

function filterFAQs(searchTerm) {
  const items = document.querySelectorAll('.faq-item');
  const term = searchTerm.toLowerCase().trim();
  
  items.forEach(item => {
    const question = item.querySelector('.faq-question span')?.textContent?.toLowerCase() || '';
    const answer = item.querySelector('.faq-answer p')?.textContent?.toLowerCase() || '';
    const tags = item.getAttribute('data-tags')?.toLowerCase() || '';
    
    if (term === '' || question.includes(term) || answer.includes(term) || tags.includes(term)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ============================================
// CHARACTER COUNTER
// ============================================

function updateCharCount(textarea) {
  const count = textarea.value.length;
  const maxLength = 500;
  const counter = document.getElementById('charCount');
  
  if (counter) {
    counter.textContent = count;
    if (count > maxLength * 0.8) {
      counter.classList.add('warning');
    } else {
      counter.classList.remove('warning');
    }
  }
}

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

function submitContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log('Contact form submitted:', data);
  
  // Show success modal
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('active');
  }
  
  form.reset();
  const charCounter = document.getElementById('charCount');
  if (charCounter) {
    charCounter.textContent = '0';
    charCounter.classList.remove('warning');
  }
}

// ============================================
// CLOSE SUCCESS MODAL
// ============================================

function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal on click outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('successModal');
  if (modal && modal.classList.contains('active')) {
    const content = modal.querySelector('.success-modal-content');
    if (content && !content.contains(event.target)) {
      modal.classList.remove('active');
    }
  }
});

// ============================================
// PRAYER REQUEST SUBMISSION
// ============================================

function submitPrayerRequest(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log('Prayer request submitted:', data);
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Prayer Received! ✓';
  submitBtn.style.background = '#4CAF50';
  submitBtn.style.borderColor = '#4CAF50';
  
  form.reset();
  
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
    submitBtn.style.borderColor = '';
  }, 3000);
}

// ============================================
// SMOOTH SCROLL TO MAP
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const directionLinks = document.querySelectorAll('a[href="#map"]');
  directionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const mapSection = document.getElementById('map');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ============================================
// SHARE PAGE FUNCTION
// ============================================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'JCC Bethel City - Contact Us',
      text: 'Contact JCC Bethel City in Athi River, Kenya. We\'d love to hear from you!',
      url: window.location.href
    }).catch(() => {});
  } else {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      prompt('Copy this link to share:', url);
    });
  }
}
// ============================================
// GIVING TOGGLE
// ============================================

function toggleGivingType(type) {
  const btns = document.querySelectorAll('.giving-toggle-btn');
  btns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.type === type) {
      btn.classList.add('active');
    }
  });
}

// ============================================
// TITHE CALCULATOR
// ============================================

function calculateTithe() {
  const input = document.getElementById('incomeInput');
  const result = document.getElementById('titheResult');
  
  if (input && result) {
    const income = parseFloat(input.value) || 0;
    const tithe = income * 0.1;
    result.textContent = 'KSh ' + tithe.toFixed(2);
  }
}

// ============================================
// GIVE MODAL
// ============================================

function openGiveModal() {
  const modal = document.getElementById('giveModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeGiveModal() {
  const modal = document.getElementById('giveModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on click outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('giveModal');
  if (modal && modal.classList.contains('active')) {
    const content = modal.querySelector('.give-modal-content');
    if (content && !content.contains(event.target)) {
      closeGiveModal();
    }
  }
});

// ============================================
// SELECT GIVE METHOD
// ============================================

let selectedGiveMethod = 'M-Pesa';
let selectedGiveAmount = 0;

function selectGiveMethod(method) {
  selectedGiveMethod = method;
  const options = document.querySelectorAll('.give-modal-option');
  options.forEach(opt => {
    opt.style.borderColor = 'rgba(245,197,24,0.1)';
    opt.style.background = 'rgba(255,255,255,0.03)';
  });
  // Highlight selected
  const buttons = document.querySelectorAll('.give-modal-option');
  buttons.forEach(btn => {
    if (btn.textContent.includes(method)) {
      btn.style.borderColor = 'var(--electric-gold)';
      btn.style.background = 'rgba(245,197,24,0.05)';
    }
  });
}

function selectAmount(amount) {
  selectedGiveAmount = amount;
  const btns = document.querySelectorAll('.amount-btn');
  btns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.includes(amount.toString())) {
      btn.classList.add('active');
    }
  });
  // Hide custom input
  const customInput = document.getElementById('customAmountInput');
  if (customInput) {
    customInput.style.display = 'none';
    customInput.value = '';
  }
}

function customAmount() {
  const btns = document.querySelectorAll('.amount-btn');
  btns.forEach(btn => btn.classList.remove('active'));
  
  const customInput = document.getElementById('customAmountInput');
  if (customInput) {
    customInput.style.display = 'block';
    customInput.focus();
  }
}

// Listen for custom amount input
document.addEventListener('DOMContentLoaded', function() {
  const customInput = document.getElementById('customAmountInput');
  if (customInput) {
    customInput.addEventListener('input', function() {
      selectedGiveAmount = parseFloat(this.value) || 0;
    });
  }
});

function processGive() {
  if (selectedGiveAmount <= 0) {
    alert('Please select or enter an amount to give.');
    return;
  }
  
  const method = selectedGiveMethod;
  const amount = selectedGiveAmount;
  
  alert('Thank you for your generosity!\n\n' +
        'Amount: KSh ' + amount.toFixed(2) + '\n' +
        'Method: ' + method + '\n\n' +
        'You will be redirected to complete your giving.');
  
  closeGiveModal();
  
  // Reset selections
  selectedGiveAmount = 0;
  const btns = document.querySelectorAll('.amount-btn');
  btns.forEach(btn => btn.classList.remove('active'));
  
  // If M-Pesa, show Paybill details
  if (method === 'M-Pesa') {
    alert('To give via M-Pesa:\n\nPaybill: 588344\nAccount: Reason for Giving\n\nThank you for your generosity!');
  }
}

// ============================================
// CONTACT FINANCE TEAM
// ============================================

function contactFinance() {
  alert('Please contact our finance team for bank transfer details:\n\n' +
        'Email: finance@jccbethelcity.org\n' +
        'Phone: +254 796 316 316\n\n' +
        'We will respond within 24 hours.');
}

// ============================================
// SHARE PAGE FUNCTION
// ============================================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'JCC Bethel City - Give & Tithe',
      text: 'Support the mission of JCC Bethel City. Your generosity transforms lives!',
      url: window.location.href
    }).catch(() => {});
  } else {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      prompt('Copy this link to share:', url);
    });
  }
}