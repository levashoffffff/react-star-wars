import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getApiResource } from '@utils/network';
import { getImg } from '@utils/network';
import { API_PERSON } from '@constants/api';
import { URL_IMG_PERSON } from '@constants/api';
import { withErrorApi } from '@hoc-helper/withErrorApi';
import PersonInfo from '@components/PersonPage/PersonInfo';
import PersonPhoto from '@components/PersonPage/PersonPhoto';
import PersonLinkBack from '@components/PersonPage/PersonLinkBack';
import PersonFilms from '@components/PersonPage/PersonFilms';
import styles from './PersonPage.module.css';

const PersonPage = ({ setErrorApi }) => {
    const { id } = useParams();
    const [personInfo, setPersonInfo] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personFilms, setPersonFilms] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await getApiResource(`${API_PERSON}/${id}`);
            const photos = await getImg(URL_IMG_PERSON);

            if (res && photos) {

                const foundPhotos = photos.find(item => Number(item.id) === Number(id));

                if (foundPhotos?.image) {
                    setPersonPhoto(foundPhotos.image);
                }

                setPersonInfo([
                    { title: 'Height', data: res.height },
                    { title: 'Mass', data: res.mass },
                    { title: 'Hair Color', data: res.hair_color },
                    { title: 'Skin Color', data: res.skin_color },
                    { title: 'Eye Color', data: res.eye_color },
                    { title: 'Birth year', data: res.birth_year },
                    { title: 'Gender', data: res.gender }
                ]);

                setPersonName(res.name);

                res.films.length && setPersonFilms(res.films);

                setErrorApi(false);
            } else {
                setErrorApi(true);
            }

        })();
    }, [id]);

    return (
        <>
            <PersonLinkBack/>

            <div className={styles.wrapper}>
                <span className={styles.person__name}>{personName}</span>
                <div className={styles.container}>
                    <PersonPhoto personPhoto={personPhoto} personName={personName} />

                    {personInfo && <PersonInfo personInfo={personInfo} />}

                    {personFilms && <PersonFilms personFilms={personFilms} />}
                </div>
            </div>
        </>
    )
}

export default withErrorApi(PersonPage);