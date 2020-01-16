const electron = require("electron");
const electronWindowManager = require("electron-window-manager");
const url = require("url");
const path = require("path");

const menu = require("./js/menu");
const conf = require("./js/config");
const createWindow = require("./js/createWindow");

const { app, BrowserWindow, Menu, ipcRenderer } = electron;
const urls = ["https://google.com", "https://jsonplaceholder.typicode.com/"];

let win;

//Listen for app to be ready
app.on("ready", function() {
  win = createWindow.createWindow(urls[1]);

  win.once("ready-to-show", function() {
    win.show();
  });

  win.on("closed", function() {
    win = null;
  });

  //Build menu
  const mainMenu = Menu.buildFromTemplate(menu.mainMenuTempate);
  //Inset menu
  Menu.setApplicationMenu(mainMenu);
});

conf.config();
