import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestMenu } from 'src/app/models/RequestMenu';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
})
export class MenuFormComponent {
  @Output() onSubmit = new EventEmitter<RequestMenu>();

  MenuForm!: FormGroup;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.MenuForm = new FormGroup({
      nomeMenu: new FormControl(''),
      urlMenu: new FormControl(''),
    });
  }

  submit() {
    this.onSubmit.emit(this.MenuForm.value);
  }
}
