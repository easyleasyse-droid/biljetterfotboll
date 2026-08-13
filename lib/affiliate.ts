const AFFILIATE_ID = '5jutr9xaq8h3j';

export const getAffiliateUrl = (destinationUrl: string): string => {
  const separator = destinationUrl.includes('?') ? '&' : '?';
  return `${destinationUrl}${separator}a_aid=${AFFILIATE_ID}`;
};