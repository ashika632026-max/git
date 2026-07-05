import React from "react";
import { money } from "./utils.js";

export default function Cart({ rows, subtotal, delivery, total, close, changeQty, remove, placeOrder }) {
  return (
    <aside className="drawer open">
      <div className="drawer-panel">
        <div className="drawer-header"><h2>Your cart</h2><button className="icon-button" type="button" onClick={close}>x</button></div>
        <div className="cart-items">
          {rows.length ? rows.map((item) => (
            <div className="cart-item" key={item.id}>
              <img className="thumb" src={item.image} alt={item.name} />
              <div><strong>{item.name}</strong><div className="muted">{money(item.price)}</div><div className="qty"><button onClick={() => changeQty(item.id, -1)}>-</button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)}>+</button></div></div>
              <button className="remove-button" onClick={() => remove(item.id)}>Remove</button>
            </div>
          )) : <div className="empty-state">Your cart is empty. Open a product and add it to cart.</div>}
        </div>
        <div className="summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{delivery ? money(delivery) : "Free"}</strong></div><div className="total"><span>Total</span><strong>{money(total)}</strong></div></div>
        <button className="checkout-button" type="button" onClick={placeOrder}>Place order</button>
      </div>
    </aside>
  );
}
