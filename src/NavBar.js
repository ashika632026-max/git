import React from "react";

export default function NavBar({ route }) {
  const links = [
    ["home", "For You"],
    ["category/Mobiles", "Mobiles"],
    ["category/Electronics", "Electronics"],
    ["category/Fashion", "Fashion"],
    ["category/Home", "Home & Kitchen"],
    ["category/Beauty", "Beauty"],
    ["deals", "Today's Deals"],
    ["bestsellers", "Best Sellers"],
    ["new", "New Releases"],
    ["seller", "Sell"]
  ];

  return (
    <nav className="market-nav" aria-label="Marketplace navigation">
      {links.map(([target, label]) => (
        <a key={target} href={`#/${target}`} className={route === target ? "active" : ""}>{label}</a>
      ))}
    </nav>
  );
}
