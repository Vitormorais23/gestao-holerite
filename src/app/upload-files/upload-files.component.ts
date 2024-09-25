import { Component, OnInit } from '@angular/core';
import { getStorage, ref } from 'firebase/storage';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss',
  providers: [MessageService]
})
export class UploadFilesComponent implements OnInit {
  
  
  
  
  uploadedFiles: any[] = [];
  
  // private storage = getStorage() // Inicializar o Firebase Storage
  
  constructor(private messageService: MessageService) {}
  
  ngOnInit () {}
  
  onUpload(event: any) {

    // for (const file of event.file) {
    //   this.uploadedFiles.push(file) // adicionar na lista

    //   // criar uma referencia no storage
    //   const fileRef = ref(this.storage, file.name)

    //   // fazer upload do arquivo

    // }

        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }
}
