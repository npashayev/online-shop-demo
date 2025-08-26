import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './user-basket.module.scss'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import CartDropdown from './CartDropdown'
import { useState } from 'react'


const UserBasket = () => {

    const [isDropdownActive, setIsDropdownActive] = useState(false)

    return (
        <div className={styles.main}>

            <FontAwesomeIcon icon={faCartShopping} className={styles.basketIcon} onClick={() => setIsDropdownActive(prev => !prev)} />

            {
                isDropdownActive &&
                <CartDropdown />
            }
        </div>
    )
}

export default UserBasket