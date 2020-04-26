import apolloClient from './client';
import { LOCAL_STORAGE_CAPCAL_TOKEN_PATH } from '../constants';

export default async function onLogin({ token }) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_CAPCAL_TOKEN_PATH, token);
    await apolloClient.resetStore();
  } catch(e) {
    console.error(e);
  }
}
