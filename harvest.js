const cheerio = require('cheerio');
const axios = require('axios');

module.exports = async (url) => {
  let site = '';
  try {
    site = (await axios.get(url)).data;
  } catch (e) {}
  if (!site) return;

  const name = cheerio
    .load(site)('meta[name=description]')
    .attr('content')
    .split(' ');
  const number = name[name.length - 1].match(/\d+/g);
  if (number) return number[0];
};
