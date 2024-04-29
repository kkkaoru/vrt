import { parseArgs } from 'node:util';
import { regConfigCoreArgsOptions } from './args-options/reg-config-core.const';
import { findS3Values } from './aws/find-s3-values';
import { buildRegConfig, writeRegConfigJsonFile } from './reg-config';

const { values } = parseArgs({ options: regConfigCoreArgsOptions });
const plugin = findS3Values();
const regConfig = buildRegConfig({ input: values, plugin });

console.info(`Writing regconfig.json to ${values.output}...`);
writeRegConfigJsonFile({ regConfig, file: values.output });
console.info('Done!');
