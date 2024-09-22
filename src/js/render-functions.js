export function renderImages(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <div class="photo-card">
            <div class="photo-card-img">
              <a href="${largeImageURL}" class="gallery-link">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              </a>
            </div>
            <div class="info">
              <div class="info-item">
                <b>Likes</b>
                <p>${likes}</p>
              </div>
              <div class="info-item">
                <b>Views</b>
                <p>${views}</p>
              </div>
              <div class="info-item">
                <b>Comments</b>
                <p>${comments}</p>
              </div>
              <div class="info-item">
                <b>Downloads</b>
                <p>${downloads}</p>
              </div>
            </div>
          </div>
    `
    )
    .join('');
}
