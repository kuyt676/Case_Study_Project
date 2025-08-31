import { useState } from "react";
import { fetchIPData } from "../services/IPService";

export function useIPFetch() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (ip: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchIPData(ip);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
