import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const readAndPrint = async (pathTotTargetFile) => {
	const readableStream = createReadStream(pathTotTargetFile, 'utf8');

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk + '\n');
    })

    readableStream.on('error', (readError) => {
        console.error(readError);
    });
};

export {
	readAndPrint
};