const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')
const editor = document.getElementById('editor')

btn.addEventListener('click', async () => {
  const results = await window.api.openFile()
  if (results.filePath) {
    filePathElement.innerText = results.filePath
  }
  if (results.fileContent) {
    editor.innerText = results.fileContent
  }
})