import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';

const renameFile = async (pathToFile, newFileName) => {
	const [base, extension] = newFileName.split('.');
    const targetFilePathDetails = path.parse(pathToFile),
		  fileDir = targetFilePathDetails.dir === '' ? cwd() : targetFilePathDetails.dir,
		  fileExt = targetFilePathDetails.ext;
	let newFilePath = '';

	if(extension) {
		newFilePath = fileDir.concat('\\', newFileName);
	} else {
		newFilePath = fileDir.concat('\\', newFileName, fileExt);
	}

	try {
		await fs.access(newFilePath, fs.constants.F_OK);
		console.error('This file already exist, please try again. \n\n');
	} catch (accessError) {
		if (accessError.code !== 'ENOENT') {
			console.error(accessError.message);
		}
	}

	try {
		await fs.rename(pathToFile, newFilePath);
		console.error(`File ${pathToFile} is renamed to ${newFileName} \n\n`);
	} catch (renameError) {
		console.error(renameError.message);
	}

}
export {
	renameFile
};