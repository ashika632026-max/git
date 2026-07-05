import React from "react";

export default function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div><h2>ShopNest</h2><p>A complete ecommerce shopping experience inspired by large marketplace stores.</p></div>
      <div><strong>Customer care</strong><span>Help center</span><span>Returns</span><span>Shipping</span></div>
      <div><strong>Company</strong><span>About</span><span>Careers</span><button onClick={() => navigate("seller")}>Sell on ShopNest</button></div>
      <div><strong>Payment</strong><span>UPI</span><span>Cards</span><span>Cash on delivery</span></div>
    </footer>
  );
}
