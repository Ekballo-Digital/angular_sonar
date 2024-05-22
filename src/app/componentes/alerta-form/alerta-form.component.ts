import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestAlerta } from 'src/app/models/RequestAlerta';
import { ResponseCor } from 'src/app/models/ResponseCor';
import { SelectsService } from 'src/app/services/selects.service';

@Component({
  selector: 'app-alerta-form',
  templateUrl: './alerta-form.component.html',
  styleUrls: ['./alerta-form.component.css'],
})
export class AlertaFormComponent {
  @Output() onSubmit = new EventEmitter<RequestAlerta>();

  ResponseCor: ResponseCor[] = [];
  AlertaForm!: FormGroup;

  constructor(private selectsService: SelectsService) {}

  async ngOnInit(): Promise<void> {
    this.AlertaForm = new FormGroup({
      descricaoAlerta: new FormControl(''),
      nivelAlerta: new FormControl(''),
      codigoCor: new FormControl(''),
    });

    try {
      const ResponseCor = await this.selectsService.GetCor();
      this.ResponseCor = ResponseCor;
    } catch (error) {
      console.error('Erro ao obter valores:', error);
    }
  }

  submit() {
    this.onSubmit.emit(this.AlertaForm.value);
  }
}
