const { join } = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
   // eslint-disable-line global-require
   app.quit();
}

const createWindow = () => {
   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 900,
      height: 700,
      autoHideMenuBar: true,
      icon: join(__dirname, 'assets/favicon.ico'),
      webPreferences: {
         devTools: false,
         preload: join(__dirname, 'preload')
      },
   });

   // and load the index.html of the app.
   mainWindow.loadFile(join(__dirname, 'index.html'));

   // Open the DevTools.
   mainWindow.webContents.openDevTools();

   ipcMain.on('win', (event, win) => {
      mainWindow.loadFile(join(__dirname, win));
   });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser win.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all win are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   // On OS X it's common to re-create a window in the app when the
   // dock icon is clicked and there are no other win open.
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.