/* const SWAPI_ROOT = 'https://swapi.info/api/';
const SWAPI_PEOPLE = 'people'; */

//fetch запрос

/* export const getApiResource = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(body => console.log(body))  
        .catch(error => console.log(error.message))  
} */

//Запрос на сервер №1 за персонажами. Переписали на асинхронную функцию
export const getApiResource = async (url) => {
    //Для перехвата ошибки
    try {
        //Запрашиваем данные через fetch
        const res = await fetch(url);
        //Если res = false. Проверка на ошибку 404
        if (!res.ok) {
            //Выводим в консоль данные
            console.error('Could not fetch.', res.status);
            //Возвращаем false
            return false;
        }
        //Если будут ошибки, то к этому блоку не дойдем
        const body = await res.json();
        return body;
        //Если другие ошибки, то срабатывает блок catch
    } catch (error) {
        console.error('Could not fetch.', error.message);
        return false;
    }
}

//Запрос на сервер №2 за картинками к этим персонажам
export const getImg = async (url) => {
    //Для перехвата ошибки
    try {
        //Запрашиваем данные через fetch
        const res = await fetch(url);
        //Если res = false. Проверка на ошибку 404
        if (!res.ok) {
            //Выводим в консоль данные
            console.error('Could not fetch.', res.status);
            //Возвращаем false
            return false;
        }
        //Если будут ошибки, то к этому блоку не дойдем
        const body = await res.json();
        return body;
        //Если другие ошибки, то срабатывает блок catch
    } catch (error) {
        console.error('Could not fetch.', error.message);
        return false;
    }
}

//Функция возвращает данные в виде промиса или false
/* getApiResource(SWAPI_ROOT + SWAPI_PEOPLE)
    .then(body => console.log(body)) */

//Асинхронная самовызывающаяся функция. ВЫЗОВ ФУНКЦИИ
/* (async () => {
    const body = await getApiResource(SWAPI_ROOT + SWAPI_PEOPLE);
    console.log(body);
})(); */

