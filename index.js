import fs  from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { cwd, chdir, exit } from 'node:process';
import { Writable, Readable } from 'node:stream';

const COMMANDS = {
	EXIT: 'exit',
	NAVIGATION_UP: 'up',
	NAVIGATION_CONCRETE_PLACE: 'cd',
	LIST_OF_FILES: 'ls',
	READ_AND_PRINT: 'cat',
	CREATE_NEW_FILE: 'add',
	CREATE_NEW_FOLDER: 'mkdir',
	RENAME_FILE: 'rn',
	COPY_FILE: 'cp',
	MOVE_FILE: 'mv',
	DELETE_FILE: 'rm',
	OPERATION_SYSTEM_INFO: 'os',
	HASH_CALC: 'hash',
	COMPRESS_FILE: 'compress',
	DECOMPRESS_FILE: 'decompress'
};

process.stdin.setEncoding('utf-8');

const parseArgs = (targetFromArgs) => {
    const envArguments = process.argv;
	
    if(envArguments) {
		switch (targetFromArgs) {
			case 'username':
				let userName = '';
				envArguments.forEach((argValue) => {
					if (argValue.startsWith('--username')){
						userName = argValue.split('=').pop();
					} else {
						userName = 'Anonymous';
					}
				});
				return userName;
			case 'os':
				envArguments.forEach((argValue) => {
					if (argValue.startsWith('--')){
						return argValue;
					}
				});
				break;
			default:
				break;
		}
        
    } else {
        throw new Error('No environment arguments were found');
    }
    
};

const userName = parseArgs('username');

console.log(`Welcome to the File Manager, ${userName}!`);

let currentFolderPath = cwd();

const prompt = () => {
	process.stdout.write(`You are currently in ${currentFolderPath} \n`);
}
prompt();

let inputDataBuffer = '';

process.stdin.on('data', async (chunk) => {	
	inputDataBuffer+=chunk;
	
	if (inputDataBuffer.includes('\n')){
		const [necessaryCommandLine, ...extraLines] = inputDataBuffer.split('\n');
		inputDataBuffer = extraLines.join('\n');

		const [commandAbbreviation, commandContent] = necessaryCommandLine.trim().split(' ');
		switch (commandAbbreviation) {
			case COMMANDS.EXIT:
				console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
				process.exit(0);
				break;
		
			default:
				break;
		}
		prompt();
	}

	
});

process.stdin.on('close', () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
	process.exit(0);
});

process.on('SIGINT', () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
	process.exit(0);
});
