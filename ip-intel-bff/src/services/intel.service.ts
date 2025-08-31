import axios from 'axios';
import dotenv from 'dotenv';
import { calculateRiskLevel } from '../utils/riskLevel';

dotenv.config();
console.log(process.env.ABUSEIPDB_KEY)
const ABUSEIPDB_KEY = process.env.ABUSEIPDB_KEY;
const IPQUALITYSCORE_KEY = process.env.IPQUALITYSCORE_KEY;

export async function getIntelData(ip: string) {


    try {
        const abuseRes = await axios.get('https://api.abuseipdb.com/api/v2/check', {
            params: { ipAddress: ip, maxAgeInDays: 90 },
            headers: { Key: ABUSEIPDB_KEY, Accept: 'application/json' },
        });

        const iqRes = await axios.get(
            `https://ipqualityscore.com/api/json/ip/${IPQUALITYSCORE_KEY}/${ip}`
        );
        const result = {
            ip,
            abuseConfidenceScore: abuseRes.data.data.abuseConfidenceScore,
            totalReports: abuseRes.data.data.totalReports,
            isWhitelisted: abuseRes.data.data.isWhitelisted,

            fraudScore: iqRes.data.fraud_score,
            isVpn: iqRes.data.vpn,
            isProxy: iqRes.data.proxy,
            isp: iqRes.data.ISP,
            country: iqRes.data.country_code,
        };
        const riskLevel = calculateRiskLevel({
            abuseConfidenceScore: result.abuseConfidenceScore,
            fraudScore: result.fraudScore,
            isVpn: result.isVpn,
            isProxy: result.isProxy
        });

        return { ...result, riskLevel };
    } 
    catch (error) {
        if (axios.isAxiosError(error)) {
            // בדיקה אם הקוד הוא 429
            if (error.response?.status === 429) {
                throw new Error('Rate limit reached, try again later.');
            }
            // אפשר לטפל גם בשגיאות אחרות אם רוצים
            throw new Error(error.response?.data || error.message);
        }
        throw error;

    }
}
