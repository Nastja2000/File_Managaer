import fs from 'fs/promises';
import { cwd } from 'node:process';

const formatList = (list) => {
	console.log(list[1].name, list[1].isFile(), list[1].isDirectory())
	let folders = list.filter((item) => item.isDirectory());
	if (folders.length !== 0){
		folders = folders
					.map((item) => {
						return {
							Name: item.name,
							Type: 'directory'
						};
					})
					.sort((a, b) => a.Name.localeCompare(b.Name));
	}
	let files = list.filter((item) => item.isFile());
	if (files.length !== 0){
		files = files
				.map((item) => {
					return {
						Name: item.name,
						Type: 'file'
					};
				})
				.sort((a, b) => a.Name.localeCompare(b.Name));;
	}

	if (folders.length) {
		return folders.concat(files);
	} else {
		return files;
	}
	
};

const list = async (targerDirPath) => {
    try {
        await fs.access(targerDirPath, fs.constants.F_OK);
    } catch (accessError) {
        throw new Error('Target path is not available');
    }

    try {
        const listOfFiles = await fs.readdir(targerDirPath, {withFileTypes: true});
		console.log(listOfFiles);
        const resultList = formatList(listOfFiles);

		console.table(resultList);
    } catch (readDirError) {
        throw readDirError;
    }
};

export {
	list
};