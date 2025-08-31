import { render, screen, fireEvent } from "@testing-library/react";
import IPInput from "../components/IPInput";
import { IPProvider } from "../context/IPContext";

describe("IPInput component", () => {
  beforeEach(() => {
    localStorage.clear(); // לאפס את ה-localStorage לפני כל טסט
  });

  it("renders input and button", () => {
    render(
      <IPProvider>
        <IPInput />
      </IPProvider>
    );

    expect(screen.getByPlaceholderText("Enter IP address")).toBeInTheDocument();
    expect(screen.getByText("Check")).toBeInTheDocument();
  });

  it("saves IP to history when button is clicked", () => {
    render(
      <IPProvider>
        <IPInput />
      </IPProvider>
    );

    const input = screen.getByPlaceholderText("Enter IP address");
    const button = screen.getByText("Check");

    fireEvent.change(input, { target: { value: "1.2.3.4" } });
    fireEvent.click(button);

    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    expect(history).toContain("1.2.3.4");
  });

  it("does not add empty input to history", () => {
    render(
      <IPProvider>
        <IPInput />
      </IPProvider>
    );

    const button = screen.getByText("Check");
    fireEvent.click(button);

    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    expect(history.length).toBe(0);
  });
});
