// Для хранения состояния и выполнения запроса
import { useState, useEffect } from 'react';
import { getApiResource, getImg } from '@utils/network';
// Подключили константу в которой содержится путь
import { API_PEOPLE, URL_IMG_PERSON } from '@constants/api';
// Подключили функцию получения id из URL
import { getPeopleId } from '@services/getPeopleData';
// Подгрузили компоненту PeopleList
import PeopleList from '@components/PeoplePage/PeopleList';
// HOC для обработки ошибок с сервера
import { withErrorApi } from '@hoc-helper/withErrorApi';
// Подключаем библиотеку типов
import PropTypes from 'prop-types';
// Импортируем хук, который получает данные из query параметров
import { useQueryParams } from '@hooks/useQueryParams';
import { useNavigate } from 'react-router-dom'; // Измененный импорт
import styles from './PeoplePage.module.css';

const PeoplePage = ({ setErrorApi }) => {
    const navigate = useNavigate();
    // Локальный стате для хранения персонажей
    const [people, setPeople] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const query = useQueryParams();
    const queryPage = query.get('page');

    // Общее количество страниц
    const totalPages = people ? Math.ceil(people.length / itemsPerPage) : 0;

    // Получаем текущих персонажей для отображения
    const getCurrentPeople = () => {
        if (!people) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        return people.slice(startIndex, startIndex + itemsPerPage);
    };

    const getResource = async (url1, url2) => {
        // Вызываем функцию запроса на сервер №1 за получением всех персонажей
        const res1 = await getApiResource(url1);
        // Вызываем функцию запроса на сервер №2 за получением картинок к этим персонажам
        const res2 = await getImg(url2);

        if (res1 && res2) {
            // Перебираем массив данных с сервера №2 и сохраняем в переменную только параметр image
            const imgList = res2.map(({ image }) => {
                return {
                    img: image
                }
            });

            // Затем сократим длину массив с сервера №2 чтобы совпадала с сервера №1
            const imgListResult = imgList.filter((el, index, arr) => {
                return index < 82;
            })

            // Объединяем массив объектов с сервера №1 и с сервера №2
            const mergedObj = res1.map((obj, index) => ({
                ...obj,
                ...imgListResult[index]
            }));

            // Альтернативная запись с деструктуризацией
            const peopleList = mergedObj.map(({ name, url, img }) => {
                // Вызываем функцию, которая из url адреса вычленяет его идентификатор
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

    // Обработчик изменения страницы
    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`/people?page=${page}`); // Используем navigate вместо history.push
    };

    // Эффект для синхронизации с query параметрами
    useEffect(() => {
        if (queryPage) {
            const page = Number(queryPage);
            if (!isNaN(page) && page > 0) {
                setCurrentPage(page);
            }
        }
    }, [queryPage]);

    // Аналог componentDidMount
    useEffect(() => {
        getResource(API_PEOPLE, URL_IMG_PERSON);
    }, []);

    return (
        <>
            {people && (
                <>
                    <PeopleList people={getCurrentPeople()} />
                    <div className={styles.pagination}>
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .map(page => (
                                <button
                                    key={page}
                                    className={currentPage === page ? styles.active : ''}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))
                        }
                        
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

PeoplePage.propTypes = {
    setErrorApi: PropTypes.func
}

export default withErrorApi(PeoplePage);