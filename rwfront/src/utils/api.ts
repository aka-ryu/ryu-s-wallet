import Config from 'react-native-config';
import {store} from '../redux/store';

const baseUrl = Config.API_URL;

const Header = () => {
  const header = new Headers();
  header.append('Content-Type', 'application/json');

  const userState = store.getState().user;
  if (userState.is_login && userState.token !== '') {
    header.append('Authorization', `Bearer ${userState.token}`);
  }
  return header;
};

// const authHeader = async () => {
//   const headers = new Headers();
//   const user = await getStorageData('@User');
//   headers.append('Content-Type', 'application/json');
//   headers.append('user_index', user.id);
//   return headers;
// };

export const get = async (url: string) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: Header(),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('GET request failed:', error);
    throw error;
  }
};

export const post = async (url: string, body: object) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: Header(),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('POST request failed:', error);
    throw error;
  }
};
