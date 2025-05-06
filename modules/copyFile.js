import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const copyFile = async (sourcePathToFile, directPathToNewPlace) => {
	const sourcePathDetails = path.parse(sourcePathToFile);
	const targetPathDetails = path.parse(directPathToNewPlace);
	let resultCopyPath = '';

	if (!targetPathDetails.ext && !targetPathDetails.dir && !targetPathDetails.root) {
		resultCopyPath = path.resolve(directPathToNewPlace.concat('\\', sourcePathDetails.base));
	} else {
		resultCopyPath = directPathToNewPlace;
	}
	
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
