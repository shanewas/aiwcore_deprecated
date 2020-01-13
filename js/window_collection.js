const electron = require('electron')
const url = require('url')
const path = require('path')
//Handle create add window

const {BrowserWindow} = electron

let addWindow
function createAddWindow(){
                    addWindow = new BrowserWindow({
                        width: 300,
                        height: 200,
                        title: 'Test adding window'
                    })
                    //load html into new window
                    addWindow.loadURL(url.format({
                        pathname: path.join(__dirname, 'views/addwindow.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                    addWindow.on('closed', () => addWindow = null)
                }

module.exports = {createAddWindow}