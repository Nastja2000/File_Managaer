import fs from 'fs/promises';
import path from 'node:path';

const deleteFile = async (pathToFile) => {
    const filePathDetails = path.parse(pathToFile);
    try {
        await fs.rm(pathToFile);
        console.log(`File "${filePathDetails.name}" is removed \n\n`);
    } catch (removeFileError) {
        console.log(removeFileError.message);
    }
};

export {
    deleteFile
};