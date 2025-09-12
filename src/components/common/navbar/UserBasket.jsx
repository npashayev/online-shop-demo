import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './user-basket.module.scss'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const UserBasket = ({ user, setIsMenuOpen }) => {

    return (
        <Link
            to={`/${user.id}/carts`}
            onClick={() => setIsMenuOpen(false)}
            className={styles.main}>
            <FontAwesomeIcon icon={faCartShopping} className={styles.basketIcon} />
        </Link>
    )
}

export default UserBasket