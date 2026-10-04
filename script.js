(function(){try{function kill(){try{document.body.classList.remove('loading-state','loading','is-loading','preload','no-js');document.documentElement.classList.remove('loading-state','loading','is-loading','preload','no-js');document.querySelectorAll('#preloader,.preloader,#pre-loader,.pre-loader,#loading-overlay,.loading-overlay,#loading-screen,.loading-screen,.site-preloader,.page-preloader').forEach(function(n){n.style.display='none';n.style.opacity='0';n.style.visibility='hidden';n.style.pointerEvents='none';setTimeout(function(){try{n.remove()}catch(e){}},50);});}catch(e){}}kill();document.addEventListener('DOMContentLoaded',kill);window.addEventListener('load',function(){kill();setTimeout(kill,300);setTimeout(kill,1500);});}catch(e){}})();
(function(){try{
    var conventions=[
      {sel:'.scroll-reveal',add:'is-visible'},
      {sel:'.reveal',add:'active'},
      {sel:'.fade-in',add:'visible'},
      {sel:'.slide-in',add:'visible'},
      {sel:'.animate-on-scroll',add:'animated'},
      {sel:'.animate-on-load',add:'in-view'},
      {sel:'[data-aos]',add:'aos-animate'},
      {sel:'[data-reveal]',add:'in-view'},
      {sel:'[data-scroll]',add:'is-inview'},
      {sel:'[data-animate]',add:'is-visible'},
      {sel:'.animate:not(.animated)',add:'animated'},
      {sel:'.will-animate',add:'animated'},
      {sel:'.fade-up',add:'is-visible'},
      {sel:'.fade-down',add:'is-visible'},
      {sel:'.zoom-in',add:'is-visible'}
    ];
    // Force inline opacity/visibility with !important so the element stays
    // visible no matter which class-name convention the AI-written CSS uses
    // (.is-visible vs .animated vs .visible vs …). Without this, the emergency
    // animation's forwards-held state gets DROPPED when IO adds .animated (its
    // :not(.animated) selector stops matching → animation removed → opacity
    // reverts to the base rule's 0). Transform is left cleared, not forced, so
    // hover translations on cards still work.
    function makeVisible(el,cls){el.classList.add(cls);el.style.setProperty('opacity','1','important');el.style.setProperty('visibility','visible','important');el.style.transform='';}
    if(!('IntersectionObserver' in window)){
      conventions.forEach(function(c){document.querySelectorAll(c.sel).forEach(function(el){makeVisible(el,c.add);});});
      return;
    }
    conventions.forEach(function(c){
      var els=document.querySelectorAll(c.sel);
      if(!els.length)return;
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(e){if(e.isIntersecting){makeVisible(e.target,c.add);io.unobserve(e.target);}});
      },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
      els.forEach(function(el){io.observe(el);});
    });
    // Backstop 1: after 2.5s force-reveal anything still hidden by known convention.
    setTimeout(function(){
      conventions.forEach(function(c){document.querySelectorAll(c.sel).forEach(function(el){makeVisible(el,c.add);});});
    },2500);

    // Backstop 2 (ABSOLUTE): after 3.5s walk every direct child of every
    // <section>/<main>/<article>. Any element whose computed opacity is 0 AND
    // is not deliberately-hidden UI (dropdown, modal, tooltip, popover,
    // preloader, cookie banner — those SHOULD stay hidden until interaction)
    // gets force-revealed. Class-name-agnostic — works no matter what
    // convention Gemini invents next. This is the "cannot recur" guarantee.
    var deliberateHideSel='dropdown,submenu,sub-menu,mega-menu,tooltip,popover,modal,dialog,overlay,cookie,consent,preloader,pre-loader,loading,offscreen,collapsed,accordion-content,tab-panel,tab-content';
    function isDeliberatelyHidden(el){
      var e=el;while(e && e.classList){
        for(var i=0;i<e.classList.length;i++){var c=e.classList[i].toLowerCase();
          if(deliberateHideSel.split(',').some(function(k){return c.indexOf(k)!==-1;}))return true;
        }
        if(e.hasAttribute && (e.hasAttribute('hidden')||e.getAttribute('aria-hidden')==='true'||e.getAttribute('role')==='dialog'||e.getAttribute('role')==='menu'||e.getAttribute('role')==='tooltip'))return true;
        e=e.parentElement;
      }
      return false;
    }
    setTimeout(function(){
      var containers=document.querySelectorAll('section,main,article,[class*="section"],[class*="Section"]');
      containers.forEach(function(c){
        c.querySelectorAll('*').forEach(function(el){
          if(!el.isConnected||isDeliberatelyHidden(el))return;
          try{
            var cs=getComputedStyle(el);
            if(cs.opacity==='0'||cs.visibility==='hidden'){
              el.style.setProperty('opacity','1','important');
              el.style.setProperty('visibility','visible','important');
              el.style.setProperty('transform','none','important');
              el.style.setProperty('animation','none','important');
            }
          }catch(e){}
        });
      });
    },3500);
  }catch(e){}})();
/**
 * Brew & Co. - Interactive Script File
 * Core Features: Preloader, Responsive Navigation, Scroll-reveal Observer,
 * Dynamic Menu Filtering, Form Validation & Success Toasts, Accordion toggling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initMobileNav();
  initScrollAnimations();
  initMenuFiltering();
  initInquiryForm();
  initAccordions();
  initCateringModal();
});

/**
 * 1. Preloader Screen Handler
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
    // Fallback if load event already fired or delayed
    setTimeout(() => {
      if (preloader.style.display !== 'none') {
        preloader.classList.add('fade-out');
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
      }
    }, 2500);
  }
}

/**
 * 2. Mobile Nav Toggle & Scroll Control
 */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });
  }

  // Header transform on scroll
  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/**
 * 3. Intersection Observer for Scroll Reveals
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.animate-reveal, .card-bordered, .menu-item-card, .dashboard-details, .dashboard-map');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      el.classList.add('reveal-ready');
      revealObserver.observe(el);
    });
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/**
 * 4. Menu Filtering System
 */
function initMenuFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');

  if (filterButtons.length > 0 && menuItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Clear active class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active to current button
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');

        menuItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (selectedCategory === 'all' || itemCategory === selectedCategory) {
            item.style.display = 'flex';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

/**
 * 5. Space Reservation & Contact Form Submission (with beautiful Toast Feedback)
 */
function initInquiryForm() {
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form fields
      const clientName = document.getElementById('clientName')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const inquiryType = document.getElementById('inquiryType')?.value;
      const message = document.getElementById('message')?.value.trim();

      // Simple validation validation
      if (!clientName || !email || !phone || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Submit visual state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-sm"></span> Submitting Inquiry...';

      // Mock API trigger
      setTimeout(() => {
        showToast(`Thank you, ${clientName}! Your ${inquiryType || 'inquiry'} was submitted successfully. We'll reply within 2 hours.`, 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    });
  }
}

/**
 * 6. Visitor Accordions (FAQ section)
 */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.faq-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all first for clean single toggle
      const allFaqs = document.querySelectorAll('.faq-item');
      allFaqs.forEach(item => item.classList.remove('active'));

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

/**
 * 7. Square/ToastTab Mock Drawer Modal Integration
 */
function initCateringModal() {
  const orderButtons = document.querySelectorAll('#orderBtn, .btn-primary[href="menu.html"]');
  
  orderButtons.forEach(btn => {
    // Only intercept triggers that aren't routing natively
    if (btn.id === 'orderBtn' || btn.tagName === 'BUTTON') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast("Opening secure ToastTab online kitchen interface...", "success");
        
        // Simulating the slide-in drawer
        let drawer = document.getElementById('orderDrawer');
        if (!drawer) {
          drawer = document.createElement('div');
          drawer.id = 'orderDrawer';
          drawer.className = 'order-drawer-modal';
          drawer.innerHTML = `
            <div class="drawer-backdrop"></div>
            <div class="drawer-content">
              <div class="drawer-header">
                <h3>Brew & Co. Kitchen</h3>
                <button class="drawer-close" aria-label="Close Order Menu">&times;</button>
              </div>
              <div class="drawer-body">
                <iframe src="about:blank" class="drawer-iframe" title="ToastTab checkout"></iframe>
                <div class="drawer-loader-placeholder">
                  <div class="spinner"></div>
                  <p>Initializing Secure Williamsburg Pickup Terminal...</p>
                </div>
              </div>
            </div>
          `;
          document.body.appendChild(drawer);
          
          // Wire events
          drawer.querySelector('.drawer-close').addEventListener('click', () => drawer.classList.remove('active'));
          drawer.querySelector('.drawer-backdrop').addEventListener('click', () => drawer.classList.remove('active'));
        }
        
        setTimeout(() => {
          drawer.classList.add('active');
        }, 150);
      });
    }
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✨' : '⚠️'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Transition Active
  setTimeout(() => {
    toast.classList.add('active');
  }, 10);

  // Auto clean-up
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}
/* Mobile hamburger nav */
(function(){
  function enhance(){
    var navs = document.querySelectorAll('header nav, .site-header nav, .navbar nav, header .nav-links');
    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      var header = nav.closest('header, .site-header, .navbar, .main-header') || nav.parentElement;
      if (!header || header.querySelector('.nav-toggle')) continue;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'nav-toggle'; btn.setAttribute('aria-label', 'Toggle menu');
      btn.innerHTML = '<span></span><span></span><span></span>';
      (function(nav){
        btn.addEventListener('click', function(){ nav.classList.toggle('nav-open'); });
        nav.addEventListener('click', function(e){ if (e.target && e.target.closest && e.target.closest('a')) nav.classList.remove('nav-open'); });
      })(nav);
      // Insert into the nav's own flex row (with the brand) so it sits level with
      // the logo — not appended to the outer <header> where it drops to a new line.
      (nav.parentElement || header).appendChild(btn);
    }
  }
  if (document.readyState !== 'loading') enhance(); else document.addEventListener('DOMContentLoaded', enhance);
  try { new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();
