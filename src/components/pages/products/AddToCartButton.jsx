import React from 'react'
import styles from './add-cart.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'contexts/ToastContext';
import { addProduct, isProductExist } from 'store/cartSlice';

const AddToCartButton = ({ product, children, className }) => {
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
        showToast("Product successfully added to your cart")
    }

    return (
        <button
            className={`${styles.addCartBtn} ${className}`}
            onClick={handleAddToCart}
        >
            {children}
        </button>
    )
}

export default AddToCartButton;