import { Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: 'upload', component: FileUploadComponent },
    { path: 'chat', component: ChatComponent},
    { path: '', redirectTo: 'chat', pathMatch: 'full' }
];
