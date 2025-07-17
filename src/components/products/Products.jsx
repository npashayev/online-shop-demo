import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import styles from "./products.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FilterBar from "./FilterBar";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("")
    const { success, data } = await getAllProducts();
    if (!success) {
      setError("Error while fetching products")
    }
    setProducts(data);
    setOriginalProducts(data)
    setLoading(false);
  };

  return (
    <main>
      <FilterBar products={products} setProducts={setProducts} originalProducts={originalProducts} />

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

    </main>
  );
};

export default Products;
