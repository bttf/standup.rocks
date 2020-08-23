import {client} from './apollo';
import {LOCAL_STORAGE_TOKEN} from './constants';

export async function onLogin({token}) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    await client.resetStore();
  } catch (e) {
    console.error(e);
  }
}

export async function onLogout() {
  try {
    window.localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    await client.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
  }
}

