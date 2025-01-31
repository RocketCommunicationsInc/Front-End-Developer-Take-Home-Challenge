import { it, expect, test, describe, beforeEach } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { screen } from "shadow-dom-testing-library";
import App from "../App";
import ApiConnection from "../services/ApiConnection";
import { contactTimeForHumans, formatDateTime } from "../helpers/formatTime";

beforeEach(() => {
  render(<App />);
});

const waitForLoad = async () => {
  await waitFor(async () => {
    const loadingText = await screen.queryByShadowText("Loading...");
    expect(loadingText).not.toBeInTheDocument();
  });
};
it("renders the App component", async () => {
  const globalStatusBar = await screen.getByShadowTestId("global-status-bar");
  expect(globalStatusBar).toBeInTheDocument();
});

describe("contacts", () => {
  const data = require("../../../data.json");
  test("it imports from mock API", async () => {
    const api = new ApiConnection();
    const response = await api.getContacts();
    expect(response.data).toHaveLength(382);
  });

  test("data is valid json", () => {
    expect(typeof data).toBe("object");
    expect(data).toHaveLength(382);
  });

  test("contact alerts only contain expected statuses", () => {
    const expectedSeverities = ["caution", "warning", "serious", "critical"];
    const contactsWithoutExpectedStatuses = data.filter((contact) =>
      contact.alerts.some(
        (alert) => !expectedSeverities.includes(alert.errorSeverity)
      )
    );
    expect(contactsWithoutExpectedStatuses).toHaveLength(0);
  });
});

describe("global header", () => {
  it("can click icons", async () => {
    const normal = screen.getByShadowTestId("normal-icon");
    const caution = screen.getByShadowTestId("caution-icon");
    const serious = screen.getByShadowTestId("serious-icon");
    const critical = screen.getByShadowTestId("critical-icon");
    expect(normal).toBeInTheDocument();
    expect(caution).toBeInTheDocument();
    expect(serious).toBeInTheDocument();
    expect(critical).toBeInTheDocument();
    await waitForLoad();
    let table = null;

    fireEvent.click(critical);
    table = screen.queryAllByShadowTestId("table-row");
    expect(table).toHaveLength(11);

    fireEvent.click(serious);
    table = screen.queryAllByShadowTestId("table-row");
    expect(table).toHaveLength(14);

    fireEvent.click(caution);
    table = screen.queryAllByShadowTestId("table-row");
    expect(table).toHaveLength(7);

    fireEvent.click(normal);
    table = screen.queryAllByShadowTestId("table-row");
    expect(table).toHaveLength(30);
  });
});

describe("table header", () => {
  test("filter button is displayed", async () => {
    const filterSelect = await screen.getByShadowTestId("filter-select");
    expect(filterSelect).toBeInTheDocument();
  });
  test("segment button is displayed", async () => {
    const segmentBtn = await screen.getByShadowTestId("segmented-button");
    expect(segmentBtn).toBeInTheDocument();
  });
  it("displays the results count", async () => {
    const loadingText = await screen.getByShadowText("Loading...");
    expect(loadingText).toBeInTheDocument();
    await waitForLoad();

    const table = screen.queryAllByShadowTestId("table-row");
    expect(table).toHaveLength(30);
  });
});

describe("helpers", () => {
  it("displays human readable time", () => {
    const end = 1563755700; //Monday, July 22, 2019 12:35:00 AM
    const begin = 1563754800; //Monday, July 22, 2019 12:20:00 AM
    expect(contactTimeForHumans(begin, end)).toBe("15 minutes");
  });

  it("formats timestamp", () => {
    const seconds = 1563753600; //Monday, July 22, 2019 12:00:00 AM
    const miliseconds = 1542134427946; //Tuesday, November 13, 2018 6:40:27.946 PM
    expect(formatDateTime(seconds)).toBe("7/21/2019, 6:00:00 PM");
    expect(formatDateTime(miliseconds)).toBe("11/13/2018, 11:40:27 AM");
  });
});
