let currencies = {};

const lastUpdated = () => {
    if ('updated' in currencies) {
        return currencies.updated;
    }
    return false;
};

const setCurrencies = (newCurrencies) => {
    newCurrencies.EUR = true;
    if (!lastUpdated()) {
        currencies = newCurrencies;
        console.log(`Currencies were added: ${new Date()}`);
    } else {
        if (newCurrencies.updated !== currencies.updated) {
            currencies = newCurrencies;
            console.log(`Currencies were updated: ${new Date()}`);
        } else {
            console.warn(`Currencies were not updated (no need): ${new Date()}`);
        }
    }
};

const lookUp = (...parameters) => {
    const okCurrencies = parameters.filter((currency) => {
        return (currency in currencies);
    });

    if (parameters.length === okCurrencies.length) {
        return true;
    }

    const notOkCurrencies = parameters.filter((currency) => {
        return ! (currency in currencies);
    });
    console.error(`Currencies not supported: ${notOkCurrencies.toString()}`);
    return false;
};

const missingEUR = (from, to) => {
    return (from !== 'EUR') && (to !== 'EUR');
};

const calc = (from, to, value) => {
    if (from === 'EUR') {
        return (value * currencies[to]).toFixed(2);
    }
    return (value / currencies[from]).toFixed(2);
};

const convert = (from, to, value) => {
    const fromUp = from.toUpperCase();
    const toUp = to.toUpperCase();

    if (lookUp(fromUp, toUp)) {
        if (missingEUR(fromUp, toUp)) {
            // First to EUR
            const eur = calc(fromUp, 'EUR', value);
            // Return target currency
            return calc('EUR', toUp, eur);
        }

        return calc(fromUp, toUp, value);
    }
    return false;
};

module.exports = {
    setCurrencies,
    convert,
};
