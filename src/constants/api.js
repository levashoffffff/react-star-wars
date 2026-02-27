//common
export const HTTPS = 'https://';
export const HTTP = 'http://';

//swapi
export const SWAPI_ROOT = 'swapi.info/api/';
export const SWAPI_PEOPLE = 'people';
//Константа для хранения знначений query параметров
export const SWAPI_PARAM_PAGES = '/?page=';

export const API_PEOPLE = HTTPS + SWAPI_ROOT + SWAPI_PEOPLE;
export const API_PERSON = HTTPS + SWAPI_ROOT + SWAPI_PEOPLE;

// visualguide
const GUIDE_ROOT_IMG = "akabab.github.io/starwars-api/api/";
const GUIDE_PEOPLE = "all";
export const GUIDE_IMG_EXTENSION = ".json";

export const URL_IMG_PERSON = HTTPS + GUIDE_ROOT_IMG + GUIDE_PEOPLE + GUIDE_IMG_EXTENSION;