import { NgModule } from '@angular/core';

import { DemandasPesquisaComponent } from './demandas-pesquisa/demandas-pesquisa.component';
import { DemandasCadastroComponent } from './demandas-cadastro/demandas-cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../seguranca/auth.guard';


const routes: Routes = [
  {
    path: 'demandas',
    component: DemandasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_DEMANDA'] }
  },
  {
    path: 'demandas/novo',
    component: DemandasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_DEMANDA'] }
  },
  {
    path: 'demandas/:codigo',
    component: DemandasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_DEMANDA'] }
  }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule]
})
export class DemandasRoutingModule { }
