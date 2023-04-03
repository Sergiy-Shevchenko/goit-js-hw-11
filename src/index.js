
//----------------import-modules----------------------
import createGallaryCards from './templates/gallery-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { JSONPlaceholderAPI } from './js/jsonlpaceholder-api';

const searchFormEl = document.querySelector('.search-form');
const searchInputEl = document.querySelector('input[type="text"]');
const loadMoreBtnEl = document.querySelector('.load-more');
const gallaryListEl = document.querySelector('.gallery');

const jsonplaceholderApi = new JSONPlaceholderAPI();

// const handleSearchFormSubmit = (event) => {
//     event.preventDefault();

//     if (searchInputEl.value === '') {
//         return;
//     }
       
//     jsonplaceholderApi.query =searchInputEl.value.trim();
//     jsonplaceholderApi
//     .fetchGallary()
//     .then((data) => {
//         console.log(data);

//         if (data.totalHits === 0) {
//             Notify.warning('Sorry, there are no images matching your search query. Please try again.')
//         }
        
//         gallaryListEl.innerHTML = createGallaryCards(data.hits);

//         if (data.totalHits === jsonplaceholderApi.page || data.totalHits === 0) {
//             loadMoreBtnEl.classList.add('is-hidden');
//             return;
//         }

//         loadMoreBtnEl.classList.remove('is-hidden');

//         searchInputEl.value ='';
//     })
//     .catch(err => {
//         console.log(err);
//     })
// };

// const handleLoadMoreBtnClick = () => {
//     jsonplaceholderApi.page += 1

//     jsonplaceholderApi.fetchGallary().then(data => {
//         console.log(data);

//         gallaryListEl.insertAdjacentHTML('beforeend', createGallaryCards(data.hits))
//     })
//     .catch(err => {
//         console.warn(err);
//     })
// }

//------------------axios--------------------------
const handleSearchFormSubmit = async event => {
    event.preventDefault();

    if (searchInputEl.value === '') {
        return;
    }
       
    jsonplaceholderApi.query =searchInputEl.value.trim();
    //console.log(data);

    try {
       const { data } = await  jsonplaceholderApi
    .fetchGallary()

        if (data.totalHits === 0) {
            Notify.warning('Sorry, there are no images matching your search query. Please try again.')
        }
            gallaryListEl.innerHTML = createGallaryCards(data.hits);

        if (data.totalHits < 40 || data.totalHits === 0) {
            loadMoreBtnEl.classList.add('is-hidden');
            console.log({data});
            return;
        }

        loadMoreBtnEl.classList.remove('is-hidden');

        searchInputEl.value ='';

        console.log({data});

        lightbox.refresh();
   

    } catch (err)  {
        console.log(err);
    }
};

const handleLoadMoreBtnClick = async () => {
    jsonplaceholderApi.page += 1

    try {
        const { data } = await jsonplaceholderApi
        .fetchGallary()

        gallaryListEl.insertAdjacentHTML('beforeend', createGallaryCards(data.hits));
        console.log({data})        
    } catch (err)  {    
        Notify.failure(`We're sorry, but you've reached the end of search results.`)    
        console.log(err);    
    }
}

const lightbox = new SimpleLightbox('.gallery a', {});

function handleGallery(event) {
    if (event.target.nodeName === 'IMG') {
      lightbox.on('show.simplelightbox');
    }
  }

//-----------------------------addEventListener-------------------

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
gallaryListEl.addEventListener('click', handleGallery);

