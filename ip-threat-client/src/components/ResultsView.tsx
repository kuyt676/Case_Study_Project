import { IntelResult } from "../types/IntelResult";

interface ResultsProps {
  data: IntelResult|null ; 
  loading: boolean;
  error: string | null;
}

export default function ResultsView({ data, loading, error }: ResultsProps) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

 return (
  <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-2">
    <p className="text-gray-700"><span className="font-semibold">IP:</span> {data.ip}</p>
    <p className="text-gray-700">
      <span className="font-semibold">Hostname:</span> {data.hostname ? data.hostname : "Unknown"}
    </p>
    <p className="text-gray-700"><span className="font-semibold">ISP:</span> {data.isp}</p>
    <p className="text-gray-700"><span className="font-semibold">Country:</span> {data.country}</p>
    <p className="text-gray-700"><span className="font-semibold">Abuse Score:</span> {data.abuseConfidenceScore}</p>
    <p className="text-gray-700"><span className="font-semibold">Recent Reports:</span> {data.totalReports}</p>
    <p className="text-gray-700"><span className="font-semibold">VPN/Proxy Detected:</span> {data.isVpn ? "Yes" : "No"}</p>
    <p className="text-gray-700"><span className="font-semibold">Threat Score:</span> {data.fraudScore}</p>

    <p className="flex items-center gap-2">
      <span className="font-semibold">Risk Level:</span>
      <span
        className={`px-2 py-1 rounded font-semibold ${
          data.riskLevel === "High"
            ? "bg-red-500 text-white"
            : data.riskLevel === "Medium"
            ? "bg-yellow-400 text-black"
            : "bg-green-500 text-white"
        }`}
      >
        {data.riskLevel}
      </span>
    </p>
  </div>
);

}

// "isVpn": false,
// "isProxy": false,
