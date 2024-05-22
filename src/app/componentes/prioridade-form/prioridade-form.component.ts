import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestPrio } from 'src/app/models/RequestPrio';

@Component({
  selector: 'app-prioridade-form',
  templateUrl: './prioridade-form.component.html',
  styleUrls: ['./prioridade-form.component.css'],
})
export class PrioridadeFormComponent {
  @Output() onSubmit = new EventEmitter<RequestPrio>();

  PrioForm!: FormGroup;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.PrioForm = new FormGroup({
      codigoPrioridade: new FormControl(''),
      nomePrioridade: new FormControl(''),
    });
  }

  submit() {
    this.onSubmit.emit(this.PrioForm.value);
  }
}
