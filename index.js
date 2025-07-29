// Condusive and Corresponding JavaScript Code for Site Load Optimization

(function() {
  "use strict";

  /**
   * 1. Lazy Loading Images
   *    - Defer loading of images until they are near the viewport.
   *    - Uses Intersection Observer API for efficient detection.
   */
  const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
      });
    }
  };

  /**
   * 2. Defer Non-Critical CSS
   *    - Load CSS asynchronously to prevent render-blocking.
   *    - Uses a simple loadCSS function.
   */
  const loadCSS = (href, media) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (media) {
      link.media = media;
    }
    document.head.appendChild(link);
  };

  /**
   * 3. Defer Non-Critical JavaScript
   *    - Load JavaScript files asynchronously using 'defer' or dynamically.
   *    - This example dynamically loads a script.
   */
  const loadScript = (src, callback) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true; // or script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  };

  /**
   * 4. Optimize Font Loading
   *    - Use Font Face Observer to prevent FOIT (Flash of Invisible Text) and FOUT (Flash of Unstyled Text).
   *    - This requires the 'fontfaceobserver' library.
   */
  const optimizeFontLoading = () => {
    // Example: Assuming you have a font named 'Roboto' and 'Raleway'
    // You would need to include the Font Face Observer library in your project.
    // <script src="path/to/fontfaceobserver.js"></script>

    if (typeof FontFaceObserver !== 'undefined') {
      const roboto = new FontFaceObserver('Roboto');
      const raleway = new FontFaceObserver('Raleway');
      const poppins = new FontFaceObserver('Poppins');


      Promise.all([roboto.load(), raleway.load(), poppins.load()])
        .then(() => {
          document.documentElement.classList.add('fonts-loaded');
          console.log('All fonts loaded');
        })
        .catch(e => {
          console.error('Error loading fonts:', e);
        });
    } else {
      console.warn('FontFaceObserver not found. Font optimization skipped.');
    }
  };

  /**
   * 5. Remove Unused CSS (Post-load)
   *    - While best done during build, this demonstrates a conceptual approach.
   *    - Not practical for real-time removal, but good for understanding.
   */
  const removeUnusedCSS = () => {
    // This is a complex task typically handled by build tools (e.g., PurgeCSS).
    // Dynamically removing unused CSS at runtime is highly inefficient and not recommended.
    // This function is a placeholder to highlight the concept.
    console.log('Concept: Unused CSS removal is best handled by build tools.');
  };

  /**
   * 6. Debounce Scroll Events
   *    - Reduce the frequency of scroll event handlers to improve performance.
   */
  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleScroll = debounce(() => {
    // Your scroll-dependent logic here (e.g., header sticky, animations)
    // console.log('Scroll event debounced!');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollTopButton = document.getElementById('scroll-top');
    if (scrollTopButton) {
      if (scrollTop > 100) { // Show button after scrolling 100px
        scrollTopButton.classList.add('active');
      } else {
        scrollTopButton.classList.remove('active');
      }
    }
  }, 100); // Debounce by 100ms

  /**
   * 7. Optimize Animations (if any)
   *    - Use requestAnimationFrame for smooth animations.
   */
  const animateElement = (element, duration) => {
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      // Apply animation logic here, e.g., element.style.opacity = progress;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    // window.requestAnimationFrame(step);
  };

  /**
   * 8. Preload Critical Resources (Optional, if you know what's critical)
   *    - Use <link rel="preload"> in HTML for this, but can be done via JS if dynamic.
   */
  const preloadResource = (href, asType) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = asType;
    document.head.appendChild(link);
  };

  /**
   * 9. Efficient Event Delegation
   *    - Attach event listeners to parent elements instead of many child elements.
   */
  const setupEventDelegation = () => {
    document.body.addEventListener('click', (event) => {
      // Example: Handle clicks on portfolio filter buttons
      if (event.target.matches('.portfolio-filters li')) {
        const filterValue = event.target.dataset.filter;
        const filters = document.querySelectorAll('.portfolio-filters li');
        filters.forEach(filter => filter.classList.remove('filter-active'));
        event.target.classList.add('filter-active');

        // Trigger isotope filter (assuming Isotope.js is used)
        const isotopeContainer = document.querySelector('.isotope-layout');
        if (isotopeContainer && typeof Isotope !== 'undefined') {
          const iso = Isotope.data(isotopeContainer);
          if (iso) {
            iso.arrange({
              filter: filterValue
            });
          }
        }
      }
      // Add more delegated event handlers as needed
    });
  };

  /**
   * 10. Initial Load Optimization (DOM Content Loaded)
   *     - Execute critical functions as soon as the DOM is ready.
   */
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded: Initializing optimizations...');

    // Apply lazy loading to images
    lazyLoadImages();

    // Defer non-critical CSS (example: if you had a separate 'animations.css')
    // loadCSS('path/to/animations.css', 'screen');

    // Optimize font loading
    optimizeFontLoading();

    // Setup event delegation
    setupEventDelegation();

    // Initialize AOS (Animate On Scroll) if it's present
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    // Initialize Typed.js if it's present
    if (typeof Typed !== 'undefined') {
      const typedElement = document.querySelector('.typed');
      if (typedElement) {
        let typed_strings = typedElement.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }

    // Initialize PureCounter if it's present
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }

    // Initialize GLightbox if it's present
    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox'
      });
    }

    // Initialize Swiper if it's present
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll('.init-swiper').forEach(function(swiperElement) {
        let config = JSON.parse(swiperElement.querySelector('.swiper-config').innerHTML);
        new Swiper(swiperElement, config);
      });
    }

    // Initialize Isotope if it's present
    if (typeof Isotope !== 'undefined') {
      document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
        let layout = isotopeItem.getAttribute('data-layout') || 'masonry';
        let filter = isotopeItem.getAttribute('data-default-filter') || '*';
        let sort = isotopeItem.getAttribute('data-sort') || 'original-order';

        let initIsotope = new Isotope(isotopeItem, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });

        // Attach filter click events
        const filtersElem = isotopeItem.previousElementSibling;
        if (filtersElem && filtersElem.matches('.isotope-filters')) {
          filtersElem.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.target.matches('li')) {
              filtersElem.querySelectorAll('li').forEach(function(li) {
                li.classList.remove('filter-active');
              });
              event.target.classList.add('filter-active');
              initIsotope.arrange({
                filter: event.target.dataset.filter
              });
            }
          }, false);
        }
      });
    }

    // Smooth scroll on page load with hash links
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }

    // Header toggle for mobile
    const headerToggle = document.querySelector('.header-toggle');
    const header = document.getElementById('header');
    if (headerToggle && header) {
      headerToggle.addEventListener('click', () => {
        header.classList.toggle('header-show');
        headerToggle.classList.toggle('bi-list');
        headerToggle.classList.toggle('bi-x');
      });
    }

    // Navmenu active state on scroll
    const navmenuLinks = document.querySelectorAll('#navmenu a');
    const sections = document.querySelectorAll('section');

    const activateNavmenuLink = () => {
      let currentActive = null;
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset as needed
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentActive = section.id;
        }
      });

      navmenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentActive) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', activateNavmenuLink);
    activateNavmenuLink(); // Call on load to set initial active link

  });

  /**
   * 11. Window Load Optimization
   *     - Execute non-critical functions after all resources have loaded.
   */
  window.addEventListener('load', () => {
    console.log('Window Loaded: Finalizing optimizations...');

    // Remove unused CSS (conceptual, as explained above)
    removeUnusedCSS();

    // Debounce scroll events
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load to set initial state

    // Hide preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.remove();
    }
  });

})();
