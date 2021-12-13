/**
 * Change the current directory of the server
 * @param {*} path 
 */
export function cwd(path) {
    try {
        process.chdir(path.toString());
        return (process.cwd());
    }
    catch (e) {
        return (e.toString());
    }
}