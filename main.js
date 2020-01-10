const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu} = electron

let mainWindow
let addWindow

//Listen for app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({})
    //Load html into windows
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
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
//Handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Test adding window'
    })
    //load html into new window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addwindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    addWindow.on('closed', () => addWindow = null)
}

const mainMenuTempate = [
    {
        label: 'Home',
        submenu: [
            {
                label: 'Web Scrapping',
                click(){
                    createAddWindow()
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