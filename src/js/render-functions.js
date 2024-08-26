import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const createGalleryCardTemplate = imgInfo => {
  return `<li class="gallery-card">
    <a href="${imgInfo.largeImageURL}">
      <img src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" class="gallery-img" />
    </a>
    <div class="gallery-info">
      <p><span class="label">Likes</span> <span class="value">${imgInfo.likes}</span></p>
      <p><span class="label">Views</span> <span class="value">${imgInfo.views}</span></p>
      <p><span class="label">Comments</span> <span class="value">${imgInfo.comments}</span></p>
      <p><span class="label">Downloads</span> <span class="value">${imgInfo.downloads}</span></p>
    </div>
  </li>`;
};

export const renderGallery = images => {
  const gallery = document.querySelector('.js-gallery');
  gallery.innerHTML = images.map(createGalleryCardTemplate).join('');

  lightbox.refresh();
};

export const showWarningToast = message => {
  iziToast.warning({
    title: 'Warning',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
};

export const showErrorToast = message => {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
};

const lightbox = new SimpleLightbox('.gallery-card a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
