import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const more = document.querySelector('.load-more');
const input = document.querySelector('input[name="searchQuery"]');
const baseURL = 'https://pixabay.com/api/';

form.addEventListener('submit', event => {
  event.preventDefault();
  const word = input.value;
  console.log(word);

  const options = {
    params: {
      key: '41265249-e32640f8794e7a54bd81efaed',
      q: word,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      // opcje
    },
  };

  axios
    .get(baseURL, options)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
