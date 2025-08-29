import styles from './carts.module.scss'

const CartsPageHeader = ({ cartsData, handleAddNewUserCart }) => {


    return (
        <div className={styles.mainHeading}>
            <div className={styles.headingText}>You have {cartsData?.carts?.length} carts in your basket</div>
            <button
                onClick={() => handleAddNewUserCart()}
                className={styles.addCartBtn}
            >
                Add a new cart
            </button>
        </div>
    )
}

export default CartsPageHeader