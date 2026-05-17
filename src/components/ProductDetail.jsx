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

  // ✅ PRODUCT FROM STATE
  let product = location.state?.product;

  // ✅ FALLBACK FROM LOCAL STORAGE
  const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

  if (!product) {
    product = storedProducts.find((p) => p.id === id);
  }

  // ✅ PRODUCT NOT FOUND
  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Product not found 😢</h2>

        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const isInWishlist = wishlist.some((i) => i.id === product.id);
  const isInCart = cartItems.some((i) => i.id === product.id);

  // ✅ SAME PRICE LOGIC AS PRODUCT LIST
  const dealPrice = Math.round(product.price * INR_RATE * 0.75);

  const mrp = Math.round(dealPrice * 1.35);

  const discount = mrp - dealPrice;

  const discountPercent = Math.round((discount / mrp) * 100);

  return (
    <div className="product-detail">
      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="detail-container">

        {/* IMAGE */}
        <div className="image-section">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* INFO */}
        <div className="info-section">

          <h2>{product.title}</h2>

          {/* ✅ PRICE BLOCK */}
          <div className="price-block">

            <p className="deal-price">
              ₹{dealPrice.toLocaleString("en-IN")}
            </p>

            <p className="mrp">
              M.R.P:
              <span>
                ₹{mrp.toLocaleString("en-IN")}
              </span>
            </p>

            <p className="discount">
              You Save ₹
              {discount.toLocaleString("en-IN")}
              {" "}
              ({discountPercent}% OFF)
            </p>

          </div>

          {/* DESCRIPTION */}
          <p className="desc">
            Premium quality product available at best price.
          </p>

          {/* BUTTONS */}
          <div className="buttons">

            {/* WISHLIST */}
            <button
              className="wishlist-btn"
              onClick={() =>
                dispatch(toggleWishlist(product))
              }
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              {" "}
              Wishlist
            </button>

            {/* CART */}
            <button
              className="cart-btn"
              onClick={() => {
                if (isInCart) {
                  navigate("/cart");
                } else {
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