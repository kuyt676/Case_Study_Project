import { isValidIP } from '../../src/utils/validateIP';

describe('isValidIP', () => {
  it('should return true for valid IPv4 addresses', () => {
    expect(isValidIP('8.8.8.8')).toBe(true);
    expect(isValidIP('192.168.1.1')).toBe(true);
  });

  it('should return false for invalid IPv4 addresses', () => {
    expect(isValidIP('999.999.999.999')).toBe(false);
    expect(isValidIP('abc.def.ghi.jkl')).toBe(false);
    expect(isValidIP('')).toBe(false);
  });
});
