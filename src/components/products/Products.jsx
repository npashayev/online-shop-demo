import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import styles from "./products.module.scss";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      if (res.success) {
        setProducts(res.data.slice(0, res.data.length - 9));
        console.log(res.data[0]);
      } else {
        alert(res.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      {products.length != 0 &&
        products.map((product) => (
          <div key={product.id} className={styles.product}>
            <img
              src={product.images[0]}
              className={styles.image}
              alt={product.title}
            />

            <div className={styles.info}>
              <p className={styles.title}>{product.title}</p>
              <p className={styles.price}>{product.price}$</p>
            </div>
          </div>
        ))}
    </main>
  );
};

export default Products;
