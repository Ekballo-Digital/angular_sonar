import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RequestGrupo } from 'src/app/models/RequestGrupo';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { ResponsePerfil } from 'src/app/models/ResponsePerfil';
import { SelectsService } from 'src/app/services/selects.service';

@Component({
  selector: 'app-grupoad-form',
  templateUrl: './grupoad-form.component.html',
  styleUrls: ['./grupoad-form.component.css'],
})
export class GrupoadFormComponent {
  @Output() onSubmit = new EventEmitter<RequestGrupo>();

  GrupoForm!: FormGroup;
  ResponseArea: ResponseArea[] = [];
  ResponsePerfil: ResponsePerfil[] = [];

  constructor(private SelectsService: SelectsService) {}

  async ngOnInit(): Promise<void> {
    this.GrupoForm = new FormGroup({
      nomeGrupoAd: new FormControl(''),
      codigoPerfil: new FormControl(''),
      codigoAreaGrupoAd: new FormControl(''),
    });

    this.ResponsePerfil = await this.SelectsService.GetPerfil();
    this.ResponseArea = await this.SelectsService.GetArea();
  }

  submit() {
    this.onSubmit.emit(this.GrupoForm.value);
  }
}
