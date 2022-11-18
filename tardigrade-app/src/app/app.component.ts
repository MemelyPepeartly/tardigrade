import { Component } from '@angular/core';
import { MessageDTO } from 'src/classes/message-dto';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDTO) => {
      console.log("Here?")
      this.addToInbox(receivedObj);
    });  // calls the service method to get the new messages sent

  }

  msgDto!: MessageDTO;
  msgInboxArray: MessageDTO[] = [];

  send(message: string, user: string): void {
    if (user.length == 0 || message.length == 0) {
      window.alert("Both fields are required.");
      return;
    }
    else {
      this.msgDto = { message: message, user: user };
      console.log(this.msgDto);

      this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
    }
  }

  addToInbox(obj: MessageDTO) {
    let newObj = new MessageDTO();
    newObj.user = obj.user;
    newObj.message = obj.message;
    this.msgInboxArray.push(newObj);

  }
}
