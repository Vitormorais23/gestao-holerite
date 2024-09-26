import { Component, OnInit, inject } from '@angular/core';
import { uploadBytes, Storage } from '@angular/fire/storage';
import { ref } from 'firebase/storage';
import { MessageService } from 'primeng/api';
import { FileUploadHandlerEvent } from 'primeng/fileupload';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss',
  providers: [MessageService]
})
export class UploadFilesComponent implements OnInit {




  uploadedFiles: any[] = [];

  
  constructor(
    private messageService: MessageService,
    private storage: Storage // Inicializar o Firebase Storage
  ) { }

  ngOnInit() { }

  uploadHandler(event: FileUploadHandlerEvent) {

    for (const file of event.files) {
      this.uploadedFiles.push(file) // adicionar na lista

      // criar uma referencia no storage
      const fileRef = ref(this.storage, file.name)

      // fazer upload do arquivo
      uploadBytes(fileRef, file).then((snapshot) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Arquivo ${file.name} enviado com sucesso' })
      }).catch((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao enviar o arquivo ${file.name}' })
      })
    }

    // for (const file of event.files) {
    //   this.uploadedFiles.push(file);
    // }

    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  // onBasicUpload() {
  //   this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  // }
}
