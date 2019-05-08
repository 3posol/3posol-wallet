// Create the browser window.
const electron = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path'); // eslint-disable-line
const url = require('url'); // eslint-disable-line

const createAboutPage = () => {
  const browserWindow = new electron.BrowserWindow({
    width: 700,
    height: 410,
    titleBarStyle: 'hidden',
    resizable: false,
    minimizable: false,
    maximizable: false,
    show: false,
  });
  browserWindow.setMenu(null);
  browserWindow.setMenuBarVisibility(false);
  // and load the about.html.
  browserWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../app/about.html'),
    protocol: 'file:',
    slashes: true,
  }));

  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });
};

module.exports = createAboutPage;
