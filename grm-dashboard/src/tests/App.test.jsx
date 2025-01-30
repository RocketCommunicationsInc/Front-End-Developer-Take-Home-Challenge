import { it, expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

it("renders the App component", () => {
  render(<App />);
  const pageTitle = screen.getByText(/GRM Dashboard/i);
  expect(pageTitle).toBeInTheDocument();
});

describe("contacts", () => {
  const data = require("../../../data.json");

  test("data is valid json", () => {
    expect(typeof data).toBe("object");
    expect(data.length).toBeGreaterThan(0);
  });

  test("contact alerts only contain expected statuses", () => {
    let expectedSeverities = ["caution", "warning", "serious", "critical"];
    let contactsWithoutExpectedStatuses = data.filter((contact) =>
      contact.alerts.some(
        (alert) => !expectedSeverities.includes(alert.errorSeverity)
      )
    );
    expect(contactsWithoutExpectedStatuses).toHaveLength(0);
  });
});
