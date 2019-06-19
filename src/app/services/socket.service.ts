import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  msg = this.socket.fromEvent<any>('message');
  identify = this.socket.fromEvent<any>('identify');

  constructor(public socket: Socket) {}

  getMessage() {
    console.log('socket service get message');
    return this.socket.fromEvent<any>('message').pipe(map((data) => data.message));
  }

  sendMessage(id: number, room: number, message: string) {
    const msgObj = {
      id,
      room,
      message,
    };
    this.socket.emit('message', msgObj);
    console.log('SS msg:', msgObj);
  }

  sendIdentity(userId: number) {
    this.socket.emit('identify', userId);
    console.log('SS identity', userId);
  }

  joinRoom(roomId: number) {
    const data = {
      room: roomId
    }
    console.log('reached join room', roomId)
    
    return this.socket.emit('subscribe', data)
    
  }
}
