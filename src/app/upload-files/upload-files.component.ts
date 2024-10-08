import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { event } from 'jquery';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { Messages } from 'primeng/messages';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss',
  providers: [MessageService]
})

export class UploadFilesComponent implements OnInit {
  files: File[] = [];
  messages: Message[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  msgs: Message[] = [];
  uploadCompleted: boolean = false;
  isUploading: boolean = false;
  messageSuccess: string = '';

 @ViewChild(FileUpload) fileUploader: FileUpload | undefined;

  constructor(
    private config: PrimeNGConfig,
    private storage: Storage // Inicializar o Firebase Storage
  ) { }

  ngOnInit() { }
  
  choose(event: FileUploadHandlerEvent, callback: () => void) {
    callback()
    this.messages = [
      { severity: 'info', detail: `${this.files.length === 1 ? 'Arquivo pronto para upload.' : 'Arquivos prontos para upload.'}` },
    ];
  }

  onSelectedFiles(event: any) {
    event.currentFiles.forEach((file: File, index: any) => {
      if (this.validatePdfFile(file)) {
        event.currentFiles.splice(index, 1);
        // Verifica se fileUploader existe antes de tentar adicionar a mensagem
        if (this.fileUploader && this.fileUploader.msgs) {
          this.fileUploader.msgs.push({
            severity: 'error',
            detail: `O arquivo ${file.name} está fora do PADRÃO.`,
          });
        } else {
          console.error("fileUploader ou msgs não está definido.");
        }
      }
    });

  }

  removeFileCallback(event: any, index: number) {
    this.files.splice(index, 1); // Remove o arquivo pelo índice
  }

  onRemoveTemplatingFile(event: any, file: { size: any; }, removeFileCallback: (arg0: any, arg1: any) => void, index: any) {
    removeFileCallback(event, index);
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
  }

  validatePdfFile(file: File): boolean {
    // Verifica se o nome do arquivo começa com o que preciso
    return !file.name.startsWith('empresa-holerite-mat')
  }

 

  async uploadHandler(files: File[]) {

    for (let file of files) {

      this.files.push(file) // adicionar na lista

      try {
        // Criar uma referência no storage
        const fileRef = ref(this.storage, file.name);

        // Fazer o upload com acompanhamento de progresso
        const task = uploadBytesResumable(fileRef, file);

        task.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progresso: ${progress}%`);
          },
          (_error) => {
            if (this.fileUploader && this.fileUploader.msgs) {
            this.fileUploader.msgs.push({ severity: 'error', detail: `Erro ao enviar o arquivo: ${file.name}.` });
            }
          },
          async () => {
            // Pegar a URL do arquivo após o upload
            const downloadURL = await getDownloadURL(task.snapshot.ref);
            console.log(`Arquivo disponível para download: ${downloadURL}`);
          }
        );
      } catch (error) {
        console.error("Erro durante o upload:", error);
        if (this.fileUploader && this.fileUploader.msgs) {
          this.fileUploader.msgs.push({ severity: 'error', detail: `Erro inesperado durante o upload do arquivo: ${file.name}` });
        }
      }
    }
    // Barra de upload simulada
    this.isUploading = true;
    setTimeout(() => {
      this.isUploading = false;

      this.uploadCompleted = true;
      this.messageSuccess = `${this.files.length === 1 ? 'Arquivo enviado' : 'Arquivos enviados'} com sucesso!`;
      
      setTimeout(() => {
        this.uploadCompleted = false;
      }, 10000);
      files.length = 0
    }, 3000);
  }

  formatSize(bytes: number): string {
    const k = 1024;
    const dm = 2;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  
    if (bytes === 0) return '0 B';
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  
    return `${formattedSize} ${sizes[i]}`;
  }

}