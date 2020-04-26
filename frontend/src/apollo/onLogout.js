import apolloClient from './client';
import {
  LOCAL_STORAGE_CAPCAL_TOKEN_PATH,
} from '../constants';

export default async function onLogout() {
  try {
    window.localStorage.removeItem(LOCAL_STORAGE_CAPCAL_TOKEN_PATH);
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
  }
}
