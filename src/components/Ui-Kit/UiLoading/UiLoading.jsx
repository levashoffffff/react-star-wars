import{ useState, useEffect } from 'react';
import loaderWhite from './img/loader-white.svg';
import loaderBlack from './img/loader-black.svg';
import loaderBlue from './img/loader-blue.svg';
import cn from 'classnames';
import styles from './UiLoading.module.css';

const UiLoading = ({theme='white', isShadow=true, classes}) => {
    const [loaderIcon, setLoaderIcon] = useState(null);

    useEffect(() => {
        switch(theme) {
            case 'black': setLoaderIcon(loaderBlack);
                break;
            case 'white': setLoaderIcon(loaderWhite);
                break;
            case 'blue': setLoaderIcon(loaderBlue);
                break;
            default: setLoaderIcon(loaderWhite);
                break;
        }
    }, []);
  return (
    <img 
        className={cn(styles.loader, isShadow && styles.shadow, classes)}
        src={loaderIcon}
        alt="Loader"
    />
  )
}

export default UiLoading;