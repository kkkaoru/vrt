import { parseArgs } from 'node:util';
import { regConfigCoreArgsOptions } from './args-options/reg-config-core.const';
import { readConfig, writeRegConfigJsonFile } from './reg-config';

async function bin() {
	const { values } = parseArgs({ options: regConfigCoreArgsOptions });
	const regConfig = await readConfig({ configPath: values.input });

	console.info(`Writing regconfig.json to ${values.output}...`);
	writeRegConfigJsonFile({ regConfig, file: values.output });
	console.info('Done!');
}

bin();
