import { useState } from "react";
import { useIPContext } from "../context/IPContext";

export default function IPInput() {
  const { checkIP, history } = useIPContext();
  const [ip, setIp] = useState("");

  const handleCheck = () => {
    if (ip) checkIP(ip);
    setIp(""); // אופציונלי: ריקון השדה אחרי חיפוש
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter IP address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Check
        </button>
      </div>

      {/* חיפושים קודמים */}
      {history.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold mb-2">Recent Searches:</p>
          <ul className="flex flex-wrap gap-2">
            {history.map((item) => (
              <li key={item}>
                <button
                  onClick={() => checkIP(item)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
