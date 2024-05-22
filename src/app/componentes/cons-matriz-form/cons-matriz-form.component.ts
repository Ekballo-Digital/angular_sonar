import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ResponseAlertas } from 'src/app/models/ReponseAlertas';
import { RequestMatriz } from 'src/app/models/RequestMatriz';
import { ResponseAlerta } from 'src/app/models/ResponseAlerta';
import { ResponseAlerta2 } from 'src/app/models/ResponseAlerta2';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { ResponseEstados } from 'src/app/models/ResponseEstados';
import { responsePropiedades } from 'src/app/models/ResponsePrioridades';
import { SelectsService } from 'src/app/services/selects.service';

@Component({
  selector: 'app-cons-matriz-form',
  templateUrl: './cons-matriz-form.component.html',
  styleUrls: ['./cons-matriz-form.component.css'],
})
export class ConsMatrizFormComponent {
  @Output() onSubmit = new EventEmitter<RequestMatriz>();
  MatrizForm!: FormGroup;

  ResponseEstado: ResponseEstados[] = [];
  ResponseArea: ResponseArea[] = [];
  ResponseAlerta: ResponseAlerta[] = [];
  ResponseAlerta2: ResponseAlerta2[] = [];
  ResponsePrioridade: responsePropiedades[] = [];

  constructor(private title: Title, private selectsService: SelectsService) {}

  async ngOnInit(): Promise<void> {
    this.MatrizForm = new FormGroup({
      codigoEstado: new FormControl(),
      codigoArea: new FormControl(),
      codigoAlerta: new FormControl(),
      codigoPrioridade: new FormControl(),
    });

    try {
      this.ResponseEstado = await this.selectsService.GetEstados();
      this.ResponseArea = await this.selectsService.GetArea();
      this.ResponseAlerta = await this.selectsService.GetAlertas();
      this.ResponseAlerta2 = await this.selectsService.GetAlertas2();
      this.ResponsePrioridade = await this.selectsService.GetPrioridades();
    } catch (error) {
      console.error(error);
    }
  }

  submit() {
    this.onSubmit.emit(this.MatrizForm.value);
  }
}
