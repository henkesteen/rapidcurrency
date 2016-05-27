const { getFeed } = require('./lib/ecb-connect');
const { parseXML } = require('./lib/parser');
const { setCurrencies, convert } = require('./lib/converter');

const updateCurrencies = () => {
    getFeed()
        .then(parseXML)
        .then((result) => {
            setCurrencies(result);
        })
        .catch((error) => {
            console.error(error);
        });
};

const init = () => {
    console.log('Initializing RapidCurrency');
    updateCurrencies();
};

module.exports = {
    init,
    convert,
    updateCurrencies,
};

init();

setInterval(updateCurrencies, 1000);