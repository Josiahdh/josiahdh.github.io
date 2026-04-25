(function ($) {
  "use strict";

  // Mobile nav gradient overlay
  $('#navigation').on('show.bs.collapse', function () {
    $('.navigation').addClass('nav-menu-open');
  }).on('hide.bs.collapse', function () {
    $('.navigation').removeClass('nav-menu-open');
  });

  // Sticky Menu
  $(window).scroll(function () {
    if ($(".navigation").offset().top > 100) {
      $(".navigation").addClass("nav-bg");
    } else {
      $(".navigation").removeClass("nav-bg");
    }
  });

  // Background-images
  $("[data-background]").each(function () {
    $(this).css({
      "background-image": "url(" + $(this).data("background") + ")",
    });
  });

  // background color
  $("[data-color]").each(function () {
    $(this).css({
      "background-color": $(this).data("color"),
    });
  });

  // progress bar
  $("[data-progress]").each(function () {
    $(this).css({
      bottom: $(this).data("progress"),
    });
  });

  // gallery-slider
  $(".gallery-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    arrows: true,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
  });

  // testimonial-slider
  $(".testimonial-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev testimonial-arrow testimonial-prev"><i class="ti-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next testimonial-arrow testimonial-next"><i class="ti-angle-right"></i></button>',
    adaptiveHeight: true,
  });

  // clients logo slider
  $(".client-logo-slider").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Shuffle js filter and masonry
  var Shuffle = window.Shuffle;

  var shuffleWrapper = document.querySelector(".shuffle-wrapper");
  if (shuffleWrapper) {
    var myShuffle = new Shuffle(shuffleWrapper, {
      itemSelector: ".shuffle-item",
      buffer: 1,
    });

    function getFiltersFromHash() {
      if (window.location.href.indexOf("#") === -1) return ["highlights"];
      var hash = window.location.hash.replace("#", "");
      if (!hash || hash === "portfolio" || hash === "portfolio-grid") return ["highlights"];
      return hash.split(",").filter(Boolean);
    }

    function applyFilters(filters) {
      var categoryFilters = filters.filter(function (f) { return f !== "highlights"; });
      var highlightsActive = filters.indexOf("highlights") !== -1;

      if (filters.length === 0) {
        myShuffle.filter(Shuffle.ALL_ITEMS);
        myShuffle.sort({});
      } else {
        myShuffle.filter(function (el) {
          var groups = JSON.parse(el.getAttribute("data-groups"));
          if (highlightsActive && groups.indexOf("highlights") === -1) return false;
          if (categoryFilters.length === 0) return true;
          return categoryFilters.some(function (f) { return groups.indexOf(f) !== -1; });
        });

        if (categoryFilters.length >= 2) {
          myShuffle.sort({
            by: function (el) {
              var groups = JSON.parse(el.getAttribute("data-groups"));
              return categoryFilters.every(function (f) { return groups.indexOf(f) !== -1; }) ? 0 : 1;
            }
          });
        } else {
          myShuffle.sort({});
        }
      }

      document.querySelectorAll(".filter-btn").forEach(function (btn) {
        if (btn.dataset.filter === "all") {
          btn.classList.toggle("active", filters.length === 0);
        } else {
          btn.classList.toggle("active", filters.indexOf(btn.dataset.filter) !== -1);
        }
      });
    }

    var currentFilters = getFiltersFromHash();

    function setFilters(filters) {
      currentFilters = filters;
      var newHash = filters.length > 0 ? filters.join(",") : "";
      history.pushState(null, null, newHash ? "#" + newHash : window.location.pathname);
      applyFilters(filters);
    }

    document.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var filter = btn.dataset.filter;
        if (filter === "all") {
          setFilters([]);
        } else {
          var next = currentFilters.slice();
          var idx = next.indexOf(filter);
          if (idx === -1) { next.push(filter); } else { next.splice(idx, 1); }
          setFilters(next);
        }

        // On mobile, scroll to portfolio if it hasn't entered the viewport yet
        if (window.innerWidth <= 575 && shuffleWrapper.getBoundingClientRect().top > window.innerHeight) {
          scrollToPortfolio("smooth");
        }

        var pillContainer = btn.closest(".portfolio-nav-filters");
        if (pillContainer) {
          var btnLeft = btn.offsetLeft;
          var btnRight = btnLeft + btn.offsetWidth;
          var scrollLeft = pillContainer.scrollLeft;
          var visible = pillContainer.clientWidth;
          if (btnLeft < scrollLeft) {
            pillContainer.scrollTo({ left: btnLeft - 8, behavior: "instant" });
          } else if (btnRight > scrollLeft + visible) {
            pillContainer.scrollTo({ left: btnRight - visible + 8, behavior: "instant" });
          }
        }
      });
    });



    // Dock filter bar into header, tracking position to appear to slide in
    var sectionFilters = document.getElementById("section-filters");
    var navHeader = document.querySelector("header.navigation");
    if (sectionFilters && navHeader) {
      var headerFiltersEl = navHeader.querySelector(".header-filters");
      var sectionPills = sectionFilters.querySelector(".portfolio-nav-filters");

      var navEl = navHeader.querySelector(".navbar");

      function updateFilterDocking() {
        if (window.innerWidth <= 991) {
          navHeader.classList.remove("filters-docked");
          return;
        }
        var headerH = navHeader.offsetHeight;
        var filterH = sectionPills ? sectionPills.offsetHeight : 44;
        var pillsRect = sectionPills ? sectionPills.getBoundingClientRect() : sectionFilters.getBoundingClientRect();
        var navTop = navEl ? navEl.getBoundingClientRect().top : 0;

        var aboutBtn = navHeader.querySelector(".nav-about-btn");
        var centeredTop;
        if (aboutBtn) {
          var btnRect = aboutBtn.getBoundingClientRect();
          centeredTop = (btnRect.top - navTop) + btnRect.height / 2 - filterH / 2;
        } else {
          centeredTop = (headerH - filterH) / 2;
        }

        if (pillsRect.top > headerH) {
          // Pills fully below header — undock
          navHeader.classList.remove("filters-docked");
          if (headerFiltersEl) {
            headerFiltersEl.style.transition = "none";
            headerFiltersEl.style.top = "";
            headerFiltersEl.style.transform = "";
          }
        } else {
          // First overlap — track position, clamped to centered
          navHeader.classList.add("filters-docked");
          if (headerFiltersEl) {
            var topPx = Math.max(pillsRect.top - navTop, centeredTop);
            headerFiltersEl.style.transition = "none";
            headerFiltersEl.style.top = topPx + "px";
            headerFiltersEl.style.transform = "translateX(-50%)";
          }
        }
      }

      window.addEventListener("scroll", updateFilterDocking, { passive: true });
      updateFilterDocking();
    }

    applyFilters(currentFilters);

    window.addEventListener("hashchange", function () {
      currentFilters = getFiltersFromHash();
      applyFilters(currentFilters);
    });


  }

  // Portfolio nav button: scroll images just below header
  var navPortfolioBtn = document.querySelector(".nav-portfolio-btn");
  var navLogoWrapper = navHeader ? navHeader.querySelector(".nav-logo-wrapper") : null;

  function scrollToPortfolio(behavior) {
    if (!shuffleWrapper || !navHeader) return;
    document.fonts.ready.then(function () {
      var wasNavBg = navHeader.classList.contains("nav-bg");
      if (!wasNavBg) {
        navHeader.style.transition = "none";
        if (navLogoWrapper) navLogoWrapper.style.transition = "none";
        navHeader.classList.add("nav-bg");
        navHeader.offsetHeight; // force reflow so logo height applies
      }
      var h = navHeader.offsetHeight;
      if (!wasNavBg) {
        navHeader.classList.remove("nav-bg");
        requestAnimationFrame(function () {
          navHeader.style.transition = "";
          if (navLogoWrapper) navLogoWrapper.style.transition = "";
        });
      }
      var targetY = shuffleWrapper.getBoundingClientRect().top + window.scrollY - h - 2;
      window.scrollTo({ top: targetY, behavior: behavior || "smooth" });
    });
  }

  if (navPortfolioBtn && shuffleWrapper) {
    navPortfolioBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var navCollapse = document.getElementById('navigation');
      if (navCollapse && navCollapse.classList.contains('show')) {
        $('#navigation').one('hidden.bs.collapse', function () {
          scrollToPortfolio("smooth");
        });
        $('#navigation').collapse('hide');
      } else {
        scrollToPortfolio("smooth");
      }
    });
  }

  // Non-homepage: flag sessionStorage so homepage knows to scroll to portfolio
  if (!shuffleWrapper && navPortfolioBtn) {
    navPortfolioBtn.addEventListener("click", function () {
      sessionStorage.setItem("portfolioScroll", "1");
    });
  }

  // Homepage: if arriving via cross-page Portfolio click, scroll after page settles
  if (shuffleWrapper && sessionStorage.getItem("portfolioScroll")) {
    sessionStorage.removeItem("portfolioScroll");
    window.addEventListener("load", function () {
      setTimeout(function () { scrollToPortfolio("smooth"); }, 150);
    }, { once: true });
  }


  // Masonry grid: left-to-right shortest-column layout
  function layoutMasonryGrid(container) {
    var colMatch = container.className.match(/gallery-grid-cols-(\d+)/);
    var declaredCols = colMatch ? parseInt(colMatch[1]) : 2;
    var isMobile = window.innerWidth <= 575;
    var isTablet = window.innerWidth <= 991;
    var cols = isMobile ? 1 : (isTablet ? Math.min(declaredCols, 2) : declaredCols);
    var gap = isMobile ? 2 : 16;

    var containerWidth = container.offsetWidth;
    if (!containerWidth) return;

    var colWidth = cols === 1 ? containerWidth : (containerWidth - gap * (cols - 1)) / cols;
    var colHeights = new Array(cols).fill(0);
    var items = Array.from(container.querySelectorAll('.gallery-grid-item'));

    items.forEach(function (item) {
      var minH = Math.min.apply(null, colHeights);
      var col = colHeights.indexOf(minH);
      item.style.position = 'absolute';
      item.style.width = colWidth + 'px';
      item.style.left = (col * (colWidth + gap)) + 'px';
      item.style.top = minH + 'px';
      item.style.marginBottom = '0';
      colHeights[col] += item.offsetHeight + gap;
    });

    var totalHeight = Math.max.apply(null, colHeights);
    container.style.height = Math.max(totalHeight - gap, 0) + 'px';
  }

  function initMasonryGrids() {
    document.querySelectorAll('.gallery-grid').forEach(function (container) {
      var imgs = Array.from(container.querySelectorAll('img'));
      var unloaded = imgs.filter(function (img) { return !img.complete || !img.naturalWidth; });

      if (unloaded.length === 0) {
        layoutMasonryGrid(container);
        return;
      }

      var remaining = unloaded.length;
      function onImageSettled() {
        remaining--;
        if (remaining <= 0) layoutMasonryGrid(container);
      }
      unloaded.forEach(function (img) {
        img.addEventListener('load', onImageSettled, { once: true });
        img.addEventListener('error', onImageSettled, { once: true });
      });
    });
  }

  var masonryResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(masonryResizeTimer);
    masonryResizeTimer = setTimeout(function () {
      document.querySelectorAll('.gallery-grid').forEach(layoutMasonryGrid);
    }, 150);
  }, { passive: true });

  initMasonryGrids();

  // Scroll-aware fade overlays on filter pills
  function updateFilterFade(el) {
    var wrapper = el.closest && el.closest(".filter-pill-wrapper");
    if (!wrapper) return;
    var atStart = el.scrollLeft <= 0;
    var atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    var leftFade = wrapper.querySelector(".filter-fade-left");
    var rightFade = wrapper.querySelector(".filter-fade-right");
    if (leftFade) leftFade.classList.toggle("visible", !atStart);
    if (rightFade) rightFade.classList.toggle("visible", !atEnd);
  }

  document.querySelectorAll(".portfolio-nav-filters").forEach(function (el) {
    updateFilterFade(el);
    el.addEventListener("scroll", function () { updateFilterFade(el); }, { passive: true });
  });

  window.addEventListener("resize", function () {
    document.querySelectorAll(".portfolio-nav-filters").forEach(updateFilterFade);
  });
})(jQuery);
