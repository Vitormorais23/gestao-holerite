import { Component, OnInit } from '@angular/core';
import { uploadBytes, Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
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

  validatePdfFile(file: File): boolean {
    const fileName = file.name.toLowerCase();
    
    // verificar se o arquivo é um PDF
    if (file.type !== 'application/pdf') {
      this.messages.push({ severity: 'error', detail: 'O arquivo deve ser um PDF.' });
      return false;
    }

    // Verifica se o nome do arquivo começa com o que preciso
    if (!fileName.startsWith('empresa-holerite-mat')) {
      this.messages.push({ severity: 'error', detail: 'O arquivo deve começar com "empresa-holerite-mat".' });
      return false;
    }

    return true;
  }
  
  uploadHandler(event: FileUploadHandlerEvent) {

    for (const file of event.files) {

      // validar o arquivo
      if (!this.validatePdfFile(file)) {
        continue; // Se não passar pela validação vai pular o up
      }

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
      }),
      // pega a URL
      getDownloadURL(fileRef).then((url) => {
        console.log(url)
      })
    }

    this.messages = this.messages ?? []
  }
}

