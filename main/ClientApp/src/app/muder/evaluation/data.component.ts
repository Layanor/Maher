import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class evaluationComponent implements OnInit {
  constructor(
    private authorize: AuthorizeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.authorize.getAccessToken().subscribe((aut) => {
      this.authtoken = aut;
      //  console.log(this.authtoken);
    });
  }
  public authtoken: string;
  public url = 'api/evaluation';
  public titel = ' قائمة بكافة بنود التقييم ';
  public modelename = 'بند التقييم ';
  public Datasourse: any;
  ngOnInit(): void {
    this.titleService.setTitle(this.titel);
    this.activatedRoute.data.subscribe((d: any) => {
      this.Datasourse = d.data[0].result;
    });
  }
}
