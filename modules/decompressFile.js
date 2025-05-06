import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress} from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'node:path';

const decompressFile = async (sourcePathToFile, targetArchiveDest) => {
	const targetPathDetails = path.parse(targetArchiveDest);
	let finalTargetPath = '';

	if (!targetPathDetails.ext && !targetPathDetails.dir && !targetPathDetails.root) {
		finalTargetPath = path.resolve(targetArchiveDest.concat('\\fileToDecompress.txt'));
	} else {
		finalTargetPath = targetArchiveDest;
	}

	try {
		const readableStream = createReadStream(sourcePathToFile),
			 writableStream = createWriteStream(finalTargetPath),
			 brotli = createBrotliDecompress();
		await pipeline(readableStream, brotli, writableStream);
		console.log(`File was decompressed to ${path.parse(finalTargetPath).base} successfully \n\n`);
	} catch (compressionError) {
		console.error(compressionError.message);
	}

};

export {
	decompressFile
};