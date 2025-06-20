//Для хранения состояния и выполнения запроса
import { useState, useEffect } from 'react';
import { getApiResource, getImg } from '../../utils/network';
//Подключили константу в которой содержится путь
import { API_PEOPLE, URL_IMG_PERSON } from '../../constants/api';
//Подулючили функциб получения id из URL
import { getPeopleId } from '../../services/getPeopleData';
//Подгрузили компоненту PeopleList
import PeopleList from '../../components/PeoplePage/PeopleList';
//HOC для обработки ошибок с сервера
import { withErrorApi } from '../../hoc-helper/withErrorApi';

import styles from './PeoplePage.module.css';

const PeoplePage = ({ setErrorApi }) => {
    //Локальный стате для хранения персонажей
    const [people, setPeople] = useState(null);


    /*     const getResource = async (url) => {
            
            const res = await getApiResource(url);
    
            const peopleList = res.map(({ name, url }) => {
    
                const id = getPeopleId(url);
                const img = getPeopleImage(id);
                console.log(id);
                return {
                    id: id,
                    name: name,
                    img: img
                }
            })
    
            setPeople(peopleList);
    
        } */

    const getResource = async (url1, url2) => {
        //Вызываем функцию запроса на сервер №1 за получением всех персонажей
        const res1 = await getApiResource(url1);
        //Вызываем функцию запроса на сервер №2 за получением картинок к этим персонажам
        const res2 = await getImg(url2);

        if (res1 && res2) {
            //Перебираем массив данных с сервера №2 и сохраняем в переменную только параметр image
            const imgList = res2.map(({ image }) => {
                return {
                    img: image
                }
            });

            //Затем сократим длину массив с сервера №2 чтобы совпадала с сервера №1
            const imgListResult = imgList.filter((el, index, arr) => {
                return index < 82;
            })

            //Объединяем массив объектов с сервера №1 и с сервера №2
            const mergedObj = res1.map((obj, index) => ({
                ...obj,
                ...imgListResult[index]
            }));

            //Необходимо из массива достать только имя и url
            /* const peopleList = res.map((element) => {
                console.log(element.name, element.url);
            }) */

            //Альтернативная запись с деструктуризацией. Необходимо из массива достать только name, url и уже преобретенный в результате объединения img
            const peopleList = mergedObj.map(({ name, url, img }) => {

                //Вызываем функцию, которая из url адреса вычленяет его идентификатор
                const id = getPeopleId(url);

                return {
                    id: id,
                    name: name,
                    img: img
                }
            })

            setPeople(peopleList);
            setErrorApi(false);
        } else {
            setErrorApi(true);
        }

    }


    //Аналог componentDidMount. Поместили функцию и передали параметр.
    useEffect(() => {
        getResource(API_PEOPLE, URL_IMG_PERSON);
    }, []);

    return (
        <>
            {people && <PeopleList people={people} />}
        </>
    )
}

export default withErrorApi(PeoplePage);