import Editor from '../components/editor';
const editor = new Editor()

const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const {filePath, fileContent} = await window.api.openFile()
  filePathElement.innerText = filePath

  if (editor.editor) {
    editor.update(fileContent)
  } else {
    editor.create(fileContent, document.getElementById("editor"))
  }
})