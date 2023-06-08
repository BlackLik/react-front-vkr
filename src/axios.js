import { API_BACKEND } from './config';

async function getApiData(url_path) {
  const response = await fetch(API_BACKEND + url_path);
  const data = await response.json();
  return data;
}

async function getApiDataWithParams(url_path, params) {
  const response = await fetch(API_BACKEND + url_path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
}

async function getApiAllGender() {
  return await getApiData('genders');
}

async function getIp() {
  const ip = localStorage.getItem('ip');
  if (ip) {
    return ip;
  } else {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    localStorage.setItem('ip', data.query);
    return data.query;
  }
}

export { getApiData, getApiDataWithParams, getApiAllGender, getIp };
