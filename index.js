import path from 'node:path';
import { chdir, cwd, exit } from 'node:process';
import { homedir } from 'node:os';
import { COMMANDS } from './utils/constants.js';
import { changeDirectory } from './modules/changeDirectory.js';
import { list } from './modules/listOfFiles.js';
import { parseArgs } from './utils/parseArgs.js';
import { readAndPrint } from './modules/readAndPrint.js';
import { createNewFile } from './modules/createNewFile.js';
import { createNewFolder } from './modules/createNewFolder.js';
import { renameFile } from './modules/renameFile.js';
import { copyFile } from './modules/copyFile.js';
import { moveFile } from './modules/moveFile.js';
import { deleteFile } from './modules/deleteFile.js';
import { compressFile } from './modules/compressFile.js';
import { decompressFile } from './modules/decompressFile.js';
import { calculateHash } from './modules/calculateHash.js';
import { handleOperationSystemCommands } from './modules/systemsOperations.js';

process.stdin.setEncoding('utf-8');

const userName = parseArgs('username');
const startingDirectory = homedir();

chdir(startingDirectory);
console.log(`Welcome to the File Manager, ${userName}!\n `);

let currentFolderPath = startingDirectory;

const prompt = (firstPrompt = false) => {
	if (firstPrompt) {
		process.stdout.write(`You are currently in ${currentFolderPath} \n\n`);
	} else {
		process.stdout.write(`You are currently in ${cwd()} \n\n`);
	}
	
}
prompt(true);

let inputDataBuffer = '';

process.stdin.on('data', async (chunk) => {	
	inputDataBuffer+=chunk;
	
	if (inputDataBuffer.includes('\n')){
		const [necessaryCommandLine, ...extraLines] = inputDataBuffer.split('\n');
		inputDataBuffer = extraLines.join('\n');
		const [commandAbbreviation, commandContent, ...otherContent] = necessaryCommandLine.trim().split(' ');

		switch (commandAbbreviation) {
			case COMMANDS.EXIT:
				console.log(`Thank you for using File Manager, ${userName}, goodbye! \n`);
				exit(0);
			case COMMANDS.NAVIGATION_UP:
				changeDirectory(COMMANDS.NAVIGATION_UP, '..');
				break;
			case COMMANDS.NAVIGATION_CONCRETE_PLACE:
				let targetPath = '';

				if (commandContent.startsWith('C:') || commandContent.startsWith('D:') || commandContent.startsWith('F:') || commandContent.startsWith('E:')){
					targetPath = commandContent;
				} else {
					targetPath = path.join(cwd(), commandContent);
				}

				changeDirectory(COMMANDS.NAVIGATION_CONCRETE_PLACE, targetPath);
				break;
			case COMMANDS.LIST_OF_FILES: 
				const targetDirPath = cwd();
				list(targetDirPath);
				break;
			case COMMANDS.READ_AND_PRINT:
				readAndPrint(commandContent);
				break;
			case COMMANDS.CREATE_NEW_FILE:
				createNewFile(commandContent);
				break;
			case COMMANDS.CREATE_NEW_FOLDER:
				createNewFolder(commandContent);
				break;
			case COMMANDS.RENAME_FILE:
				renameFile(commandContent, otherContent.pop());
				break;
			case COMMANDS.COPY_FILE:
				await copyFile(commandContent, otherContent.pop());
				break;
			case COMMANDS.MOVE_FILE:
				await moveFile(commandContent, otherContent.pop());
				break;
			case COMMANDS.DELETE_FILE:
				deleteFile(commandContent);
				break;
			case COMMANDS.COMPRESS_FILE:
				compressFile(commandContent, otherContent.pop());
				break;
			case COMMANDS.DECOMPRESS_FILE:
				decompressFile(commandContent, otherContent.pop());
				break;
			case COMMANDS.HASH_CALC:
				calculateHash(commandContent);
				break;
			case COMMANDS.OPERATION_SYSTEM_INFO:
				handleOperationSystemCommands(commandContent);
				break;
			default:
				console.log('Invalid entry, please try again \n');
				break;
		}
		prompt();
	}

});

process.stdin.on('close', () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye! \n`);
});

process.on('SIGINT', () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye! \n`);
	exit(0);
});
