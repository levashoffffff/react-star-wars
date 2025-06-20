import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';

export const withErrorApi = View => {
    return props => {
        //Локальный state для хранения ошибки, если данные с сервера не пришли. false - все хорошо, true - пришла ошибка
        const [errorApi, setErrorApi] = useState(false);
        return (
            <>
                {errorApi ?
                    <ErrorMessage /> :
                    (
                        <>
                            <View
                                setErrorApi={setErrorApi}
                                {...props}
                            />
                        </>
                    )
                }

            </>
        )
    }
}