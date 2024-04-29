import { readConfig } from './read-reg-config-js';

describe('readConfig', () => {
	const org = process.cwd;
	beforeEach(() => {
		process.cwd = vi.fn().mockReturnValue(import.meta.dirname);
	});
	afterEach(() => {
		process.cwd = org;
	});
	test('should return RegSuitConfiguration', async () => {
		expect(
			await readConfig({ configPath: './__mocks__/mock-success-regconfig.js' }),
		).toStrictEqual({
			core: { actualDir: './__screenshots__', workingDir: '.reg' },
		});
	});
	test('should throw an error when the object is not RegSuitConfiguration', async () => {
		await expect(
			readConfig({ configPath: './__mocks__/mock-failure-regconfig.js' }),
		).rejects.toThrowError('Invalid configuration file.');
	});

	test('should throw an error when the file is not found', async () => {
		await expect(
			readConfig({ configPath: './__mocks__/not-found.js' }),
		).rejects.toThrow(/^Failed to load url/);
	});
});
