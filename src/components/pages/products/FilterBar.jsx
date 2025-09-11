import styles from './filter-bar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddProductAction from '../admin/components/AddProductAction';
import Select from 'react-select'

const options = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price Ascending' },
    { value: 'price-desc', label: 'Price Descending' },
    { value: 'rating-asc', label: 'Rating Ascending' },
    { value: 'rating-desc', label: 'Rating Descending' },
]

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: "200px",
        cursor: "pointer"
    })
};

const FilterBar = ({ showSearchbar = true }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        setSearchText(searchParams.get('q') || '')
    }, [searchParams])

    const selectorValue = searchParams.get('sortBy') && searchParams.get('order')
        ? `${searchParams.get('sortBy')}-${searchParams.get('order')}`
        : 'default'

    const selectedOption = options.find(opt => opt.value === selectorValue);

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

    const handleOptionChange = (selectedOption) => {
        const { value } = selectedOption;

        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)

            if (value == "default") {
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
            <Select
                options={options}
                isSearchable={false}
                value={selectedOption}
                onChange={handleOptionChange}
                styles={customStyles}
            />

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