import { parseArgs } from 'node:util';
import { regConfigCoreArgsOptions } from './args-options/reg-config-core.const';
import { findS3Values } from './aws/find-s3-values';
import { buildRegConfig, writeRegConfigJsonFile } from './reg-config';

vi.mock('node:util', () => ({
	parseArgs: vi.fn().mockReturnValue({
		values: {
			output: './regconfig.json',
			'working-dir': '.reg',
			'actual-dir': './__screenshots__',
		},
	}),
}));

vi.mock('./aws/find-s3-values.ts', () => ({
	findS3Values: vi.fn().mockReturnValue({
		bucketName: 'mock-bucket-name',
		customDomain: 'mock-custom-domain.com',
		sdkOptions: {
			endpoint: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.cloudflarestorage.com',
			region: 'mock-region',
			credentials: {
				accessKeyId: 'mock-access-key-id',
				secretAccessKey: 'mock-secret',
			},
		},
	}),
}));

vi.mock('./reg-config/', () => ({
	buildRegConfig: vi.fn().mockReturnValue({
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

test('should run bin', async () => {
	const mockConsoleInfo = vi.fn();
	vi.spyOn(global.console, 'info').mockImplementation(mockConsoleInfo);
	await import('./bin');
	expect(parseArgs).toHaveBeenCalledTimes(1);
	expect(parseArgs).toHaveBeenCalledWith({ options: regConfigCoreArgsOptions });
	expect(findS3Values).toHaveBeenCalledTimes(1);
	expect(buildRegConfig).toHaveBeenCalledTimes(1);
	expect(buildRegConfig).toHaveBeenCalledWith({
		input: {
			output: './regconfig.json',
			'working-dir': '.reg',
			'actual-dir': './__screenshots__',
		},
		plugin: {
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
	});
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
