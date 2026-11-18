const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle) {
  function setMenuExpanded(expanded) {
    menuToggle.setAttribute('aria-expanded', String(expanded));
  }

  menuToggle.addEventListener('click', () => {
    setMenuExpanded(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  menuToggle.closest('nav').addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true' &&
        menuToggle.getClientRects().length > 0) {
      setMenuExpanded(false);
      menuToggle.focus();
    }
  });

  menuToggle.hidden = false;
}
