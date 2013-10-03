/* global define, require, $ */
'use strict';

require.config({
	baseUrl: '/wp-content/themes/bpi/assets/javascripts/',
	shim: {
		jquery: {
			exports: '$'
		},
		lodash: {
			exports: '_'
		}
	},
	paths: {
		jquery: 'lib/jquery/jquery',
		lodash: 'lib/lodash/dist/lodash.compat'
	}
});

require(['main']);