import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;

    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {loading && (
          <p className="message">
            Loading...
          </p>
        )}

        {error && (
          <p className="message error">
            Failed to load products.
          </p>
        )}

        {!loading && !error && (
          <ProductList products={filteredProducts} />
        )}
      </main>
    </div>
  );
}

export default App;