import fs from 'fs';

export function doesFileExist(filePath) {
    try {

        if (typeof filePath !== 'string') {
            throw new Error("Error: Filepath is not of type string");
        }

        if (fs.existsSync(filePath)) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.error(err)
    }
}