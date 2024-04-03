import io from 'socket.io-client';
import { Socket } from 'socket.io-client'; 

class SocketIOService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); 
    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('notification', (data: any) => {
      // Handle incoming notifications
      console.log('Received notification:', data);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  sendNotification(notification: any) {
    this.socket.emit('notification', notification);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default SocketIOService;
