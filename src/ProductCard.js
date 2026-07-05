import React from "react";
import { discount, money } from "./utils.js";

export default function ProductCard({ product, wished, navigate, toggleWishlist }) {
  return (
    <article className="product-card">
      <div className="product-visual">
        {product.deal && <span className="deal-tag">{discount(product)}% off</span>}
        <button className="wish-button" type="button" onClick={() => toggleWishlist(product.id)}>{wished ? "\u2665" : "+"}</button>
        <img className="product-photo" onClick={() => navigate(`product/${product.id}`)} src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <h3 onClick={() => navigate(`product/${product.id}`)}>{product.name}</h3>
        <div className="rating-line"><span className="rating">&#9733; {product.rating}</span><span>{product.reviews.toLocaleString("en-IN")} reviews</span></div>
        <div className="price-line"><span className="price">{money(product.price)}</span><span className="mrp">{money(product.mrp)}</span><span className="off">{discount(product)}% off</span></div>
        <div className="meta-line"><span>{product.fast ? "Fast delivery" : "Standard delivery"}</span><span>{product.stock} left</span></div>
        <div className="card-actions"><button className="details-button" onClick={() => navigate(`product/${product.id}`)}>View product</button><button className="details-button" onClick={() => toggleWishlist(product.id)}>Wishlist</button></div>
      </div>
    </article>
  );
}
