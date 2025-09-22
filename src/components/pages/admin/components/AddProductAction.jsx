import { Link } from 'react-router-dom'
import styles from './product-actions.module.scss'
import RoleOnly from './RoleOnly'

const AddProductAction = () => {
    return (
        <RoleOnly roles={["admin", "moderator"]}>
            <div className={styles.buttonsCnr}>
                <Link
                    to={'/products/add-product'}
                    className={`${styles.addBtn} ${styles.button}`}
                >
                    New product
                </Link>
            </div >
        </RoleOnly>
    )
}

export default AddProductAction