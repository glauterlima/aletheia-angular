import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class SistemaService {

  sistemasUrl: string;

  constructor(private http: AuthHttp) {
    this.sistemasUrl = `${environment.apiUrl}/sistemas`;
   }

  listarTodos(): Promise<any> {
    return this.http.get(this.sistemasUrl)
    .toPromise()
    .then(response => response.json());
  }

}
