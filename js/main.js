/* Hexana Attorneys — minimal JavaScript */

(function () {
    'use strict';
    /* ---------- Sticky header — add solid bg after scroll ---------- */
    var header = document.querySelector('.site-header');
    var scrollThreshold = 40; // px scrolled before the header turns solid

    if (header) {
        var onScroll = function () {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        };

        // Run once on load in case the page is already scrolled (refresh mid-page)
        onScroll();

        window.addEventListener('scroll', onScroll, { passive: true });
    }
    /* ---------- Mobile nav toggle ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var mobileNav = document.getElementById('mobile-nav');

    if (toggle && mobileNav) {

        function openMenu() {
            mobileNav.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            mobileNav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (mobileNav.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on link click
        mobileNav.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') closeMenu();
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!mobileNav.classList.contains('is-open')) return;
            if (mobileNav.contains(e.target)) return;
            if (toggle.contains(e.target)) return;
            closeMenu();
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                closeMenu();
                toggle.focus();
            }
        });

        // Reset when viewport crosses the desktop breakpoint
        var mq = window.matchMedia('(min-width: 768px)');
        var mqHandler = function (e) { if (e.matches) closeMenu(); };
        if (mq.addEventListener) {
            mq.addEventListener('change', mqHandler);
        } else {
            mq.addListener(mqHandler);
        }
    }

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------- Active nav link ---------- */
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href) return;
        // Match exact file (ignore #anchors for the active state)
        if (href.split('#')[0] === path) {
            link.classList.add('is-active');
        }
    });

})();