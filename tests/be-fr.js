'use strict';
const test = require('ava');
const macro = require('./_utils');

/**
 * http://www.heartandcoeur.com/convert/convert_chiffre_lettre.php
 */
const tests = new Map([
	[0, 'zéro'],
	[1, 'un'],
	[5, 'cinq'],
	[18, 'dix-huit'],
	[25, 'vingt-cinq'],
	[41, 'quarante et un'],
	[43, 'quarante-trois'],
	[73, 'septante-trois'],
	[80, 'quatre-vingts'],
	[81, 'quatre-vingt-un'],
	[83, 'quatre-vingt-trois'],
	[93, 'nonante-trois'],
	[100, 'cent'],
	[101, 'cent un'],
	[112, 'cent douze'],
	[143, 'cent quarante-trois'],
	[170, 'cent septante'],
	[175, 'cent septante-cinq'],
	[221, 'deux cent vingt et un'],
	[235, 'deux cent trente-cinq'],
	[800, 'huit cents'],
	[1001, 'mille un'],
	[1101, 'mille cent un'],
	[1500, 'mille cinq cents'],
	[2000, 'deux mille'],
	[2101, 'deux mille cent un'],
	[2173, 'deux mille cent septante-trois'],
	[10173, 'dix mille cent septante-trois'],
	[18163, 'dix-huit mille cent soixante-trois'],
	[28064, 'vingt-huit mille soixante-quatre'],
	[53173, 'cinquante-trois mille cent septante-trois'],
	[92163, 'nonante-deux mille cent soixante-trois'],
	[142101, 'cent quarante-deux mille cent un'],
	[271850, 'deux cent septante et un mille huit cent cinquante'],
	[1000000, 'un million'],
	[3000000, 'trois millions'],
	[3015065, 'trois millions quinze mille soixante-cinq'],
	[1000000000, 'un milliard'],
	[3000000000, 'trois milliards'],
	[5200000000, 'cinq milliards deux cents millions'],
	[3000000005, 'trois milliards cinq'],
	[3000080080, 'trois milliards quatre-vingt mille quatre-vingts'],
	[
		347625728221,
		'trois cent quarante-sept milliards six cent vingt-cinq millions sept cent vingt-huit mille deux cent vingt et un'
	],
	[1000000000000, 'un billion'],
	[
		100347625728221,
		'cent billions trois cent quarante-sept milliards six cent vingt-cinq millions sept cent vingt-huit mille deux cent vingt et un'
	],
	[
		835347625728221,
		'huit cent trente-cinq billions trois cent quarante-sept milliards six cent vingt-cinq millions sept cent vingt-huit mille deux cent vingt et un'
	]
]);

for (const [input, expected] of tests.entries()) {
	test(macro('fr'), input, expected);
}
