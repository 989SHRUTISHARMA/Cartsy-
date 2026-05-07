import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { toggleWishlist } from "../features/WishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist?.items || []);
  const cartItems = useSelector((state) => state.cart.items);

  const INR_RATE = 83;

  // 🔥 FIX 1: try state first
  let product = location.state?.product;

  // 🔥 FIX 2: fallback from localStorage (IMPORTANT)
  const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

  if (!product) {
    product = storedProducts.find((p) => p.id === id);
  }

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Product not found 😢</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const isInWishlist = wishlist.some((i) => i.id === product.id);
  const isInCart = cartItems.some((i) => i.id === product.id);

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-container">
        <div className="image-section">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="info-section">
          <h2>{product.title}</h2>

          <p className="price">
            ₹{(product.price * INR_RATE).toFixed(0)}
          </p>

          <p className="desc">
            Premium quality product available at best price.
          </p>

          <div className="buttons">
            <button
              className="wishlist-btn"
              onClick={() => dispatch(toggleWishlist(product))}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />} Wishlist
            </button>

            <button
              className="cart-btn"
              onClick={() => {
                if (isInCart) navigate("/cart");
                else {
                  dispatch(addToCart(product));
                  toast.success("Added to Cart 🛒");
                }
              }}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}