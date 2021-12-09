export function cwd(path) {
    try {
        process.chdir(path.toString());
        return (process.cwd());
    }
    catch (e) {
        return (e.toString());
    }
}