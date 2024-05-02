//@ts-check

/** @type import('reg-suit-interface').RegSuitConfiguration */
export default {
	core: {
		workingDir: '.reg',
		actualDir: './__screenshots__',
	},
	plugins: {
		'reg-keygen-git-hash-plugin': true,
		/** @type import('reg-notify-github-plugin/lib/github-notifier-plugin').GitHubPluginOption */
		'reg-notify-github-plugin': {
			clientId: process.env.REG_SUIT_GITHUB_CLIENT_ID,
		},
		/** @type import('reg-publish-s3-plugin/lib/s3-publisher-plugin').PluginConfig */
		'reg-publish-s3-plugin': {
			bucketName: process.env.AWS_S3_BUCKET_NAME || '',
			customDomain: process.env.AWS_S3_CUSTOM_DOMAIN,
			sdkOptions: {
				region: 'auto',
				endpoint: process.env.AWS_END_POINT,
			},
		},
	},
};
