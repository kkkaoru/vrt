import type { PluginConfig } from 'reg-publish-s3-plugin/lib/s3-publisher-plugin';
import type { CoreConfig } from 'reg-suit-interface';
import type { regConfigCoreArgsOptions } from '../args-options/reg-config-core.const';

export interface RegConfigParams {
	core: CoreConfig;
	plugins:
		| Record<string, unknown>
		| Record<'reg-publish-s3-plugin', PluginConfig>;
}

export type RegConfigInputArgs = Record<
	keyof typeof regConfigCoreArgsOptions,
	string | undefined
>;
