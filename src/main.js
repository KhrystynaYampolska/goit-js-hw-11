import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  showWarningToast,
  showErrorToast,
} from './js/render-functions';

const searchForm = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

const onSearchFormSubmit = event => {
  event.preventDefault();

  const inputValue = searchForm.elements.text.value.trim();

  if (!inputValue) {
    showWarningToast(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  loader.classList.remove('hidden');

  fetchImages(inputValue)
    .then(data => {
      if (data.hits.length === 0) {
        showErrorToast(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        gallery.innerHTML = '';
        return;
      }

      gallery.innerHTML = '';

      renderGallery(data.hits);
    })
    .catch(err => {
      showErrorToast(
        'An error occurred while fetching the data. Please try again!'
      );
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
};

searchForm.addEventListener('submit', onSearchFormSubmit);
