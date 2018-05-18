import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private ProcessHttpmsgService: ProcessHttpmsgService) { }

  getLeader(id:number) : Observable<Leader>{
		return this.restangular.one('leaders ',id).get();
    }

  getLeaders(): Observable<Leader[]> {
	  return this.restangular.all('leaders').getList();
  }

  getFeaturedLeader(): Observable<Leader> {
		return this.restangular.all('leaders').getList({featured: true}).map(res => res[0]);
  }

}