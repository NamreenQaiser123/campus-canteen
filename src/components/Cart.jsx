
function Cart({ items }) {
  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <section id="cart">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item, index) => (
            <p key={`${item.id}-${index}`}>
              {item.name} — Rs. {item.price}
            </p>
          ))}

          <h3>Total: Rs. {total}</h3>
        </>
      )}
    </section>
  );
}

export default Cart;
