
export function calculateRiskLevel(data: {
  abuseConfidenceScore: number;
  fraudScore: number;
  isVpn: boolean;
  isProxy: boolean;
}): 'Low' | 'Medium' | 'High' {
  const { abuseConfidenceScore, fraudScore, isVpn, isProxy } = data;

  if (abuseConfidenceScore > 70 || fraudScore > 70 || isVpn || isProxy) {
    return 'High';
  } else if (abuseConfidenceScore > 30 || fraudScore > 30) {
    return 'Medium';
  } else {
    return 'Low';
  }
}
