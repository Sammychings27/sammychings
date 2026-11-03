(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-navigation');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('is-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation?.classList.toggle('is-open', !open);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
      closeMenu();
      menuButton?.focus();
    }
  });
  document.addEventListener('click', event => {
    if (navigation?.classList.contains('is-open') && !navigation.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.service-list > a, .featured-image, .home-story-grid > *, .home-contact-inner > *, .offering, .service-intro > *, .founder-grid > *, .values-grid > *, .future-grid > *, .portfolio-project .project-heading, .portrait-tile, .client-gallery > *, .design-gallery figure, .lion-project-image, .testimonial-grid blockquote, .contact-layout > *, .contact-bottom-inner > *, .location-inner > *, .contact-details > *, .form-field'
    );
    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
    });
    document.body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
    revealTargets.forEach(element => revealObserver.observe(element));
  }

  const form = document.querySelector('#project-form');
  if (!form) return;
  const requestedInterest = new URLSearchParams(window.location.search).get('interest');
  const interestField = form.querySelector('[name="interest"]');
  if (requestedInterest && interestField) {
    const option = [...interestField.options].find(item => item.value.toLowerCase() === requestedInterest.toLowerCase());
    if (option) interestField.value = option.value;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = `Schings Digital enquiry: ${values.get('interest') || 'New project'}`;
    const body = [
      `Name: ${values.get('name')}`,
      `Email: ${values.get('email')}`,
      `Service: ${values.get('interest') || 'Not specified'}`,
      `Location: ${values.get('location') || 'Not specified'}`,
      '',
      String(values.get('message'))
    ].join('\n');
    const status = form.querySelector('#form-status');
    if (status) status.textContent = 'Your email app will open with your enquiry ready to send.';
    window.location.href = `mailto:sammychings27@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();



