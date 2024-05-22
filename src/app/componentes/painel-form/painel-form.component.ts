import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestPainel } from 'src/app/models/RequestPainel';
import { ResponseArea } from 'src/app/models/ResponseArea';
import { SelectsService } from 'src/app/services/selects.service';

@Component({
  selector: 'app-painel-form',
  templateUrl: './painel-form.component.html',
  styleUrls: ['./painel-form.component.css'],
})
export class PainelFormComponent {
  @Output() onSubmit = new EventEmitter<RequestPainel>();

  PainelForm!: FormGroup;
  ResponseArea: ResponseArea[] = [];

  constructor(private SelectsService: SelectsService) {}

  async ngOnInit(): Promise<void> {
    this.PainelForm = new FormGroup({
      ipPainel: new FormControl(''),
      codigoArea: new FormControl(''),
      portaPainel: new FormControl(''),
      statusPainel: new FormControl(''),
    });

    const ResponseArea = await this.SelectsService.GetArea();
    this.ResponseArea = ResponseArea;
  }

  submit() {
    this.onSubmit.emit(this.PainelForm.value);
  }
}
