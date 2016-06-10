const { getFeed } = require('./lib/ecb-connect');
const { parseXML } = require('./lib/parser');
const { setCurrencies, convert } = require('./lib/converter');
const packageInfo = require('./package.json');

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

// Initialize
(() => {
    console.log(`Initializing RapidCurrency v${packageInfo.version}`);
    updateCurrencies();
})();

module.exports = {
    convert,
    updateCurrencies,
};
