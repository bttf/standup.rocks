const { NODE_ENV } = process.env;
export const CAPCAL_API_HOST =
  NODE_ENV === 'production' ? 'https://api.capcal.redpine.software' : 'http://localhost:3000';
export const LOCAL_STORAGE_CAPCAL_TOKEN_PATH = 'cap-cal-token';
export const PLAID_PUBLIC_KEY = 'd7ec361c6b927580ced1cc53c2405b';
export const PLAID_ITEM_WEBHOOK =
  NODE_ENV === 'production' ? 'https://webhooks.capcal.redpine.software/plaid-item' : null;
export const PLAID_ENV = NODE_ENV === 'production' ? 'development' : 'sandbox';
