import galleryItems from "./gallery-items.js";
// console.log(galleryItems);

const makeGalleryItemMarkup = ({ preview, original, description }) => {
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
  window.addEventListener("keydown", onEscKeyPress);
  refs.lightbox.classList.add("is-open");
  refs.lightboxImage.src = event.target.dataset.source;
}
function onLightboxClose(event) {
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
window.addEventListener("keydown", onArrowRightPress);
function onArrowRightPress(event) {
  const ArrowRightCode = "ArrowRight";
  if (event.code === ArrowRightCode) {
    for (let i = 0; i < galleryItems.length; i++) {
      let currentImg = event.target;
      let nextImage = currentImg
        .closest(".gallery__item")
        .nextElementSibling.querySelector(".gallery__link");
      refs.lightboxImage.src = nextImage.firstElementChild.dataset.source;
    }
  }
}
window.addEventListener("keydown", onArrowLeftPress);
function onArrowLeftPress(event) {
  const ArrowLeftCode = "ArrowLeft";
  if (event.code === ArrowLeftCode) {
    let currentImg = event.target;
    const previousImage = currentImg
      .closest(".gallery__item")
      .previousElementSibling.querySelector(".gallery__link");
    refs.lightboxImage.src = previousImage.firstElementChild.dataset.source;
  }
}
