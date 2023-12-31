import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { axiosConfig } from './axiosConfig';
import { createGallery } from './create';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');
const input = document.querySelector('input[name="searchQuery"]');
const backBtn = document.querySelector('.back');

const baseURL = 'https://pixabay.com/api/';

moreBtn.style.display = 'none';
backBtn.style.display = 'none';

let page = 1;

var lightbox = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  const word = input.value;
  page = 1;
  const options = axiosConfig(word, page);

  try {
    const res = await axios.get(baseURL, options);

    createGallery(res.data.hits);
    moreBtn.style.display = 'block';
    backBtn.style.display = 'block';

    if (res.data.totalHits === 0) {
      backBtn.style.display = 'none';
      moreBtn.style.display = 'none';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
      if (res.data.totalHits <= page * 40) {
        moreBtn.style.display = 'none';
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }

    lightbox.refresh();
  } catch (error) {
    console.error('Error:', error);
  }
});

moreBtn.addEventListener('click', async () => {
  ++page;
  const word = input.value;
  const options = axiosConfig(word, page);

  try {
    const res = await axios.get(baseURL, options);

    createGallery(res.data.hits);
    Notiflix.Notify.success(`More images are loaded.`);

    if (res.data.totalHits <= page * 40) {
      moreBtn.style.display = 'none';
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      moreBtn.style.display = 'block';
    }

    lightbox.refresh();
  } catch (error) {
    console.error('Error:', error);
  }
});

backBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
