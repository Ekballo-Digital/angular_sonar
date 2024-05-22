import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestFSistema } from 'src/app/models/RequestFSistema';

@Component({
  selector: 'app-fsistema-form',
  templateUrl: './fsistema-form.component.html',
  styleUrls: ['./fsistema-form.component.css'],
})
export class FsistemaFormComponent {
  @Output() onSubmit = new EventEmitter<RequestFSistema>();

  FSistemaForm!: FormGroup;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.FSistemaForm = new FormGroup({
      descricaoFuncao: new FormControl(''),
      urlFuncao: new FormControl(''),
      iconSvg: new FormControl(''),
    });
  }

  submit() {
    this.onSubmit.emit(this.FSistemaForm.value);
  }
}
