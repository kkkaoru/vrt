import {
	type PathOrFileDescriptor,
	type WriteFileOptions,
	writeFileSync,
} from 'node:fs';
import type { RegConfigParams } from './types';

interface WriteRegConfigJsonArgs {
	regConfig: RegConfigParams;
	file?: PathOrFileDescriptor;
	options?: WriteFileOptions;
}

export function writeRegConfigJsonFile({
	regConfig,
	file = 'regconfig.json',
	options = 'utf-8',
}: WriteRegConfigJsonArgs): void {
	const jsonString = JSON.stringify(regConfig, null, 2);
	writeFileSync(file, jsonString, options);
}
