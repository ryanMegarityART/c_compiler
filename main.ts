import { readFileSync, writeFileSync } from "fs"
/*
 * constant only 
 * extract the return value from the source code with regex then format as assembly
 */
function constantOnly(fileToCompile: string, fileToWrite: string) {
    console.log(`Compiling ${fileToCompile} to ${fileToWrite} using constant compilation method...`)
    const fileString = readFileSync(fileToCompile).toString();
    console.log(fileString)
    const CONSTANT_MATCH_EXPR = /return ([0-9]*);/
    const matches = fileString.match(CONSTANT_MATCH_EXPR)
    if (matches) {
        const matchedConstant = +matches[1]
        console.log("matchedConstant: ", +matchedConstant);
        const assemblyTemplateString =
            `
    .file	${fileToCompile}
main:
    endbr64
    movl	\$${matchedConstant}, %eax
    ret
    `
        writeFileSync(fileToWrite, assemblyTemplateString)
    }
}


/*
 * main program execution
 */
(() => {

    const [, , fileToCompile, fileToWrite, compileType] = process.argv;

    switch (compileType) {
        case "constant":
            constantOnly(fileToCompile, fileToWrite)
            break
        default:
            constantOnly(fileToCompile, fileToWrite)
            break
    }

})();
