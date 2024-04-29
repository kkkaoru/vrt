import type { ParseArgsConfig } from 'node:util';

export const regConfigCoreArgsOptions = {
	output: {
		type: 'string',
		short: 'o',
		default: './regconfig.json',
	},
	'working-dir': {
		type: 'string',
		default: '.reg',
	},
	'actual-dir': {
		type: 'string',
		default: './__screenshots__',
	},
} satisfies ParseArgsConfig['options'];
