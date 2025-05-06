import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'process';

const createNewFolder= async (newFolderName) => {
	try {
		const dirname = cwd();
		const filePath = path.join(dirname, newFolderName);
		await mkdir(filePath, {recursive: false});

		console.log(`The folder ${newFolderName} is created \n\n`);
	} catch (createError) {
		console.error(createError.message);
	}
};

export {
	createNewFolder
};