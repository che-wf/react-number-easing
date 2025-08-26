import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NumberEasing } from "../components";

describe("NumberEasing", () => {
  it("renders with default props and displays the value", () => {
    render(<NumberEasing value={123.45} />);
    expect(screen.getByText(/123/)).toBeInTheDocument();
  });

  it("formats value as currency when currency prop is provided", () => {
    render(<NumberEasing value={1000} currency="USD" />);
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });


  it("shows value with specified precision", () => {
    render(<NumberEasing value={1.2345} precision={3} />);
    expect(screen.getByText("1.235")).toBeInTheDocument();
  });
});
