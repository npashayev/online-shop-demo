import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Products from "./components/products/Products";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
