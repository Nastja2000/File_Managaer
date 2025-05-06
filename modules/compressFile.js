import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'node:path';

const compressFile = async (sourcePathToFile, targetArchiveDest) => {
	const targetPathDetails = path.parse(targetArchiveDest);
	let finalTargetPath = '';

	if (!targetPathDetails.ext && !targetPathDetails.dir && !targetPathDetails.root) {
		finalTargetPath = path.resolve(targetArchiveDest.concat('\\archive.br'));
	} else {
		finalTargetPath = targetArchiveDest;
	}

	try {
		const readableStream = createReadStream(sourcePathToFile),
			 writableStream = createWriteStream(finalTargetPath),
			 brotli = createBrotliCompress();
		await pipeline(readableStream, brotli, writableStream);
		console.log(`File was compressed to ${path.parse(finalTargetPath).base} successfully \n\n`);
	} catch (compressionError) {
		console.error(compressionError.message);
	}

};

export {
	compressFile
};