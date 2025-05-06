import { createReadStream } from 'node:fs';

const readAndPrint = async (pathTotTargetFile) => {
	const readableStream = createReadStream(pathTotTargetFile, 'utf8');

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk + '\n');
    });

    readableStream.on('error', (readError) => {
        console.error(readError.message);
    });
};

export {
	readAndPrint
};