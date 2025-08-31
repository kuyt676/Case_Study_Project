import { renderHook, act } from "@testing-library/react";
import { useIPFetch } from "./useIPFetch";
import * as IPService from "../services/IPService";

jest.mock("../services/IPService");

describe("useIPFetch hook", () => {
  const mockIPData = {
    ip: "1.1.1.1",
    hostname: "example.com",
    isp: "ISP Inc",
    country: "US",
    abuseConfidenceScore: 0,
    totalReports: 0,
    isVpn: false,
    fraudScore: 10,
    riskLevel: "Low",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches data successfully", async () => {
    (IPService.fetchIPData as jest.Mock).mockResolvedValue(mockIPData);

    const { result } = renderHook(() => useIPFetch());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.fetchData("1.1.1.1");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockIPData);
    expect(result.current.error).toBeNull();
  });

  test("handles API error", async () => {
    (IPService.fetchIPData as jest.Mock).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useIPFetch());

    await act(async () => {
      await result.current.fetchData("1.1.1.1");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("API error");
  });
});
