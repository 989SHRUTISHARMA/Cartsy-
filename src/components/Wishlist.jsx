import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../features/WishlistSlice";
import { addToCart } from "../features/CartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="wishlist-container">

      {/* TITLE */}
      <h2 className="wishlist-title">Your Wishlist ❤️</h2>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="empty-text">
          ❤️ Your wishlist is empty
          <br />
          Start adding products you love!

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            🛍 Continue Browsing
          </button>
        </div>
      )}

      {/* LIST ITEMS */}
      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">

          {/* IMAGE (CLICK → PRODUCT PAGE) */}
          <img
            src={item.image}
            alt={item.title}
            onClick={() =>
              navigate(`/product/${item.id}`, {
                state: { product: item },
              })
            }
            style={{ cursor: "pointer" }}
          />

          {/* DETAILS */}
          <div className="wishlist-details">
            <h4>{item.title}</h4>
            <p>₹{(item.price * 83).toFixed(0)}</p>
          </div>

          {/* ACTIONS */}
          <div className="wishlist-actions">

            {/* VIEW PRODUCT */}
            <button
              className="view-btn"
              onClick={() =>
                navigate(`/product/${item.id}`, {
                  state: { product: item },
                })
              }
            >
              View Product
            </button>

            {/* ADD TO CART */}
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

            {/* REMOVE */}
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