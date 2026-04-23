import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaPhone } from "react-icons/fa";

// payment icons
import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";
import paypal from "../assets/images/paypal.png";
import upi from "../assets/images/payoneer.png"; // fix this

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* ABOUT */}
        <div className="footer-col">
          <h4>ABOUT</h4>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Careers</p>
          <p>Cartsy Stories</p>
        </div>

        {/* GROUP */}
        <div className="footer-col">
          <h4>GROUP COMPANIES</h4>
          <p>Myntra</p>
          <p>Shopsy</p>
        </div>

        {/* HELP */}
        <div className="footer-col">
          <h4>HELP</h4>
          <p>Payments</p>
          <p>Shipping</p>
          <p>Returns</p>
          <p>FAQ</p>
        </div>

        {/* POLICY */}
        <div className="footer-col">
          <h4>CONSUMER POLICY</h4>
          <p>Cancellation & Returns</p>
          <p>Terms Of Use</p>
          <p>Security</p>
          <p>Privacy</p>
        </div>

        {/* CONTACT + SOCIAL */}
        <div className="footer-col address">
          <h4>Contact Us</h4>

          <p><FaPhone /> +91 9876543210</p>
          <p>Email: support@cartsy.com</p>

          <div className="social-icons">
            <FaInstagram />
            <FaWhatsapp />
            <FaFacebook />
            <FaTwitter />
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Bottom Row */}
      <div className="footer-bottom">

        <div className="footer-links">
          <span>Become a Seller</span>
          <span>Advertise</span>
          <span>Gift Cards</span>
          <span>Help Center</span>
        </div>

        <div className="payment-icons">
          <img src={visa} alt="visa" />
          <img src={mastercard} alt="mastercard" />
          <img src={paypal} alt="paypal" />
          <img src={upi} alt="upi" />
        </div>

      </div>

      <p className="copyright">
        © 2026 Cartsy.com
      </p>

    </footer>
  );
}