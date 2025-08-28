document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".burger-button");
  const burgerSlidingMenu = document.querySelector(".burger-sliding-menu");
  const burgerButtons = document.querySelectorAll(".burger-buttons");
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("focused");
    } else {
      header.classList.remove("focused");
    }
  });

  burgerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      burgerButton.classList.remove("active");
      burgerSlidingMenu.classList.remove("active");
    });
  });

  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("active");
    burgerSlidingMenu.classList.toggle("active");
    header.classList.add("focused");
  });

  const images = [
    "/images/gallery/1.webp",
    "/images/gallery/2.webp",
    "/images/gallery/3.webp",
    "/images/gallery/4.webp",
    "/images/gallery/5.webp",
    "/images/gallery/6.webp",
    "/images/gallery/7.webp",
    "/images/gallery/8.webp",
    "/images/gallery/9.webp",
    "/images/gallery/10.webp",
    "/images/gallery/11.webp",
    "/images/gallery/12.webp",
  ];

  const screenWidth = window.innerWidth;
  let gallereryTopButtonLeft;
  let gallereryTopButtonRight;
  let slidePerView = 3;
  if (screenWidth < 800) {
    slidePerView = 2;
  }
  if (screenWidth < 500) {
    slidePerView = 1;
  }

  if (slidePerView > 1) {
    gallereryTopButtonLeft = document.querySelector(
      ".gallerery-top-button-left"
    );
    gallereryTopButtonRight = document.querySelector(
      ".gallerery-top-button-right"
    );
  } else {
    gallereryTopButtonLeft = document.querySelector(
      ".button-left-gallery-mobile"
    );
    gallereryTopButtonRight = document.querySelector(
      ".button-right-gallery-mobile"
    );
  }

  const gallererySlider = document.querySelector(".gallerery-slider");
  const counter = document.getElementById("counter");

  function renderSlides(startIndex = 0) {
    gallererySlider.innerHTML = "";

    let maxHeight = 0; // для визначення максимальної висоти слайдів
    counter.innerHTML = `${startIndex + 1}/12`;
    for (let i = startIndex; i < startIndex + slidePerView; i++) {
      const imgSrc = images[i % images.length];
      const slide = document.createElement("div");
      slide.className = "gallerery-slide";

      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `Галерея робіт TruboClean — фото ${i + 1}`;
      img.loading = "lazy";
      img.title = `Чистка димоходів та камінів — фото ${i + 1}`;

      img.addEventListener("load", () => {
        const h = img.naturalHeight * (slide.clientWidth / img.naturalWidth);
        if (h > maxHeight) {
          maxHeight = h;
          gallererySlider.style.minHeight = maxHeight + "px";
        }
      });

      slide.appendChild(img);
      gallererySlider.appendChild(slide);
    }
  }

  let currentIndex = 0;

  gallereryTopButtonLeft.addEventListener("click", () => {
    currentIndex =
      (currentIndex - slidePerView + images.length) % images.length;
    renderSlides(currentIndex);
  });

  gallereryTopButtonRight.addEventListener("click", () => {
    currentIndex = (currentIndex + slidePerView) % images.length;
    renderSlides(currentIndex);
  });

  renderSlides(currentIndex);

  const openFormButton = document.querySelectorAll(".openModal");

  openFormButton.forEach((el) => {
    el.addEventListener("click", () => {
      formOverlay.style.display = "block";
    });
  });

  const formOverlay = document.querySelector(".form");
  const formElement = document.querySelector(".contact-us-form");

  formOverlay.addEventListener("click", () => {
    formOverlay.style.display = "none";
  });

  formElement.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const URI_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  // Modal
  const orderFormModal = document.getElementById("orderFormModal");
  orderFormModal.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("modal-input-name").value;
    const phone = document.getElementById("modal-input-phone").value;

    const inputContents = [
      `<b>Нова заявка</b>`,
      `<b>Ім'я:</b> ${name}`,
      `<b>Номер телефону:</b> <a href="${phone}">${phone}</a>`,
    ];
    let message = inputContents.join("\n");
    fetch(URI_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        parse_mode: "html",
        text: message,
      }),
    })
      .then((res) => {
        window.location.href = "/thankPage.html";
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Contact us Form

  const contactUsForm = document.getElementById("contact-us-form");
  contactUsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(1);
    console.log(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
    const name = document.getElementById("contact-us-input-name").value;
    const phone = document.getElementById("contact-us-input-phone").value;
    const comment = document.getElementById("contact-us-input-comment").value;

    const commentText = comment.trim() ? `Коментар: ${comment}` : "";
    const inputContents = [
      `<b>Нова заявка</b>`,
      `<b>Ім'я:</b> ${name}`,
      `<b>Номер телефону:</b> <a href="${phone}">${phone}</a>`,
      commentText,
    ];

    let message = inputContents.join("\n");
    fetch(URI_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        parse_mode: "html",
        text: message,
      }),
    })
      .then((res) => {
        window.location.href = "/thankPage.html";
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
