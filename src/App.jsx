
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import ItemDetails from "./pages/ItemDetails";
import CartPage from "./pages/CartPage";
import { useCart } from "./context/CartContext.jsx";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favouriteIds, setFavouriteIds] = useState([]);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/menu.json");

        if (!response.ok) {
          throw new Error("Menu file could not be loaded.");
        }

        const data = await response.json();
        setMenu(data);
      } catch (err) {
        setError("Menu load nahi hua. Please check public/menu.json.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  function toggleFavourite(id) {
    setFavouriteIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  const categories = [
    "All",
    ...new Set(menu.map((item) => item.category)),
  ];

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <h1>Welcome to Campus Canteen!</h1>
      <p>Fresh food, student-friendly prices.</p>

      <section id="menu">
        <h2>Today's Menu</h2>

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {loading && <p>Loading menu...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <MenuList
            items={filteredMenu}
            onAddToCart={addToCart}
            favouriteIds={favouriteIds}
            onToggleFavourite={toggleFavourite}
          />
        )}
      </section>

      <Cart items={cart} />
    </main>
  );
}

function App() {
  const { cartCount } = useCart();

  return (
    <BrowserRouter>
      <header className="site-header">
        <Link to="/">Campus Canteen</Link>

        <nav>
          <Link to="/">Today's Menu</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
