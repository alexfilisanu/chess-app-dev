import { Component } from '@angular/core';
import { WebSocketsService } from '../websockets-service/websockets.service';

@Component({
  selector: 'app-my-component',
  template: `
    <button (click)="sendMessage()">Send Message</button>
  `
})
export class MyComponent {
  constructor(private webSocketService: WebSocketsService) {}

  sendMessage(): void {
    const message = {
      content: 'Hello, WebSocket!'
    };
    this.webSocketService.sendMessage(message);
  }
}
