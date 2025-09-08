import { Link } from 'react-router-dom'
import styles from './product-actions.module.scss'
import RoleOnly from './RoleOnly'

const AddProductAction = () => {
    return (
        <div className={styles.buttonsCnr}>
            <RoleOnly roles={["admin", "moderator"]}>
                <Link
                    to={'/products/add-product'}
                    className={`${styles.addBtn} ${styles.button}`}
                >
                    Add new product
                </Link>
            </RoleOnly>
        </div >
    )
}

export default AddProductAction