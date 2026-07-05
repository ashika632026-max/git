import { useEffect, useMemo, useState } from "react";
import Header from "./Header.js";
import NavBar from "./NavBar.js";
import Home from "./Home.js";
import Catalog from "./Catalog.js";
import ProductDetail from "./ProductDetail.js";
import Cart from "./Cart.js";
import { Account, Orders, Seller } from "./Checkout.js";
import Footer from "./Footer.js";
import { products } from "./products.js";
import { discount, load, routeFromHash } from "./utils.js";

export default function App() {
  const [route, setRoute] = useState(routeFromHash());
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(90000);
  const [rating, setRating] = useState(0);
  const [fast, setFast] = useState(false);
  const [deals, setDeals] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [sort, setSort] = useState("recommended");
  const [cart, setCart] = useState(() => load("shopnest-cart", []));
  const [wishlist, setWishlist] = useState(() => load("shopnest-wishlist", []));
  const [orders, setOrders] = useState(() => load("shopnest-orders", []));
  const [toast, setToast] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [sellerOpen, setSellerOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [sellerInfo, setSellerInfo] = useState(() => load("shopnest-seller", null));

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => localStorage.setItem("shopnest-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("shopnest-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("shopnest-orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("shopnest-seller", JSON.stringify(sellerInfo)), [sellerInfo]);

  useEffect(() => {
    setAccountOpen(false);
    setSellerOpen(false);
    setOrdersOpen(false);
    setCartOpen(false);
    if (route === "home") {
      setCategory("All");
      setDeals(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (route.startsWith("category/")) {
      setCategory(decodeURIComponent(route.split("/")[1] || "All"));
      setQuery("");
      setDeals(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (route === "deals" || route === "bestsellers" || route === "new" || route === "search") {
      setCategory("All");
      setDeals(route === "deals");
      setSort(route === "bestsellers" ? "rating" : route === "deals" ? "discount" : "recommended");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (route.startsWith("product/")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (route === "seller") {
      setSellerOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (route === "cart") {
      setCartOpen(true);
    } else if (route === "orders") {
      setOrdersOpen(true);
    }
  }, [route]);

  const productId = route.startsWith("product/") ? Number(route.split("/")[1]) : null;
  const selectedProduct = products.find((item) => item.id === productId);
  const page = route.startsWith("product/")
    ? "product"
    : route.startsWith("category/") || route === "deals" || route === "bestsellers" || route === "new" || route === "search"
      ? "catalog"
      : "home";

  const filteredProducts = useMemo(() => {
    const list = products.filter((product) => {
      const text = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
      return text.includes(query.toLowerCase())
        && (category === "All" || product.category === category)
        && product.price <= maxPrice
        && product.rating >= rating
        && (!fast || product.fast)
        && ((!deals && route !== "deals") || product.deal)
        && (route !== "bestsellers" || product.rating >= 4.4)
        && (!inStock || product.stock > 0);
    });
    const sorters = {
      priceLow: (a, b) => a.price - b.price,
      priceHigh: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      discount: (a, b) => discount(b) - discount(a),
      recommended: (a, b) => Number(b.deal) - Number(a.deal) || b.rating - a.rating
    };
    if (route === "new") return [...list].sort((a, b) => b.id - a.id);
    return [...list].sort(sorters[sort]);
  }, [query, category, maxPrice, rating, fast, deals, inStock, sort, route]);

  const cartRows = cart.map((line) => ({ ...products.find((item) => item.id === line.id), qty: line.qty }));
  const subtotal = cartRows.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;

  function navigate(nextRoute) {
    const nextHash = `#/${nextRoute}`;
    setAccountOpen(false);
    setSellerOpen(false);
    setOrdersOpen(false);
    setCartOpen(false);
    if (window.location.hash === nextHash) {
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = nextHash;
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function addToCart(id) {
    setCart((current) => {
      const line = current.find((item) => item.id === id);
      if (line) return current.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { id, qty: 1 }];
    });
    showToast("Added to cart");
  }

  function changeQty(id, delta) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  }

  function toggleWishlist(id) {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    showToast("Wishlist updated");
  }

  function placeOrder() {
    if (!cart.length) {
      showToast("Your cart is empty");
      return;
    }
    setOrders((current) => [{
      id: Math.floor(100000 + Math.random() * 900000),
      items: cart.reduce((sum, item) => sum + item.qty, 0),
      total,
      buyer: signedIn ? accountName : "Guest customer",
      seller: sellerInfo?.business || "ShopNest Fulfilled Seller",
      status: "Confirmed",
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    }, ...current]);
    setCart([]);
    setCartOpen(false);
    setOrdersOpen(true);
    showToast("Order placed successfully");
  }

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        cartCount={cartRows.reduce((sum, item) => sum + item.qty, 0)}
        signedIn={signedIn}
        accountName={accountName}
        onSearch={() => navigate("search")}
        onLogin={() => setAccountOpen(true)}
        onLogout={() => { setSignedIn(false); setAccountName(""); showToast("Logged out successfully"); }}
        onOrders={() => { setOrdersOpen(true); navigate("orders"); }}
        onCart={() => setCartOpen(true)}
        onSeller={() => navigate("seller")}
        showToast={showToast}
      />
      <NavBar route={route} />
      <main>
        {page === "home" && <Home navigate={navigate} />}
        {page === "catalog" && (
          <Catalog
            products={filteredProducts}
            setCategory={setCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            rating={rating}
            setRating={setRating}
            fast={fast}
            setFast={setFast}
            deals={deals}
            setDeals={setDeals}
            inStock={inStock}
            setInStock={setInStock}
            sort={sort}
            setSort={setSort}
            wishlist={wishlist}
            navigate={navigate}
            toggleWishlist={toggleWishlist}
            route={route}
          />
        )}
        {page === "product" && selectedProduct && <ProductDetail product={selectedProduct} close={() => navigate("home")} addToCart={addToCart} toggleWishlist={toggleWishlist} />}
        {page === "product" && !selectedProduct && <section className="products-section not-found-page"><div className="empty-state">Product not found. Please go back and choose another item.</div></section>}
      </main>
      <Footer navigate={navigate} />
      {cartOpen && <Cart rows={cartRows} subtotal={subtotal} delivery={delivery} total={total} close={() => setCartOpen(false)} changeQty={changeQty} remove={(id) => setCart((current) => current.filter((item) => item.id !== id))} placeOrder={placeOrder} />}
      {accountOpen && <Account close={() => setAccountOpen(false)} signIn={(identity) => { const clean = String(identity || "Customer").trim(); setAccountName(clean.includes("@") ? clean.split("@")[0] : clean); setSignedIn(true); setAccountOpen(false); showToast("Signed in successfully"); }} wishlist={wishlist} products={products} addToCart={addToCart} />}
      {ordersOpen && <Orders orders={orders} close={() => { setOrdersOpen(false); if (route === "orders") navigate("home"); }} />}
      {sellerOpen && <Seller sellerInfo={sellerInfo} close={() => { setSellerOpen(false); navigate("home"); }} submit={(info) => { setSellerInfo(info); setSellerOpen(false); showToast("Seller profile saved"); }} />}
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
