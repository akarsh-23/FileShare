import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = '/api';
  private worker!:Worker;

  private progressSubject = new Subject<number>(); // Subject for progress updates

  constructor() { 
    // Create a new web worker
    this.worker = new Worker(new URL('./file-upload.worker', import.meta.url));
  }

  uploadFiles(id: string, files: FileList): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof Worker !== 'undefined') {
        // Convert files to serializable format
        const fileData = [];
        for (let i = 0; i < files.length; i++) {
          fileData.push({
            name: files[i].name,
            content: files[i]
          });
        }

        // Send data to the worker
        this.worker.postMessage({ apiUrl: this.apiUrl, id, files: fileData });

        // Listen for messages from the worker
        this.worker.onmessage = ({ data }) => {
          if (data.progress !== undefined) {
            // Notify subscribers about progress updates
            this.progressSubject.next(data.progress);
          } else if (data.success) {
            // Resolve promise on successful upload
            resolve(data.result);
          } else {
            // Reject promise on error
            reject(data.error);
          }
        };

        // Handle worker errors
        this.worker.onerror = (error) => {
          reject(error);
        };
      } else {
        // Web Workers are not supported
        reject(new Error('Web Workers are not supported in this environment.'));
      }
    });
  }

  // Method to subscribe to progress updates
  getProgressObservable() {
    return this.progressSubject.asObservable();
  }

}
