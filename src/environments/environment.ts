// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiHref: 'http://localhost:3000/',
  firebase: {
    apiKey: 'AIzaSyBkvU75xlPdss_vsd5CZMr8pc89DNZQI1E',
    authDomain: 'salty-8f9ae.firebaseapp.com',
    databaseURL: 'https://salty-8f9ae.firebaseio.com',
    projectId: 'salty-8f9ae',
    storageBucket: 'salty-8f9ae.appspot.com',
    messagingSenderId: '1093609830342'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
