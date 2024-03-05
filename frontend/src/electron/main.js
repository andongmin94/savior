import axios from "axios";
import https from "https";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import electronLocalshortcut from "electron-localshortcut";
import { app, ipcMain, BrowserWindow, globalShortcut, Tray, Menu, nativeImage } from "electron";

dotenv.config();
const BASE_URL = 'http://localhost:3000';

let mainWindow;
let tray;
function createWindow() {
  // 브라우저 창을 생성합니다.
  mainWindow = new BrowserWindow({
    width: 1700,
    height: 900,
    frame: false,

    icon: join(dirname(fileURLToPath(import.meta.url)), "icon.png"),
    webPreferences: {preload: join(dirname(fileURLToPath(import.meta.url)), "preload.js")},
  });

  mainWindow.loadURL(BASE_URL);

  electronLocalshortcut.register(mainWindow, "F12", () => {console.log("F12 is pressed"); mainWindow.webContents.toggleDevTools()});

  ipcMain.on("minimize", (event) => {mainWindow.minimize()});

  ipcMain.on("maximize", (event) => {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
        console.log("restoring")}
    else {
      mainWindow.maximize(); console.log("maximizing")
    }});

  ipcMain.on("hidden", (event) => {mainWindow.hide()});

  app.on("window-all-closed", () => {if (process.platform !== "darwin") {app.quit()}});

  app.on("activate", () => {if (BrowserWindow.getAllWindows().length === 0) {createWindow()}});
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
app.whenReady().then(createWindow).then(async () => {
    const iconPath = join(dirname(fileURLToPath(import.meta.url)), "icon.png");
    const icon = nativeImage.createFromPath(iconPath);

    globalShortcut.register('F5', () => {
      let win = BrowserWindow.getFocusedWindow();
      if (win) {
        win.reload();
        connect();
      }
    });

    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      { label: "켜기", type: "normal", click: () => mainWindow.show() },
      { label: "끄기", type: "normal", click: () => app.quit() },
    ]);

    tray.setToolTip("정보처리기사 대비반");
    tray.setContextMenu(contextMenu);
    tray.on("double-click", () => {mainWindow.show()});

    app.on('will-quit', () => {
      // 애플리케이션이 종료되기 전에 모든 단축키를 해제합니다.
      globalShortcut.unregisterAll();
    });
  });