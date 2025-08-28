import styles from './carts.module.scss'

const CartsPageHeader = ({ cartsData }) => {
    return (
        <div className={styles.mainHeading}>
            <div className={styles.headingText}>You have {cartsData.total} carts in your basket</div>
            <button className={styles.addCartBtn}>Add a new cart</button>
        </div>
    )
}

export default CartsPageHeader