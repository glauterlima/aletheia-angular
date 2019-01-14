import { Headers, URLSearchParams } from '@angular/http';
import { Injectable, Component } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

import { Demanda } from 'app/core/model';
import { environment } from 'environments/environment';



export class DemandaFiltro {
  nome: string;
  data: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class DemandaService {

  demandasUrl: string;

  constructor(private http: AuthHttp) {
    this.demandasUrl = `${environment.apiUrl}/demandas`;
   }

  pesquisar(filtro: DemandaFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.demandasUrl}?resumo`, { search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const demandas = responseJson.content;

      const resultado = {
        demandas,
        total: responseJson.totalElements
      };

      return resultado;
    })
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.demandasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(demanda: Demanda): Promise<Demanda> {
    return this.http.post(this.demandasUrl,
      JSON.stringify(demanda))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(demanda: Demanda): Promise<Demanda> {
    return this.http.put(`${this.demandasUrl}/${demanda.codigo}`,
    JSON.stringify(demanda))
    .toPromise()
    .then(response => {
      const demandaAlterada = response.json() as Demanda;

      this.converterStringsParaDatas([demandaAlterada]);

      return demandaAlterada;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Demanda> {
    return this.http.get(`${this.demandasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const demanda = response.json() as Demanda;

        this.converterStringsParaDatas([demanda]);

        return demanda;
      });
  }

  private converterStringsParaDatas(demandas: Demanda[]) {
    for (const demanda of demandas) {
      demanda.data = moment(demanda.data, 'YYYY-MM-DD').toDate();
    }
  }
}


