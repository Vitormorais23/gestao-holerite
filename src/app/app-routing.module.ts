import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UploadFilesComponent } from './upload-files/upload-files.component'; // Importe o componente diretamente

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: 'file-upload', component: UploadFilesComponent }, // Use o componente aqui
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }