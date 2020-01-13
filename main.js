const electron = require('electron')
const url = require('url')
const path = require('path')
const menu = require('./js/menu')
const conf = require('./js/config')

const { app, BrowserWindow, Menu } = electron

let mainWindow

//Listen for app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({})
    //Load html into windows

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    // Quit app when closed
    mainWindow.on('closed', () => app.quit())

    //Build menu
    const mainMenu = Menu.buildFromTemplate(menu.mainMenuTempate)
    //Inset menu
    Menu.setApplicationMenu(mainMenu)
})

conf.config()