import React from "react";
import { money } from "./utils.js";

export function Account({ close, signIn, wishlist, products, addToCart }) {
  const wishedProducts = products.filter((product) => wishlist.includes(product.id));
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Sign in">
      <section className="modal compact-modal">
        <button className="icon-button modal-close" type="button" onClick={close}>x</button>
        <h2>Sign in to ShopNest</h2>
        <p className="muted">Use your email or phone number to continue shopping.</p>
        <form className="login-form" onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          signIn(form.get("identity"));
        }}><label>Email or phone<input name="identity" required placeholder="yourname@example.com" /></label><label>Password<input required type="password" placeholder="Password" /></label><button className="checkout-button" type="submit">Sign in</button></form>
        <div className="account-stats"><div><strong>{wishlist.length}</strong><span>Wishlist</span></div><div><strong>Plus</strong><span>Member</span></div><div><strong>4</strong><span>Coupons</span></div></div>
        <div className="mini-list">{wishedProducts.length ? wishedProducts.map((item) => <div className="mini-item" key={item.id}><img className="thumb" src={item.image} alt={item.name} /><div><strong>{item.name}</strong><div className="muted">{money(item.price)}</div></div><button className="add-button" onClick={() => addToCart(item.id)}>Add</button></div>) : <div className="empty-state">Your wishlist is empty.</div>}</div>
      </section>
    </div>
  );
}

export function Orders({ orders, close }) {
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Orders">
      <section className="modal compact-modal">
        <button className="icon-button modal-close" type="button" onClick={close}>x</button>
        <h2>Orders</h2>
        <div className="mini-list">{orders.length ? orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="mini-item"><div className="thumb order-thumb">#</div><div><strong>Order {order.id}</strong><div className="muted">{order.items} item{order.items === 1 ? "" : "s"} | {order.date}</div></div><strong>{money(order.total)}</strong></div>
            <div className="order-meta"><span>Buyer: {order.buyer}</span><span>Seller: {order.seller}</span><span>Status: {order.status}</span></div>
            <button className="details-button" type="button" onClick={() => window.print()}>Print order</button>
          </div>
        )) : <div className="empty-state">No orders yet. Add products to cart and place your first order.</div>}</div>
      </section>
    </div>
  );
}

export function Seller({ close, submit, sellerInfo }) {
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Become a Seller">
      <section className="modal compact-modal">
        <button className="icon-button modal-close" type="button" onClick={close}>x</button>
        <h2>Become a Seller</h2>
        <p className="muted">Start selling products to customers across categories.</p>
        {sellerInfo && (
          <div className="seller-summary">
            <strong>{sellerInfo.business}</strong>
            <span>Mobile: {sellerInfo.mobile}</span>
            <span>Category: {sellerInfo.category}</span>
            <span>Status: Active seller profile</span>
            <button className="details-button" type="button" onClick={() => window.print()}>Print seller details</button>
          </div>
        )}
        <form className="login-form" onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          submit({
            business: form.get("business"),
            mobile: form.get("mobile"),
            category: form.get("category")
          });
        }}>
          <label>Business name<input name="business" required placeholder="Your business name" defaultValue={sellerInfo?.business || ""} /></label>
          <label>Mobile number<input name="mobile" required placeholder="9876543210" defaultValue={sellerInfo?.mobile || ""} /></label>
          <label>Product category<select name="category" defaultValue={sellerInfo?.category || "Mobiles and Electronics"}><option>Mobiles and Electronics</option><option>Fashion</option><option>Home and Appliances</option><option>Beauty and Personal Care</option></select></label>
          <button className="checkout-button" type="submit">Start selling</button>
        </form>
      </section>
    </div>
  );
}
