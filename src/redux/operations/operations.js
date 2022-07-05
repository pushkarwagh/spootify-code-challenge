import axios from 'axios';
import qs from 'qs';
import config from '../../config';

const { api } = config;

export default async function makeRequest(path, resourceType,os) {
  const offset = os | 0;
  const limit = 20;
  const token = localStorage.getItem("token");
  const res = await axios.get(
    `${api.baseUrl}/browse/${path}?locale=en_US&offset=${offset}&limit=${limit}`,
    {  headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data[resourceType].items;
}


export  async function getToken() {
  const { data: { access_token: token } } = await axios.post(
    api.authUrl,
    qs.stringify({ 'grant_type': 'client_credentials' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${window.btoa(`${api.clientId}:${api.clientSecret}`)}`
      }
    }
  );
 
  return token;
}


