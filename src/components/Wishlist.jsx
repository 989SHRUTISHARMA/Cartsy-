import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../features/WishlistSlice";
import { addToCart } from "../features/CartSlice";
import { toast } from "react-toastify";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="wishlist-container">

      <h2 className="wishlist-title">Your Wishlist ❤️</h2>

      {wishlist.length === 0 && (
        <p className="empty-text">No items in wishlist</p>
      )}

      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">

          {/* IMAGE */}
          <img src={item.image} alt={item.title} />

          {/* DETAILS */}
          <div className="wishlist-details">
            <h4>{item.title}</h4>
            <p>₹{(item.price * 83).toFixed(0)}</p>
          </div>

          {/* ACTIONS */}
          <div className="wishlist-actions">

            <button
              className="cart-btn"
              disabled={isInCart(item.id)}
              onClick={() => {
                dispatch(addToCart(item));
                dispatch(toggleWishlist(item));
                toast.success("Added to cart 🛒");
              }}
            >
              {isInCart(item.id) ? "Already in Cart" : "Add to Cart"}
            </button>

            <button
              className="remove-btn"
              onClick={() => {
                dispatch(toggleWishlist(item));
                toast.info("Removed from wishlist");
              }}
            >
              Remove
            </button>

          </div>

        </div>
      ))}
    </div>
  );
}