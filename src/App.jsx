import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./components/products/Products";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
