import {
    HTTPS, SWAPI_ROOT, SWAPI_PEOPLE, 
} from '../constants/api';

const getId = (url, category) => {
    const id = url.replace(HTTPS + SWAPI_ROOT + category + '/', '');
    return id;
}

//Функция которая получает из url идентификатор
//"url": "https://swapi.info/api/people/1" получаем 1
export const getPeopleId = (url) => {
    return (
        getId(url, SWAPI_PEOPLE)
    );
}

//Функция получения изображения персонажа
//НЕ ПОНАДОБИЛАСЬ Т.К. СЕРВИС РЕДИРЕКТИТ КУДА-ТО
/* export const getPeopleImage = (id) => {
    return (
    `${URL_IMG_PERSON}/${id + GUIDE_IMG_EXTENSION}`
    )
} */

