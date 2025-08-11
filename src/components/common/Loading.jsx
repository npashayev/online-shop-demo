import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './loading.module.scss'

const Loading = ({ size = '14px' }) => {
    return <FontAwesomeIcon icon={faSpinner} style={{ fontSize: size }} className={styles.spinner} />
}

export default Loading