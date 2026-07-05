export function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

export function money(value) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

export function discount(product) {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

export function routeFromHash() {
  return (window.location.hash || "#/home").replace(/^#\/?/, "") || "home";
}
