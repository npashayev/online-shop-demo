import styles from './filter-bar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const FilterBar = ({ url, setUrl, params, setParams }) => {

    const [searchText, setSearchText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchText.length == 0) {
            setUrl('/products')
            return
        }
        setUrl('/products/search')
        setParams({ ...params, q: searchText });
    }

    return (
        <div className={styles.main}>
            <div className={styles.selectCnr}>
                <select name="sorter" className={styles.selector}>
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
                <input type="text" value={searchText} className={styles.searchBar} onChange={(e) => setSearchText(e.target.value)} />
                <button type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                </button>
            </form>
        </div>
    )
}

export default FilterBar;