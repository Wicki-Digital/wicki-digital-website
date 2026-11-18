const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle) {
  const mobileViewport = window.matchMedia('(max-width: 700px)');
  const menuLinks = document.getElementById(menuToggle.getAttribute('aria-controls'));

  function setMenuExpanded(expanded) {
    menuToggle.setAttribute('aria-expanded', String(expanded));
  }

  function updateMenuAvailability() {
    const isMobile = mobileViewport.matches;
    const focusedElement = document.activeElement;

    menuToggle.hidden = !isMobile;
    setMenuExpanded(isMobile && menuLinks.contains(focusedElement));
    if (!isMobile && focusedElement === menuToggle) {
      menuLinks.querySelector('a')?.focus();
    }
  }

  menuToggle.addEventListener('click', () => {
    setMenuExpanded(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  menuToggle.closest('nav').addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menuToggle.hidden &&
        menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuExpanded(false);
      menuToggle.focus();
    }
  });

  updateMenuAvailability();
  if (mobileViewport.addEventListener) {
    mobileViewport.addEventListener('change', updateMenuAvailability);
  } else {
    mobileViewport.addListener(updateMenuAvailability);
  }
}
