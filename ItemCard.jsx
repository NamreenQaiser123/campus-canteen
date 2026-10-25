
import { Link } from "react-router-dom";

function ItemCard({
  item,
  onAddToCart,
  isFavourite,
  onToggleFavourite,
}) {
  return (
    <article className="item-card">
      <img src={item.image} alt={item.name} />

      <h2>{item.name}</h2>
      <p>{item.category}</p>
      <p>{item.description}</p>

      <strong>Rs. {item.price}</strong>

      <br />
      <br />

      <button onClick={() => onToggleFavourite(item.id)}>
        {isFavourite ? "❤️ Favourite" : "♡ Add to Favourite"}
      </button>

      <br />
      <br />

      <Link to={`/item/${item.id}`}>View Details</Link>

      <br />
      <br />

      <button onClick={() => onAddToCart(item)}>
        Add to Cart
      </button>
    </article>
  );
}

export default ItemCard;
