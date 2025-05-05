import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ExpensesNewComponent } from './components/expenses/expenses-new/expenses-new.component';
import { ExpensesEditComponent } from './components/expenses/expenses-edit/expenses-edit.component';
import { ExpensesListComponent } from './components/expenses/expenses-list/expenses-list.component';
import { ExpensesViewComponent } from './components/expenses/expenses-view/expenses-view.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { IncomesNewComponent } from './components/incomes/incomes-new/incomes-new.component';
import { IncomesEditComponent } from './components/incomes/incomes-edit/incomes-edit.component';
import { IncomesListComponent } from './components/incomes/incomes-list/incomes-list.component';
import { IncomesViewComponent } from './components/incomes/incomes-view/incomes-view.component';
import { BtnNewComponent } from './components/buttons/btn-new/btn-new.component';
import { BtnBackComponent } from './components/buttons/btn-back/btn-back.component';
import { BtnCancelComponent } from './components/buttons/btn-cancel/btn-cancel.component';
import { BtnShareComponent } from './components/buttons/btn-share/btn-share.component';
import { BtnSaveComponent } from './components/buttons/btn-save/btn-save.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
    NavbarComponent,
    ExpensesComponent,
    ExpensesNewComponent,
    ExpensesEditComponent,
    ExpensesListComponent,
    ExpensesViewComponent,
    IncomesComponent,
    IncomesNewComponent,
    IncomesEditComponent,
    IncomesListComponent,
    IncomesViewComponent,
    BtnNewComponent,
    BtnBackComponent,
    BtnCancelComponent,
    BtnShareComponent,
    BtnSaveComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({ projectId: "erp-freeforall", appId: "1:178337635996:web:01ab1996b0507ac6351759", storageBucket: "erp-freeforall.firebasestorage.app", apiKey: "AIzaSyAo_GKBkULukj0YYiA6Zqa7zAbqubNbGN8", authDomain: "erp-freeforall.firebaseapp.com", messagingSenderId: "178337635996", measurementId: "G-PZF3CEZP3X" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
