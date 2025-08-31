import axios from 'axios';
import { getIntelData } from '../../src/services/intel.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getIntelData', () => {
  it('should aggregate data from AbuseIPDB and IPQualityScore', async () => {
    // Mock responses
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('abuseipdb')) {
        return Promise.resolve({
          data: { data: { abuseConfidenceScore: 50, totalReports: 10, isWhitelisted: false } },
        });
      } else if (url.includes('ipqualityscore')) {
        return Promise.resolve({
          data: { fraud_score: 20, vpn: false, proxy: true, ISP: 'Google', country_code: 'US' },
        });
      }
      return Promise.reject('Unknown URL');
    });

    const result = await getIntelData('8.8.8.8');

    expect(result).toEqual({
      ip: '8.8.8.8',
      abuseConfidenceScore: 50,
      totalReports: 10,
      isWhitelisted: false,
      fraudScore: 20,
      isVpn: false,
      isProxy: true,
      isp: 'Google',
      country: 'US',
    });
  });
});
