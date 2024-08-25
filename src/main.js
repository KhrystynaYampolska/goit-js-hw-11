import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

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
</li>
</div>
`;
};

const onSearchFormSubmit = event => {
  event.preventDefault();

  const inputValue = searchForm.elements.text.value.trim();

  if (!inputValue) {
    iziToast.warning({
      title: 'Warning',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  loader.classList.remove('hidden');

  fetch(
    `https://pixabay.com/api/?key=32552782-0d4c86680018457e820f20492&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        gallery.innerHTML = '';
        return;
      }

      gallery.innerHTML = '';

      const galleryCardsTemplate = data.hits
        .map(imgInfo => createGalleryCardTemplate(imgInfo))
        .join('');
      gallery.innerHTML = galleryCardsTemplate;

      const lightbox = new SimpleLightbox('.gallery-card a', {
        captions: true,
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
      });

      lightbox.refresh();
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching the data. Please try again!',
        position: 'topRight',
      });
      console.log(err);
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
};

searchForm.addEventListener('submit', onSearchFormSubmit);
