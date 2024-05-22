import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestArea } from 'src/app/models/RequestArea';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css'],
})
export class AreaFormComponent {
  @Output() onSubmit = new EventEmitter<RequestArea>();

  AreaForm!: FormGroup;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.AreaForm = new FormGroup({
      nomeArea: new FormControl(''),
      siglaArea: new FormControl(''),
      tipoArea: new FormControl(''),
    });
  }

  submit() {
    this.onSubmit.emit(this.AreaForm.value);
  }
}
