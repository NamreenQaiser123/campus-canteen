
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadItem() {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();

        const selectedItem = data.find(
          (food) => String(food.id) === id
        );

        setItem(selectedItem || null);
      } catch (error) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) return <main><p>Loading item...</p></main>;

  if (!item) {
    return (
      <main>
        <h1>Item not found</h1>
        <Link to="/">Back to Menu</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/">← Back to Menu</Link>

      <article className="item-card">
        <img src={item.image} alt={item.name} />
        <h1>{item.name}</h1>
        <p>{item.category}</p>
        <p>{item.description}</p>
        <h3>Rs. {item.price}</h3>

        <button onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      </article>
    </main>
  );
}

export default ItemDetails;
