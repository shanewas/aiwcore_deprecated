const electron = require('electron')
const url = require('url')
const path = require('path')
const menu = require('./js/menu')

// import {addwindow, createAddWindow} from 'window_collection.js';

const { app, BrowserWindow, Menu } = electron
let mainWindow
// let addWindow

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


//if mac add empty onject with menu
if (process.platform == 'darwin'){
    menu.mainMenuTempate.unshift({})
}

//Add developer tools inf not in prod
if(process.env.NODE_ENV !== 'production'){
    menu.mainMenuTempate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}