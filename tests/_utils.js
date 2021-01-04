'use strict';
const numberToText = require('number-to-text');
require('..');

module.exports = language => {
	function macro(t, input, expected) {
		t.is(
			numberToText.convertToText(input, {language: `be-${language}`}),
			expected
		);
	}

	macro.title = (providedTitle, input) => `${providedTitle || ''} ${input}`;

	return macro;
};
