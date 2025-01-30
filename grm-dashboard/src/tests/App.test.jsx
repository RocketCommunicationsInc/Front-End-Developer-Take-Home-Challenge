import { it, expect, test, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

it("renders the App component", () => {
  const { getByTestId } = render(<App />);
  const globalStatusBar = getByTestId("global-status-bar");
  expect(globalStatusBar).toBeInTheDocument();
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

describe("table header", () => {
  test("segment button is displayed", () => {
    const { getByTestId } = render(<App />);
    let segmentBtn = getByTestId("segmented-button");
    expect(segmentBtn).toBeInTheDocument();
  });
});
