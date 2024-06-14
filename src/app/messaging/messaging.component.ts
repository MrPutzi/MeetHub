import {Component, inject, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css'
})
export class MessagingComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  delay = 3000;
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(msg => {
      if (msg.type == 'error') {
        this.errorMessage = msg.message;
        setTimeout(() => this.errorMessage = '', this.delay);
      } else {
        this.successMessage = msg.message;
        setTimeout(() => this.successMessage = '', this.delay);
      }
    });
  }
}
