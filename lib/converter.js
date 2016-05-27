let currencies = {};

const lastUpdated = () => {
    if ('updated' in currencies) {
        return currencies.updated;
    }
    return false;
};

const setCurrencies = (newCurrencies) => {
    if (!lastUpdated()) {
        currencies = newCurrencies;
        console.log(`Currencies were added: ${new Date()}`);
    } else {
        if (newCurrencies.updated !== currencies.updated) {
            currencies = newCurrencies;
            console.log(`Currencies were updated: ${new Date()}`);
        } else {
            console.log(`Currencies were not updated (no need): ${new Date()}`);
        }
    }
};

const lookUp = (currency) => {
    if (currency === 'EUR') {
        return true;
    }
    return (currency in currencies);
};

const missingEUR = (from, to) => {
    return (from !== 'EUR') && (to !== 'EUR');
};

const convert = (from, to, value) => {
    return new Promise((resolve, reject) => {
        if (missingEUR(from, to)) {
            reject('EUR must be in the calculation (future feature)');
        }
        if (lookUp(from) && lookUp(to)) {
            if (from === 'EUR') {
                const newValue = (value * currencies[to]).toFixed(2);
                resolve(newValue);
            }
            const newValue = (value / currencies[from]).toFixed(2);
            resolve(newValue);
        }
        reject('Currencies could not be looked up');
    });
};

module.exports = {
    setCurrencies,
    convert,
    lastUpdated,
};
