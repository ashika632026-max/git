import React from "react";
import { categories, products } from "./products.js";

export default function Home({ navigate }) {
  return (
    <>
      <section className="hero home-section">
        <div className="hero-copy">
          <p className="eyebrow">Big Festive Store</p>
          <h1>Everything you need, priced like a sale day.</h1>
          <p>Shop phones, fashion, home essentials, beauty, and electronics with instant cart, wishlist, checkout, and order tracking.</p>
          <div className="hero-actions">
            <button className="primary-link" type="button" onClick={() => navigate("deals")}>Shop deals</button>
            <button className="secondary-link" type="button" onClick={() => navigate("product/13")}>View top offer</button>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-photo hero-photo-main" onClick={() => navigate("category/Mobiles")}><img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80" alt="Sale" /></div>
          <div className="hero-photo hero-photo-small" onClick={() => navigate("category/Electronics")}><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" alt="Laptop" /></div>
          <div className="sale-card"><span>55%</span><small>OFF</small></div>
          <div className="hero-badge">Free delivery over Rs. 499</div>
        </div>
      </section>
      <section className="category-strip home-section">
        {categories.map((item) => <button key={item} onClick={() => navigate(`category/${item}`)}>{item === "Home" ? "Home & Kitchen" : item}</button>)}
        <button onClick={() => navigate("deals")}>All Products</button>
      </section>
      <PromoGrid navigate={navigate} />
      <section className="trust-strip home-section">
        <div><strong>Free delivery</strong><span>On orders above Rs. 499</span></div>
        <div><strong>Easy returns</strong><span>7 day replacement support</span></div>
        <div><strong>Secure checkout</strong><span>UPI, card, EMI, COD</span></div>
        <div><strong>Fast support</strong><span>Help center for every order</span></div>
      </section>
      <DealRows navigate={navigate} />
      <Collections navigate={navigate} />
      <Brands navigate={navigate} />
    </>
  );
}

function PromoGrid({ navigate }) {
  const items = [
    ["Mobiles", "Latest 5G phones", "From Rs. 3,499", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"],
    ["Fashion", "Fresh styles", "Min. 40% off", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80"],
    ["Home", "Kitchen and living", "Deals all week", "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=700&q=80"]
  ];
  return (
    <section className="promo-grid home-section">
      {items.map(([category, title, sub, image]) => (
        <article key={title} onClick={() => navigate(`category/${category}`)}>
          <img src={image} alt={title} />
          <div><p className="eyebrow">{category}</p><h2>{title}</h2><span>{sub}</span></div>
        </article>
      ))}
    </section>
  );
}

function DealRows({ navigate }) {
  const sections = [
    ["deal-showcase home-section", "Trending Gadgets & Appliances", "Electronics", [[2, "Wireless Headphones", "Up to 50% Off"], [11, "Smartwatches", "From Rs. 3,499"], [9, "Learning Tablets", "No-cost EMI"], [13, "4K Smart TVs", "From Rs. 38,999"]]],
    ["deal-showcase purple-showcase home-section", "Trends you may like", "Fashion", [[7, "Denim Jackets", "Min. 49% Off"], [3, "Sports Shoes", "Min. 70% Off"], [15, "Handbags", "Fresh Collection"], [18, "T-Shirts", "From Rs. 999"]]],
    ["deal-showcase blue-showcase home-section", "Top deals on Tech", "Electronics", [[6, "ViewBook Laptop", "Starts Rs. 52,999"], [1, "PixelPro X1", "From Rs. 34,999"], [16, "Mirrorless Cameras", "Top rated"], [13, "Smart TVs", "Huge savings"], [2, "Headphones", "Up to 50% Off"]]],
    ["deal-showcase green-showcase home-section", "Home essentials", "Home", [[4, "Mixer Grinders", "From Rs. 3,299"], [10, "Coffee Makers", "Fresh deals"], [17, "Cookware Sets", "Min. 46% Off"], [14, "Office Chairs", "Work from home"]]]
  ];
  return sections.map(([className, title, category, rows]) => (
    <section className={className} key={title}>
      <div className="showcase-title"><h2>{title}</h2><button type="button" onClick={() => navigate(`category/${category}`)}>View all</button></div>
      <div className={`deal-row ${rows.length === 5 ? "wide-row" : ""}`}>
        {rows.map(([id, heading, sub]) => {
          const product = products.find((item) => item.id === id);
          return <article key={`${title}-${id}`} onClick={() => navigate(`product/${id}`)}><img src={product.image} alt={heading} /><strong>{heading}</strong><span>{sub}</span></article>;
        })}
      </div>
    </section>
  ));
}

function Collections({ navigate }) {
  const items = [
    ["Electronics", "Work from home setup", "Laptops, headphones, chairs, and desk essentials.", "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80"],
    ["Fashion", "Daily fashion store", "Shoes, jackets, tees, bags, and seasonal picks.", "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80"],
    ["Beauty", "Beauty routine", "Serums, sunscreen, kits, and self-care products.", "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"]
  ];
  return (
    <section className="collection-section home-section">
      <div className="section-heading"><p className="eyebrow">Collections</p><h2>Shop by lifestyle</h2></div>
      <div className="collection-grid">
        {items.map(([category, title, copy, image]) => <article key={title} onClick={() => navigate(`category/${category}`)}><img src={image} alt={title} /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
      </div>
    </section>
  );
}

function Brands({ navigate }) {
  const brandMap = [["PixelPro", "Mobiles"], ["SoundMax", "Electronics"], ["ViewBook", "Electronics"], ["HomeChef", "Home"], ["GlowCare", "Beauty"], ["AeroFit", "Fashion"]];
  return (
    <section className="brand-section home-section">
      <div className="section-heading"><p className="eyebrow">Popular brands</p><h2>Trusted by shoppers</h2></div>
      <div className="brand-grid">{brandMap.map(([brand, category]) => <span key={brand} onClick={() => navigate(`category/${category}`)}>{brand}</span>)}</div>
    </section>
  );
}
