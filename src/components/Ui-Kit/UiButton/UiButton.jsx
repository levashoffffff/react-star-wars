import styles from './UiButton.module.css';

const UiButton = ({text, handlePageChange, currentPage, totalPages, theme='light'}) => {
    return (
        <button
            className={styles.button}
            disabled={text === 'Previous' ? (currentPage === 1) : (currentPage === totalPages)}
            onClick={() => handlePageChange(text === 'Previous' ? (currentPage - 1) : (currentPage + 1))}
        >
            {text}
        </button>
    )
}

export default UiButton;