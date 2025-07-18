import { useEffect, useRef, useState } from "react";
import { getAllProducts } from "../../services/productService";
import styles from "./products.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FilterBar from "./FilterBar";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [order, setOrder] = useState("")
  const [input, setInput] = useState("")
  const [skipValue, setSkipValue] = useState(0)


  useEffect(() => {
    fetchProducts(skipValue, sortBy, order, input);
    console.log("Fetched", skipValue)
  }, [order, sortBy, skipValue]);

  const fetchProducts = async (skipValue, sortBy, order, input) => {
    setLoading(true);
    setError("")
    const { success, data } = await getAllProducts(skipValue, sortBy, order, input);
    if (!success) {
      setError("Error while fetching products")
    }
    setProducts(prev => [...prev, ...data]);
    setLoading(false);
  };


  return (
    <main>
      <FilterBar
        products={products}
        setProducts={setProducts}
        setOrder={setOrder}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setSkipValue={setSkipValue}
        fetchProducts={fetchProducts}
        input={input}
        setInput={setInput}
        skipValue={skipValue}
      />

      <div className={styles.productsCnr}>
        {products.length !== 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.product}>
              <p className={styles.brand}>{product.brand}</p>
              <div className={styles.discountPercentage}>-{product.discountPercentage.toFixed(0)}%</div>
              <div className={styles.imageCnr}>
                <img
                  src={product.images[0]}
                  className={styles.image}
                  alt={product.title}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.titleCnr}>
                  <p className={styles.title}>{product.title}</p>
                  <div className={styles.ratingCnr}>
                    <div className={styles.rating}>{(product.rating).toFixed(1)}</div>
                    <div className={styles.starsCnr} style={{ width: `${(Number(product.rating.toFixed(1)) / 5) * 60}px` }}>
                      <img src="/src/assets/star.png" alt="" className={styles.star} />
                      <img src="/src/assets/star.png" alt="" className={styles.star} />
                      <img src="/src/assets/star.png" alt="" className={styles.star} />
                      <img src="/src/assets/star.png" alt="" className={styles.star} />
                      <img src="/src/assets/star.png" alt="" className={styles.star} />
                    </div>
                  </div>
                </div>

                <div className={styles.priceCnr}>
                  <p className={styles.oldPrice}>{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}$</p>
                  <p className={styles.newPrice}>{product.price}$</p>
                </div>
              </div>


            </div>
          ))
        ) : (
          <p>
            {
              error
                ? error
                : !loading && products.length === 0
                  ? "No products found"
                  : null
            }
          </p>
        )}

        {
          loading && <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
        }
      </div>
      <button onClick={() => setSkipValue(prev => prev + 30)}
      >Load more</button>
    </main >
  );
};

export default Products;
