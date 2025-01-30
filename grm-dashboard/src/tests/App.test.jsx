import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

it("renders the App component", () => {
  render(<App />);
  const pageTitle = screen.getByText(/GRM Dashboard/i);
  expect(pageTitle).toBeInTheDocument();
});
