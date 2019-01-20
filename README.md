# react-native-and-web

Sample of React Native & Web, RN Maps, GeoLocation, API... will add GraphGL later.

Include following directory:
  
  - App - React Native ios & android application
  - Server - Nodejs Express web server & API

### Installation

This sample requires [Node.js](https://nodejs.org/) v10+ to run.

To install the App's dependencies and devDependencies.

```sh
$ cd react-native-and-web/app && yarn
$ react-native link
$ yarn web /** To preview the app on the browser **/
$ yarn ios
```

And for the Server...

```sh
$ cd react-native-and-web/web && npm install
$ nodemon app.js
```

### Map Geolocation - Only works on ios or android for now.

```sh
$ cd react-native-and-web/app
$ rm -f package.json && mv package_with_maps.json.backup package.json
$ yarn
$ react-native link
$ yarn ios /** or build from xcode **/
```

### Todos

 - Add GraphGL

