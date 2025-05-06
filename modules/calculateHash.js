import { readFile } from 'fs/promises';
import { createHash } from 'node:crypto';

const calculateHash = async (pathToFile) => {

	try {
		const fileContent = await readFile(pathToFile, 'utf8');
		const resultHash = createHash('sha256').update(fileContent).digest('hex');
	
		console.log('Calculated hash:', resultHash);
	} catch (calculateError) {
		console.error(calculateError.message);
	}

};

export {
	calculateHash
};