const gallery = document.querySelector('.gallery');

export function createGallery(hits) {
  hits.forEach(hit => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `
          <div class="photo-card">
          <a class="pic" href="${hit.webformatURL}">
    <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <br>
        <span>${hit.likes}</span>
      </p>
      <p class="info-item">
        <b>Views </b>
        <br>
        <span>${hit.views}</span>
      </p>
      <p class="info-item">
        <b>Comments </b>
        <br>
        <span>${hit.comments}</span>
      </p>
      <p class="info-item">
      <b>Downloads </b>
      <br>
      <span>${hit.downloads}</span>
      </p>
      </div>
      </div>
      `
    );
  });
}
