import axios from './axios';

const getTwentyMovies = async () => {
    return axios.get('https://bitbox-project.herokuapp.com/movies?page=1&size=20&sort=ticketRatio,desc')
        .then(response => response.data);
};
export { getTwentyMovies };
