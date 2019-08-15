# Arbalet Frontage frontend
This is the mobile frontend of Arbalet Frontage, the [pixelated building facade](https://vimeo.com/arbalet/frontage).

## Compile and deploy

First copy [environment](https://github.com/arbalet-project/frontage-frontend/blob/master/frontage-frontend-app/src/app/environment.example.ts) to `environment.ts`, set IP of your dev [backend server](https://github.com/arbalet-project/frontage/tree/master/install), and optionnally the DSN of the Sentry server.

```
cd frontage-frontend
npm install
```
If ionic is not installed: `npm i -g ionic`
```
ionic serve
```

Deploy on a connected Android phone:
```
ionic cordova run android --device
```
