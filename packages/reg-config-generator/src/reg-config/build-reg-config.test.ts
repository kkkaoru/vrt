import { buildRegConfig } from './build-reg-config';

test('should build reg config in args', () => {
	expect(
		buildRegConfig({
			input: {
				output: './regconfig.json',
				'working-dir': 'mock-working-dir',
				'actual-dir': 'mock-actual-dir',
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
		}),
	).toStrictEqual({
		core: {
			actualDir: 'mock-actual-dir',
			workingDir: 'mock-working-dir',
		},
		plugins: {
			'reg-keygen-git-hash-plugin': true,
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
	});
});

test('should build reg config includes default', () => {
	expect(
		buildRegConfig({
			input: {
				output: './regconfig.json',
				'working-dir': undefined,
				'actual-dir': undefined,
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
		}),
	).toStrictEqual({
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
	});
});
