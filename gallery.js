import galleryItems from "./gallery-items.js";

const makeGalleryItemMarkup = ({ preview, original, description }, index) => {
  return `
  <li class="gallery__item">
      <a
        class="gallery__link"
        href=${original}
      >
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          data-index=${index}
          alt=${description}
        />
      </a>
    </li>
    `;
};

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxBtn: document.querySelector("[data-action]"),
};

const makeGalleryItems = galleryItems.map(makeGalleryItemMarkup).join("");

refs.galleryContainer.insertAdjacentHTML("beforeend", makeGalleryItems);

refs.galleryContainer.addEventListener("click", onGalleryContainerClick);
refs.lightboxBtn.addEventListener("click", onLightboxClose);
refs.lightboxOverlay.addEventListener("click", onLightboxClose);

function onGalleryContainerClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  window.addEventListener("keydown", onArrowPress);
  window.addEventListener("keydown", onEscKeyPress);
  refs.lightbox.classList.add("is-open");
  refs.lightboxImage.src = event.target.dataset.source;
  refs.lightboxImage.dataset.index = event.target.dataset.index;
}

function onLightboxClose(event) {
  window.removeEventListener("keydown", onArrowPress);
  window.removeEventListener("keydown", onEscKeyPress);
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImage.src = "";
}
function onEscKeyPress(event) {
  const EscKeyCode = "Escape";
  if (event.code === EscKeyCode) {
    onLightboxClose();
  }
}

function onArrowPress(event) {
  let currentIndex = parseInt(refs.lightboxImage.dataset.index);

  if (event.code === "ArrowRight" && currentIndex <= galleryItems.length - 1) {
    refs.lightboxImage.dataset.index = parseInt(currentIndex) + 1;
    refs.lightboxImage.src =
      galleryItems[parseInt(refs.lightboxImage.dataset.index) + 1].original;
  } else if (event.code === "ArrowLeft" && currentIndex !== 0) {
    refs.lightboxImage.dataset.index = parseInt(currentIndex) - 1;
    refs.lightboxImage.src =
      galleryItems[parseInt(refs.lightboxImage.dataset.index) - 1].original;
  }
}

// function onArrowLeftPress(event) {
//   const ArrowLeftCode = "ArrowLeft";
//   if (event.code === ArrowLeftCode) {
//     let currentImg = event.target;
//     const previousImage = currentImg
//       .closest(".gallery__item")
//       .previousElementSibling.querySelector(".gallery__link");
//     refs.lightboxImage.src = previousImage.firstElementChild.dataset.source;
//   }
// }
