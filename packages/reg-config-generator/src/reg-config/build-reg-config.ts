import type { PluginConfig } from 'reg-publish-s3-plugin/lib/s3-publisher-plugin';
import { regConfigCoreArgsOptions } from '../args-options/reg-config-core.const';
import type { RegConfigInputArgs, RegConfigParams } from './types';

interface BuildRegConfigArgs {
	input: RegConfigInputArgs;
	plugin: PluginConfig;
}

export function buildRegConfig({
	input,
	plugin,
}: BuildRegConfigArgs): RegConfigParams {
	return {
		core: {
			workingDir:
				input['working-dir'] || regConfigCoreArgsOptions['working-dir'].default,
			actualDir:
				input['actual-dir'] || regConfigCoreArgsOptions['actual-dir'].default,
		},
		plugins: {
			'reg-keygen-git-hash-plugin': true,
			'reg-publish-s3-plugin': plugin,
		},
	};
}
