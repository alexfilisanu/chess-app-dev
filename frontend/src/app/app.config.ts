import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  public backendIpAddress = '192.168.1.133:8090';
}
