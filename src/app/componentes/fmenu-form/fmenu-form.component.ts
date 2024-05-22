import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Menu } from 'src/app/models/Menu';
import { RequestFuncaoMenu } from 'src/app/models/RequestFuncaoMenu';
import { UpdateMenu } from 'src/app/models/UpdateMenu';
import { MenuFormService } from 'src/app/services/menu-form.service';
import { FmenuFormService } from 'src/app/services/fmenu-form.service';
import { FSistema } from 'src/app/models/FSistema';
import { FsistemaFormService } from 'src/app/services/fsistema-form.service';

@Component({
  selector: 'app-fmenu-form',
  templateUrl: './fmenu-form.component.html',
  styleUrls: ['./fmenu-form.component.css'],
})
export class FmenuFormComponent {
  @Output() onSubmit = new EventEmitter<RequestFuncaoMenu>();

  FMenuForm!: FormGroup;
  Menu: UpdateMenu[] = [];
  FMenu: FSistema[] = [];

  constructor(
    private MenuFormService: MenuFormService,
    private FsistemaFormService: FsistemaFormService
  ) {}

  async ngOnInit(): Promise<void> {
    this.FMenuForm = new FormGroup({
      codigoMenu: new FormControl(''),
      codigoFuncao: new FormControl(''),
    });

    this.Menu = await this.MenuFormService.GetMenu();
    this.FMenu = await this.FsistemaFormService.GetFSistema();
  }

  submit() {
    this.onSubmit.emit(this.FMenuForm.value);
  }
}
