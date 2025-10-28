import styles from "./toast.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from "react-swipeable";


const Toast = ({ message, isSuccess, closeToast = null }) => {

    const swipeHandlers = useSwipeable({
        onSwipedUp: () => closeToast?.()
    });

    const icon = isSuccess ? faCircleCheck : faCircleExclamation;
    const backgroundColor = isSuccess ? '#388e3c' : '#f44336';
    return (
        <div
            className={styles.toast}
            style={{ backgroundColor }}
            {...swipeHandlers}
        >
            <p>{message}</p>
            {
                <FontAwesomeIcon className={styles.icon} icon={icon} />
            }
        </div>
    )
}

export default Toast;