const request = require('request');
const feedURL = 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

const getFeed = () => {
    return new Promise((resolve, reject) => {
        request(feedURL, (error, response, body) => {
            if (error) {
                reject(`Error: ${error}`);
            } else {
                resolve(body);
            }
        });
    });
};

module.exports = {
    getFeed,
};
