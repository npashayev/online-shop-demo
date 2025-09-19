import React from 'react'
import styles from './add-cart.module.scss'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'contexts/ToastContext';
import { addProduct, isProductExist } from 'store/cartSlice';

const AddToCartButton = ({ product, style }) => {

    const { showToast } = useToast();
    const dispatch = useDispatch();
    const exists = useSelector(state => isProductExist(state, product))

    const handleAddToCart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (exists) {
            showToast("This product is already added to this cart!", false);
            return;
        }

        dispatch(addProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            discountPercentage: product.discountPercentage,
            thumbnail: product.thumbnail
        }))
        showToast("Product added to the cart!")
    }

    return (
        <button
            className={styles.addCartBtn}
            style={style}
            onClick={handleAddToCart}
        >
            <FontAwesomeIcon icon={faCartShopping} className={styles.basketIcon} />
            Add to cart
        </button>
    )
}

export default AddToCartButton;