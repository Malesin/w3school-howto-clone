document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.getElementById("mobileToggle");
  const sidenav = document.getElementById("sidenav");

  if (mobileToggle && sidenav) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      sidenav.classList.toggle("open");
    });

    document.addEventListener("click", function (e) {
      if (window.innerWidth <= 992 && !sidenav.contains(e.target) && e.target !== mobileToggle) {
        sidenav.classList.remove("open");
      }
    });
  }

  const sidenavFilter = document.getElementById("sidenavFilter");
  if (sidenavFilter) {
    sidenavFilter.addEventListener("input", function () {
      const filter = this.value.toUpperCase();
      const links = document.querySelectorAll(".sidenav-links a");
      const categories = document.querySelectorAll(".sidenav-category");

      links.forEach(function (link) {
        const text = link.textContent || link.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
          link.style.display = "block";
        } else {
          link.style.display = "none";
        }
      });

      categories.forEach(function (cat) {
        cat.style.display = filter === "" ? "block" : "none";
      });
    });
  }

  let currentSlideIdx = 1;
  const slideImgs = document.querySelectorAll(".slideshow-img");
  const slideDots = document.querySelectorAll(".slide-dot");
  const slideNumBadge = document.getElementById("slideNumBadge");
  const slideCaption = document.getElementById("slideCaption");

  const captions = [
    "Caption One - Serene Nature",
    "Caption Two - Snowy Fjords",
    "Caption Three - Majestic Mountains",
    "Caption Four - Northern Lights"
  ];

  window.plusSlides = function (n) {
    showSlide((currentSlideIdx += n));
  };

  window.setSlide = function (n) {
    showSlide((currentSlideIdx = n));
  };

  function showSlide(n) {
    if (!slideImgs.length) return;
    if (n > slideImgs.length) currentSlideIdx = 1;
    if (n < 1) currentSlideIdx = slideImgs.length;

    slideImgs.forEach((img, i) => {
      img.classList.remove("active");
      if (slideDots[i]) slideDots[i].classList.remove("active");
    });

    slideImgs[currentSlideIdx - 1].classList.add("active");
    if (slideDots[currentSlideIdx - 1]) slideDots[currentSlideIdx - 1].classList.add("active");
    if (slideNumBadge) slideNumBadge.textContent = `${currentSlideIdx} / 4`;
    if (slideCaption) slideCaption.textContent = captions[currentSlideIdx - 1];
  }

  showSlide(currentSlideIdx);

  const loginModal = document.getElementById("loginModal");
  window.openLoginModal = function () {
    if (loginModal) loginModal.style.display = "block";
  };
  window.closeLoginModal = function () {
    if (loginModal) loginModal.style.display = "none";
  };

  const accButtons = document.querySelectorAll(".acc-button");
  accButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const icon = this.querySelector(".acc-icon");
      const panel = this.nextElementSibling;

      if (panel.classList.contains("show")) {
        panel.classList.remove("show");
        if (icon) icon.textContent = "+";
      } else {
        panel.classList.add("show");
        if (icon) icon.textContent = "—";
      }
    });
  });

  window.toggleClickDropdown = function () {
    const flyout = document.getElementById("clickDropdownMenu");
    if (flyout) flyout.classList.toggle("show-click");
  };

  const offcanvas = document.getElementById("myOffcanvas");
  const offcanvasOverlay = document.getElementById("offcanvasOverlay");

  window.openSidenavOverlay = function () {
    if (offcanvas) offcanvas.style.width = "250px";
    if (offcanvasOverlay) {
      offcanvasOverlay.style.width = "100%";
      offcanvasOverlay.style.opacity = "1";
    }
  };

  window.openSidenavOpacity = function () {
    if (offcanvas) offcanvas.style.width = "250px";
    if (offcanvasOverlay) {
      offcanvasOverlay.style.width = "100%";
      offcanvasOverlay.style.opacity = "0.7";
    }
  };

  window.closeSidenav = function () {
    if (offcanvas) offcanvas.style.width = "0";
    if (offcanvasOverlay) {
      offcanvasOverlay.style.opacity = "0";
      setTimeout(() => {
        offcanvasOverlay.style.width = "0";
      }, 300);
    }
  };

  const tealModal = document.getElementById("tealModal");
  window.openTealModal = function () {
    if (tealModal) tealModal.style.display = "block";
  };
  window.closeTealModal = function () {
    if (tealModal) tealModal.style.display = "none";
  };

  const imgModal = document.getElementById("imgLightboxModal");
  const modalImg = document.getElementById("imgLightboxContent");
  const captionText = document.getElementById("imgLightboxCaption");

  window.openImgModal = function (imgEl) {
    if (imgModal && modalImg) {
      imgModal.style.display = "block";
      modalImg.src = imgEl.src;
      if (captionText) captionText.textContent = imgEl.alt;
    }
  };

  window.closeImgModal = function () {
    if (imgModal) imgModal.style.display = "none";
  };

  let fullLightboxIdx = 1;
  const fullLightboxModal = document.getElementById("fullLightboxModal");

  window.openLightboxGallery = function (n) {
    if (fullLightboxModal) {
      fullLightboxModal.style.display = "block";
      showFullLightboxSlide((fullLightboxIdx = n));
    }
  };

  window.closeLightboxGallery = function () {
    if (fullLightboxModal) fullLightboxModal.style.display = "none";
  };

  window.plusLightboxSlide = function (n) {
    showFullLightboxSlide((fullLightboxIdx += n));
  };

  window.currentLightboxSlide = function (n) {
    showFullLightboxSlide((fullLightboxIdx = n));
  };

  function showFullLightboxSlide(n) {
    const slides = document.querySelectorAll(".full-lightbox-slide");
    const thumbs = document.querySelectorAll(".lightbox-strip img");
    const caption = document.getElementById("fullLightboxCaption");
    if (!slides.length) return;

    if (n > slides.length) fullLightboxIdx = 1;
    if (n < 1) fullLightboxIdx = slides.length;

    slides.forEach((s) => (s.style.display = "none"));
    thumbs.forEach((t) => t.classList.remove("strip-active"));

    slides[fullLightboxIdx - 1].style.display = "block";
    if (thumbs[fullLightboxIdx - 1]) thumbs[fullLightboxIdx - 1].classList.add("strip-active");
    if (caption) {
      const activeImg = slides[fullLightboxIdx - 1].querySelector("img");
      caption.textContent = activeImg ? activeImg.alt : "";
    }
  }

  let galleryIdx = 1;
  const galleryMainImg = document.getElementById("galleryMainImg");
  const galleryNum = document.getElementById("galleryNum");
  const galleryCaption = document.getElementById("galleryCaption");
  const galleryThumbs = document.querySelectorAll(".gallery-thumbs-bar img");

  const galleryData = [
    { src: "https://www.w3schools.com/howto/img_woods_wide.jpg", title: "The Woods" },
    { src: "https://www.w3schools.com/howto/img_5terre_wide.jpg", title: "Cinque Terre" },
    { src: "https://www.w3schools.com/howto/img_mountains_wide.jpg", title: "Mountains and fjords" },
    { src: "https://www.w3schools.com/howto/img_lights_wide.jpg", title: "Northern Lights" },
    { src: "https://www.w3schools.com/howto/img_nature_wide.jpg", title: "Nature and sunrise" },
    { src: "https://www.w3schools.com/howto/img_snow_wide.jpg", title: "Snowy Mountains" }
  ];

  window.plusGallery = function (n) {
    setGallerySlide((galleryIdx += n));
  };

  window.setGallerySlide = function (n) {
    if (n > galleryData.length) galleryIdx = 1;
    if (n < 1) galleryIdx = galleryData.length;
    else galleryIdx = n;

    if (galleryMainImg) galleryMainImg.src = galleryData[galleryIdx - 1].src;
    if (galleryNum) galleryNum.textContent = `${galleryIdx} / 6`;
    if (galleryCaption) galleryCaption.textContent = galleryData[galleryIdx - 1].title;

    galleryThumbs.forEach((t, i) => {
      t.classList.toggle("active", i === galleryIdx - 1);
    });
  };

  window.openCityTab = function (evt, cityName) {
    const tabPanels = document.querySelectorAll(".tab-city-panel");
    const tabButtons = document.querySelectorAll(".tab-link-btn");

    tabPanels.forEach((p) => (p.style.display = "none"));
    tabButtons.forEach((b) => b.classList.remove("active"));

    const target = document.getElementById(cityName);
    if (target) target.style.display = "block";
    evt.currentTarget.classList.add("active");
  };

  window.openVerticalCity = function (evt, cityName) {
    const vPanels = document.querySelectorAll(".vtab-city-panel");
    const vButtons = document.querySelectorAll(".vtab-btn");

    vPanels.forEach((p) => (p.style.display = "none"));
    vButtons.forEach((b) => b.classList.remove("active"));

    const target = document.getElementById(cityName);
    if (target) target.style.display = "block";
    evt.currentTarget.classList.add("active");
  };

  const expandedImg = document.getElementById("tabGalleryExpandedImg");
  const expandedCaption = document.getElementById("tabGalleryCaption");
  const expandedWrap = document.getElementById("tabGalleryExpanded");

  window.openTabGalleryImg = function (imgs) {
    if (expandedImg && expandedWrap) {
      expandedImg.src = imgs.src;
      expandedCaption.textContent = imgs.alt;
      expandedWrap.style.display = "block";
    }
  };

  window.closeTabGallery = function () {
    if (expandedWrap) expandedWrap.style.display = "none";
  };

  const fullscreenNav = document.getElementById("fullscreenNavOverlay");
  window.openFullscreenNavRight = function () {
    if (fullscreenNav) {
      fullscreenNav.style.width = "100%";
      fullscreenNav.style.height = "100%";
    }
  };

  window.openFullscreenNavDown = function () {
    if (fullscreenNav) {
      fullscreenNav.style.width = "100%";
      fullscreenNav.style.height = "100%";
    }
  };

  window.closeFullscreenNav = function () {
    if (fullscreenNav) fullscreenNav.style.width = "0%";
  };

  const scrollBgBox = document.getElementById("scrollBgContainer");
  const scrollBgScene = document.getElementById("scrollBgScene");
  if (scrollBgBox && scrollBgScene) {
    scrollBgBox.addEventListener("scroll", function () {
      if (this.scrollTop > 120) {
        scrollBgScene.style.backgroundImage = "url('https://www.w3schools.com/howto/img_nature_wide.jpg')";
      } else {
        scrollBgScene.style.backgroundImage = "url('https://www.w3schools.com/howto/img_snow_wide.jpg')";
      }
    });
  }

  window.addEventListener("click", function (event) {
    if (!event.target.matches(".btn-click-blue")) {
      const clickMenu = document.getElementById("clickDropdownMenu");
      if (clickMenu && clickMenu.classList.contains("show-click")) {
        clickMenu.classList.remove("show-click");
      }
    }
    if (event.target === loginModal) loginModal.style.display = "none";
    if (event.target === tealModal) tealModal.style.display = "none";
    if (event.target === imgModal) imgModal.style.display = "none";
    if (event.target === fullLightboxModal) fullLightboxModal.style.display = "none";
  });

  const chest = document.getElementById("advbChest");
  if (chest) {
    chest.addEventListener("click", function () {
      const xpElement = document.querySelector(".advb-stat b");
      if (xpElement) {
        let curr = parseInt(xpElement.textContent, 10) || 0;
        xpElement.textContent = curr + 50;
      }
    });
  }
});
