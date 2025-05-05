import { cwd, chdir} from 'node:process';
import path from 'node:path';
import { COMMANDS } from '../utils/constants.js';

const changeDirectory = (command, pathValue) => {
	const rootDirectory = path.parse(cwd()).root;

	if (cwd() === rootDirectory && command === COMMANDS.NAVIGATION_UP){
		console.error("You've already in the root directory. It's not possible to go upper");
	} else {
		try {
			chdir(pathValue);
		} catch (err) {
			console.error(err);
			throw new Error('Operation failed');
		}
	}
};

export {
	changeDirectory
  };
  