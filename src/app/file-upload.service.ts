import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = '/api';

  constructor() { }

  uploadImage(id: string, files: FileList): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof Worker !== 'undefined') {
        // Create a new web worker
        const worker = new Worker(new URL('./file-upload.worker', import.meta.url));

        // Convert files to serializable format
        const fileData = [];
        for (let i = 0; i < files.length; i++) {
          fileData.push({
            name: files[i].name,
            content: files[i]
          });
        }

        // Send data to the worker
        worker.postMessage({ apiUrl: this.apiUrl, id, files: fileData });

        // Listen for messages from the worker
        worker.onmessage = ({ data }) => {
          if (data.success) {
            resolve(data.result);
          } else {
            reject(data.error);
          }
        };

        // Handle worker errors
        worker.onerror = (error) => {
          reject(error);
        };
      } else {
        // Web Workers are not supported
        reject(new Error('Web Workers are not supported in this environment.'));
      }
    });
  }
}
