const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37098100-c1f03ed35a5bcbe47235bac6b';

const fetchImages = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const data = await response.json();

  return data;
};

export default fetchImages;
