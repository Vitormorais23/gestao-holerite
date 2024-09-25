import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { UploadFilesComponent } from './upload-files.component';

@NgModule({
	declarations: [UploadFilesComponent],
	imports: [
		CommonModule,
		FormsModule,
		UploadFilesRoutingModule,
		FileUploadModule
	],
})
export class UploadFilesModule { }