import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({
    projectId: "erp-freeforall",
    appId: "1:178337635996:web:01ab1996b0507ac6351759",
    storageBucket: "erp-freeforall.firebasestorage.app",
    apiKey: "AIzaSyAo_GKBkULukj0YYiA6Zqa7zAbqubNbGN8",
    authDomain: "erp-freeforall.firebaseapp.com",
    messagingSenderId: "178337635996",
    measurementId: "G-PZF3CEZP3X"
  })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
