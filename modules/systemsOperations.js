import os from 'node:os';
import { OS_ARGUMENTS } from '../utils/constants.js';

const handleOperationSystemCommands = (commandArgument) => {
	switch (commandArgument) {
		case OS_ARGUMENTS.HOMEDIR:
			console.log('Home directory:', os.homedir() );
			break;
		case OS_ARGUMENTS.EOL:
			console.log('EOL: ', os.EOL);
			break;
		case OS_ARGUMENTS.CPUS:
			const cpus = os.cpus();
  			const results = cpus.map((cpu, index) => {
				const speedGHz = (cpu.speed / 1000).toFixed(2);
				return {
					CPU: index + 1,
					Model: cpu.model,
					SpeedInGHz: speedGHz
				}
			});
			console.table(results);
			break;
		case OS_ARGUMENTS.USERNAME:
			const userInfo = os.userInfo();
			console.log('Username: ', userInfo.username);
			break;
		case OS_ARGUMENTS.ARCHITECTURE:
			const arch = os.arch();
			console.log('Architecture: ', arch);
			break;
		default:
			console.log('Invalid entry, please try again \n');
			break;
	}
}

export {
	handleOperationSystemCommands
};