import axios from "axios";
import https from "https";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import electronLocalshortcut from "electron-localshortcut";
import { app, ipcMain, BrowserWindow, globalShortcut, Tray, Menu, nativeImage } from "electron";

let mainWindow;
function createWindow() {
  // 브라우저 창을 생성합니다.
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    frame: false,

    icon: join(dirname(fileURLToPath(import.meta.url)), "../../public/icon.png"),
    webPreferences: { preload: join(dirname(fileURLToPath(import.meta.url)), "preload.js") },
  });

  // 타이틀 바 옵션
  ipcMain.on("hidden", (event) => { mainWindow.hide() });
  ipcMain.on("minimize", (event) => { mainWindow.minimize() });
  ipcMain.on("maximize", (event) => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
      console.log("restoring");
    } else {
      mainWindow.maximize();
      console.log("maximizing");
    }
  });

  // 일렉트론 연결 URL
  dotenv.config();
  const BASE_URL = 'http://localhost:3000';
  mainWindow.loadURL(BASE_URL);

  // F12 개발자 도구
  electronLocalshortcut.register(mainWindow, "F12", () => { console.log("F12 is pressed"); mainWindow.webContents.toggleDevTools() });
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
app.whenReady().then(createWindow).then(async () => {

  // 기본 생성 세팅
  app.on("window-all-closed", () => { if (process.platform !== "darwin") { app.quit() } });
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow() } });

  // 트레이 세팅
  const icon = nativeImage.createFromPath(join(dirname(fileURLToPath(import.meta.url)), "../../public/icon.png"));
  const tray = new Tray(icon);

  // 트레이 메뉴 옵션
  const contextMenu = Menu.buildFromTemplate([
    { label: "켜기", type: "normal", click: () => mainWindow.show() },
    { label: "끄기", type: "normal", click: () => app.quit() },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("정보처리기사 대비반");
  tray.on("double-click", () => { mainWindow.show() });

  // F5 키를 누르면 현재 포커스된 창 새로고침
  globalShortcut.register('F5', () => {
    let win = BrowserWindow.getFocusedWindow();
    if (win) { win.reload() }
  });

  app.on('will-quit', () => {
    // 애플리케이션이 종료되기 전에 단축키 해제
    globalShortcut.unregisterAll();
  });
});
