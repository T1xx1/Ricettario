const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

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
      icon: join(__dirname, 'assets/icons/favicon.ico'),
      webPreferences: {
         preload: join(__dirname, 'preload'),
      },
   });

   // and load the index.html of the app.
   mainWindow.loadFile(join(__dirname, 'win/index.html'));

   // Open the DevTools.
   //mainWindow.webContents.openDevTools();

   let window = {
      add: () => {
         const addWindow = new BrowserWindow({
            width: 500,
            height: 310,
            autoHideMenuBar: true,
            parent: mainWindow,
            resizable: false,
            webPreferences: {
               preload: join(__dirname, 'preload'),
            },
         });

         addWindow.loadFile(join(__dirname, 'win/add.html'));
      },
      edit: () => {
         const editWindow = new BrowserWindow({
            width: 900,
            height: 700,
            autoHideMenuBar: true,
            parent: mainWindow,
            webPreferences: {
               preload: join(__dirname, 'preload'),
            },
         });

         editWindow.loadFile(join(__dirname, 'win/edit.html'));
      },
      offline: () => {
         const offlineWindow = new BrowserWindow({
            width: 550,
            height: 470,
            autoHideMenuBar: true,
            parent: mainWindow,
            resizable: false,
            webPreferences: {
               preload: join(__dirname, 'preload'),
            },
         });

         offlineWindow.loadFile(join(__dirname, 'win/offline.html'));
      },
      stats: () => {
         const statsWindow = new BrowserWindow({
            width: 900,
            height: 700,
            autoHideMenuBar: true,
            parent: mainWindow,
            webPreferences: {
               preload: join(__dirname, 'preload'),
            },
         });

         statsWindow.loadFile(join(__dirname, 'win/stats.html'));
      }
   };

   ipcMain.on('window', (event, action, win) => {
      switch (action) {
         case 'close': {
            BrowserWindow.getFocusedWindow().close();

            break;
         }
         case 'open': {
            switch (win) {
               case 'add':
                  window.add();

                  break;
               case 'edit':
                  window.edit();

                  break;
               case 'offline':
                  window.offline();

                  break;
               case 'stats':
                  window.stats();

                  break;
            }
         }
      }
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

require(join(__dirname, 'storage'));