const axios = require('axios');

const BASE_URL = 'https://api.imgflip.com';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const imgQuery = async (query) => {
  const queryString = Object.entries(query)
    .map((e) => `${e[0]}=${e[1]}`)
    .join('&');

  const {
    data: {
      data: { url },
    },
  } = await axios.get(`${BASE_URL}/caption_image?${queryString}`);

  return url;
};

const getMemes = async () => {
  const {
    data: {
      data: { memes },
    },
  } = await axios.get(`${BASE_URL}/get_memes`);

  return memes.map((e) => e.id);
};

export { getMemes, imgQuery, sleep };
