import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';

const createNewFile = async (newFileName) => {
	const dirname = cwd();
	const [base, extension] = newFileName.split('.');
	let filePath = '';
	if(extension) {
		filePath = path.join(dirname, newFileName);
	} else {
		filePath = path.join(dirname, base.concat('.txt'));
	}
    
	try {
		await fs.writeFile(filePath, '');
	} catch (error) {
		console.log(error);
	}
    
};

export {
	createNewFile
};