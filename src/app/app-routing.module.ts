import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AnotherMiddlewarePainel, AuthGuard } from './auth.guard';
import { OpcoesComponent } from './pages/opcoes/opcoes.component';
import { NumericIdGuard } from './NumericIdGuard';
import { MensagensComponent } from './pages/mensagens/mensagens.component';
import { EnviarComponent } from './pages/enviar/enviar.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadAlertasComponent } from './pages/cad-alertas/cad-alertas.component';
import { CadCoresComponent } from './pages/cad-cores/cad-cores.component';
import { CadLocaisComponent } from './pages/cad-locais/cad-locais.component';
import { CadMandatorioComponent } from './pages/cad-mandatorio/cad-mandatorio.component';
import { CadPainelComponent } from './pages/cad-painel/cad-painel.component';
import { CadEstadoOperacaoComponent } from './pages/cad-estado-operacao/cad-estado-operacao.component';
import { ConGruposAdComponent } from './pages/con-grupos-ad/con-grupos-ad.component';
import { ConMenusComponent } from './pages/con-menus/con-menus.component';
import { ConPerfilUserComponent } from './pages/con-perfil-user/con-perfil-user.component';
import { ConMenuPerfilComponent } from './pages/con-menu-perfil/con-menu-perfil.component';
import { ConFuncaoMenuComponent } from './pages/con-funcao-menu/con-funcao-menu.component';
import { ConFuncaoSistemaComponent } from './pages/con-funcao-sistema/con-funcao-sistema.component';
import { ConsLogEnvComponent } from './pages/cons-log-env/cons-log-env.component';
import { ConsLogOpComponent } from './pages/cons-log-op/cons-log-op.component';
import { ConsMatrizAlertaComponent } from './pages/cons-matriz-alerta/cons-matriz-alerta.component';
import { EditaveisComponent } from './pages/editaveis/editaveis.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditarCorComponent } from './pages/editar-cor/editar-cor.component';
import { EditarPrioridadeComponent } from './pages/editar-prioridade/editar-prioridade.component';
import { EditarAreaComponent } from './pages/editar-area/editar-area.component';
import { EditarEstadoComponent } from './pages/editar-estado/editar-estado.component';
import { EditarPainelComponent } from './pages/editar-painel/editar-painel.component';
import { EditarGrupoadComponent } from './pages/editar-grupoad/editar-grupoad.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { EditarMenuComponent } from './pages/editar-menu/editar-menu.component';
import { EditarFsistemaComponent } from './pages/editar-fsistema/editar-fsistema.component';
import { EditarFmenuComponent } from './pages/editar-fmenu/editar-fmenu.component';
import { EditarMenuPerfilComponent } from './pages/editar-menu-perfil/editar-menu-perfil.component';
import { EditarMatrizComponent } from './pages/editar-matriz/editar-matriz.component';
import { AnotherMiddlewareUrlsCadastro } from './middlewareUrlsCadastro.guard';
import { AnotherMiddlewareUrlsControle } from './middlewareUrlsControle.guard';
import { AnotherMiddlewareUrlsMatriz } from './middlewareUrlsMatriz.guard';
import { NumericIdMenuGuard } from './NumericIdMenuGuard';
import { NumericIdMsgGuard } from './NumericIdMsgGuard';
import { NumericIdEnvGuard } from './NumericIdEnvGuard';
import { FilaMensagensComponent } from './pages/fila-mensagens/fila-mensagens.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'paineis',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'paineis/opcoes/:idpainel/:idmenu',
    component: OpcoesComponent,
    canActivate: [AuthGuard, NumericIdGuard, AnotherMiddlewarePainel],
    pathMatch: 'full',
    data: { requiresId: true },
  },
  {
    path: 'mensagens/matriz/:idpainel/:idarea',
    component: MensagensComponent,
    canActivate: [AuthGuard, NumericIdMsgGuard, AnotherMiddlewarePainel],
  },
  {
    path: 'fila-mensagem/matriz/:idpainel/:idarea',
    component: FilaMensagensComponent,
    canActivate: [AuthGuard, NumericIdMsgGuard, AnotherMiddlewarePainel],
  },
  {
    path: 'mensagens/enviar/:idpainel/:idestado',
    component: EnviarComponent,
    canActivate: [AuthGuard, NumericIdEnvGuard, AnotherMiddlewarePainel],
  },
  {
    path: 'cadastro/opcoes/:idmenu',
    component: CadastroComponent,
    canActivate: [AuthGuard, NumericIdMenuGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'controle/opcoes/:idmenu',
    component: CadastroComponent,
    canActivate: [AuthGuard, NumericIdMenuGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'consulta/opcoes/:idmenu',
    component: CadastroComponent,
    canActivate: [AuthGuard, NumericIdMenuGuard],
  },
  {
    path: 'config-matriz/opcoes/:idmenu',
    component: CadastroComponent,
    canActivate: [AuthGuard, NumericIdMenuGuard, AnotherMiddlewareUrlsMatriz],
  },
  {
    path: 'cadastro/funcoes/alerta',
    component: CadAlertasComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/funcoes/cor',
    component: CadCoresComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/funcoes/local',
    component: CadLocaisComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/funcoes/mandatorio',
    component: CadMandatorioComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/funcoes/painel',
    component: CadPainelComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/funcoes/estado-opercao',
    component: CadEstadoOperacaoComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'controle/funcoes/grupos-ad',
    component: ConGruposAdComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/funcoes/menus',
    component: ConMenusComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/funcoes/perfil-usuario',
    component: ConPerfilUserComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/funcoes/menu-perfil',
    component: ConMenuPerfilComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/funcoes/funcao-menu',
    component: ConFuncaoMenuComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/funcoes/funcao-sistema',
    component: ConFuncaoSistemaComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'consulta/funcoes/consulta-log-envio',
    component: ConsLogEnvComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consulta/funcoes/consulta-log-operacao',
    component: ConsLogOpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'config-matriz/funcoes/matriz-alerta',
    component: ConsMatrizAlertaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro/editar/alertas',
    component: EditaveisComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/editar/cor',
    component: EditarCorComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/editar/prioridade',
    component: EditarPrioridadeComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/editar/area',
    component: EditarAreaComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/editar/estado',
    component: EditarEstadoComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'cadastro/editar/painel',
    component: EditarPainelComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsCadastro],
  },
  {
    path: 'controle/editar/grupo-ad',
    component: EditarGrupoadComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/editar/perfil',
    component: EditarPerfilComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/editar/menu',
    component: EditarMenuComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/editar/funcao-sistema',
    component: EditarFsistemaComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/editar/funcao-menu',
    component: EditarFmenuComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'controle/editar/menu-perfil',
    component: EditarMenuPerfilComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsControle],
  },
  {
    path: 'config-matriz/editar/matriz',
    component: EditarMatrizComponent,
    canActivate: [AuthGuard, AnotherMiddlewareUrlsMatriz],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SweetAlert2Module],
  exports: [RouterModule],
})
export class AppRoutingModule {}
