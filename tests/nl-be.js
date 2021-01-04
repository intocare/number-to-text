'use strict';
const test = require('ava');
const macro = require('./_utils');

const tests = new Map([
	[0, 'nul'],
	[1, 'een'],
	[5, 'vijf'],
	[18, 'achtien'],
	[25, 'vijfentwintig'],
	[43, 'drieënveertig'],
	[83, 'drieëntachtig'],
	[100, 'honderd'],
	[101, 'honderdeen'],
	[112, 'honderdtwaalf'],
	[170, 'honderdzeventig'],
	[143, 'honderddrieënveertig'],
	[175, 'honderdvijfenzeventig'],
	[235, 'tweehonderdvijfendertig'],
	[800, 'achthonderd'],
	[1101, 'duizend honderdeen'],
	[1500, 'duizend vijfhonderd'],
	[2101, 'tweeduizend honderdeen'],
	[2173, 'tweeduizend honderddrieënzeventig'],
	[10173, 'tienduizend honderddrieënzeventig'],
	[18173, 'achtienduizend honderddrieënzeventig'],
	[28064, 'achtentwintigduizend vierenzestig'],
	[53173, 'drieënvijftigduizend honderddrieënzeventig'],
	[92173, 'tweeënnegentigduizend honderddrieënzeventig'],
	[142101, 'honderdtweeënveertigduizend honderdeen'],
	[271850, 'tweehonderdeenenzeventigduizend achthonderdvijftig'],
	[1000000, 'een miljoen'],
	[3000000, 'drie miljoen'],
	[3000000000, 'drie miljard'],
	[1000000000, 'een miljard'],
	[5200000000, 'vijf miljard tweehonderd miljoen'],
	[3000000005, 'drie miljard vijf'],
	[
		347625728221,
		'driehonderdzevenenveertig miljard zeshonderdvijfentwintig miljoen zevenhonderdachtentwintigduizend tweehonderdeenentwintig'
	]
]);

for (const [input, expected] of tests.entries()) {
	test(macro('nl'), input, expected);
}
