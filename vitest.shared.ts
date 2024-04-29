import type { InlineConfig } from 'vitest';

export const test: InlineConfig = {
	globals: true,
	coverage: {
		enabled: true,
		provider: 'v8',
		thresholds:
			process.env.ENABLE_TEST_COVERAGE_THRESHOLDS === 'true'
				? { statements: 80, branches: 80, functions: 80, lines: 80 }
				: undefined,
		exclude: [
			'**/*/index.ts',
			'**/*/*.types.ts',
			'**/*/*.d.ts',
			'**/*/*.js',
			'*.cjs',
			'apps',
			'src/bin',
			'**/const/*.*',
			'**/*/*.const.ts',
		],
	},
	clearMocks: true,
};
