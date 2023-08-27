import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const BASIC_URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreed() {
  return fetch(`https://api.thecatapi.com/v1/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    
}

export function fetchCatByBreed(breedId) {
  const searchParams = new URLSearchParams({
    breed_ids: breedId,
    api_key:
      'live_zzXGFBFaTjkfcwOWYYWyaHOeOpRJJqLoMXtJ8RGqqPPSDNUiwFgQoUBaPrLoJLrf',
  });
  return fetch(`${BASIC_URL}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    
    ;
}