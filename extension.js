// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// Launches the search URL in default browser
function openBrowser() {
    var selectedText = getSelectedText();
    if (!selectedText)
        return;
    vscode.commands.executeCommand('vscode.open',
        vscode.Uri.parse(`https://unbug.github.io/codelf/#${encodeURI(selectedText)}`));
}

function getSelectedText() {
    const documentText = vscode.window.activeTextEditor.document.getText();
    if (!documentText)
        return '';

    var activeSelection = vscode.window.activeTextEditor.selection;
    if (activeSelection.isEmpty)
        return '';

    const selStartOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.start);
    const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.end);

    var selectedText = documentText.slice(selStartOffset, selEndOffset).trim();
    selectedText = selectedText.replace(/\s\s+/g, ' ');
    return selectedText;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.codelf', openBrowser);

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;