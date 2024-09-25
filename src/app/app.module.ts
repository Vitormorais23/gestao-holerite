import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

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
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"gestao-de-holerite","appId":"1:739116739972:web:d9de3cdac9f936355e01d1","storageBucket":"gestao-de-holerite.appspot.com","locationId":"southamerica-east1","apiKey":"AIzaSyBdmfYajolV6BtfGoBbErX-Hrjupd_vom0","authDomain":"gestao-de-holerite.firebaseapp.com","messagingSenderId":"739116739972","measurementId":"G-BE724DMCE0"})),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
