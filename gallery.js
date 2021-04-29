import galleryItems from "./gallery-items.js";
console.log(galleryItems);

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
const galleryRef = document.querySelector(".js-gallery");
const makeGalleryItems = galleryItems.map(makeGalleryItemMarkup).join("");

galleryRef.insertAdjacentHTML("beforeend", makeGalleryItems);
console.log(makeGalleryItems);
