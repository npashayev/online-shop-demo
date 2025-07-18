import styles from './filter-bar.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'

const FilterBar = ({ skipValue, input, setInput, fetchProducts, order, setOrder, sortBy, setSortBy, products, setProducts, setSkipValue }) => {

    const handleSort = (e) => {
        let arr = e.target.value.split("-");
        setProducts([])
        setSkipValue(0)
        setSortBy(arr[0])
        setOrder(arr[1])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setProducts([])
        fetchProducts(0, sortBy, order, input)
        console.log(skipValue)
    }


    return (
        <div className={styles.main}>
            <div className={styles.selectCnr}>
                <select name="sorter" value={`${sortBy}-${order}`} className={styles.selector} onChange={handleSort}>
                    <option value="sort-by" disabled>Sort by</option>
                    <option value="">Default</option>
                    <option value="title-asc">Title Ascending</option>
                    <option value="title-desc">Title Descending</option>
                    <option value="price-asc">Price Ascending</option>
                    <option value="price-desc">Price Descending</option>
                    <option value="rating-asc">Rating Ascending</option>
                    <option value="rating-desc">Rating Descending</option>
                </select>
                <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" className={styles.searchBar} value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                </button>
            </form>
        </div>
    )
}

export default FilterBar