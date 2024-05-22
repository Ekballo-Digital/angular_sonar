import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { RequestCor } from 'src/app/models/RequestCor';

@Component({
  selector: 'app-cor-form',
  templateUrl: './cor-form.component.html',
  styleUrls: ['./cor-form.component.css'],
})
export class CorFormComponent {
  @Output() onSubmit = new EventEmitter<RequestCor>();

  CorForm!: FormGroup;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.CorForm = new FormGroup({
      descricaoCor: new FormControl(''),
      hexaCor: new FormControl(''),
      hexaCorRed: new FormControl(''),
      hexaCorGreen: new FormControl(''),
      hexaCorBlue: new FormControl(''),
    });
  }

  submit() {
    this.onSubmit.emit(this.CorForm.value);
  }
}
