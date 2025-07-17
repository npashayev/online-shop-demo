import styles from './filter-bar.module.scss'
import { useEffect, useState } from 'react'

const FilterBar = ({ setProducts, originalProducts }) => {
    const [sortBy, setSortBy] = useState('')


    useEffect(() => {
        sortProducts()
    }, [sortBy])

    const sortProducts = () => {
        if (!sortBy) return;

        if (sortBy === "default") {
            setProducts(originalProducts);
            setSortBy("")
            return;
        }

        const sorted = [...originalProducts]
        switch (sortBy) {
            case "title-asc":
                sorted.sort((a, b) => a.title.localeCompare(b.title))
                break

            case "title-desc":
                sorted.sort((a, b) => b.title.localeCompare(a.title))
                break

            case "price-asc":
                sorted.sort((a, b) => a.price - b.price)
                break

            case "price-desc":
                sorted.sort((a, b) => b.price - a.price)
                break

            case "rating-asc":
                sorted.sort((a, b) => a.rating - b.rating)
                break

            case "rating-desc":
                sorted.sort((a, b) => b.rating - a.rating)
                break

            default:
                break
        }

        setProducts(sorted)
    }


    return (
        originalProducts.length !== 0 &&
        <div className={styles.main}>
            <select name="sorter" value={sortBy} className={styles.selector} onChange={(e) => setSortBy(e.target.value)}>
                <option value="" disabled>Sort by</option>
                <option value="default">Default</option>
                <option value="title-asc">Title Ascending</option>
                <option value="title-desc">Title Descending</option>
                <option value="price-asc">Price Ascending</option>
                <option value="price-desc">Price Descending</option>
                <option value="rating-asc">Rating Ascending</option>
                <option value="rating-desc">Rating Descending</option>
            </select>
        </div>
    )
}

export default FilterBar