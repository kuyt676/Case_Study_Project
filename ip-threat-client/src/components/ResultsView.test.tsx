import { render, screen } from "@testing-library/react";
import ResultsView from "./ResultsView";

describe("ResultsView Component", () => {
  const mockData = {
    ip: "8.8.8.8",
    hostname: "dns.google",
    isp: "Google LLC",
    country: "US",
    abuseConfidenceScore: 10,
    totalReports: 2,
    isVpn: false,
    fraudScore: 20,
    riskLevel: "Low",
  };

  test("renders loading state", () => {
    render(<ResultsView data={null} loading={true} error={null} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    render(<ResultsView data={null} loading={false} error="Failed to fetch" />);
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  test("renders null when no data and not loading or error", () => {
    const { container } = render(<ResultsView data={null} loading={false} error={null} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders data correctly", () => {
    render(<ResultsView data={mockData} loading={false} error={null} />);

    expect(screen.getByText("IP: 8.8.8.8")).toBeInTheDocument();
    expect(screen.getByText("Hostname: dns.google")).toBeInTheDocument();
    expect(screen.getByText("ISP: Google LLC")).toBeInTheDocument();
    expect(screen.getByText("Country: US")).toBeInTheDocument();
    expect(screen.getByText("Abuse Score: 10")).toBeInTheDocument();
    expect(screen.getByText("Recent Reports: 2")).toBeInTheDocument();
    expect(screen.getByText("VPN/Proxy Detected: No")).toBeInTheDocument();
    expect(screen.getByText("Threat Score: 20")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  test("displays 'Unknown' for missing hostname", () => {
    const dataWithoutHostname = { ...mockData, hostname: null };
    render(<ResultsView data={dataWithoutHostname} loading={false} error={null} />);
    expect(screen.getByText("Hostname: Unknown")).toBeInTheDocument();
  });
});
