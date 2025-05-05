import { COMMANDS } from "./constants.js";

export const parseArgs = (targetFromArgs) => {
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

			case COMMANDS.OPERATION_SYSTEM_INFO:
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
