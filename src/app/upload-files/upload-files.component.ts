import { Component, OnInit, inject } from '@angular/core';
import { uploadBytes, Storage } from '@angular/fire/storage';
import { ref } from 'firebase/storage';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { FileUploadHandlerEvent } from 'primeng/fileupload';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss',
  providers: [MessageService, MessagesModule]
})
export class UploadFilesComponent implements OnInit {
  uploadedFiles: any[] = [];
  messages: Message[] = [];
  
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
        this.messages = []
        this.messages.push({ 
          severity: 'success',
          detail: `${event.files.length === 1 ? 'Arquivo enviado' :  'Arquivos enviados'} com sucesso!` 
        })
      }).catch((error) => {
        this.messages = []
        this.messages.push({ 
          severity: 'error', 
          detail: `Erro ao enviar ${event.files.length === 1 ? 'o arquivo!' :  'os arquivos!'}` 
        })
      })
    }

    this.messages = this.messages ?? []
  }
}
