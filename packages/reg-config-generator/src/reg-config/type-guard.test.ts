import { isRegSuitConfiguration } from './type-guard';
test('should return true when the object is RegSuitConfiguration', () => {
	expect(
		isRegSuitConfiguration({
			core: { actualDir: './__screenshots__', workingDir: '.reg' },
		}),
	).toBe(true);
});

test('should return false when the object is not RegSuitConfiguration', () => {
	expect(isRegSuitConfiguration({})).toBe(false);
	expect(isRegSuitConfiguration({ core: {} })).toBe(false);
	expect(
		isRegSuitConfiguration({ core: { actualDir: './__screenshots__' } }),
	).toBe(false);
	expect(isRegSuitConfiguration({ core: { workingDir: '.reg' } })).toBe(false);
});
