export interface IntelResult {
  ip: string;
  hostname?: string | null;
  isp?: string;
  country?: string;
  abuseConfidenceScore?: number;
  totalReports?: number;
  isVpn?: boolean;
  isProxy?: boolean;
  fraudScore?: number;
  riskLevel: "Low" | "Medium" | "High";
}