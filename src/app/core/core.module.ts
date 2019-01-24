import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { Title } from '@angular/platform-browser';
import { LoteService } from './../lotes/lote.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { DemandaService } from 'app/demandas/demanda.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { SistemaService } from 'app/sistemas/sistema.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from './../seguranca/auth.service';


registerLocaleData(localePt); // corrige o problema de locale pt

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    DemandaService,
    PessoaService,
    LoteService,
    SistemaService,
    ConfirmationService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' },
    AuthService,
    ErrorHandlerService
  ]

})
export class CoreModule { }
