import objectImages from './gallery-items.js';

const makeElementGalleryLiWithLinkAndImgMarkup = ({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
};

// console.log(makeElementGalleryLiWithLinkAndImgMarkup(objectImages));

const ulJsGalleryRef = document.querySelector('.js-gallery');

const makeElementGalleryLiWithLinkAndImg =
    objectImages.map(makeElementGalleryLiWithLinkAndImgMarkup).join('');

ulJsGalleryRef.insertAdjacentHTML('beforeend', makeElementGalleryLiWithLinkAndImg);

// console.log(makeElementGalleryLiWithLinkAndImg);


const refs = {
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  listGallery: document.querySelector('.js-gallery'),
  backdrop: document.querySelector('.js-lightbox'),
  originalImg: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
};

refs.listGallery.addEventListener('click', onModalOpen);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onBackdropClick);

function imgTegAttributes(src, alt) {
  refs.originalImg.src = src;
  refs.originalImg.alt = alt;
}

function onModalOpen(event) {
  event.preventDefault();
  window.addEventListener('keydown', onArrowKeyPress);
  window.addEventListener('keydown', onEscKeyPress);
  if (!event.target.classList.contains('gallery__image')){
    return
  }
  refs.backdrop.classList.add('is-open');
  refs.originalImg.src = event.target.dataset.source;
};

function onCloseModal() {
  window.removeEventListener('keydown', onArrowKeyPress);
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('is-open');
  imgTegAttributes('', '');
};

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal()
  }
};

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal()
  }
}

function onArrowKeyPress(event) {
  let idx = objectImages.findIndex(img => img.original === refs.originalImg.src)

  if (event.code === 'ArrowLeft') {
    idx -= 1;
    if (idx === -1) {
      return
    }
    imgTegAttributes(objectImages[idx].original, objectImages[idx].description);
  } else if (event.code === 'ArrowRight') {
    idx += 1;
    if (idx === objectImages.length-1) {
      return
    }
    imgTegAttributes(objectImages[idx].original, objectImages[idx].description);
  };
  
};

