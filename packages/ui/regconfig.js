//@ts-check

/** @type import('reg-publish-s3-plugin/lib/s3-publisher-plugin').PluginConfig */
const regPublishS3Plugin = {
	bucketName: process.env.AWS_S3_BUCKET_NAME || '',
	customDomain: process.env.AWS_S3_CUSTOM_DOMAIN,
	sdkOptions: {
		region: 'auto',
		endpoint: process.env.AWS_END_POINT,
	},
};

/** @type import('reg-suit-interface').RegSuitConfiguration */
export default {
	core: {
		workingDir: '.reg',
		actualDir: './__screenshots__',
	},
	plugins: {
		'reg-keygen-git-hash-plugin': true,
		'reg-publish-s3-plugin': regPublishS3Plugin,
	},
};
