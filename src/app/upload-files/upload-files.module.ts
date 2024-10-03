import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { UploadFilesComponent } from './upload-files.component';
import { MessagesModule } from 'primeng/messages';

@NgModule({
	declarations: [UploadFilesComponent],
	imports: [
		CommonModule,
		FormsModule,
		UploadFilesRoutingModule,
		FileUploadModule,
		MessagesModule
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class UploadFilesModule { }