import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: { user: string, text: string }[] = [];
  currentMessage: string = '';
  isBotTyping: boolean = false; // To show typing indicator
  @ViewChild('chatWindow', { static: false })
  private chatWindow!: ElementRef;

  constructor(private chatService: ChatService) {}

  // Send message and get response from backend
  sendMessage(): void {
    if (this.currentMessage.trim()) {
      // Add user's message to chat
      this.messages.push({ user: 'You', text: this.currentMessage });

      const query = this.currentMessage;
      this.currentMessage = '';  // Clear the input field

      // Show the typing indicator
      this.isBotTyping = true;

      // Send GET request with the query
      this.chatService.getResponse(query).subscribe({
        next: (response) => {
          // Add the bot's response to the chat
          this.isBotTyping = false; // Hide typing indicator
          this.messages.push({ user: 'Bot', text: response });

          // Scroll to the bottom after adding the new message
          this.scrollToBottom();
        },
        error: (err) => {
          // Handle error if request fails
          this.isBotTyping = false; // Hide typing indicator
          this.messages.push({ user: 'Bot', text: 'Error: Unable to retrieve response.' });
          console.error('Error:', err);

          // Scroll to the bottom after adding the error message
          this.scrollToBottom();
        }
      });

      // Scroll to the bottom after sending message
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    // Check if chatWindow is defined and has nativeElement
    if (this.chatWindow?.nativeElement) {
      setTimeout(() => {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      }, 100);
    }
  }
}
