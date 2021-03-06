const { app, BrowserWindow } = require('electron');
//const path = require('path');
const url = require('url');
const DiscordRPC = require('discord-rpc');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 840,
    height: 780,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000');

//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'index.html'),
//     protocol: 'file:',
//     slashes: true,
//   }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// This is the application Client Id
const clientId = '801510935780261918';


const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  const song_name = await mainWindow.webContents.executeJavaScript('window.song_name');
  const song_artist = await mainWindow.webContents.executeJavaScript('window.song_artist');

  // to use "smallImageKey" and "largeImageKey" you need to upload in discord developer portal and use the "image variable there"
  // https://discord.com/developers/applications/<application_id>/rich-presence/assets
  // it's also possible to use endTimeStamp
  rpc.setActivity({
    details: `${song_name}`,
    state: `${song_artist}`,
    startTimestamp,
    largeImageKey: 'image',
    largeImageText: `${song_name}`,
    smallImageKey: 'image_small',
    smallImageText: 'small text here',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds 
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);
