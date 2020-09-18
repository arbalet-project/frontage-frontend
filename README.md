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

### Android phone

Sync your project with android files:
```
ionic cap sync (--prod)
```

Set your android studio path in the capacitor.config.json.
Open android studio:
```
npx cap open android
```
And launch with the android studio tools.