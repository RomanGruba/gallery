import galleryData from "./gallery-items.js";

const ul = document.querySelector(".gallery");

const fragment = document.createDocumentFragment();

function newItem(obj, idx) {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  const a = document.createElement("a");
  a.classList.add("gallery__link");
  a.setAttribute("href", obj.original);

  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", obj.preview);
  img.dataset.source = obj.original;
  img.setAttribute("alt", obj.description);
  img.dataset.index = idx;

  const span = document.createElement("span");
  span.classList.add("gallery__icon");

  const i = document.createElement("i");
  i.classList.add("material-icons");
  i.textContent = "zoom_out_map";

  span.append(i);
  a.append(img, span);
  li.append(a);
  fragment.append(li);
  return fragment;
}

galleryData.forEach((el, idx) => {
  newItem(el, idx);
});

ul.append(fragment);

ul.addEventListener("click", openModal);

function openModal(e) {
  e.preventDefault();
  if (e.target !== e.currentTarget) {
    document.querySelector(".lightbox").classList.add("is-open");
    const currentImage = document.querySelector(".lightbox___image");
    currentImage.setAttribute("src", e.target.dataset.source);
    currentImage.setAttribute("data-index", e.target.dataset.index);

    handleClickClose(e);
    window.addEventListener("keydown", handleKeyPress);
  }
}

function closeModal() {
  document.querySelector(".lightbox").classList.remove("is-open");
  const currentImage = document.querySelector(".lightbox___image");
  currentImage.setAttribute("src", "");
  window.removeEventListener("keydown", handleKeyPress);
  closeButton.removeEventListener("click", closeModal);
}

const closeButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);

closeButton.addEventListener("click", closeModal);

function handleKeyPress(e) {
  let currentImage = document.querySelector(".lightbox___image");
  let nextImageIdx = Number(currentImage.dataset.index) + 1;

  switch (e.code) {
    case "Escape":
      closeModal();
      break;

    case "ArrowRight":
      currentImage.setAttribute("src", galleryData[nextImageIdx].original);
      currentImage.setAttribute("data-index", nextImageIdx);
      break;

    case "ArrowLeft":
      nextImageIdx = Number(currentImage.dataset.index) - 1;

      currentImage.setAttribute("src", galleryData[nextImageIdx].original);
      currentImage.setAttribute("data-index", nextImageIdx);
      break;

    default:
      break;
  }
}

function handleClickClose() {
  document.querySelector(".is-open").addEventListener("click", e => {
    if (e.target !== document.querySelector(".lightbox___image")) {
      closeModal();
    }
  });
}
