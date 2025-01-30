import { it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

it("renders the App component", () => {
  render(<App />);
  const pageTitle = screen.getByText(/GRM Dashboard/i);
  expect(pageTitle).toBeInTheDocument();
});

test("data is valid json", () => {
  const data = require("../../../data.json");
  expect(typeof data).toBe("object");
  expect(data.length).toBeGreaterThan(0);
});
