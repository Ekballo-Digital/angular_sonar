import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() onSubmit = new EventEmitter<Login>();

  Ano: number;
  LoginForm!: FormGroup;

  constructor() {
    const today = new Date();

    this.Ano = today.getFullYear();
  }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      matriculaUsuario: new FormControl(''),
      senhaUsuario: new FormControl(''),
    });
  }

  submit() {
    this.onSubmit.emit(this.LoginForm.value);
  }
}
