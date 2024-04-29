import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RegSuitConfiguration } from 'reg-suit-interface';
import { regConfigCoreArgsOptions } from '../args-options/reg-config-core.const';
import { isRegSuitConfiguration } from './type-guard';

interface ReadConfigArgs {
	configPath?: string;
}

export async function readConfig({
	configPath = regConfigCoreArgsOptions.input.default,
}: ReadConfigArgs): Promise<RegSuitConfiguration> {
	const configFilePath = resolve(process.cwd(), configPath);
	const fileUrl = pathToFileURL(configFilePath);
	const config = (
		await import(fileUrl.href).catch((e) => {
			throw new Error(e.message);
		})
	).default;
	if (!isRegSuitConfiguration(config)) {
		throw new Error('Invalid configuration file.');
	}
	return config;
}
