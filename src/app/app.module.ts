import {inject, makeEnvironmentProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {Auth, getAuth, provideAuth, user} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Page404Component} from './shared/components/page404/page404.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';

export function provideUserSignal() {
  return makeEnvironmentProviders([
    {
      provide: user,
      useFactory: () => {
        const auth = inject(Auth);
        return user(auth);
      }
    }
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],

  providers: [
    provideFirebaseApp(() => initializeApp({
      projectId: "erp-freeforall",
      appId: "1:178337635996:web:01ab1996b0507ac6351759",
      storageBucket: "erp-freeforall.firebasestorage.app",
      apiKey: "AIzaSyAo_GKBkULukj0YYiA6Zqa7zAbqubNbGN8",
      authDomain: "erp-freeforall.firebaseapp.com",
      messagingSenderId: "178337635996",
      measurementId: "G-PZF3CEZP3X"
    })),
    provideAuth(() => getAuth()),
    provideUserSignal(),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
