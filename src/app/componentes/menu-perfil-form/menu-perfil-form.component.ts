import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestMenuPerfil } from 'src/app/models/RequestMenuPerfil';
import { ResponseMenu } from 'src/app/models/ResponseMenu';
import { ResponsePerfil } from 'src/app/models/ResponsePerfil';
import { SelectsService } from 'src/app/services/selects.service';

@Component({
  selector: 'app-menu-perfil-form',
  templateUrl: './menu-perfil-form.component.html',
  styleUrls: ['./menu-perfil-form.component.css'],
})
export class MenuPerfilFormComponent {
  @Output() onSubmit = new EventEmitter<RequestMenuPerfil>();
  ResponsePerfil: ResponsePerfil[] = [];
  ResponseMenu: ResponseMenu[] = [];

  MenuPerfilForm!: FormGroup;

  constructor(private selectsService: SelectsService) {}

  async ngOnInit(): Promise<void> {
    this.MenuPerfilForm = new FormGroup({
      codigoMenu: new FormControl(''),
      codigoPerfil: new FormControl(''),
    });

    this.ResponsePerfil = await this.selectsService.GetPerfil();
    this.ResponseMenu = await this.selectsService.GetMenu();

    console.log(this.MenuPerfilForm);
  }

  submit() {
    this.onSubmit.emit(this.MenuPerfilForm.value);
  }
}
