import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const more = document.querySelector('.load-more');
const input = document.querySelector('input[name="searchQuery"]');
const baseURL = 'https://pixabay.com/api/';

// const image = `
//   <div class="photo-card">
//     <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>Likes ${hit.likes}</b>
//       </p>
//       <p class="info-item">
//         <b>Views ${hit.views}</b>
//       </p>
//       <p class="info-item">
//         <b>Comments ${hit.comments}</b>
//       </p>
//       <p class="info-item">
//         <b>Downloads ${hit.downloads}</b>
//       </p>
//     </div>
//   </div>
// `;

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
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
    .then(res => {
      console.log('Response:', res.data);
      console.log(res.data.hits);
      res.data.hits.forEach(hit => {
        console.log(hit.likes);
        gallery.insertAdjacentHTML(
          'beforeend',
          `
          <div class="photo-card">
    <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${hit.likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${hit.views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${hit.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${hit.downloads}</b>
      </p>
    </div>
  </div>
`
        );
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// webformatURL - link do małego obrazka.
// largeImageURL - link do dużego obrazka.
// tags - wiersz z opisem obrazka. Będzie pasować do atrybutu alt.
// likes - liczba “lajków”.
// views - liczba wyświetleń.
// comments - liczba komentarzy.
// downloads - liczba pobrań.
