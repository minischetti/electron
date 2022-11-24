import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
            return 'dist/json.worker.bundle.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return 'dist/css.worker.bundle.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return 'dist/html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return 'dist/ts.worker.bundle.js';
        }
        return 'dist/editor.worker.bundle.js';
    }
};

monaco.editor.create(document.getElementById('editor'), {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'javascript'
});