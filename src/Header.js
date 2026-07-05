import React from "react";
import { categories } from "./products.js";

export default function Header({ query, setQuery, category, setCategory, cartCount, signedIn, accountName, onSearch, onLogin, onLogout, onOrders, onCart, onSeller, showToast }) {
  return (
    <header className="topbar">
      <button className="menu-button" type="button" aria-label="Open menu" onClick={() => showToast("Menu: categories, deals, seller tools, help center")}>&#9776;</button>
      <a className="brand" href="#/home"><span className="brand-mark">S</span><span>ShopNest</span></a>
      <button className="location-button" type="button"><small>Location not set</small><strong>Select delivery location</strong></button>
      <form className="search" onSubmit={(event) => { event.preventDefault(); onSearch(); }}>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Search category">
          <option value="All">All</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search for products, brands and more" />
        <button type="submit">Search</button>
      </form>
      <nav className="header-actions" aria-label="Main actions">
        <div className="header-menu">
          <button className="signin-button" type="button" onClick={onLogin}>{signedIn ? accountName : "Login"}</button>
          <div className="menu-panel">
            <div className="menu-head">
              <span>{signedIn ? `Signed in as ${accountName}` : "New customer?"}</span>
              {signedIn ? <button type="button" onClick={onLogout}>Logout</button> : <button type="button" onClick={onLogin}>Sign Up</button>}
            </div>
            <button type="button" onClick={onLogin}>My Profile</button>
            <button type="button">ShopNest Plus Zone</button>
            <button type="button" onClick={onOrders}>Orders</button>
            <button type="button" onClick={onLogin}>Wishlist</button>
            <button type="button" onClick={onSeller}>Become a Seller</button>
            <button type="button">Rewards</button>
            <button type="button">Gift Cards</button>
            {signedIn && <button className="logout-menu-item" type="button" onClick={onLogout}>Logout</button>}
          </div>
        </div>
        <button className="ghost-button" type="button" onClick={onOrders}>Orders</button>
        <div className="header-menu">
          <button className="ghost-button" type="button">More</button>
          <div className="menu-panel more-panel">
            <strong>More</strong>
            <button type="button" onClick={onSeller}>Become a Seller</button>
            <button type="button">Notification Settings</button>
            <button type="button" onClick={() => showToast("Help center: returns, delivery, payment and support")}>24x7 Customer Care</button>
            <button type="button">Advertise</button>
            <button type="button">Download App</button>
          </div>
        </div>
        <button className="cart-button" type="button" onClick={onCart}>Cart <span>{cartCount}</span></button>
      </nav>
    </header>
  );
}
