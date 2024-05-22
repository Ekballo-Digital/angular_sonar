import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { RequestEstado } from 'src/app/models/ResquestEstado';
import { SelectsService } from 'src/app/services/selects.service';

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css'],
})
export class EstadoFormComponent {
  @Output() onSubmit = new EventEmitter<RequestEstado>();

  EstadoForm!: FormGroup;
  ResponseArea: ResponseArea[] = [];

  constructor(private SelectsService: SelectsService) {}

  async ngOnInit(): Promise<void> {
    this.EstadoForm = new FormGroup({
      descricaoEstado: new FormControl(''),
      codigoAreaEstado: new FormControl(''),
      tipoEstado: new FormControl(''),
    });

    const ResponseArea = await this.SelectsService.GetArea();
    this.ResponseArea = ResponseArea;
  }

  submit() {
    this.onSubmit.emit(this.EstadoForm.value);
  }
}
