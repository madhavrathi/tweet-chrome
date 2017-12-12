# tweet-chrome
It is hosted at [https://protected-thicket-15731.herokuapp.com/](https://protected-thicket-15731.herokuapp.com/)
This is made with ReactJs. The backend server is made with NodeJS and express. The database used in backend is MongoDB.
Backend github repo: [https://github.com/madhavrathi/tweet-chrome-server](https://github.com/madhavrathi/tweet-chrome-server)
Backend server is hosted here: [https://twitter-chrome-server.herokuapp.com/](https://twitter-chrome-server.herokuapp.com/)

## Features:
1. Fetches 30 latest tweets of handles you add in settings.
1. Organise tweets into three different categories: text, images and text with images.
1. Sort the tweets according to time (latest shown first).
1. The database is updated in realtime.
1. Pops a notification when a added handle posts a new tweet.

## Installation:
1. Download as zip or clone it.
1. Open terminal and cd into the downloaded folder.
1. Run
```javascript
npm run build
```
4.   Open google chrome and then open extension manager OR enter this in address bar: `chrome://extensions/`
5.   Drag and drop the build folder from project folder to extension manger.

![Image](https://user-images.githubusercontent.com/22375731/33899845-b6e6bf9c-df92-11e7-8e32-a7fc8b5908f8.gif)

6.   You will find the extension on navbar on chrome.
7.   Click on the icon to run the chrome extension.
8.   This app can also be loaded on localhost.
9.   Enter `npm run start` on terminal and it will load on localhost:3000