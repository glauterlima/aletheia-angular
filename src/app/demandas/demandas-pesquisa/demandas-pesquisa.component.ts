import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';

import { DemandaService, DemandaFiltro } from './../demanda.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';


@Component({
  selector: 'app-demandas-pesquisa',
  templateUrl: './demandas-pesquisa.component.html',
  styleUrls: ['./demandas-pesquisa.component.css']
})
export class DemandasPesquisaComponent implements OnInit {


  totalRegistros = 0;
  filtro = new DemandaFiltro();
  demandas = [];
  @ViewChild('tabela') grid;

  constructor(
    private demandaService: DemandaService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de demandas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.demandaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.demandas = resultado.demandas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(demanda: any) {
    this.confirmation.confirm( {
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(demanda);
      }
    });
  }

  excluir(demanda: any) {
    this.demandaService.excluir(demanda.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      }else {
       this.grid.first = 0;
      }

      this.toasty.success('Demanda excluída com sucesso!')

    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
