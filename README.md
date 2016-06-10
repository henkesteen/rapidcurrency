# rapidcurrency

## Info
This is a currency converter written in javascript using the European Central Banks daily 'Euro foreign exchange reference rates' feed.

The feed is updated 14:15 CET everyday (As of 1 July 2016 the reference rates will be updated at around 16:00 CET.)

The currencies are fetched when the module is required. You can use the `updateCurrencies` function to check for changes whenever you want.

There are some ES2015 (ES6) features in use, so a newer nodejs version is needed.

## How to
```javascript
const rapidcurrency = require('rapidcurrency');
// or use destructuring
const {convert, updateCurrencies} = require('rapidcurrency');

// This will convert 100 sek to euro
const eur = convert('sek', 'eur', 100);

// You can use the updateCurrencies to update once an hour or whenever you want.
setInterval(updateCurrencies, 36000000);
```

## Included currencies

You can read more about which currencies are supported on this page: https://www.ecb.europa.eu/stats/exchange/eurofxref/html/index.en.html
