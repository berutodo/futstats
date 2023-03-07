const axios = require('axios');
const cheerio = require('cheerio');

async function scraping() {
    const url = 'https://www.example.com';

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const results = [];

    $('.result').each((index, element) => {
        const title = $(element).find('.title').text();
        const description = $(element).find('.description').text();

        results.push({ title, description });
    });
    console.log(results)
    return results;
}

module.exports = scraping;