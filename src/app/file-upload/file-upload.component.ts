import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  files = new FormControl()
  user_id = "110902016440927092929"
  progress: number = 0;
  message: string = '';
  uploadInProgress: boolean = false;

  constructor(private fileUploadService: FileUploadService, private snackBar: MatSnackBar) { } 

  uploadFiles(event:any){
    console.log("Uploading image")
    if(this.files.valid){
      this.fileUploadService.uploadFiles(this.user_id, event.target.files).then(result => {
        console.log('Upload successful', result);
        this.snackBar.open('Your files has been uploaded successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds (optional)
        });
      }).catch(error => {
        console.error('Upload failed', error);
      });
    }
  }
}
