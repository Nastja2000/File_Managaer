import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const copyFile = async (sourcePathToFile, directPathToNewPlace) => {
	const sourcePathDetails = path.parse(sourcePathToFile);
	let resultCopyPath = path.resolve(directPathToNewPlace.concat('\\', sourcePathDetails.base));
	
	try {
		const readableStream = createReadStream(sourcePathToFile),
		      writableStream = createWriteStream(resultCopyPath);
		await pipeline(readableStream, writableStream);
		console.log(`File "${sourcePathDetails.name}" was copied from ${sourcePathDetails.dir} to ${directPathToNewPlace} \n\n`);
	} catch (copyError) {
		console.error(copyError.message);
	}
};

export {
	copyFile
};
