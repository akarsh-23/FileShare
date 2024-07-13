import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  files = new FormControl()
  user_id = "110902016440927092929"

  constructor(private fileUploadService: FileUploadService, private snackBar: MatSnackBar) { } 

  uploadImages(event:any){
    console.log("Uploading image")
    if(this.files.valid){
      this.fileUploadService.uploadImage(this.user_id, event.target.files).subscribe(
        (data)=>{
          console.log("Upload success:", data)
          this.snackBar.open('Your files has been uploaded successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds (optional)
          });
        },
        (error)=>{
          console.error("Upload error:", error)
        }
      )
    }
  }
}
