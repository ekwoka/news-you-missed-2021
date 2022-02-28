import fetch from 'node-fetch';
import { config } from 'dotenv';
import { URL, URLSearchParams } from 'url';
import { formattedReturn } from './helpers';

config();

const url = new URL('https://api.bing.microsoft.com/v7.0/images/search');

const params = {
  count: 1,
};

export const handler = async ({ queryStringParameters }) => {
  try {
    Object.assign(params, queryStringParameters);
    params.q = `${params.q} news`;
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY,
      },
    });
    if (!response.ok) throw response.statusText;
    const { value } = await response.json();
    console.log('Successfully fetched image:', params.q);
    return formattedReturn(200, value[0] || {});
  } catch (e) {
    console.log('Error fetching image:', e);
    return formattedReturn(418, { error: e });
  }
};
