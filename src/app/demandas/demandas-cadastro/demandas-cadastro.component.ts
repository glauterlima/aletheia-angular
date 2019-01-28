import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    {label: 'Aprovada', value: 'APROVADA' },
    {label: 'Faturada', value: 'FATURADA' },
 ];

  pessoas = [];

  // demanda = new Demanda();

  tipos = [
    {label: 'Corretiva', value: 'CORRETIVA' },
    {label: 'Evolutiva', value: 'EVOLUTIVA' },
    {label: 'Verificação de Erro', value: 'VERIFICACAOERRO' },
  ];

  lotes = [];

  sistemas = [];

  formulario: FormGroup;

  constructor(
    private loteService: LoteService,
    private sistemaService: SistemaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private demandaService: DemandaService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

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
    return Boolean(this.formulario.get('codigo').value)
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      status: ['PENDENTE', Validators.required],
      codigo: [],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      sistema: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      lote: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      plataforma: [null, Validators.required],
      tipo: ['EVOLUTIVA', Validators.required],
      totalPfBruto: [null, Validators.required],
      totalPfLiquido: [null, Validators.required],
      totalPfPlataforma: [null, Validators.required],
      data: [null, Validators.required],
      valor: [null, Validators.required],
      observacao: []
    })
  }

  carregarDemanda(codigo: number) {
    this.demandaService.buscarPorCodigo(codigo)
    .then(demanda => {
      // this.demanda = demanda;
      this.formulario.patchValue(demanda);
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarDemanda();
    } else {
      this.adicionarDemanda();
    }
  }
  adicionarDemanda() {
    this.demandaService.adicionar(this.formulario.value)
    .then(demandaAdicionada => {
      this.toasty.success('Demanda adicionada com sucesso!');

      // form.reset(); // limpa o formulário
      // this.demanda = new Demanda();

      this.router.navigate(['/demandas', demandaAdicionada.codigo]); // redireciona para o mesmo cadastro para edição
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarDemanda() {
    this.demandaService.atualizar(this.formulario.value)
    .then(demanda => {
      // this.demanda = demanda;
      this.formulario.patchValue(demanda);

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

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.demanda = new Demanda();
    }.bind(this), 1); // gambiarra para não perder o estado da demanda

    this.router.navigate(['/demandas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da demanda: ${this.formulario.get('nome').value} `);
  }
}
