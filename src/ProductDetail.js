import React from "react";
import { discount, money } from "./utils.js";

export default function ProductDetail({ product, close, addToCart, toggleWishlist }) {
  if (!product) return null;
  return (
    <section className="product-page">
      <button className="details-button back-button" type="button" onClick={close}>Back to home</button>
      <div className="product-detail">
        <img className="detail-visual" src={product.image} alt={product.name} />
        <div>
          <p className="eyebrow">{product.category} | {product.brand}</p>
          <h2>{product.name}</h2>
          <div className="rating-line"><span className="rating">&#9733; {product.rating}</span><span>{product.reviews.toLocaleString("en-IN")} reviews</span></div>
          <div className="price-line"><span className="price">{money(product.price)}</span><span className="mrp">{money(product.mrp)}</span><span className="off">{discount(product)}% off</span></div>
          <ul className="detail-list">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <p className="muted">{product.fast ? "Fast delivery available" : "Standard delivery"} | {product.stock} units left | Easy 7 day returns</p>
          <div className="card-actions"><button className="details-button" onClick={() => toggleWishlist(product.id)}>Wishlist</button><button className="add-button" onClick={() => addToCart(product.id)}>Add to cart</button></div>
        </div>
      </div>
    </section>
  );
}
