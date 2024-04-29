import type { CoreConfig, RegSuitConfiguration } from 'reg-suit-interface';

function isCoreConfig(
	config: unknown | RegSuitConfiguration,
): config is CoreConfig {
	const [actualDir, workingDir]: (keyof CoreConfig)[] = [
		'actualDir',
		'workingDir',
	];
	return (
		typeof config === 'object' &&
		config !== null &&
		actualDir in config &&
		workingDir in config
	);
}

export function isRegSuitConfiguration(
	config: unknown,
): config is RegSuitConfiguration {
	const core: keyof RegSuitConfiguration = 'core';
	return (
		typeof config === 'object' &&
		config !== null &&
		core in config &&
		isCoreConfig((config as RegSuitConfiguration)[core])
	);
}
