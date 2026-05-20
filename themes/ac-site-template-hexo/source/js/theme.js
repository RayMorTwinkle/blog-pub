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

  function legacyCopyText(text) {
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        var copied = document.execCommand('copy');
        copied ? resolve() : reject(new Error('Copy command was blocked'));
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  function copyText(text) {
    return legacyCopyText(text).catch(function (error) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      }

      throw error;
    });
  }

  function getCodeText(block) {
    var lines = block.querySelectorAll('.code .line');
    if (lines.length) {
      return Array.prototype.map.call(lines, function (line) {
        return line.textContent;
      }).join('\n').replace(/\n+$/, '');
    }

    var pre = block.matches('pre') ? block : block.querySelector('pre');
    return pre ? pre.textContent.replace(/\n+$/, '') : '';
  }

  function selectCode(block) {
    var code = block.querySelector('.code pre') || block.querySelector('.code') || block.querySelector('pre');
    if (!code || !window.getSelection) return false;

    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll('.ac-prose figure.highlight').forEach(function (block) {
      if (block.querySelector('.ac-code-copy')) return;

      var button = document.createElement('button');
      button.className = 'ac-code-copy';
      button.type = 'button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', '复制代码');

      button.addEventListener('click', function () {
        var text = getCodeText(block);
        if (!text) return;

        copyText(text).then(function () {
          button.textContent = 'Copied';
          button.classList.add('is-copied');
          window.setTimeout(function () {
            button.textContent = 'Copy';
            button.classList.remove('is-copied');
          }, 1500);
        }).catch(function () {
          button.textContent = selectCode(block) ? 'Selected' : 'Failed';
          button.classList.add('is-copied');
          window.setTimeout(function () {
            button.textContent = 'Copy';
            button.classList.remove('is-copied');
          }, 1500);
        });
      });

      block.appendChild(button);
    });
  }

  function hasOnlyElement(parent, element) {
    return Array.prototype.every.call(parent.childNodes, function (node) {
      return node === element || node.nodeType === Node.TEXT_NODE && !node.textContent.trim();
    });
  }

  function calloutType(type) {
    var normalized = String(type || 'note').toLowerCase();
    if (/^(tip|hint|important)$/.test(normalized)) return 'tip';
    if (/^(warning|caution|attention)$/.test(normalized)) return 'warning';
    if (/^(danger|error|bug|failure|fail|missing)$/.test(normalized)) return 'danger';
    if (/^(success|check|done)$/.test(normalized)) return 'success';
    if (/^(question|help|faq)$/.test(normalized)) return 'question';
    return 'note';
  }

  function enhanceCallouts() {
    var labels = {
      note: 'Note',
      tip: 'Tip',
      warning: 'Warning',
      danger: 'Danger',
      success: 'Success',
      question: 'Question'
    };

    document.querySelectorAll('.ac-prose blockquote').forEach(function (quote) {
      if (quote.classList.contains('ac-callout')) return;

      var first = quote.firstElementChild;
      if (!first || !/^(P|DIV)$/i.test(first.tagName)) return;

      var firstLine = first.textContent.trim().split(/\r?\n/)[0];
      var match = firstLine.match(/^\[!([a-z-]+)\][+-]?\s*(.*)$/i);
      if (!match) return;

      var type = calloutType(match[1]);
      var title = match[2].trim() || labels[type] || 'Note';
      var titleElement = document.createElement('div');
      titleElement.className = 'ac-callout-title';
      titleElement.textContent = title;

      quote.classList.add('ac-callout', 'ac-callout-' + type);
      first.innerHTML = first.innerHTML
        .replace(/^\s*\[![^\]]+\][+-]?\s*[^\n<]*(\n|<br\s*\/?>)?/i, '')
        .trim();
      if (!first.textContent.trim()) {
        first.remove();
      }

      quote.insertBefore(titleElement, quote.firstChild);
    });
  }

  function enhanceTables() {
    document.querySelectorAll('.ac-prose table').forEach(function (table) {
      if (table.closest('figure.highlight') || table.parentElement.classList.contains('ac-table-wrap')) return;

      var parent = table.parentElement;
      if (parent && parent.tagName === 'BLOCKQUOTE' && hasOnlyElement(parent, table)) {
        parent.classList.add('ac-quote-table-only');
      }

      var wrap = document.createElement('div');
      wrap.className = 'ac-table-wrap';
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  function enhancePostCardMedia() {
    document.querySelectorAll('.ac-post-card-media img').forEach(function (image) {
      function hideBrokenImage() {
        var media = image.closest('.ac-post-card-media');
        var card = image.closest('.ac-post-card');
        if (media) media.remove();
        if (card) card.classList.remove('has-media');
      }

      if (image.complete && image.naturalWidth === 0) {
        hideBrokenImage();
        return;
      }

      image.addEventListener('error', hideBrokenImage, { once: true });
    });
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

    enhanceCodeBlocks();
    enhanceCallouts();
    enhanceTables();
    enhancePostCardMedia();
  });
})();
