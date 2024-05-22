import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestPerfil } from 'src/app/models/RequestPerfil';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css'],
})
export class PerfilFormComponent {
  @Output() onSubmit = new EventEmitter<RequestPerfil>();

  PerfilForm!: FormGroup;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.PerfilForm = new FormGroup({
      nomePerfil: new FormControl(''),
    });
  }

  submit() {
    this.onSubmit.emit(this.PerfilForm.value);
  }
}
