import type { ParseArgsConfig } from 'node:util';

export const regConfigCoreArgsOptions = {
	output: {
		type: 'string',
		short: 'o',
		default: './regconfig.json',
	},
	input: {
		type: 'string',
		short: 'i',
		default: './regconfig.js',
	},
} satisfies ParseArgsConfig['options'];
