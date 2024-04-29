import {
	type PathOrFileDescriptor,
	type WriteFileOptions,
	writeFileSync,
} from 'node:fs';
import type { RegSuitConfiguration } from 'reg-suit-interface';
import { regConfigCoreArgsOptions } from '../args-options/reg-config-core.const';

interface WriteRegConfigJsonArgs {
	regConfig: RegSuitConfiguration;
	file?: PathOrFileDescriptor;
	options?: WriteFileOptions;
}

export function writeRegConfigJsonFile({
	regConfig,
	file = regConfigCoreArgsOptions.output.default,
	options = 'utf-8',
}: WriteRegConfigJsonArgs): void {
	const jsonString = JSON.stringify(regConfig, null, 2);
	writeFileSync(file, jsonString, options);
}
