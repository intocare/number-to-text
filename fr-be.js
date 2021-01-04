'use strict';
const {Converter, convertToText, addConverter} = require('number-to-text');

const ones = [
	'',
	'Un',
	'Deux',
	'Trois',
	'Quatre',
	'Cinq',
	'Six',
	'Sept',
	'Huit',
	'Neuf',
	'Dix',
	'Onze',
	'Douze',
	'Treize',
	'Quatorze',
	'Quinze',
	'Seize',
	'Dix-sept',
	'Dix-huit',
	'Dix-neuf'
];
const tens = ['', '', 'Vingt', 'Trente', 'Quarante', 'Cinquante', 'Soixante', 'Septante', 'Quatre-vingt', 'Nonante'];
const thousands = ['', ' Mille ', ' Million ', ' Milliard ', ' Billion '];
const thousandsPlural = ['', ' Mille ', ' Millions ', ' Milliards ', ' Billions '];

class FrBeCustomConverter extends Converter {
	constructor() {
		super();
		addConverter('fr-be', this);
	}

	convertToText(number) {
		const valueArray = [];
		if (typeof number === 'number' || number instanceof Number) {
			number = number.toString();
		}

		if (number === '0') {
			return 'zéro';
		}

		const splittedNumbers = number.match(/.+(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g);

		for (let index = 0; index < splittedNumbers.length; ++index) {
			const splitValues = [];
			const splitNumber = splittedNumbers[index];

			// We don't have to render anything if we just have 3 zeros
			if (splitNumber !== '000') {
				if (splitNumber.length > 3) {
					// If our number is longer than 3 digits, split it up again
					splitValues.push(convertToText(splitNumber));
				} else {
					const firstDigit = splitNumber.charAt(0);

					// If we have 3-digit number, we have to handle hundreds first
					if (splitNumber.length === 3 && ones[firstDigit]) {
						if (firstDigit === '1') {
							// If the first digit is a `one`, it's just `cent`
							splitValues.push('cent');
						} else {
							// If the first digit is not a `one`, we have to render how many times `cent`.
							// We also need an additional `s` if it's a rounded number.
							const plural = splitNumber.substr(-2, 2) === '00' ? 's' : '';

							splitValues.push(ones[firstDigit] + ' cent' + plural);
						}
					}

					// If we have a 2- or 3-digit number, we have to handle tens
					if (splitNumber.length >= 2) {
						const divider = splitNumber.length === 3 && firstDigit !== '0' ? ' ' : '';

						if (splitNumber.substr(-2, 1) === '1') {
							splitValues.push(divider + ones[splitNumber.substr(-2, 2)]);
						} else {
							const oneDigit = splitNumber.substr(-1, 1);
							const tenDigit = splitNumber.substr(-2, 1);

							const one = ones[oneDigit];
							const ten = tens[tenDigit];

							if (one && ten) {
								// If the last digit is a `1`, use ` et ` as separator, otherwise use `-`.
								const separator = oneDigit === '1' && tenDigit !== '8' ? ' et ' : '-';

								splitValues.push(divider + ten + separator + one);
							} else if (one) {
								splitValues.push(divider + one);
							} else if (ten) {
								const plural = tenDigit === '8' && index === splittedNumbers.length - 1 ? 's' : '';

								splitValues.push(divider + ten + plural);
							}
						}
					} else {
						// Do not render `un` for thousands (e.g. no `un mille` but `mille`)
						if (firstDigit !== '1' || splittedNumbers.length !== 2) {
							splitValues.push(ones[splitNumber.charAt(0)]);
						}
					}
				}

				if (thousands[splittedNumbers.length - 1 - index]) {
					const value = splitValues.pop();
					const t = !value || value.toLowerCase() === 'un' ? thousands : thousandsPlural;

					splitValues.push((value || '') + t[splittedNumbers.length - 1 - index]);
				}

				if (splitValues.length > 0) {
					valueArray.push(splitValues.join(''));
				}
			}
		}

		return valueArray.join('').trim().toLowerCase();
	}
}

module.exports = new FrBeCustomConverter();
