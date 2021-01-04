# @intocare/number-to-text

> Extra [number-to-text](https://github.com/Maheshkumar-Kakade/number-to-text) translations

Supported languages:
- `nl-be`
- `fr-be`


## Install

```
npm install --save @intocare/number-to-text
```


## Usage

You can either load specific languages

```js
const numberToText = require('number-to-text');
require('@intocare/number-to-text/nl-be');

numberToText.convertToText(10173, {language: 'nl-be'});
//=> tienduizend honderddrieënzeventig
```

Or you can load all languages

```js
const numberToText = require('number-to-text');
require('@intocare/number-to-text');

numberToText.convertToText(10173, {language: 'nl-be'});
//=> tienduizend honderddrieënzeventig

numberToText.convertToText(10173, {language: 'fr-be'});
//=> dix mille cent septante-trois
```


## Related

- [number-to-text](https://github.com/Maheshkumar-Kakade/number-to-text) - Check TypeScript type definitions
