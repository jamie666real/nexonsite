document.querySelectorAll('nav[aria-label="Main navigation"]').forEach((nav, index) => {
  const links = nav.querySelector('.nav-links');
  const brand = nav.querySelector('.brand');

  if (!links || !brand) {
    return;
  }

  const linksId = `site-nav-links-${index + 1}`;
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-controls', linksId);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span class="nav-toggle-icon" aria-hidden="true"></span><span>Menu</span>';
  links.id = linksId;
  nav.classList.add('has-mobile-nav');
  brand.after(toggle);

  const closeMenu = () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    links.classList.toggle('is-open', !isOpen);
  });

  links.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !nav.contains(event.target)) {
      closeMenu();
    }
  });
});
