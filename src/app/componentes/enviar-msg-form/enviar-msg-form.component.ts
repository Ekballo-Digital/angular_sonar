import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Enviar } from 'src/app/models/Enviar';
import { RequestEnviarMsg } from 'src/app/models/RequestEnviarMsg';
import { EnviarService } from 'src/app/services/enviar.service';
import { ResponseEnviarGeral } from 'src/app/models/ResponseEnviarGeral';
import { RequestEnviarMsgNovo } from 'src/app/models/RequestEnviarMsgNovo';

@Component({
  selector: 'app-enviar-msg-form',
  templateUrl: './enviar-msg-form.component.html',
  styleUrls: ['./enviar-msg-form.component.css'],
})
export class EnviarMsgFormComponent {
  @Output() onSubmit = new EventEmitter<RequestEnviarMsgNovo[]>();

  Estados: ResponseEnviarGeral[] = [];
  EnviaForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private enviarService: EnviarService
  ) {}

  async ngOnInit(): Promise<void> {
    const idestado = this.route.snapshot.paramMap.get('idestado');

    const FuncaoEnviar: Enviar = {
      codigoEstado: Number(idestado),
    };

    try {
      // Obter estados
      const response = await this.enviarService.GetEstados(FuncaoEnviar);
      this.Estados = response;

      // Inicializar o formulário
      this.initForm();
    } catch (error) {
      console.error('Erro ao obter os estados:', error);
    }
  }

  private initForm(): void {
    const idpainel = this.route.snapshot.paramMap.get('idpainel');

    this.EnviaForm = new FormGroup({});
    this.Estados.forEach((estado, index) => {
      const formGroup = new FormGroup({
        mensagem: new FormControl(estado.descricaoEstado),
        codigoArea: new FormControl(estado.codigoArea),
        alerta: new FormControl(estado.nivelAlerta),
        prioridade: new FormControl(estado.codigoPrioridade),
        cor: new FormControl(estado.descCor),
        painelEnvio: new FormControl(idpainel),
      });
      this.EnviaForm.addControl(index.toString(), formGroup);
    });
  }

  submit() {
    const formData: RequestEnviarMsgNovo[] = [];

    // Coletar os dados do formulário
    for (const key in this.EnviaForm.controls) {
      const formGroup = this.EnviaForm.controls[key] as FormGroup;
      formData.push(formGroup.value);
    }

    // Emitir o evento com os dados coletados
    this.onSubmit.emit(formData);
  }
}
