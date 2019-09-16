const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

app.commandLine.appendSwitch('remote-debugging-port', '9222')

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow(
    {
      width: width,
      height: height,
      // resizable: false,
      // maximizable: false
  })

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
