import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-MessageService',
  templateUrl: './MessageService.component.html',
  styleUrls: ['./MessageService.component.css'],
})
export class MessageServiceComponent implements OnInit {
  constructor(public messageService: MessageService) {}
  messages: string[] = [];
  ngOnInit() {
    this.messageService.messages = this.messages;
  }
}
