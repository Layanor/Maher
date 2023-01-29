import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'app-edumaterial',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class edumaterialComponent implements OnInit {
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
  public url = 'api/edumaterial';
  public titel = ' قائمة بكافة  المواد التعليمية ';
  public modelename = '   المادة التعليمية';
  public Datasourse: any;
  ngOnInit(): void {
    this.titleService.setTitle(this.titel);
    this.activatedRoute.data.subscribe((d: any) => {
      this.Datasourse = d.data[0].result;
    });
  }
}
