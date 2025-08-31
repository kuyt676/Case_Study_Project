
export async function fetchIPData(ip: string) {
  const res = await fetch(`http://localhost:3000/api/intel?ip=${ip}`);
  if (!res.ok) throw new Error("Failed to fetch IP data");
  return res.json();
}

