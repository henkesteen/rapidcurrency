const parseString = require('xml2js').parseString;

const parseXML = (xmlString) => {
    return new Promise((resolve, reject) => {
        parseString(xmlString, (error, res) => {
            if (error) {
                reject(error);
            } else {
                const items = res['gesmes:Envelope'].Cube[0].Cube[0].Cube;
                const currencyObj = {};
                currencyObj.updated = res['gesmes:Envelope'].Cube[0].Cube[0].$.time;
                items.forEach((item) => {
                    const floatNum = parseFloat(item.$.rate);
                    if (!isNaN(floatNum)) {
                        currencyObj[item.$.currency] = floatNum;
                    } else {
                        console.error(`Could not parse: ${item.$}`);
                    }
                });
                resolve(currencyObj);
            }
        });
    });
};

module.exports = {
    parseXML,
};
