// cf. https://forum.obsidian.md/t/i-wrote-a-little-script-to-write-dataview-results-into-documents/62847 and https://docs.obsidian.md/Reference/TypeScript+API/DataWriteOptions
const vault = this.app.vault
const file = this.app.workspace.getActiveFile()
//console.log("File: " + dv.page(file.path).file.name)

const target = input.target
const msg = input.msg
const tokenStartMultilineInsert = input.tokenStartMultilineInsert || "INSERT"
const tokenEndMultilineInsert = input.tokenEndMultilineInsert || "END"
const exprMultiline = RegExp(`(%%).*?(${tokenStartMultilineInsert} ${target}).*?(%%)[^]*?(%%).*?(${tokenEndMultilineInsert} ${target}).*?(%%)`, "gm")

//unused as of now, couldnt make it not break things
//const tokenStartInlineInsert = input.tokenStartInlineInsert || "INLINE"
//const exprInline = RegExp(`(%%).*?(${tokenStartInlineInsert} ${target}).*?(%%).*`, "gm")

await vault.process(file, (data) => {
    //clear whatever is between the ml tokens
    data = data.replace(exprMultiline, `%% ${tokenStartMultilineInsert} ${target} %%\n%% ${tokenEndMultilineInsert} ${target} %%`)
    //fill in our target text
    data = data.replace(exprMultiline, `%% ${tokenStartMultilineInsert} ${target} %%\n${msg}%% ${tokenEndMultilineInsert} ${target} %%`)
    return data
})
