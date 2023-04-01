export class JSONPlaceholderAPI {
    #BASE_URL = 'https://pixabay.com/api';
    #API_KEY = '34892278-814f9e10ef5118b0e5ee7c1d3';

    query = null;
    page = 1;
    count = 40;

    
    fetchGallary() {
        // const searchParams = new URLSearchParams({
        //    q: yellow+flowers,
        //    image_type: photo,
        //    orientation: horizontal,
        //    per_page: this.count,
        //    page: this.page,
        // })    

        return fetch(`${this.#BASE_URL}/?key=${this.#API_KEY}&q=${this.query}&image_type=photo
        &orientation=horizontal&safesearch=true&per_page=${this.count}&page=${this.page}`)
        .then
        (res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        
        })
    


    }
}

// `${this.#BASE_URL}/?key=${this.#API_KEY}&q=yellow+flowers&image_type=photo
//         &orientation=horizontal&safesearch=true&per_page=${this.count}&page=${this.page}`
