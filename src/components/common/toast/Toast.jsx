import styles from "./toast.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'


const Toast = ({ message, isSuccess = true }) => {

    const icon = isSuccess ? faCircleCheck : faCircleExclamation;
    const backgroundColor = isSuccess ? '#388e3c' : '#f44336';
    return (
        <div className={styles.toast} style={{ backgroundColor }}>
            <p>{message}</p>
            {
                <FontAwesomeIcon className={styles.icon} icon={icon} />
            }
        </div>
    )
}

export default Toast