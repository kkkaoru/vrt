import type { S3ClientConfig } from '@aws-sdk/client-s3';
import { ENV_KEY, ENV_SECRET } from '@aws-sdk/credential-provider-env';
import type { PluginConfig } from 'reg-publish-s3-plugin/lib/s3-publisher-plugin';

export const ENV_S3_BUCKET_NAME = 'AWS_S3_BUCKET_NAME';
export const ENV_S3_CUSTOM_DOMAIN = 'AWS_S3_CUSTOM_DOMAIN';
export const ENV_ENDPOINT = 'AWS_END_POINT';
export const ENV_REGION = 'AWS_REGION';

type S3PluginValues = Pick<PluginConfig, 'bucketName' | 'customDomain'>;

function findS3PluginValues(): S3PluginValues {
	if (
		typeof process.env[ENV_S3_BUCKET_NAME] !== 'string' ||
		process.env[ENV_S3_BUCKET_NAME] === ''
	) {
		throw new Error(`Environment variable ${ENV_S3_BUCKET_NAME} is not set.`);
	}
	return {
		bucketName: process.env[ENV_S3_BUCKET_NAME],
		customDomain: process.env[ENV_S3_CUSTOM_DOMAIN],
	};
}

function findAwdSdkOptions(): S3ClientConfig {
	return {
		region: process.env[ENV_REGION],
		endpoint: process.env[ENV_ENDPOINT],
		credentials: {
			accessKeyId: process.env[ENV_KEY],
			secretAccessKey: process.env[ENV_SECRET],
		},
	};
}

export function findS3Values(): PluginConfig {
	const { bucketName, customDomain } = findS3PluginValues();
	const sdkOptions = findAwdSdkOptions();
	return {
		bucketName,
		customDomain,
		sdkOptions,
	};
}
