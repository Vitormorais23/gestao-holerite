import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFilesComponent } from './upload-files.component';
import { UploadFilesRouting } from './upload-files-routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UploadFilesRouting,
		FileUploadModule
	],
	declarations: [UploadFilesComponent],
})
export class UploadFilesModule { }