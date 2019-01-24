import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DataTableModule } from 'primeng/datatable';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { SharedModule } from './../shared/shared.module';
import { DemandasModule } from 'app/demandas/demandas.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,

    DemandasModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,

    SharedModule,
    PessoasRoutingModule

  ],
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  exports: []
})
export class PessoasModule { }
