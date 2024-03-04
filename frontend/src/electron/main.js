import { app, ipcMain, BrowserWindow, globalShortcut, Tray, Menu, nativeImage, Notification } from "electron";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const BASE_URL = 'http://localhost:3000';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    
    webPreferences: {preload: join(dirname(fileURLToPath(import.meta.url)), "preload.js")},
  })
 

  mainWindow.loadURL(BASE_URL);
}
 
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
 
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})