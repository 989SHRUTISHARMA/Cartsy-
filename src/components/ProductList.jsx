import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { useEffect, useState } from "react";
import "../App.css";
import { toggleWishlist } from "../features/WishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProductList({ search = "", category = "all" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist?.items || []);
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  const INR_RATE = 83;

  // ✅ FORMAT PRICE (INDIAN STYLE)
  const formatINR = (value) => {
    return value.toLocaleString("en-IN");
  };

  const banners = [
    "https://media.istockphoto.com/id/1184848537/photo/vintage-christmas-frame-border-flat-lay-fir-three-branches-blue-balls-and-snowflakes-over.jpg?s=2048x2048&w=is&k=20&c=02iHNCc0VTkxICvmKPMDy527aySaaVuHW3FZFA8kqlA=",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/2192ad9d315c3d3b.jpg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/f9f3c76c54cd771e.png?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/bf78e70ff3bf7b05.png?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/0417cb442593f5a1.png?q=60",
  ];

  const nextBanner = () => setCurrentBanner((p) => (p + 1) % banners.length);

  const prevBanner = () =>
    setCurrentBanner((p) => (p === 0 ? banners.length - 1 : p - 1));

  useEffect(() => {
    const interval = setInterval(nextBanner, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products?limit=100").then((r) => r.json()),
      fetch("https://fakestoreapi.com/products").then((r) => r.json()),
    ]).then(([d, f]) => {
      const all = [
        ...d.products.map((p) => ({
          id: "d-" + p.id,
          title: p.title,
          price: p.price,
          image: p.thumbnail,
          category: p.category,
        })),
        ...f.map((p) => ({
          id: "f-" + p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          category: p.category,
        })),
      ];

      const unique = Array.from(new Map(all.map((i) => [i.title, i])).values());
      setProducts(unique);
    });
  }, []);

  const isVegFood = (title, category) => {
    const text = (title + " " + category).toLowerCase();

    const nonVegKeywords = [
      "chicken",
      "mutton",
      "fish",
      "beef",
      "egg",
      "prawn",
      "shrimp",
      "meat",
    ];

    return !nonVegKeywords.some((word) => text.includes(word));
  };

  const getCategory = (type) => {
    return products.filter((p) => {
      const c = (p.category || "").toLowerCase();

      if (type === "fashion")
        return (
          c.includes("clothing") || c.includes("mens") || c.includes("womens")
        );

      if (type === "electronics")
        return (
          c.includes("electronics") ||
          c.includes("laptop") ||
          c.includes("phone")
        );

      if (type === "food")
        return (
          c.includes("groceries") ||
          c.includes("food") ||
          c.includes("fruits") ||
          c.includes("vegetables")
        );

      if (type === "home") return c.includes("furniture");

      if (type === "beauty")
        return c.includes("skincare") || c.includes("beauty");

      return true;
    });
  };

  const applySearch = (list) => {
    if (!search) return list;
    return list.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const trending = applySearch(products).slice(0, 15);
  const fashion = applySearch(getCategory("fashion")).slice(0, 15);
  const electronics = applySearch(getCategory("electronics")).slice(0, 15);

  const food = applySearch(getCategory("food"))
    .filter((p) => isVegFood(p.title, p.category))
    .slice(0, 15);

  const render = (list) => (
    <div className="scroll-row">
      {list.map((p) => {
        const isInWishlist = wishlist.some((i) => i.id === p.id);
        const isInCart = cartItems.some((i) => i.id === p.id);

        // ================= PRICE LOGIC (UPDATED) =================
        const dealPrice = Math.round(p.price * INR_RATE * 0.75);
        const mrp = Math.round(dealPrice * 1.35);
        const discount = mrp - dealPrice;
        const discountPercent = Math.round((discount / mrp) * 100);

        return (
          <div
            key={p.id}
            className="product-card"
            onClick={() =>
              navigate(`/product/${p.id}`, { state: { product: p } })
            }
            style={{ cursor: "pointer" }}
          >
            <button
              className={`add ${isInWishlist ? "active" : ""}`}
              onClick={() => dispatch(toggleWishlist(p))}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>

            <img src={p.image} alt="" />

            <h4>{p.title.slice(0, 40)}</h4>

            {/* ================= PRICE BLOCK ================= */}
            <div className="price-block">
              <p className="deal-price">
                ₹{formatINR(dealPrice)}
              </p>

              <p className="mrp">
                M.R.P: <span>₹{formatINR(mrp)}</span>
              </p>

              <p className="discount">
                You Save ₹{formatINR(discount)} ({discountPercent}% OFF)
              </p>
            </div>

            <button
              className="cart-btn"
              onClick={() => {
                if (isInCart) navigate("/cart");
                else {
                  dispatch(addToCart(p));
                  toast.success("Added 🛒");
                }
              }}
            >
              {isInCart ? "Go to Cart" : "Add"}
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* BANNER */}
      <div className="banner">
        <img
          src={banners[currentBanner]}
          alt="banner"
          className={`banner-img ${
            currentBanner === 0 ? "first-banner" : "other-banner"
          }`}
        />

        {currentBanner === 0 && (
          <>
            <div className="overlay"></div>
            <div className="banner-content">
              <h1>Discover Amazing Products </h1>
              <p>Handpicked deals, just for you. Shop smart, shop better.</p>

              <button
                className="shop-btn"
                onClick={() =>
                  document
                    .getElementById("products-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Products
              </button>
            </div>
          </>
        )}

        <button className="arrow left" onClick={prevBanner}>
          ❮
        </button>
        <button className="arrow right" onClick={nextBanner}>
          ❯
        </button>

        <div className="dots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={`dot ${currentBanner === i ? "active" : ""}`}
              onClick={() => setCurrentBanner(i)}
            />
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products-section">
        {category === "all" ? (
          <>
            <h2 className="section-title">🔥 Trending</h2>
            {render(trending)}

            <h2 className="section-title">👕 Fashion</h2>
            {render(fashion)}

            <h2 className="section-title">📱 Electronics</h2>
            {render(electronics)}

            <h2 className="section-title">🍔 Food</h2>
            {render(food)}
          </>
        ) : (
          <>
            <h2 className="section-title">{category}</h2>
            {render(
              category === "food"
                ? applySearch(getCategory(category)).filter((p) =>
                    isVegFood(p.title, p.category)
                  )
                : applySearch(getCategory(category))
            )}
          </>
        )}
      </div>
    </div>
  );
}