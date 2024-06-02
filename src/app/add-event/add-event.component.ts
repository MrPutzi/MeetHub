import {E} from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Event } from '../../entities/event';
import { EventsService } from '../../services/events.service';
import { Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  addEventForm: FormGroup;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addEventForm.valid) {
      this.eventsService.addEvent(this.addEventForm.value).subscribe(() => {
        this.router.navigate(['/Dashboard']);
      });
    }
  }
}
