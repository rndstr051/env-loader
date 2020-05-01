module.exports = function(content) {
    return undefined;
};
module.exports.pitch = function(remainingRequest, precedingRequest, data) {

    this.addDependency(this.resourcePath);

    const fileContent = this.fs.readFileSync(this.resourcePath).toString();
    const outerMatch = fileContent.match(/export\s+module\s+(?<name>[^\s]+)\s*{(?<inner>[^}]*)}/);
    const innerRegex = /const\s+(?<envname>[^\s:]+):(?<envtype>[^\s;]+)\s*;/g;
    const innerString = outerMatch.groups['inner'];

    let result = {};
    let innerMatch = innerRegex.exec(innerString);
    while (innerMatch != null) {
        if (innerMatch.groups['envtype'] == 'string') {
        result[innerMatch.groups['envname']] = String(process.env[innerMatch.groups['envname']]);
        } else if (innerMatch.groups['envtype'] == 'number') {
        result[innerMatch.groups['envname']] = Number(process.env[innerMatch.groups['envname']]);
        } else if (innerMatch.groups['envtype'] == 'boolean') {
        result[innerMatch.groups['envname']] = Boolean(process.env[innerMatch.groups['envname']]);
        } else {
        result[innerMatch.groups['envname']] = process.env[innerMatch.groups['envname']];
        }


        innerMatch = innerRegex.exec(innerString);
    }

    let resultOuter = {};
    resultOuter[outerMatch.groups['name']] = result;

    return 'module.exports = ' + JSON.stringify(resultOuter) + ';';
};
