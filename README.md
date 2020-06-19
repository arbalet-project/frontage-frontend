# Arbalet Frontage frontend

This is the mobile frontend of Arbalet Frontage, the [pixelated building facade](https://vimeo.com/arbalet/frontage).

## Compile and deploy

First set IP of your environment [backend server](https://github.com/arbalet-project/frontage/tree/master/install) in the `environment.ts` or `environment.prod.ts`.

```
cd abalet-project
npm install
```

If ionic is not installed: `npm i -g @ionic/cli`.
```
ionic serve
```

Deploy on a connected Android phone and use live reload:
```
ionic capacitor run android -l
```
