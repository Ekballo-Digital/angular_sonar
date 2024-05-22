import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Fila } from 'src/app/models/Fila';
import { FilasService } from 'src/app/services/filas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fila-mensagens',
  templateUrl: './fila-mensagens.component.html',
  styleUrls: ['./fila-mensagens.component.css'],
})
export class FilaMensagensComponent {
  filaEnvio: Fila[] = [];
  filaEnvioGeral: Fila[] = [];
  Filas: Fila[] = [];
  private session: string = '';
  private matricula: string = '';

  constructor(
    private title: Title,
    private FilasService: FilasService,
    private cookie: CookieService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const novoTitulo = 'Fila';
    this.title.setTitle(novoTitulo);
    const codigoPainel = this.route.snapshot.paramMap.get('idpainel');

    this.session = this.cookie.get('session');

    const data = JSON.parse(this.session);
    this.matricula = data.matriculaUsuario || '';

    const responseSelectFilaEnvio = await this.FilasService.SelectFilaEnvio(
      this.matricula,
      Number(codigoPainel)
    );

    this.filaEnvio = responseSelectFilaEnvio;

    //console.log(this.filaEnvio);

    //SelectFilaEnvioGeral

    const responseSelectFilaEnvioGeral =
      await this.FilasService.SelectFilaEnvioGeral(Number(codigoPainel));

    this.filaEnvioGeral = responseSelectFilaEnvioGeral;

    // console.log(this.filaEnvioGeral);
  }

  async deleteItem(item: number): Promise<void> {
    console.log(item);
    Swal.fire({
      title: 'Tem certeza que deseja excluir este item?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        //const index = this.Filas.indexOf(item);

        const response = await this.FilasService.DeleteFila(item);

        console.log(response);

        if (response == 200) {
          Swal.fire('Deletado!', '', 'success');
          location.reload();
        }

        console.log(response);
      } else if (result.isDenied) {
        Swal.fire('Operação cancelada', '', 'info');
      }
    });
  }
}
