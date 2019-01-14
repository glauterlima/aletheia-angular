import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

@Injectable()
export class LoteService {

  lotesUrl: string;

  constructor(private http: AuthHttp) {
    this.lotesUrl = `${environment.apiUrl}/lotes`;
   }


  listarTodos(): Promise<any> {


    return this.http.get(this.lotesUrl)
    .toPromise()
    .then(response => response.json());
  }

}
