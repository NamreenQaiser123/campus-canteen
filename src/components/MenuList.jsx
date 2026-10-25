
import ItemCard from "./ItemCard";

function MenuList({
  items,
  onAddToCart,
  favouriteIds,
  onToggleFavourite,
}) {
  if (items.length === 0) {
    return <p>No food items found.</p>;
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
          isFavourite={favouriteIds.includes(item.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}

export default MenuList;
