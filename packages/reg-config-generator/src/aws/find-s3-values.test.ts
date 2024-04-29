import { ENV_KEY, ENV_SECRET } from '@aws-sdk/credential-provider-env';
import {
	ENV_ENDPOINT,
	ENV_REGION,
	ENV_S3_BUCKET_NAME,
	ENV_S3_CUSTOM_DOMAIN,
	findS3Values,
} from './find-s3-values';

describe('findS3Values', () => {
	const ORIGINAL_ENV = process.env;
	afterEach(() => {
		process.env = ORIGINAL_ENV;
	});
	test('should find s3 values', async () => {
		process.env = {
			...ORIGINAL_ENV,
			[ENV_S3_BUCKET_NAME]: 'mock-bucket-name',
			[ENV_S3_CUSTOM_DOMAIN]: 'mock-custom-domain.com',
			[ENV_ENDPOINT]:
				'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.cloudflarestorage.com',
			[ENV_REGION]: 'mock-region',
			[ENV_KEY]: 'mock-access-key-id',
			[ENV_SECRET]: 'mock-secret',
		};
		const result = await findS3Values();
		expect(result).toStrictEqual({
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
		});
	});
	test('should throw error when bucket name is not set', () => {
		process.env = {
			...ORIGINAL_ENV,
			[ENV_S3_BUCKET_NAME]: '',
		};
		expect(findS3Values).toThrowError(
			`Environment variable ${ENV_S3_BUCKET_NAME} is not set.`,
		);
	});
});
