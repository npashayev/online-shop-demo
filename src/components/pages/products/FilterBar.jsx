import styles from './filter-bar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const FilterBar = ({ setUrl, params, setParams }) => {

    const [searchText, setSearchText] = useState('');
    const [selectorValue, setSelectorValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim().length == 0) {
            setParams({ ...params, q: '' });
            setUrl('/products')
            return
        }
        setUrl('/products/search')
        setParams({ ...params, q: searchText });
    }

    const handleOptionChange = (e) => {
        const value = e.target.value
        setSelectorValue(value)

        if (value.length == 0) {
            setParams({ q: searchText })
            return
        }

        const arr = value.split('-');

        setParams({
            ...params,
            sortBy: arr[0],
            order: arr[1]
        })

        console.log(arr)
    }

    return (
        <div className={styles.main}>
            <div className={styles.selectCnr}>
                <select name="sorter" value={selectorValue} className={styles.selector} onChange={handleOptionChange}>
                    <option value="">Default</option>
                    <option value="price-asc">Price Ascending</option>
                    <option value="price-desc">Price Descending</option>
                    <option value="rating-asc">Rating Ascending</option>
                    <option value="rating-desc">Rating Descending</option>
                </select>
                <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" value={searchText} className={styles.searchBar} onChange={(e) => setSearchText(e.target.value)} />
                <button type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                </button>
            </form>
        </div>
    )
}

export default FilterBar;