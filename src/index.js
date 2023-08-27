import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreed, fetchCatByBreed } from './cat-api.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const refs = {
  breedEl: document.querySelector('.breed-select'),
  catEl: document.querySelector('.cat-info'),
};

fetchBreed()
  .then(breedsArr => (refs.breedEl.innerHTML = createMarcup(breedsArr)))
  .catch(err => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

refs.breedEl.addEventListener('change', findCat);

function findCat(event) {
  refs.catEl.innerHTML = '';
  const breed = event.currentTarget.value;

  fetchCatByBreed(breed)
    .then(arr => (refs.catEl.innerHTML = createCatImg(arr)))
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function createMarcup(breedsArr) {
  return breedsArr
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function createCatImg(breed) {
  Loading.remove();
  if (breed.length === 0) {
    throw new Error();
  }
  return breed
    .map(item => {
      const {
        breeds: {
          [0]: { description, name, temperament },
        },
      } = item;

      return `<img class="cat-photo" src="${item.url}" alt="${name}" width="300">
      <div class="cat-conteiner">
      <h1 class="cat-name">${name}</h1>
      <p class="cat-description"> 
       ${description}</p>
      <p class="cat-p-temperament"><span class="cat-temperament">Temperament: </span> ${temperament}</span</p>
      </div>
      `;
    })
    .join('');
}