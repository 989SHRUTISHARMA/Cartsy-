import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { useEffect, useState } from "react";
import "../App.css";
import { toggleWishlist } from "../features/WishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductList() {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist?.items || []
  );

  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    "https://media.istockphoto.com/id/1184848537/photo/vintage-christmas-frame-border-flat-lay-fir-three-branches-blue-balls-and-snowflakes-over.jpg?s=2048x2048&w=is&k=20&c=02iHNCc0VTkxICvmKPMDy527aySaaVuHW3FZFA8kqlA=",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/2192ad9d315c3d3b.jpg?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/f9f3c76c54cd771e.png?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/bf78e70ff3bf7b05.png?q=60",
    "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/0417cb442593f5a1.png?q=60",
  ];

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // ✅ AUTO SLIDE FIX (no dependency loop issue)
  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const removeFakeIds = [];
  const removeDummyIds = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
  const removeEscuelaIds = [8,7,9,6,5,4,3,52,53,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,132,133,135,147,151,155,156,161,162];

  useEffect(() => {
    Promise.allSettled([
      fetch("https://dummyjson.com/products").then((res) => res.json()),
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
      // fetch("https://api.escuelajs.co/api/v1/products").then((res) =>
      //   res.json()
      // ),
    ])
      .then((results) => {
        let allProducts = [];

        if (results[0].status === "fulfilled") {
          const dummyProducts = results[0].value.products
            .filter((p) => !removeDummyIds.includes(p.id))
            .map((p) => ({
              id: "d-" + p.id,
              title: p.title,
              price: p.price,
              image: p.thumbnail,
            }));
          allProducts.push(...dummyProducts);
        }

        if (results[1].status === "fulfilled") {
          const fakeProducts = results[1].value
            .filter((p) => !removeFakeIds.includes(p.id))
            .map((p) => ({
              id: "f-" + p.id,
              title: p.title,
              price: p.price,
              image: p.image,
            }));
          allProducts.push(...fakeProducts);
        }

        // if (results[2].status === "fulfilled") {
        //   const escuelaProducts = results[2].value
        //     .filter(
        //       (p) =>
        //         p.images &&
        //         p.images.length > 0 &&
        //         p.images[0].includes("http") &&
        //         !p.images[0].includes("placeholder") &&
        //         !removeEscuelaIds.includes(p.id)
        //     )
        //     .map((p) => ({
        //       id: "e-" + p.id,
        //       title: p.title,
        //       price: p.price,
        //       image: p.images[0],
        //     }));
        //   allProducts.push(...escuelaProducts);
        // }

        setProducts(allProducts);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div>

      {/* ================= BANNER (UPDATED) ================= */}
      <div className="banner">
        <img
          src={banners[currentBanner]}
          alt="banner"
          className={`banner-img ${
            currentBanner === 0 ? "first-banner" : "other-banner"
          }`}
        />

        {/* ✅ ONLY FIRST BANNER TEXT */}
        {currentBanner === 0 && (
          <>
            <div className="overlay"></div>

            <div className="banner-content">
              <h1>Shop Gifts</h1>
              <p>
                Find the perfect gift for any occasion and make every moment unforgettable 🎁
              </p>
              <button className="shop-btn">Shop Now</button>
            </div>
          </>
        )}

        {/* ARROWS */}
        <button className="arrow left" onClick={prevBanner}>
          ❮
        </button>

        <button className="arrow right" onClick={nextBanner}>
          ❯
        </button>

        {/* DOTS */}
        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentBanner === index ? "active" : ""}`}
              onClick={() => setCurrentBanner(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="product-grid">

        {products.map((p) => {

          const isInWishlist = wishlist?.some(
            (item) => item.id === p.id
          );

          return (
            <div key={p.id} className="product-card">

              <button
                className={`add ${isInWishlist ? "active" : ""}`}
                onClick={() => dispatch(toggleWishlist(p))}
              >
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              </button>

              <img
                src={p.image}
                alt={p.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />

              <h3>{p.title}</h3>

              <p className="price">
                ₹{(p.price * 23).toFixed(0)}
              </p>

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
    </div>
  );
}