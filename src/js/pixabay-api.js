const API_KEY = '32552782-0d4c86680018457e820f20492';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = query => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
