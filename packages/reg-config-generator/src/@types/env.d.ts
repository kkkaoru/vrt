/// <reference types="node" />
import {
	ENV_ENDPOINT,
	ENV_REGION,
	ENV_S3_BUCKET_NAME,
	ENV_S3_CUSTOM_DOMAIN,
} from '../types/aws-keys.const';

declare namespace NodeJS {
	interface ProcessEnv {
		[ENV_S3_BUCKET_NAME]: string;
		[ENV_S3_CUSTOM_DOMAIN]: string;
		[ENV_REGION]: string;
		[ENV_ENDPOINT]: string;
		AWS_ACCESS_KEY_ID: string;
		AWS_SECRET_ACCESS_KEY: string;
	}
}
