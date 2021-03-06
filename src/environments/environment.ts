// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // backEndBaseUrl: 'http://api.arbalet-project.org',
  // webSocketAdress: 'ws://ws.arbalet-project.org',
  // trackingUrl: 'http://matomo.arbalet-project.org',
  backEndBaseUrl: 'http://localhost:33405',
  webSocketAdress: 'ws://localhost:33406',
  trackingUrl: 'http://localhost:33460',
  idTrackingSite : 3,
  protocol_version: 3,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
