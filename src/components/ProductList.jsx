import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { useEffect, useState } from "react";
import "../App.css";
import { toggleWishlist } from "../features/WishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductList({ search = "", category = "all" }) {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist?.items || []);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentBanner, setCurrentBanner] = useState(0);

  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const banners = [
    "https://media.istockphoto.com/id/1184848537/photo/vintage-christmas-frame-border-flat-lay-fir-three-branches-blue-balls-and-snowflakes-over.jpg?s=2048x2048&w=is&k=20&c=02iHNCc0VTkxICvmKPMDy527aySaaVuHW3FZFA8kqlA=",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/2192ad9d315c3d3b.jpg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/f9f3c76c54cd771e.png?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/bf78e70ff3bf7b05.png?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/0417cb442593f5a1.png?q=60",
  ];

  // ================= BANNER =================
  const nextBanner = () => setCurrentBanner((p) => (p + 1) % banners.length);
  const prevBanner = () =>
    setCurrentBanner((p) => (p === 0 ? banners.length - 1 : p - 1));

  useEffect(() => {
    const interval = setInterval(nextBanner, 3000);
    return () => clearInterval(interval);
  }, []);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    Promise.allSettled([
      fetch("https://dummyjson.com/products").then((res) => res.json()),
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
    ]).then((results) => {
      let allProducts = [];

      if (results[0].status === "fulfilled") {
        const dummy = results[0].value.products.map((p) => ({
          id: "d-" + p.id,
          title: p.title,
          price: p.price,
          image: p.thumbnail,
          category: p.category,
        }));
        allProducts.push(...dummy);
      }

      if (results[1].status === "fulfilled") {
        const fake = results[1].value.map((p) => ({
          id: "f-" + p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          category: p.category || "other",
        }));
        allProducts.push(...fake);
      }

      setProducts(allProducts);
      setFilteredProducts(allProducts);
    });
  }, []);

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let data = [...products];

    // SEARCH
    if (search) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // CATEGORY FIX (WORKING)
    if (category !== "all") {
      data = data.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const title = (p.title || "").toLowerCase();

        if (category === "fashion") {
          return cat.includes("clothing") || title.includes("shirt") || title.includes("dress");
        }

        if (category === "home") {
          return cat.includes("home") || title.includes("sofa") || title.includes("chair");
        }

        if (category === "electronics") {
          return cat.includes("electronics") || title.includes("phone") || title.includes("laptop");
        }

        if (category === "beauty") {
          return cat.includes("beauty") || title.includes("cream") || title.includes("makeup");
        }

        return true;
      });
    }

    // PRICE FILTER
    if (priceRange === "low") data = data.filter((p) => p.price < 50);
    if (priceRange === "mid")
      data = data.filter((p) => p.price >= 50 && p.price <= 150);
    if (priceRange === "high") data = data.filter((p) => p.price > 150);

    // SORT
    if (sort === "low") data.sort((a, b) => a.price - b.price);
    if (sort === "high") data.sort((a, b) => b.price - a.price);

    setFilteredProducts(data);
    setCurrentPage(1);
  }, [products, search, category, priceRange, sort]);

  // ================= PAGINATION =================
  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfLast - productsPerPage,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>

      {/* ================= BANNER (NO CHANGE AT ALL) ================= */}
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
              <h1>Shop Gifts</h1>
              <p>Find the perfect gift 🎁</p>
              <button className="shop-btn">Shop Now</button>
            </div>
          </>
        )}

        <button className="arrow left" onClick={prevBanner}>❮</button>
        <button className="arrow right" onClick={nextBanner}>❯</button>

        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentBanner === index ? "active" : ""}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="filter-bar">

        <select onChange={(e) => setPriceRange(e.target.value)}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="product-grid">

        {currentProducts.map((p) => {
          const isInWishlist = wishlist.some((i) => i.id === p.id);

          return (
            <div key={p.id} className="product-card">

              <button
                className={`add ${isInWishlist ? "active" : ""}`}
                onClick={() => dispatch(toggleWishlist(p))}
              >
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              </button>

              <img src={p.image} alt={p.title} />

              <h3>{p.title}</h3>

              <p className="price">₹{(p.price * 13).toFixed(0)}</p>

              <button
                className="cart-btn"
                onClick={() => dispatch(addToCart(p))}
              >
                Add to Cart
              </button>

            </div>
          );
        })}

      </div>

      {/* ================= PAGINATION ================= */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
}