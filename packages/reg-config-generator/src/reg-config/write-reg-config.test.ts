import { writeFileSync } from 'node:fs';
import { writeRegConfigJsonFile } from './write-reg-config';
vi.mock('node:fs', async () => ({
	...(await vi.importActual('node:fs')),
	writeFileSync: vi.fn(),
}));

test('should write reg config json file', () => {
	writeRegConfigJsonFile({
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
		file: 'regconfig.json',
	});

	expect(writeFileSync).toHaveBeenCalledTimes(1);
	expect(writeFileSync).toHaveBeenCalledWith(
		'regconfig.json',
		JSON.stringify(
			{
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
			null,
			2,
		),
		'utf-8',
	);
});
