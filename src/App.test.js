import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders ShopNest header", () => {
  render(<App />);
  expect(screen.getByText(/ShopNest/i)).toBeInTheDocument();
});
