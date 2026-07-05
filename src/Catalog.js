import React from "react";
import ProductCard from "./ProductCard.js";
import { money } from "./utils.js";

export default function Catalog(props) {
  const { products, setCategory, maxPrice, setMaxPrice, rating, setRating, fast, setFast, deals, setDeals, inStock, setInStock, sort, setSort, wishlist, navigate, toggleWishlist, route } = props;
  const pageLabels = {
    deals: ["Today's Deals", "Best live discounts across categories"],
    bestsellers: ["Best Sellers", "Top rated products customers love"],
    new: ["New Releases", "Fresh products added to the store"],
    search: ["Search Results", "Products matching your search"]
  };
  const categoryName = route?.startsWith("category/") ? decodeURIComponent(route.split("/")[1] || "All") : null;
  const [title, subtitle] = categoryName ? [`${categoryName} Store`, `Browse ${categoryName.toLowerCase()} products`] : pageLabels[route] || ["Catalog", "All products"];
  return (
    <section className="shop-layout" id="catalog">
      <section className="products-section">
        <div className="section-toolbar">
          <div><p className="eyebrow">{title}</p><h2>{products.length} product{products.length === 1 ? "" : "s"} found</h2><p className="muted">{subtitle}</p></div>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
            <option value="recommended">Recommended</option>
            <option value="priceLow">Price: low to high</option>
            <option value="priceHigh">Price: high to low</option>
            <option value="rating">Top rated</option>
            <option value="discount">Best discount</option>
          </select>
        </div>
        <div className="filters marketplace-filters">
          <div className="filter-header"><strong>Filters</strong></div>
          <label><span>Price</span><input value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} type="range" min="500" max="90000" step="500" /><span>Up to {money(maxPrice)}</span></label>
          <label><span>Rating</span><select value={rating} onChange={(event) => setRating(Number(event.target.value))}><option value="0">Any rating</option><option value="3">3 stars and above</option><option value="4">4 stars and above</option><option value="4.5">4.5 stars and above</option></select></label>
          <label className="check-row"><input checked={fast} onChange={(event) => setFast(event.target.checked)} type="checkbox" /> Fast delivery</label>
          <label className="check-row"><input checked={deals} onChange={(event) => setDeals(event.target.checked)} type="checkbox" /> Deals only</label>
          <label className="check-row"><input checked={inStock} onChange={(event) => setInStock(event.target.checked)} type="checkbox" /> In stock</label>
          <button type="button" onClick={() => { setCategory("All"); setMaxPrice(90000); setRating(0); setFast(false); setDeals(false); setInStock(true); }}>Clear</button>
        </div>
        <div className="quick-actions"><button>Exchange offer</button><button>No-cost EMI</button><button>Bank discount</button><button>Assured delivery</button><button>Top rated sellers</button></div>
        <div className="product-grid">
          {products.length ? products.map((product) => <ProductCard key={product.id} product={product} wished={wishlist.includes(product.id)} navigate={navigate} toggleWishlist={toggleWishlist} />) : <div className="empty-state">No products match these filters.</div>}
        </div>
      </section>
    </section>
  );
}
