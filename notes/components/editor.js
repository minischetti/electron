import * as monaco from "monaco-editor"

export default class Editor {
    editor
    constructor() {
        this.init();
    }
    init() {
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
        }
    }
    create(fileContent, container) {
        if (!self.MonacoEnvironment) {
            this.init();
        }

        if (this.editor) {
            this.update(fileContent);
        } else {
            this.editor = monaco.editor.create(container, {
                value: fileContent,
                language: "markdown",
                automaticLayout: true,
            });
        }

        return this.editor;
    }
    update(fileContent) {
        if (this.editor) {
            this.editor.setValue(fileContent);
        } else {
            throw new Error("Editor not initialized");
        }
    }
}