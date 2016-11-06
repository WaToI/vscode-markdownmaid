let vscode = require('vscode');
let path = require('path');
const _ = require('lodash');

function activate(context) {
    const registerCommand = vscode.commands.registerCommand;
    let previewUri = vscode.Uri.parse('MarkDoenMaid-preview://authority/MarkDoenMaid-preview');
    let provider = new MDMDocumentContentProvider(context);
    let registration = vscode.workspace.registerTextDocumentContentProvider('MarkDoenMaid-preview', provider);
    console.log('Congratulations, your extension "markdownmaid" is now active!');

    let disposable = registerCommand('extension.MarkDownMaidPreview', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'MarkDownMaidPreview').then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    });
    vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });
    /*
    vscode.window.onDidChangeTextEditorSelection((e) => {
        if (e.textEditor === vscode.window.activeTextEditor) {
            provider.update(previewUri);
        }
    });
    */
}
exports.activate = activate;

class MDMDocumentContentProvider {
    getCurrenttext() {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            if (doc) {//} && doc.languageId === "markdown"){
                return doc.getText();
            }
        }
    }
    provideTextDocumentContent(uri, token) {
        let buf = this.head + this.getCurrenttext() + this.tail;
        console.log(buf);
        return buf;
    }
    get onDidChange() {
        return this._onDidChange.event;
    }
    unthrottledUpdate(uri) {
        const editor = vscode.window.activeTextEditor;
        const text = editor.document.getText();
        const selStart = editor.document.offsetAt(editor.selection.anchor);
        this._onDidChange.fire(uri);
    }
    constructor(_context) {
        this.context = _context;
        this._onDidChange = new vscode.EventEmitter();
        this.update = _.throttle(this.unthrottledUpdate, 250);
        this.head = `
<!DOCTYPE html>
<html lang='ja'>
<head>
	<meta charset='utf-8'>
	<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src='${this.context.extensionPath}/node_modules/jquery/dist/jquery.min.js'></script>
    <script src='${this.context.extensionPath}/node_modules/marked/marked.min.js'></script>
    <script src='${this.context.extensionPath}/node_modules/mermaid/dist/mermaid.min.js'></script>
    <link rel='stylesheet' type='text/css' href='${this.context.extensionPath}/node_modules/mermaid/dist/mermaid.dark.css'>
	<style type='text/css'> <!--
		body { width: 100%; background-color: #ffffff;}
		table { border-collapse: collapse;  margin: 10px}
		th { padding: 6px; text-align: left; vertical-align: top; color: #333; background-color: #eee; border: 1px solid #b9b9b9; }
		td { padding: 6px; background-color: #fff; border: 1px solid #b9b9b9; }
		.mermaid{ margin-left: 10px; margin-right: auto; }
	--> </style>
</head>
<body style='background-color: #ffffff;'>
	<div id='preview'>
	</div>
	<div id='md'>
`;
        this.tail = `
	</div>
<script>
var renderer = new marked.Renderer();
renderer.code = function (code, language) {
    if(language == 'mermaid')
        return '<pre class="mermaid" align="left">'+code+'</pre>';
    else
        return '<pre><code>'+code+'</code></pre>';
};

$(document).ready(function(){
	var md = $('#md').text()
	$('#md').empty()
	var html = marked(md ,{ renderer: renderer } );
	$('#preview').html(html);
	mermaid.init();
});

//mermaid.initialize({flowchart:{htmlLabels:false}});
mermaid.init();
</script>
</body>
</html>
`;
    }
}

function deactivate() {
}
exports.deactivate = deactivate;