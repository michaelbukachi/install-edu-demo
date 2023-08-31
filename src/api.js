import axios from "axios";

export async function searchMovies(searchQuery, page = 1) {
    const url = 'https://www.omdbapi.com/'
    try {
        return await axios.get(url, {
            params: {
                s: searchQuery,
                type: 'movie',
                apikey: process.env['REACT_APP_API_KEY'],
                page: page
            }
        })
    } catch (e) {
        console.error(e)
        return null
    }

}
