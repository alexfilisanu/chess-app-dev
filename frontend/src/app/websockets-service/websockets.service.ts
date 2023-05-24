// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketsService {
//   private webSocket!: WebSocket;
//   private readonly socketUrl = 'ws://localhost:8090/websocket-endpoint';
//   private messageSubject: Subject<any> = new Subject<any>();
//
//   constructor() {
// //     this.connect();
//   }
//
//   public connect(): void {
//     this.webSocket = new WebSocket(this.socketUrl);
//     this.webSocket.addEventListener('open', (event) => {
//         console.log('WebSocket connection established');
//     });
//
//     this.webSocket.addEventListener('message', (event) => {
//         console.log('Received message from server:', event.data);
//         const message = JSON.parse(event.data);
//         this.messageSubject.next(message);
//     });
//
//     this.webSocket.addEventListener('close', (event) => {
//         console.log('WebSocket connection closed');
//     });
//   }
//
//   public disconnect(): void {
//     this.webSocket.close();
//   }
//
//   public sendMessage(message: any): void {
//     if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
//       this.webSocket.send(JSON.stringify(message));
//     } else {
//       console.log('WebSocket connection is not open.');
//     }
//   }
//
//   public getMessage(): Observable<any> {
//       return this.messageSubject.asObservable();
//   }
// }
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private webSocket!: WebSocket;
  private readonly socketUrl = 'ws://localhost:8090/websocket-endpoint';
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
//     this.connect();
  }

  public connect(): void {
    if (this.webSocket) {
      return;
    }

    this.webSocket = new WebSocket(this.socketUrl);
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
