
//----------------import-modules----------------------
import createGallaryCards from './templates/gallery-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

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
    

    try {
       const { data } = await   jsonplaceholderApi
    .fetchGallary()

        if (data.totalHits === 0) {
            Notify.warning('Sorry, there are no images matching your search query. Please try again.')
        }
            gallaryListEl.innerHTML = createGallaryCards(data.hits);

        if (data.totalHits === jsonplaceholderApi.page || data.totalHits === 0) {
            loadMoreBtnEl.classList.add('is-hidden');
            return;
        }

        loadMoreBtnEl.classList.remove('is-hidden');

        searchInputEl.value ='';

    } catch (err)  {
        console.log(err);
    }
};

const handleLoadMoreBtnClick = async () => {
    jsonplaceholderApi.page += 1

    try {
        const { data } = jsonplaceholderApi.fetchGallary()
        gallaryListEl.insertAdjacentHTML('beforeend', createGallaryCards(data.hits))

    } catch (err)  {
        console.log(err);    
    }
}

//-----------------------------addEventListener-------------------

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

