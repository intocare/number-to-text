'use strict';
const {Converter, convertToText, addConverter} = require('number-to-text');

const ones = [
	'',
	'Een',
	'Twee',
	'Drie',
	'Vier',
	'Vijf',
	'Zes',
	'Zeven',
	'Acht',
	'Negen',
	'Tien',
	'Elf',
	'Twaalf',
	'Dertien',
	'Veertien',
	'Vijftien',
	'Zestien',
	'Zeventien',
	'Achtien',
	'Negentien'
];
const tens = [
	'',
	'',
	'Twintig',
	'Dertig',
	'Veertig',
	'Vijftig',
	'Zestig',
	'Zeventig',
	'Tachtig',
	'Negentig'
];
const thousands = [
	'',
	'Duizend ',
	' Miljoen ',
	' Miljard ',
	' Biljoen ',
	' Biljard '
];

class BeNlCustomConverter extends Converter {
	constructor() {
		super();
		addConverter('be-nl', this);
	}

	convertToText(number) {
		const valueArray = [];
		if (typeof number === 'number' || number instanceof Number) {
			number = number.toString();
		}

		if (number === '0') {
			return 'nul';
		}

		const splittedNumbers = number.match(
			/.+(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g
		);

		for (let index = 0; index < splittedNumbers.length; ++index) {
			const splitValues = [];
			const splitNumber = splittedNumbers[index];

			if (splitNumber !== '000') {
				if (splitNumber.length > 3) {
					splitValues.push(convertToText(splitNumber));
				} else {
					const firstDigit = splitNumber.charAt(0);

					if (splitNumber.length === 3 && ones[firstDigit]) {
						if (firstDigit === '1') {
							splitValues.push('Honderd');
						} else {
							splitValues.push(ones[firstDigit] + 'honderd');
						}
					}

					if (splitNumber.length >= 2) {
						if (splitNumber.substr(-2, 1) === '1') {
							splitValues.push(ones[splitNumber.substr(-2, 2)]);
						} else {
							const one = ones[splitNumber.substr(-1, 1)];
							const ten = tens[splitNumber.substr(-2, 1)];

							if (one && ten) {
								const separator = one.endsWith('e') ? 'ën' : 'en';

								splitValues.push(one + separator + ten);
							} else {
								splitValues.push(one || ten);
							}
						}
					} else {
						// Do not render `een` for thousands (e.g. no `eenduizend` but `duizend`)
						if (firstDigit !== '1' || splittedNumbers.length !== 2) {
							splitValues.push(ones[splitNumber.charAt(0)]);
						}
					}
				}

				if (thousands[splittedNumbers.length - 1 - index]) {
					if (splitValues.length === 0) {
						splitValues.push(thousands[splittedNumbers.length - 1 - index]);
					} else {
						splitValues.push(
							splitValues.pop() + thousands[splittedNumbers.length - 1 - index]
						);
					}
				}

				if (splitValues.length > 0) {
					valueArray.push(splitValues.join(''));
				}
			}
		}

		return valueArray.join('').trim().toLowerCase();
	}
}

module.exports = new BeNlCustomConverter();
