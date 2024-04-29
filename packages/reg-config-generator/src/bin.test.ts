import { parseArgs } from 'node:util';
import { regConfigCoreArgsOptions } from './args-options/reg-config-core.const';
import { readConfig, writeRegConfigJsonFile } from './reg-config';

vi.mock('node:util', () => ({
	parseArgs: vi.fn().mockReturnValue({
		values: {
			input: './regconfig.js',
			output: './regconfig.json',
		},
	}),
}));

vi.mock('./reg-config/', () => ({
	readConfig: vi.fn().mockReturnValue({
		core: {
			actualDir: './__screenshots__',
			workingDir: '.reg',
		},
		plugins: {
			'reg-publish-s3-plugin': {
				bucketName: 'mock-bucket-name',
				customDomain: 'mock-custom-domain.com',
				sdkOptions: {
					endpoint:
						'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.cloudflarestorage.com',
					region: 'mock-region',
					credentials: {
						accessKeyId: 'mock-access-key-id',
						secretAccessKey: 'mock-secret',
					},
				},
			},
		},
	}),
	writeRegConfigJsonFile: vi.fn(),
}));

// 	const { values } = parseArgs({ options: regConfigCoreArgsOptions });
// const regConfig = await readConfig({ configPath: values.input });

// console.info(`Writing regconfig.json to ${values.output}...`);
// writeRegConfigJsonFile({ regConfig, file: values.output });
// console.info('Done!');

test('should run bin', async () => {
	const mockConsoleInfo = vi.fn();
	vi.spyOn(global.console, 'info').mockImplementation(mockConsoleInfo);
	await import('./bin');
	expect(parseArgs).toHaveBeenCalledTimes(1);
	expect(parseArgs).toHaveBeenCalledWith({ options: regConfigCoreArgsOptions });
	expect(readConfig).toHaveBeenCalledTimes(1);
	expect(readConfig).toHaveBeenCalledWith({ configPath: './regconfig.js' });
	expect(mockConsoleInfo).toHaveBeenCalledTimes(2);
	expect(mockConsoleInfo).toHaveBeenNthCalledWith(
		1,
		'Writing regconfig.json to ./regconfig.json...',
	);
	expect(mockConsoleInfo).toHaveBeenNthCalledWith(2, 'Done!');
	expect(writeRegConfigJsonFile).toHaveBeenCalledTimes(1);
	expect(writeRegConfigJsonFile).toHaveBeenCalledWith({
		regConfig: {
			core: {
				actualDir: './__screenshots__',
				workingDir: '.reg',
			},
			plugins: {
				'reg-publish-s3-plugin': {
					bucketName: 'mock-bucket-name',
					customDomain: 'mock-custom-domain.com',
					sdkOptions: {
						endpoint:
							'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.cloudflarestorage.com',
						region: 'mock-region',
						credentials: {
							accessKeyId: 'mock-access-key-id',
							secretAccessKey: 'mock-secret',
						},
					},
				},
			},
		},
		file: './regconfig.json',
	});
});
