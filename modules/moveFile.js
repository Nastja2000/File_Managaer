import { createReadStream, createWriteStream } from 'node:fs';
import fs from 'fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const moveFile = async (sourcePathToFile, directPathToNewPlace) => {
	const sourcePathDetails = path.parse(sourcePathToFile);
	let resultMovePath = path.resolve(directPathToNewPlace.concat('\\', sourcePathDetails.base));
	
	try {
		const readableStream = createReadStream(sourcePathToFile),
			  writableStream = createWriteStream(resultMovePath);
		await pipeline(readableStream, writableStream);
		await fs.rm(sourcePathToFile);
		console.log(`File "${sourcePathDetails.name}" was moved from ${sourcePathDetails.dir} to ${directPathToNewPlace} \n\n`);
	} catch (moveError) {
		console.error(moveError.message);
	}
};

export {
	moveFile
};
