(function () {
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ac-theme', theme);

    var icon = document.getElementById('theme-icon');
    var label = document.getElementById('theme-label');
    if (icon) {
      icon.src = theme === 'night' ? icon.getAttribute('data-light-src') : icon.getAttribute('data-dark-src');
    }
    if (label) {
      label.textContent = theme === 'night' ? '切到亮色' : '切到夜色';
    }

    document.querySelectorAll('.ac-theme-banner').forEach(function (banner) {
      banner.src = theme === 'night' ? banner.getAttribute('data-dark-src') : banner.getAttribute('data-light-src');
    });
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'nord';
    applyTheme(current === 'night' ? 'nord' : 'night');
  }

  function toggleNav() {
    var open = document.body.getAttribute('data-nav-open') === 'true';
    document.body.setAttribute('data-nav-open', open ? 'false' : 'true');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var current = localStorage.getItem('ac-theme') || document.documentElement.getAttribute('data-theme') || 'nord';
    applyTheme(current);

    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }

    var navToggle = document.querySelector('[data-nav-toggle]');
    if (navToggle) {
      navToggle.addEventListener('click', toggleNav);
    }

    document.addEventListener('click', function (event) {
      var sidebar = document.querySelector('[data-sidebar]');
      var button = document.querySelector('[data-nav-toggle]');
      if (!sidebar || !button || window.innerWidth > 1080) return;

      var clickedSidebar = sidebar.contains(event.target);
      var clickedButton = button.contains(event.target);
      if (!clickedSidebar && !clickedButton) {
        document.body.setAttribute('data-nav-open', 'false');
      }
    });
  });
})();
