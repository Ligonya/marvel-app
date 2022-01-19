import axios from 'axios';
import md5 from 'md5';

/**
 * Service pour récupérer des données provenant de l'API Marvel.
 */
export default class Marvel {
    static HOSTNAME = import.meta.env.VITE_MARVEL_HOSTNAME;
    static PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    static PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

    getRequestParams (otherParams = {}) {
        const timestamp = (new Date()).getTime();

        const params = {
            ts: timestamp,
            apikey: Marvel.PUBLIC_KEY,
            hash: md5(`${timestamp}${Marvel.PRIVATE_KEY}${Marvel.PUBLIC_KEY}`),
            ...otherParams
        };

        return '?'
            + Object.keys(params)
                .map(keyName => `${keyName}=${params[keyName]}`)
                .join('&')
        ;
    }

    getComics () {
        const url = `${Marvel.HOSTNAME}/v1/public/comics${this.getRequestParams()}`;
        return axios.get(url);
    }

    getComic (comic) {
        const url = `${Marvel.HOSTNAME}/v1/public/comics/${comic}${this.getRequestParams()}`;
        return axios.get(url);
    }
}
