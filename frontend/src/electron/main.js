import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";
import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  nativeImage,
  shell,
  Tray,
} from "electron";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const iconPath = join(currentDirectory, "../../public/icon.png");
const packagedIndexPath = join(currentDirectory, "../../dist/index.html");
const packagedIndexUrl = pathToFileURL(packagedIndexPath);
const developmentUrl = process.env.ELECTRON_RENDERER_URL ?? "http://localhost:3000";

let mainWindow;
let tray;

function openExternalLink(url) {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    void shell.openExternal(url);
  }
}

function isAllowedInternalNavigation(url) {
  try {
    const target = new URL(url);

    if (app.isPackaged) {
      return (
        target.protocol === "file:" &&
        target.host === packagedIndexUrl.host &&
        target.pathname === packagedIndexUrl.pathname
      );
    }

    return target.origin === new URL(developmentUrl).origin;
  } catch {
    return false;
  }
}

/** React renderer를 담는 보안 격리 BrowserWindow를 만들고 내부·외부 이동 경계를 설정한다. */
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 720,
    frame: false,
    icon: iconPath,
    webPreferences: {
      preload: join(currentDirectory, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternalLink(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!isAllowedInternalNavigation(url)) {
      event.preventDefault();
      openExternalLink(url);
    }
  });

  if (app.isPackaged) {
    await mainWindow.loadFile(packagedIndexPath);
  } else {
    await mainWindow.loadURL(developmentUrl);
  }
}

/** 닫힌 창을 다시 열거나 애플리케이션을 종료할 수 있는 시스템 tray를 만든다. */
function createTray() {
  tray = new Tray(nativeImage.createFromPath(iconPath));
  tray.setToolTip("Savior");
  tray.on("double-click", () => mainWindow?.show());
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Savior 열기", click: () => mainWindow?.show() },
      { label: "종료", click: () => app.quit() },
    ]),
  );
}

/** preload가 노출한 최소 창 제어 요청만 main process에 연결한다. */
function registerWindowControls() {
  ipcMain.on("window:hide", () => mainWindow?.hide());
  ipcMain.on("window:minimize", () => mainWindow?.minimize());
  ipcMain.on("window:maximize", () => {
    if (!mainWindow) return;
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });
}

app.whenReady().then(async () => {
  registerWindowControls();
  createTray();
  await createWindow();

  globalShortcut.register("F5", () => mainWindow?.reload());

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    } else {
      mainWindow?.show();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  ipcMain.removeAllListeners();
});
