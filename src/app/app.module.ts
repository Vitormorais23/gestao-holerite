import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { ReactiveFormsModule } from '@angular/forms';

// Importações do AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Configurações do Firebase (copiadas do Firebase Console)
const firebaseConfig = {
  projectId: "gestao-de-holerite",
  appId: "1:739116739972:web:d9de3cdac9f936355e01d1",
  storageBucket: "gestao-de-holerite.appspot.com",
  locationId: "southamerica-east1",
  apiKey: "AIzaSyBdmfYajolV6BtfGoBbErX-Hrjupd_vom0",
  authDomain: "gestao-de-holerite.firebaseapp.com",
  messagingSenderId: "739116739972",
  measurementId: "G-BE724DMCE0"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    UploadFilesModule,
    ReactiveFormsModule,
    // Inicializa o Firebase App
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Inicializa o Firebase Storage
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }