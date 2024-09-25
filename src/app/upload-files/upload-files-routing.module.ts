import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadFilesComponent } from './upload-files.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UploadFilesComponent }
	])],
	exports: [RouterModule]
})
export class UploadFilesRouting { }