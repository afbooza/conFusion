import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Leader } from '../shared/leader';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';



import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
	'[@flyInOut]': 'true',
	'style': 'display: block;'
  },
  animations: [
	flyInOut(),
	expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  selectedLeader: Leader;

  constructor( private leaderservice: LeaderService,
    private restangular: Restangular,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

}
