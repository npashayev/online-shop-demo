import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './loading.module.scss'

const Loading = ({ style }) => {
    return <div style={style} className={styles.loadingCnr}>
        <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
    </div>
}

export default Loading;