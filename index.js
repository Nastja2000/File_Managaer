import path from 'node:path';
import { chdir, cwd, exit } from 'node:process';
import { homedir } from 'node:os';
import { COMMANDS } from './utils/constants.js';
import { changeDirectory } from './modules/changeDirectory.js';
import { list } from './modules/ls.js';
import { parseArgs } from './utils/parseArgs.js';

process.stdin.setEncoding('utf-8');

const userName = parseArgs('username');
const startingDirectory = homedir();

chdir(startingDirectory);
console.log(`Welcome to the File Manager, ${userName}!`);

let currentFolderPath = startingDirectory;

const prompt = (firstPrompt = false) => {
	if (firstPrompt) {
		process.stdout.write(`You are currently in ${currentFolderPath} \n`);
	} else {
		process.stdout.write(`You are currently in ${cwd()} \n`);
	}
	
}
prompt(true);

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
				exit(0);
				break;
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
			default:
				console.log('Invalid entry, please try again \n');
				break;
		}
		prompt();
	}

});

process.stdin.on('close', () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
});

process.on('SIGINT', () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
	exit(0);
});
