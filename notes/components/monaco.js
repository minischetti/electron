import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
            return 'dist/json.worker.out.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return 'dist/css.worker.out.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return 'dist/html.worker.out.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return 'dist/ts.worker.out.js';
        }
        if (label === 'markdown') {
            return 'dist/markdown.worker.out.js';
        }
        return 'dist/editor.worker.out.js';
    }
};

// monaco.editor.create(document.getElementById('editor'), {
//     value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
//     language: 'javascript'
// });

monaco.editor.create(document.getElementById('editor'), {
    value: ['# Hello World', 'This is a markdown file'].join('\n'),
    language: 'markdown'
});