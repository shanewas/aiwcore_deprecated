const electron = require('electron')
const url = require('url')
const path = require('path')
const windowCollection = require('./js/window_collection')
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
    const mainMenu = Menu.buildFromTemplate(mainMenuTempate)
    //Inset menu
    Menu.setApplicationMenu(mainMenu)
})


const mainMenuTempate = [
    {
        label: 'Home',
        submenu: [
            {
                label: 'Web Scrapping',
                click(){
                    windowCollection.createAddWindow()
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Help'
    }
]

//if mac add empty onject with menu
if (process.platform == 'darwin'){
    mainMenuTempate.unshift({})
}

//Add developer tools inf not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTempate.push({
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