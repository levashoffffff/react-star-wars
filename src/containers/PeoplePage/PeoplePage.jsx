//Для хранения состояния и выполнения запроса
import { useState, useEffect } from 'react';
import { getApiResource } from '../../utils/network';
//Подключили константу в которой содержится путь
import { API_PEOPLE } from '../../constants/api';
import styles from './PeoplePage.module.css';

const PeoplePage = () => {
    //Локальный стате для хранения состояния
    const [people, setPeople] = useState(null);

    const getResource = async (url) => {
        //Вызываем функцию запроса на сервер
        const res = await getApiResource(url);

        //Необходимо из массива достать только имя и url
        /* const peopleList = res.map((element) => {
            console.log(element.name, element.url);
        }) */
        //Альтернативная запись с деструктуризацией. Необходимо из массива достать только имя и url
        const peopleList = res.map(({ name, url }) => {
            return {
                name: name,
                url: url
            }
        })

        setPeople(peopleList);

    }

    //Аналог componentDidMount. Поместили функцию и передали параметр.
    useEffect(() => {
        getResource(API_PEOPLE);
    }, []);

    return (
        <>
            {people && (
                <ul>
                    {people.map(({ name, url }) => {
                        <li>{name}</li>
                    })}
                </ul>
            )}

        </>
    )
}

export default PeoplePage;