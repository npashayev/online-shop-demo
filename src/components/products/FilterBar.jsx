import styles from './filter-bar.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'

const FilterBar = ({ products, setProducts, originalProducts }) => {
    const [sortBy, setSortBy] = useState("")
    const [input, setInput] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])


    useEffect(() => {
        sortProducts()
    }, [sortBy, filteredProducts])

    const sortProducts = () => {
        if (!sortBy) return;

        if (sortBy === "default") {
            setProducts(filteredProducts.length != 0 ? filteredProducts : originalProducts);
            setSortBy("")
            return;
        }

        const sorted = [...products]
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

    const searchProduct = (e) => {
        e.preventDefault()

        const foundItems = [...originalProducts].filter(product => (product.title.toLowerCase()).includes(input.toLowerCase()))
        setProducts(foundItems)
        setFilteredProducts(foundItems)
    }

    return (
        originalProducts.length !== 0 &&
        <div className={styles.main}>
            <div className={styles.selectCnr}>
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
                <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </div>

            <form onSubmit={searchProduct}>
                <input type="text" className={styles.searchBar} value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                </button>
            </form>
        </div>
    )
}

export default FilterBar