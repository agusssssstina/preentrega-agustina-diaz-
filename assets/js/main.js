/**
* Template Name: FlexStart
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Updated: Nov 01 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });



  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Reverso Carousel functionality
   */
  function initReversoCarousel() {
    const carousel = document.querySelector('.reverso-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator-dot');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Touch/swipe variables
    let startX = 0;
    let endX = 0;
    let isTouch = false;
    
    // Function to show specific slide
    function showSlide(n) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Deactivate all indicators
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
      });
      
      // Normalize slide index
      if (n >= totalSlides) currentSlide = 0;
      if (n < 0) currentSlide = totalSlides - 1;
      
      // Show current slide
      slides[currentSlide].classList.add('active');
      
      // Activate current indicator
      if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
      }
    }
    
    // Next slide function
    function nextSlide() {
      currentSlide++;
      showSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
      currentSlide--;
      showSlide(currentSlide);
    }
    
    // Touch start event
    function handleTouchStart(e) {
      isTouch = true;
      startX = e.touches[0].clientX;
    }
    
    // Touch end event
    function handleTouchEnd(e) {
      if (!isTouch) return;
      
      endX = e.changedTouches[0].clientX;
      const threshold = 50; // Minimum swipe distance
      
      if (Math.abs(startX - endX) > threshold) {
        if (startX > endX) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
      }
      
      isTouch = false;
    }
    
    // Mouse events for desktop (optional)
    function handleMouseDown(e) {
      if (window.innerWidth <= 768) return; // Solo desktop
      isTouch = true;
      startX = e.clientX;
    }
    
    function handleMouseUp(e) {
      if (window.innerWidth <= 768) return; // Solo desktop
      if (!isTouch) return;
      
      endX = e.clientX;
      const threshold = 50;
      
      if (Math.abs(startX - endX) > threshold) {
        if (startX > endX) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      isTouch = false;
    }
    
    // Event listeners for navigation buttons (desktop only)
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Touch event listeners for mobile
    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Mouse event listeners for desktop drag (optional)
    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mouseup', handleMouseUp);
    
    // Prevent context menu on long press
    carousel.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    
    // Initialize first slide
    showSlide(currentSlide);
  }
  
  // Initialize carousel on page load
  window.addEventListener('load', initReversoCarousel);

})();