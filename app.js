const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.gallery'),
  overlay: document.querySelector('.lightbox'),
  imgOriginal: document.querySelector('.lightbox__image'),
  buttonClose: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
}

refs.gallery.addEventListener('click', onImageClick);
refs.overlay.addEventListener('click', onCloseOverly);
refs.buttonClose.addEventListener('click', onBtnCloseModal);
const listItems = createItemGallery(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', listItems);
window.addEventListener('keydown', onkeydown);

function createItemGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
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
    </li>`;
    })
    .join('');
}

function onBtnCloseModal() {
  refs.overlay.classList.remove('is-open');
  refs.imgOriginal.src = '';
}
function onCloseOverly(event) {
  if(!event.target.classList.contains('lightbox__overlay')){
    return;
  }
  refs.overlay.classList.remove('is-open');
}

function onkeydown(event) {
  
  if (!refs.overlay.classList.contains('is-open')) return;

  if (event.code === 'Escape') {
 
    refs.overlay.classList.remove('is-open');
  }

  const currentEl = [...refs.gallery.children].find(
    liEl => liEl.firstElementChild.href === refs.imgOriginal.src
  );

  if (event.code === 'ArrowRight') {
    if (!currentEl.nextSibling) {
      refs.imgOriginal.src = refs.gallery.firstElementChild.firstElementChild.href;
    } else refs.imgOriginal.src = currentEl.nextSibling.firstElementChild.href;
  }

  if (event.code === 'ArrowLeft') {
    if (!currentEl.previousSibling) {
      refs.imgOriginal.src = refs.gallery.lastElementChild.firstElementChild.href;
     }
     else refs.imgOriginal.src = currentEl.previousSibling.firstElementChild.href;
  }
}
const imgEl = document.querySelector('.gallery__image');

function onImageClick(evt) {
  evt.preventDefault();
  const isGalleryImagesEl = evt.target.classList.contains('gallery__image');

  if (!isGalleryImagesEl) {
    return;
  } else {
    refs.overlay.classList.add('is-open');

    refs.imgOriginal.src = evt.target.dataset.source;
  }
}
