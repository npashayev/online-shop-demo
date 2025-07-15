import { useEffect, useState, useRef } from "react";
import { getAllProducts } from "../../services/productService";
import styles from "./products.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const skipRef = useRef(0);

  useEffect(() => {
    fetchProducts(skipRef.current);
  }, []);

  const fetchProducts = async (skipValue) => {
    if (loading) return

    setLoading(true);
    const res = await getAllProducts(skipValue);
    if (res.success) {
      setProducts((prev) => [...prev, ...res.data]);
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <main>
      <div className={styles.productsContainer}>
        {products.length !== 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.product}>
              <div className={styles.imageContainer}>
                <img
                  src={product.images[0]}
                  className={styles.image}
                  alt={product.title}
                />
              </div>
              <div className={styles.info}>
                <p className={styles.title}>{product.title}</p>
                <p className={styles.price}>{product.price}$</p>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No product found</p>
        )}
      </div>

      <button
        disabled={loading}
        onClick={() => {
          skipRef.current += 60;
          fetchProducts(skipRef.current);
          console.log(skipRef.current)
        }}
      >
        {
          loading
            ? <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
            : <span>Load More...</span>
        }
      </button>
    </main>
  );
};

export default Products;
