import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000); // auto redirect after 4 sec

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">

      <div className="success-box">
        <h1> Order Placed Successfully!</h1>

        <p>Thank you for shopping with us 💙</p>

        <p className="order-id">
          Your order is being processed 🚚
        </p>

        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>

    </div>
  );
}