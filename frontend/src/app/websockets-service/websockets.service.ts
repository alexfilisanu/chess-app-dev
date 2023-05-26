import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private webSocket!: WebSocket;
  private readonly socketUrl;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor(private appConfig: AppConfig) {
    this.socketUrl = `ws://${appConfig.backendIpAddress}/websocket-endpoint`
  }

  public connect(randomCode: string): void {
    if (this.webSocket) {
      return;
    }

    this.webSocket = new WebSocket(`${this.socketUrl}/${randomCode}`);
    this.webSocket.addEventListener('open', (event) => {
      console.log('WebSocket connection established');
    });

    this.webSocket.addEventListener('message', (event) => {
      console.log('Received message from server:', event.data);
      const message = JSON.parse(event.data);
      this.messageSubject.next(message);
    });

    this.webSocket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });

  }

  public disconnect(): void {
    this.webSocket.close();
  }

  public sendMessage(message: any): void {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(message));
    } else {
      console.log('socket closed!');
    }
  }

  public getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
