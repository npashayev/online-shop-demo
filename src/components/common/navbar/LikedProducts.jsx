import React from 'react'
import styles from './liked-products.module.scss'
import { useSelector } from 'react-redux'
import LikedProductItem from './LikedProductItem'

const LikedProducts = () => {

    const likedProducts = useSelector(state =>
        state.likedProducts.allIds.map(id => state.likedProducts.byId[id]))
    console.log(likedProducts);

    return (
        <div className={styles.main}>
            {
                likedProducts.map(product => <LikedProductItem
                    key={product.id}
                    product={product}
                />)
            }
        </div>
    )
}

export default LikedProducts