
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartPage() {
  const { cart, removeFromCart, cartCount, cartTotal } = useCart();

  return (
    <main>
      <h1>Your Shopping Cart</h1>

      <p>Total items: {cartCount}</p>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add something from the menu!</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <article className="item-card" key={`${item.id}-${index}`}>
              <h2>{item.name}</h2>
              <p>Price: Rs. {item.price}</p>

              <button onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </article>
          ))}

          <h2>Total: Rs. {cartTotal}</h2>
        </>
      )}

      <Link to="/">← Back to Menu</Link>
    </main>
  );
}

export default CartPage;
