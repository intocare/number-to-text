# @intocare/number-to-text

> Extra [number-to-text](https://github.com/Maheshkumar-Kakade/number-to-text) translations

Supported languages:
- `be-nl`
- `be-fr`


## Install

```
npm install --save @intocare/number-to-text
```


## Usage

You can either load specific languages

```js
const numberToText = require('number-to-text');
require('@intocare/number-to-text/be-nl');

numberToText.convertToText(10173, {language: 'be-nl'});
//=> tienduizend honderddrieënzeventig
```

Or you can load all languages

```js
const numberToText = require('number-to-text');
require('@intocare/number-to-text');

numberToText.convertToText(10173, {language: 'be-nl'});
//=> tienduizend honderddrieënzeventig

numberToText.convertToText(10173, {language: 'be-fr'});
//=> dix mille cent septante-trois
```


## Related

- [number-to-text](https://github.com/Maheshkumar-Kakade/number-to-text) - Check TypeScript type definitions
