import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Msg } from './socket.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  msgs: Msg[];

  msg = this.socket.fromEvent<any>('message');
  identify = this.socket.fromEvent<any>('identify');

  constructor(public socket: Socket) {}

  getMessage() {
    this.socket.on('message', (msg: any) => {
      console.log('SS message received');
    })
    console.log('socket service get message');
    return this.socket.fromEvent<any>('message').pipe(map((data) => data.message));
  }

  sendMessage(msg: any) {
    this.socket.emit('message', msg);
    console.log('SS msg:', msg);
  }

  sendIdentity(userId: number) {
    this.socket.emit('identify', userId);
    console.log('SS identity', userId);
  }

  createRoom(roomId: number) {
    const data = {
      room: roomId
    }

    this.socket.emit('create', data);
    return this.joinRoom(roomId);
  }

  joinRoom(roomId: number) {
    const data = {
      room: roomId
    }
    console.log('reached join room', roomId)
    
    return this.socket.emit('subscribe', data)
    
  }
}
