import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { useIPFetch } from "../hooks/useIPFetch";

interface IPContextType {
  data: any;
  loading: boolean;
  error: string | null;
  checkIP: (ip: string) => void;
  history: string[];
}

const IPContext = createContext<IPContextType | undefined>(undefined);

export const IPProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, error, fetchData } = useIPFetch();

  const [history, setHistory] = useState<string[]>(() => {
    const stored = localStorage.getItem("searchHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const addToHistory = (ip: string) => {
    const newHistory = [ip, ...history.filter(item => item !== ip)].slice(0, 10); // שמירה על 10 פריטים
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const checkIP = (ip: string) => {
    fetchData(ip);
    addToHistory(ip);
  };

  return (
    <IPContext.Provider value={{ data, loading, error, checkIP, history }}>
      {children}
    </IPContext.Provider>
  );
};

export const useIPContext = () => {
  const context = useContext(IPContext);
  if (!context) throw new Error("useIPContext must be used within IPProvider");
  return context;
};
