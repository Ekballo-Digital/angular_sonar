import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginFormComponent } from './componentes/login-form/login-form.component';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './pages/home/home.component';
import { CredComponent } from './componentes/cred/cred.component';
import { OpcoesComponent } from './pages/opcoes/opcoes.component';
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
import { AlertaFormComponent } from './componentes/alerta-form/alerta-form.component';
import { EditaveisComponent } from './pages/editaveis/editaveis.component';
import { CorFormComponent } from './componentes/cor-form/cor-form.component';
import { EditarCorComponent } from './pages/editar-cor/editar-cor.component';
import { PrioridadeFormComponent } from './componentes/prioridade-form/prioridade-form.component';
import { EditarPrioridadeComponent } from './pages/editar-prioridade/editar-prioridade.component';
import { AreaFormComponent } from './componentes/area-form/area-form.component';
import { EditarAreaComponent } from './pages/editar-area/editar-area.component';
import { EstadoFormComponent } from './componentes/estado-form/estado-form.component';
import { EditarEstadoComponent } from './pages/editar-estado/editar-estado.component';
import { PainelFormComponent } from './componentes/painel-form/painel-form.component';
import { EditarPainelComponent } from './pages/editar-painel/editar-painel.component';
import { GrupoadFormComponent } from './componentes/grupoad-form/grupoad-form.component';
import { EditarGrupoadComponent } from './pages/editar-grupoad/editar-grupoad.component';
import { PerfilFormComponent } from './componentes/perfil-form/perfil-form.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { MenuFormComponent } from './componentes/menu-form/menu-form.component';
import { EditarMenuComponent } from './pages/editar-menu/editar-menu.component';
import { FsistemaFormComponent } from './componentes/fsistema-form/fsistema-form.component';
import { EditarFsistemaComponent } from './pages/editar-fsistema/editar-fsistema.component';
import { FmenuFormComponent } from './componentes/fmenu-form/fmenu-form.component';
import { EditarFmenuComponent } from './pages/editar-fmenu/editar-fmenu.component';
import { MenuPerfilFormComponent } from './componentes/menu-perfil-form/menu-perfil-form.component';
import { EditarMenuPerfilComponent } from './pages/editar-menu-perfil/editar-menu-perfil.component';
import { EnviarMsgFormComponent } from './componentes/enviar-msg-form/enviar-msg-form.component';
import { ConsMatrizFormComponent } from './componentes/cons-matriz-form/cons-matriz-form.component';
import { EditarMatrizComponent } from './pages/editar-matriz/editar-matriz.component';
import { FilaMensagensComponent } from './pages/fila-mensagens/fila-mensagens.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    LoginFormComponent,
    HomeComponent,
    CredComponent,
    OpcoesComponent,
    MensagensComponent,
    EnviarComponent,
    CadastroComponent,
    CadAlertasComponent,
    CadCoresComponent,
    CadLocaisComponent,
    CadMandatorioComponent,
    CadPainelComponent,
    CadEstadoOperacaoComponent,
    ConGruposAdComponent,
    ConMenusComponent,
    ConPerfilUserComponent,
    ConMenuPerfilComponent,
    ConFuncaoMenuComponent,
    ConFuncaoSistemaComponent,
    ConsLogEnvComponent,
    ConsLogOpComponent,
    ConsMatrizAlertaComponent,
    AlertaFormComponent,
    EditaveisComponent,
    CorFormComponent,
    EditarCorComponent,
    PrioridadeFormComponent,
    EditarPrioridadeComponent,
    AreaFormComponent,
    EditarAreaComponent,
    EstadoFormComponent,
    EditarEstadoComponent,
    PainelFormComponent,
    EditarPainelComponent,
    GrupoadFormComponent,
    EditarGrupoadComponent,
    PerfilFormComponent,
    EditarPerfilComponent,
    MenuFormComponent,
    EditarMenuComponent,
    FsistemaFormComponent,
    EditarFsistemaComponent,
    FmenuFormComponent,
    EditarFmenuComponent,
    MenuPerfilFormComponent,
    EditarMenuPerfilComponent,
    EnviarMsgFormComponent,
    ConsMatrizFormComponent,
    EditarMatrizComponent,
    FilaMensagensComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [[CookieService]],
  bootstrap: [AppComponent],
})
export class AppModule {}
