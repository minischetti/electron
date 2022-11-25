import * as monaco from "monaco-editor";
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

let editor;

btn.addEventListener('click', async () => {
  const {filePath, fileContent} = await window.api.openFile()

  filePathElement.innerText = filePath

  if (editor) {
    editor.setValue(fileContent)
  } else {
    editor = monaco.editor.create(document.getElementById("editor"), {
      value: fileContent,
      language: "markdown",
    });
  }
})