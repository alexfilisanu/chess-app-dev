import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private webSocket!: WebSocket;
  private readonly socketUrl = 'ws://localhost:8090/websocket-endpoint';

  constructor() {
    this.connect();
  }

  public connect(): void {
    this.webSocket = new WebSocket(this.socketUrl);
    this.webSocket.addEventListener('open', (event) => {
      console.log('WebSocket connection established');
    });

    this.webSocket.addEventListener('message', (event) => {
      console.log('Received message from server:', event.data);
    });

    this.webSocket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });

  }

  public disconnect(): void {
    this.webSocket.close();
  }

  public sendMessage(message: any): void {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(message));
    }
  }

  public getMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      this.webSocket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        observer.next(message);
      });
    });
  }
}

