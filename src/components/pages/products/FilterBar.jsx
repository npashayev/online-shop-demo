import styles from './filter-bar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddProductAction from '../admin/components/AddProductAction';

const FilterBar = ({ showSearchbar = true }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setSearchText(searchParams.get('q') || '')
    }, [searchParams])

    const selectorValue = searchParams.get('sortBy') && searchParams.get('order')
        ? `${searchParams.get('sortBy')}-${searchParams.get('order')}`
        : ''


    const handleSearch = (e) => {
        e.preventDefault();

        const trimmed = searchText.trim();

        if (!trimmed) {
            navigate('/products')
            return
        }

        const newParams = new URLSearchParams(searchParams);
        newParams.set('q', trimmed);
        navigate(`/products/search?${newParams.toString()}`)
    }

    const handleOptionChange = (e) => {
        const value = e.target.value;

        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)

            if (!value) {
                newParams.delete('sortBy')
                newParams.delete('order')
            } else {
                const [sortBy, order] = value.split('-')
                newParams.set('sortBy', sortBy)
                newParams.set('order', order)
            }
            return newParams
        })
    }

    return (
        <div className={styles.main}>
            <div className={styles.selectCnr}>
                <select
                    name="sorter"
                    value={selectorValue}
                    className={styles.selector}
                    onChange={handleOptionChange}
                >
                    <option value="">Default</option>
                    <option value="price-asc">Price Ascending</option>
                    <option value="price-desc">Price Descending</option>
                    <option value="rating-asc">Rating Ascending</option>
                    <option value="rating-desc">Rating Descending</option>
                </select>
                <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </div>

            <div className={styles.right}>
                {
                    showSearchbar &&
                    <form onSubmit={handleSearch} className={styles.form}>
                        <input
                            type="text"
                            value={searchText}
                            className={styles.searchBar}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder='Search for products...'
                        />
                        <button type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                        </button>
                    </form>
                }

                <AddProductAction />
            </div>
        </div>
    )
}

export default FilterBar;