import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchLoader = document.querySelector('#search-loader'); // Лоадер для пошуку
const loadMoreLoader = document.querySelector('#load-more-loader'); // Лоадер для "Load more"
let query = '';
let page = 1;
let totalHits = 0;
let lightbox;

const PER_PAGE = 15;

// Початково ховаємо кнопку та лоадери
loadMoreBtn.classList.add('hidden');
searchLoader.classList.add('hidden');
loadMoreLoader.classList.add('hidden');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = form.query.value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  page = 1; // Скидаємо пагінацію
  gallery.innerHTML = ''; // Очищаємо попередні результати
  loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку перед новим пошуком
  searchLoader.classList.remove('hidden'); // Показуємо лоадер для пошуку

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (totalHits === 0) {
      iziToast.info({ message: 'No images found for your search!' });
      return;
    }

    renderGallery(data.hits);

    // Показуємо кнопку, якщо є більше зображень для завантаження
    if (totalHits > PER_PAGE) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images!' });
  } finally {
    searchLoader.classList.add('hidden'); // Приховуємо лоадер після запиту
  }
}

async function onLoadMore() {
  page += 1;

  // Ховаємо кнопку і показуємо лоадер
  loadMoreBtn.classList.add('hidden');
  loadMoreLoader.classList.remove('hidden'); // Показуємо лоадер для "Load more"

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);

    // Якщо користувач дійшов до кінця колекції
    if (page * PER_PAGE >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку, якщо більше зображень немає
    } else {
      loadMoreBtn.classList.remove('hidden'); // Показуємо кнопку, якщо є ще зображення
    }

    // Плавна прокрутка
    smoothScroll();
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images!' });
  } finally {
    loadMoreLoader.classList.add('hidden'); // Ховаємо лоадер після завантаження
  }
}

function renderGallery(images) {
  const markup = renderImages(images);
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-link');
  } else {
    lightbox.refresh();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

const styles = `
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

p:last-child {
  margin-bottom: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: currentColor;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

body {
  font-family: 'Montserrat', sans-serif;
}

.container {
padding: 24px 156px;
}

.search-form {
  margin: 20px;
  text-align: center;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 24px;
  padding: 20px;
}

.photo-card {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.photo-card-img {
  width: 100%;
  height: auto;
  flex: 1;
}

.loader {
  position: fixed;
  top: 100;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 64px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.loader:after {
  content: '';
  position: absolute;
  inset: 8px;
  margin: auto;
  background: #222b32;
}
.loader:before {
  content: '';
  position: absolute;
  inset: -15px;
  margin: auto;
  background: #de3500;
  animation: diamondLoader 2s linear infinite;
}
@keyframes diamondLoader {
  0%  ,10% {
    transform: translate(-64px , -64px) rotate(-45deg)
  }
  90% , 100% {
    transform: translate(0px , 0px) rotate(-45deg)
  }
}

#search-form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4e75ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
}

.load-more:hover {
  background-color: #6c8cff;
  }

.hidden {
  display: none;
}

.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: auto;
  height: 48px;
  padding: 4px 0;
}

input {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.04em;
  color: #2e2f42;
  border: 1px solid #808080;
  border-color: #808080;
  border-radius: 4px;
  min-width: 274px;
  height: 40px;
  padding: 0px 16px;
  margin-right: 20px;
}

input:hover {
  border-color: #000;
}

input:focus {
  border-color: #4e75ff;
}

.search-btn {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  width: auto;
  height: 40px;
  background: #4e75ff;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.04em;
  color: #fff;
}

.search-btn:hover {
  border: none;
  background: #6c8cff;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.04em;
  color: #fff;
}

`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;

document.head.appendChild(styleSheet);
