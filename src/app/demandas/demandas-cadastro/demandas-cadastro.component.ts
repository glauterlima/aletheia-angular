import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';

import { Demanda } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { LoteService } from './../../lotes/lote.service';
import { SistemaService } from './../../sistemas/sistema.service';

import { DemandaService } from 'app/demandas/demanda.service';


@Component({
  selector: 'app-demandas-cadastro',
  templateUrl: './demandas-cadastro.component.html',
  styleUrls: ['./demandas-cadastro.component.css']
})
export class DemandasCadastroComponent implements OnInit {

  plataformas = [
    {label: 'Asp', value: 'ASP' },
    {label: 'Html', value: 'HTML' },
    {label: 'Java', value: 'JAVA' },
    {label: 'Javascript', value: 'JAVASCRIPT' },
    {label: 'Mobile', value: 'MOBILE' },
    {label: 'Oracle Forms', value: 'ORACLEFORMS' },
    {label: 'Perl', value: 'PERL' },
    {label: 'Php', value: 'PHP' },
    {label: 'PL/SQL', value: 'PLSQL' },
    {label: 'Portal Web', value: 'PORTAL' },
    {label: 'Python', value: 'PYTHON' },
    {label: 'Unix Shell', value: 'UNIX_SHELL' },
    {label: 'VbScript', value: 'VBSCRIPT' },
    {label: 'Visual Basic', value: 'VISUALBASIC' },
  ];

  status = [
    {label: 'Pendente', value: 'PENDENTE' },
    {label: 'Em Análise', value: 'EMANALISE' },
    {label: 'Finalizada', value: 'FINALIZADA' },
 ];

  pessoas = [];

  demanda = new Demanda();

  tipos = [
    {label: 'Corretiva', value: 'CORRETIVA' },
    {label: 'Evolutiva', value: 'EVOLUTIVA' },
    {label: 'Verificação de Erro', value: 'VERIFICACAOERRO' },
  ];

  lotes = [];

  sistemas = [];

  constructor(
    private loteService: LoteService,
    private sistemaService: SistemaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private demandaService: DemandaService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoDemanda = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova demanda');

    if (codigoDemanda) {
      this.carregarDemanda(codigoDemanda);
    }

    this.carregarLotes();
    this.carregarSistemas();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.demanda.codigo)
  }

  carregarDemanda(codigo: number) {
    this.demandaService.buscarPorCodigo(codigo)
    .then(demanda => {
      this.demanda = demanda;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarDemanda(form);
    } else {
      this.adicionarDemanda(form);
    }
  }
  adicionarDemanda(form: FormControl) {
    this.demandaService.adicionar(this.demanda)
    .then(demandaAdicionada => {
      this.toasty.success('Demanda adicionada com sucesso!');

      // form.reset(); // limpa o formulário
      // this.demanda = new Demanda();

      this.router.navigate(['/demandas', demandaAdicionada.codigo]); // redireciona para o mesmo cadastro para edição
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarDemanda(form: FormControl) {
    this.demandaService.atualizar(this.demanda)
    .then(demanda => {
      this.demanda = demanda;

      this.toasty.success('Demanda alterada com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLotes() {
    return this.loteService.listarTodos()
    .then(lotes => {
      this.lotes = lotes.map(l => ({ label: l.nome, value: l.codigo}));
  })
  .catch(erro => this.errorHandler.handle(erro));

  }

  carregarSistemas() {
    return this.sistemaService.listarTodos()
    .then(sistemas => {
      this.sistemas = sistemas.map(s => ({ label: s.nome, value: s.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.demanda = new Demanda();
    }.bind(this), 1); // gambiarra para não perder o estado da demanda

    this.router.navigate(['/demandas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da demanda: ${this.demanda.nome} `);
  }
}
