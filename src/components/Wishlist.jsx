import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../features/WishlistSlice";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Wishlist ❤️</h2>

      {wishlist.length === 0 && <p>No items in wishlist</p>}

      {wishlist.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            borderBottom: "1px solid #ddd",
            padding: "15px 0",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />

          {/* Details */}
          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>₹{(item.price * 83).toFixed(0)}</p>
          </div>

          {/* Remove */}
          <button
            onClick={() => dispatch(toggleWishlist(item))}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}