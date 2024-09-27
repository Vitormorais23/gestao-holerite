import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
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
      this.messages = []
      this.messages.push({ severity: 'error', detail: 'O arquivo deve ser um PDF.' });
      return false;
    }

    // Verifica se o nome do arquivo começa com o que preciso
    if (!fileName.startsWith('empresa-holerite-mat')) {
      this.messages = []
      this.messages.push({ severity: 'error', detail: 'O arquivo deve começar com "empresa-holerite-mat".' });
      return false;
    }

    return true;
  }

  async uploadHandler(event: FileUploadHandlerEvent) {

    for (const file of event.files) {

      if (!this.validatePdfFile(file)) {
        continue; // Se não passar pela validação vai pular o up
      }

      this.uploadedFiles.push(file) // adicionar na lista

      // criar uma referencia no storage
      const fileRef = ref(this.storage, file.name)

      // Fazer o upload com acompanhamento de progresso
      const task = uploadBytesResumable(fileRef, file)

      task.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso: ${progress}%`);

        },
        (_error) => {
          this.messages.push({ severity: 'error', detail: `Erro ao enviar o arquivo: ${file.name}.` });
        },
        async () => {
          // pegar a URL
          const downloadURL = await getDownloadURL(task.snapshot.ref)
          console.log(`Arquivo disponivel para download: ${downloadURL}`)
          this.messages = []
          this.messages.push({ severity: 'success', detail: `${event.files.length === 1 ? 'Arquivo enviado' :  'Arquivos enviados'} com sucesso!`});
        }
      )
    }
    this.messages = this.messages ?? []
  }
}