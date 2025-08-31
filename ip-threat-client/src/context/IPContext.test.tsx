import { render, screen } from "@testing-library/react";
import { IPProvider, useIPContext } from "./IPContext";

// Mock של ה-hook
const mockFetchData = jest.fn();
jest.mock("../hooks/useIPFetch", () => ({
  useIPFetch: () => ({
    data: { ip: "1.1.1.1", hostname: "example.com", isp: "ISP Inc", country: "US", abuseConfidenceScore: 0, totalReports: 0, isVpn: false, fraudScore: 10, riskLevel: "Low" },
    loading: false,
    error: null,
    fetchData: mockFetchData,
  }),
}));

// קומפוננטה עוזרת לבדיקה
const TestComponent = () => {
  const { data, loading, error, checkIP } = useIPContext();

  return (
    <div>
      <p>IP: {data.ip}</p>
      <p>Hostname: {data.hostname}</p>
      <p>Loading: {loading ? "Yes" : "No"}</p>
      <p>Error: {error}</p>
      <button onClick={() => checkIP("8.8.8.8")}>Check IP</button>
    </div>
  );
};

describe("IPContext", () => {
  test("provides data from context", () => {
    render(
      <IPProvider>
        <TestComponent />
      </IPProvider>
    );

    expect(screen.getByText(/IP: 1.1.1.1/)).toBeInTheDocument();
    expect(screen.getByText(/Hostname: example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Loading: No/)).toBeInTheDocument();
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });

  test("checkIP calls fetchData", () => {
    render(
      <IPProvider>
        <TestComponent />
      </IPProvider>
    );

    const button = screen.getByText("Check IP");
    button.click();

    expect(mockFetchData).toHaveBeenCalledTimes(1);
    expect(mockFetchData).toHaveBeenCalledWith("8.8.8.8");
  });
});
