import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadFilesComponent } from './upload-files.component'; // Importe o componente que será exibido na rota

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UploadFilesComponent } // Use o componente em vez do módulo
  ])],
  exports: [RouterModule]
})
export class UploadFilesRoutingModule { }